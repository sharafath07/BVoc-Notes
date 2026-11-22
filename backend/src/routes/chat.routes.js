import { Router } from "express";
import { z } from "zod";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import {
    createChatMessage,
    createChatRoom,
    deleteChatMessage,
    getBuiltInChatRooms,
    getChatMember,
    getChatMessages,
    hasChatRoomAccess,
    listCustomChatRooms,
    roomsForMember,
} from "../services/chat.service.js";

const router = Router();
const messageSchema = z.object({ body: z.string().trim().min(1).max(2000) });
const roomSchema = z.object({ name: z.string().trim().min(1).max(60), audienceKey: z.string().min(1).max(60) });
const refreshInterval = 2500;

router.use(authenticate);
router.use((_req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
});

function getCurrentMember(req) {
    if (!Number.isFinite(req.authExpiresAt) || Date.now() >= req.authExpiresAt) return null;
    return getChatMember(req.user.id);
}

async function canAccessRoom(req) {
    return hasChatRoomAccess(req.params.roomKey, await getCurrentMember(req));
}

function forbidden(res) {
    return res.status(403).json({ message: "You do not have access to this chat." });
}

router.get("/rooms", async (req, res, next) => {
    try {
        const builtInRooms = await getBuiltInChatRooms(await getCurrentMember(req));
        if (!builtInRooms.length) return forbidden(res);
        const customRooms = await listCustomChatRooms(builtInRooms);
        return res.json({ rooms: [...builtInRooms, ...customRooms] });
    } catch (error) {
        next(error);
    }
});

router.post("/rooms", authorize("TEACHER", "ADMIN"), async (req, res, next) => {
    try {
        const member = await getCurrentMember(req);
        if (member?.status !== "ACTIVE" || !["TEACHER", "ADMIN"].includes(member.role)) return forbidden(res);

        const input = roomSchema.safeParse(req.body);
        if (!input.success) {
            return res.status(400).json({ message: "Enter a room name between 1 and 60 characters and select an audience." });
        }

        if (member.role === "ADMIN" && input.data.audienceKey !== "community") return forbidden(res);
        const builtInRooms = member.role === "ADMIN" ? roomsForMember(member) : await getBuiltInChatRooms(member);
        const audience = builtInRooms.find(({ key }) => key === input.data.audienceKey);
        if (!audience) return forbidden(res);

        const room = await createChatRoom(input.data.name, audience, req.user.id);
        return res.status(201).json({ room });
    } catch (error) {
        if (error.code === "P2002") {
            return res.status(409).json({ message: "A room with this name already exists for this audience." });
        }
        next(error);
    }
});

router.post("/rooms/:roomKey/messages", async (req, res, next) => {
    try {
        const member = await getCurrentMember(req);
        if (member?.role === "ADMIN") {
            return res.status(403).json({ message: "Admins can moderate chat but cannot send messages." });
        }
        if (!(await hasChatRoomAccess(req.params.roomKey, member))) return forbidden(res);
        const input = messageSchema.safeParse(req.body);
        if (!input.success) {
            return res.status(400).json({ message: "Enter a message between 1 and 2,000 characters." });
        }

        const message = await createChatMessage(req.params.roomKey, req.user.id, input.data.body);
        return res.status(201).json({ message });
    } catch (error) {
        next(error);
    }
});

router.delete("/rooms/:roomKey/messages/:messageId", authorize("ADMIN"), async (req, res, next) => {
    try {
        const member = await getCurrentMember(req);
        if (member?.role !== "ADMIN" || member.status !== "ACTIVE") return forbidden(res);
        const { roomKey, messageId } = req.params;
        const result = await deleteChatMessage(roomKey, messageId);
        if (!result.count) return res.status(404).json({ message: "Message not found in this room." });
        return res.status(204).end();
    } catch (error) {
        next(error);
    }
});

router.get("/rooms/:roomKey/stream", async (req, res, next) => {
    let timer;
    let lastSnapshot;

    async function refresh() {
        try {
            if (!(await canAccessRoom(req))) {
                if (!res.headersSent) return forbidden(res);
                return res.end('data: {"accessRevoked":true}\n\n');
            }

            const messages = await getChatMessages(req.params.roomKey);
            if (res.destroyed) return;

            if (!res.headersSent) {
                res.set({
                    "Content-Type": "text/event-stream",
                    "X-Accel-Buffering": "no",
                });
                res.flushHeaders();
            }

            const snapshot = JSON.stringify({ messages });
            const event = snapshot === lastSnapshot ? ": heartbeat\n\n" : `data: ${snapshot}\n\n`;
            lastSnapshot = snapshot;

            if (res.write(event)) {
                timer = setTimeout(refresh, refreshInterval);
            } else {
                res.once("drain", () => {
                    if (!res.destroyed) timer = setTimeout(refresh, refreshInterval);
                });
            }
        } catch (error) {
            if (res.destroyed) return;
            if (!res.headersSent) return next(error);
            console.error("Chat stream error:", error);
            res.end();
        }
    }

    res.once("close", () => clearTimeout(timer));
    await refresh();
});

router.use((error, _req, res, _next) => {
    console.error("Chat API error:", error);
    res.status(500).json({ message: "Chat is temporarily unavailable." });
});

export default router;
