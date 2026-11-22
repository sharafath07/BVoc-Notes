import prisma from "../lib/prisma.js";

const community = { key: "community", name: "Everyone", audience: "All signed-in community members" };
const teachers = { key: "teachers", name: "Teachers", audience: "Teachers only" };
const alumni = { key: "alumni", name: "Alumni", audience: "Alumni only" };
const alumniTeachers = {
    key: "alumni-teachers",
    name: "Alumni & teachers",
    audience: "All alumni and teachers",
};

const customRoomPrefix = "custom:";
const customRoomFields = { id: true, audienceKey: true, name: true };
const sharedRooms = [community, teachers, alumni, alumniTeachers];
const batchRoomKey = /^batch:[0-9]{4}:(teachers|students)$/;

function batchRoom(batch, withTeachers) {
    return {
        key: `batch:${batch}:${withTeachers ? "teachers" : "students"}`,
        name: `Batch ${batch} · ${withTeachers ? "With teachers" : "Students"}`,
        audience: withTeachers ? "Current batch students and teachers" : "Current batch students only",
    };
}

export function roomsForMember(member, batches = []) {
    if (member?.status !== "ACTIVE") return [];

    if (member.role === "TEACHER") {
        return [community, teachers, alumniTeachers, ...batches.map((batch) => batchRoom(batch, true))];
    }

    if (member.role === "ADMIN") {
        return [...sharedRooms, ...batches.flatMap((batch) => [batchRoom(batch, true), batchRoom(batch, false)])];
    }
    if (member.role !== "STUDENT" || !member.studentProfile) return [];

    const { status, batch } = member.studentProfile;
    if (status === "ALUMNI") return [community, alumni, alumniTeachers];
    if (status === "ACTIVE" && /^\d{4}$/.test(batch)) {
        return [community, batchRoom(batch, true), batchRoom(batch, false)];
    }
    return [community];
}

export function getChatMember(userId) {
    return prisma.user.findUnique({
        where: { id: userId },
        select: { role: true, status: true, studentProfile: { select: { status: true, batch: true } } },
    });
}

export async function getBuiltInChatRooms(member) {
    if (member?.role === "ADMIN" && member.status === "ACTIVE") {
        const batches = await prisma.$queryRaw`
            SELECT batch FROM "StudentProfile" WHERE batch ~ '^[0-9]{4}$'
            UNION
            SELECT split_part("roomKey", ':', 2) AS batch
            FROM "ChatMessage" WHERE "roomKey" ~ '^batch:[0-9]{4}:(teachers|students)$'
            UNION
            SELECT split_part("audienceKey", ':', 2) AS batch
            FROM "ChatRoom" WHERE "audienceKey" ~ '^batch:[0-9]{4}:(teachers|students)$'
            ORDER BY batch DESC
        `;
        return roomsForMember(member, batches.map(({ batch }) => batch));
    }
    if (member?.role !== "TEACHER" || member.status !== "ACTIVE") {
        return roomsForMember(member);
    }

    const profiles = await prisma.studentProfile.groupBy({
        by: ["batch"],
        where: { batch: { not: null }, status: "ACTIVE", user: { status: "ACTIVE", role: "STUDENT" } },
        orderBy: { batch: "desc" },
    });
    return roomsForMember(member, profiles.map(({ batch }) => batch).filter((batch) => /^\d{4}$/.test(batch)));
}

function describeCustomRoom(room, audience) {
    return {
        key: customRoomPrefix + room.id,
        name: room.name,
        audience: audience.audience,
        audienceKey: audience.key,
    };
}

export async function listCustomChatRooms(builtInRooms) {
    if (!builtInRooms.length) return [];
    const audiences = new Map(builtInRooms.map((room) => [room.key, room]));
    const rooms = await prisma.chatRoom.findMany({
        where: { audienceKey: { in: [...audiences.keys()] } },
        orderBy: [{ name: "asc" }, { id: "asc" }],
        select: customRoomFields,
    });
    return rooms.map((room) => describeCustomRoom(room, audiences.get(room.audienceKey)));
}

export async function hasChatRoomAccess(roomKey, member) {
    if (member?.status !== "ACTIVE") return false;
    const isAdmin = member.role === "ADMIN";
    if (!roomKey.startsWith(customRoomPrefix)) {
        if (isAdmin) return sharedRooms.some(({ key }) => key === roomKey) || batchRoomKey.test(roomKey);
        const builtInRooms = await getBuiltInChatRooms(member);
        return builtInRooms.some(({ key }) => key === roomKey);
    }
    const room = await prisma.chatRoom.findUnique({
        where: { id: roomKey.slice(customRoomPrefix.length) },
        select: { audienceKey: true },
    });
    if (!room) return false;
    if (isAdmin) return true;
    const builtInRooms = await getBuiltInChatRooms(member);
    return builtInRooms.some(({ key }) => key === room.audienceKey);
}

export async function createChatRoom(name, audience, createdById) {
    const room = await prisma.chatRoom.create({
        data: { name, audienceKey: audience.key, createdById },
        select: customRoomFields,
    });
    return describeCustomRoom(room, audience);
}

const publicMessage = {
    id: true,
    body: true,
    createdAt: true,
    author: { select: { id: true, name: true, profileImageUrl: true } },
};

export async function getChatMessages(roomKey) {
    const messages = await prisma.chatMessage.findMany({
        where: { roomKey },
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        take: 100,
        select: publicMessage,
    });
    return messages.reverse();
}

export function createChatMessage(roomKey, authorId, body) {
    return prisma.chatMessage.create({
        data: { roomKey, authorId, body },
        select: publicMessage,
    });
}

export function deleteChatMessage(roomKey, id) {
    return prisma.chatMessage.deleteMany({ where: { roomKey, id } });
}
