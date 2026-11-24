import { useContext, useEffect, useRef, useState } from "react";
import { Hash, Send, Trash2 } from "lucide-react";
import { DepartmentHeading } from "../components/DepartmentPage";
import ProfileAvatar from "../components/ProfileAvatar";
import { Link } from "react-router-dom";
import { Context } from "../Context/Context";
import api, { getPageData } from "../api/axios";

const timeFormat = new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" });

async function readRoomStream(url, token, signal, onEvent) {
    const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}`, Accept: "text/event-stream" },
        signal,
    });

    if ([401, 403].includes(response.status)) {
        onEvent({ accessRevoked: true });
        return;
    }
    if (!response.ok || !response.headers.get("content-type")?.includes("text/event-stream")) {
        throw new Error("Could not connect to the chat.");
    }

    const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
    let buffer = "";
    try {
        while (!signal.aborted) {
            const { value, done } = await reader.read();
            if (done) return;
            buffer += value;
            let boundary = buffer.indexOf("\n\n");
            while (boundary !== -1) {
                const event = buffer.slice(0, boundary);
                buffer = buffer.slice(boundary + 2);
                if (event.startsWith("data: ")) onEvent(JSON.parse(event.slice(6)));
                boundary = buffer.indexOf("\n\n");
            }
        }
    } finally {
        await reader.cancel().catch(() => {});
        reader.releaseLock();
    }
}

function ChatRoom({ room, chatUrl, token, userId, isDark, canModerate }) {
    const [messages, setMessages] = useState([]);
    const [draft, setDraft] = useState("");
    const [connection, setConnection] = useState("Connecting…");
    const [sending, setSending] = useState(false);
    const [sendError, setSendError] = useState("");
    const [deletingId, setDeletingId] = useState(null);
    const [deleteError, setDeleteError] = useState("");
    const messageList = useRef(null);
    const followMessages = useRef(true);
    const deletedMessages = useRef(new Set());
    const roomUrl = `${chatUrl}/rooms/${encodeURIComponent(room.key)}`;

    useEffect(() => {
        const controller = new AbortController();
        let retry;
        let accessRevoked = false;

        async function connect() {
            try {
                await readRoomStream(`${roomUrl}/stream`, token, controller.signal, (event) => {
                    if (controller.signal.aborted) return;
                    if (event.accessRevoked) {
                        accessRevoked = true;
                        setMessages([]);
                        setConnection("Access unavailable");
                        return;
                    }
                    setMessages(event.messages.filter(({ id }) => !deletedMessages.current.has(id)));
                    setConnection("Live");
                });
            } catch (error) {
                if (!controller.signal.aborted) console.error("Chat connection:", error);
            }
            if (controller.signal.aborted || accessRevoked) return;
            setConnection("Reconnecting…");
            retry = setTimeout(connect, 2500);
        }

        connect();
        return () => {
            controller.abort();
            clearTimeout(retry);
        };
    }, [roomUrl, token]);

    useEffect(() => {
        if (followMessages.current && messageList.current) {
            messageList.current.scrollTop = messageList.current.scrollHeight;
        }
    }, [messages]);

    async function sendMessage(event) {
        event.preventDefault();
        if (canModerate || !draft.trim() || sending || connection !== "Live") return;
        setSending(true);
        setSendError("");
        try {
            await api.post(`${roomUrl}/messages`, { body: draft });
            setDraft("");
            followMessages.current = true;
        } catch (error) {
            setSendError(error.response?.data?.message || "Message could not be sent. Try again.");
        } finally {
            setSending(false);
        }
    }

    async function removeMessage(messageId) {
        if (!canModerate || deletingId || !window.confirm("Delete this message for everyone?")) return;
        setDeletingId(messageId);
        setDeleteError("");
        try {
            await api.delete(`${roomUrl}/messages/${encodeURIComponent(messageId)}`);
            deletedMessages.current.add(messageId);
            setMessages((current) => current.filter(({ id }) => id !== messageId));
        } catch (error) {
            setDeleteError(error.response?.data?.message || "Could not delete the message.");
        } finally {
            setDeletingId(null);
        }
    }

    const border = isDark ? "border-gray-800" : "border-gray-200";
    const muted = isDark ? "text-gray-400" : "text-gray-600";

    return (
        <section aria-label={room.name} className="flex min-w-0 flex-1 flex-col">
            <header className={`flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4 ${border}`}>
                <div>
                    <h2 className="text-lg font-semibold">{room.name}</h2>
                    <p className={`text-sm ${muted}`}>{room.audience}</p>
                </div>
                <span role="status" className={`flex items-center gap-2 text-sm ${muted}`}>
                    <span className={`size-2 rounded-full ${connection === "Live" ? "bg-emerald-500" : "bg-amber-500"}`} />
                    {connection}
                </span>
            </header>

            <div
                ref={messageList}
                role="log"
                aria-label="Messages"
                tabIndex={0}
                onScroll={({ currentTarget }) => {
                    followMessages.current = currentTarget.scrollHeight - currentTarget.scrollTop - currentTarget.clientHeight < 64;
                }}
                className="flex h-[min(51vh,33rem)] min-h-56 flex-col gap-4 overflow-y-auto px-5 py-5"
            >
                {messages.length === 0 && connection === "Live" && (
                    <p className={`m-auto text-center text-sm ${muted}`}>No messages yet. Start the conversation.</p>
                )}
                {messages.map((message) => {
                    const own = message.author?.id === userId;
                    return (
                        <article key={message.id} className={`max-w-[90%] sm:max-w-[75%] ${own ? "self-end" : "self-start"}`}>
                            <div className={`mb-1 flex flex-wrap items-center gap-x-2 text-xs ${muted} ${own ? "justify-end" : ""}`}>
                                <ProfileAvatar user={message.author} />
                                <span className="font-semibold">{own ? "You" : message.author?.name || "Former member"}</span>
                                <time dateTime={message.createdAt}>{timeFormat.format(new Date(message.createdAt))}</time>
                                {canModerate && (
                                    <button type="button" aria-label="Delete message" disabled={Boolean(deletingId)} onClick={() => removeMessage(message.id)} className="grid size-10 place-items-center rounded-md text-red-600 hover:bg-red-500/10 disabled:opacity-50">
                                        <Trash2 aria-hidden="true" size={16} />
                                    </button>
                                )}
                            </div>
                            <p className={`whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm [overflow-wrap:anywhere] ${own ? "bg-indigo-600 text-white" : isDark ? "bg-gray-800" : "bg-gray-100"}`}>
                                {message.body}
                            </p>
                        </article>
                    );
                })}
            </div>

            {canModerate ? (
                <div className={`border-t px-5 py-4 text-sm ${border} ${muted}`}>
                    <p>Moderation mode. You can delete messages in this room.</p>
                    {deleteError && <p role="alert" className="mt-2 text-red-600">{deleteError}</p>}
                </div>
            ) : (
            <form onSubmit={sendMessage} className={`border-t px-5 py-4 ${border}`}>
                {sendError && <p role="alert" className="mb-2 text-sm text-red-500">{sendError}</p>}
                <div className="flex items-end gap-3">
                    <textarea
                        aria-label="Write a message"
                        placeholder="Write a message…"
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        maxLength={2000}
                        disabled={sending || connection === "Access unavailable"}
                        rows={2}
                        className={`min-w-0 flex-1 resize-none rounded-xl border bg-transparent px-3 py-2 text-sm focus:outline-indigo-500 ${border}`}
                    />
                    <button
                        type="submit"
                        disabled={sending || !draft.trim() || connection !== "Live"}
                        className="flex min-h-11 items-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Send aria-hidden="true" size={16} />
                        {sending ? "Sending…" : "Send"}
                    </button>
                </div>
            </form>
            )}
        </section>
    );
}

export default function Chat() {
    const { backendUrl, token, user, isDark } = useContext(Context);
    const chatUrl = `${backendUrl}/api/chat`;
    const [rooms, setRooms] = useState([]);
    const [selectedKey, setSelectedKey] = useState("");
    const [roomsError, setRoomsError] = useState("");
    const [attempt, setAttempt] = useState(0);
    const room = rooms.find(({ key }) => key === selectedKey) || rooms[0];
    const [showCreate, setShowCreate] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [audienceKey, setAudienceKey] = useState("");
    const [creating, setCreating] = useState(false);
    const [createError, setCreateError] = useState("");
    const canCreate = ["ADMIN", "TEACHER"].includes(user.role) && rooms.length > 0;
    const canModerate = user.role === "ADMIN";

    useEffect(() => {
        const controller = new AbortController();
        getPageData(`${chatUrl}/rooms`, { signal: controller.signal })
            .then(({ data }) => {
                if (!controller.signal.aborted) setRooms(data.rooms);
            })
            .catch((error) => {
                if (!controller.signal.aborted) {
                    setRoomsError(error.response?.data?.message || "Could not load chat rooms.");
                }
            });
        return () => controller.abort();
    }, [chatUrl, token, attempt]);

    function refreshRooms() {
        setRoomsError("");
        setAttempt((current) => current + 1);
    }

    function openCreateRoom() {
        setAudienceKey(canModerate ? "community" : room.audienceKey || room.key);
        setCreateError("");
        setShowCreate(true);
    }

    async function handleCreateRoom(event) {
        event.preventDefault();
        if (!roomName.trim() || !audienceKey || creating) return;
        setCreating(true);
        setCreateError("");
        try {
            const { data } = await api.post(`${chatUrl}/rooms`, { name: roomName.trim(), audienceKey });
            setRooms((current) => current.some(({ key }) => key === data.room.key) ? current : [...current, data.room]);
            setSelectedKey(data.room.key);
            setRoomName("");
            setShowCreate(false);
        } catch (error) {
            setCreateError(error.response?.data?.message || "Could not create the room.");
        } finally {
            setCreating(false);
        }
    }

    const border = isDark ? "border-gray-800" : "border-gray-200";
    const muted = isDark ? "text-gray-400" : "text-gray-600";

    return (
        <>
        <DepartmentHeading title="Community chat" description="Talk with your batch, teachers and the alumni community." />
        <main className={`min-h-screen px-4 pb-12 pt-24 font-roboto sm:px-6 ${isDark ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
            <div className="mx-auto max-w-6xl">
                {!canModerate && (
                    <Link to="/profile" className="department-profile-link mb-4">
                        <ProfileAvatar user={user} />
                        Edit profile
                    </Link>
                )}
                {canCreate && showCreate && (
                    <form onSubmit={handleCreateRoom} className={`mb-4 flex flex-wrap items-end gap-3 rounded-xl border p-4 ${border}`}>
                        <label className="flex min-w-40 flex-1 flex-col gap-1 text-sm">
                            Room name
                            <input
                                autoFocus
                                required
                                maxLength={60}
                                value={roomName}
                                onChange={(event) => setRoomName(event.target.value)}
                                className={`rounded-lg border bg-transparent px-3 py-2 ${border}`}
                            />
                        </label>
                        <label className="flex min-w-40 flex-1 flex-col gap-1 text-sm">
                            Audience
                            <select
                                value={audienceKey}
                                onChange={(event) => setAudienceKey(event.target.value)}
                                className={`rounded-lg border px-3 py-2 ${border} ${isDark ? "bg-gray-900" : "bg-white"}`}
                            >
                                {rooms.filter((item) => !item.audienceKey && (!canModerate || item.key === "community")).map((item) => (
                                    <option key={item.key} value={item.key}>{item.name}</option>
                                ))}
                            </select>
                        </label>
                        <button type="submit" disabled={creating || !roomName.trim()} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
                            {creating ? "Creating…" : "Create room"}
                        </button>
                        <button type="button" disabled={creating} onClick={() => setShowCreate(false)} className="px-2 py-2 text-sm underline">
                            Cancel
                        </button>
                        {createError && <p role="alert" className="basis-full text-sm text-red-500">{createError}</p>}
                    </form>
                )}
                <div className={`overflow-hidden rounded-2xl border md:flex ${border} ${isDark ? "bg-gray-900" : "bg-white"}`}>
                    <nav aria-label="Chat rooms" className={`border-b p-3 md:w-64 md:shrink-0 md:border-b-0 md:border-r ${border}`}>
                        <div className={`flex flex-wrap items-center justify-between gap-2 px-2 pb-2 text-sm ${muted}`}>
                            <h2 className="font-semibold">Rooms</h2>
                            <button type="button" className="text-xs underline" onClick={refreshRooms}>Refresh</button>
                        </div>
                        {canCreate && !showCreate && (
                            <button type="button" onClick={openCreateRoom} className="mb-2 w-full rounded-lg bg-indigo-600 px-3 py-2 text-left text-sm font-semibold text-white">
                                Create room
                            </button>
                        )}
                        {roomsError && room && <p role="alert" className="mb-2 px-2 text-xs text-red-500">{roomsError}</p>}
                        <div className="flex max-h-40 flex-wrap gap-1 overflow-y-auto md:max-h-[65vh] md:flex-col md:flex-nowrap">
                            {rooms.map((item) => (
                                <button
                                    key={item.key}
                                    type="button"
                                    onClick={() => setSelectedKey(item.key)}
                                    aria-current={item.key === room?.key ? "true" : undefined}
                                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium ${item.key === room?.key ? "bg-indigo-600 text-white" : isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
                                >
                                    <Hash aria-hidden="true" size={15} className="shrink-0" />
                                    <span className="min-w-0 break-words">{item.name}</span>
                                </button>
                            ))}
                        </div>
                    </nav>
                    {room ? (
                        <ChatRoom key={`${user.id}:${room.key}`} room={room} chatUrl={chatUrl} token={token} userId={user.id} isDark={isDark} canModerate={canModerate} />
                    ) : (
                        <div className={`grid min-h-64 flex-1 place-content-center gap-3 px-5 text-center text-sm ${muted}`}>
                            <p role={roomsError ? "alert" : "status"}>{roomsError || "Loading chat rooms…"}</p>
                            {roomsError && (
                                <button type="button" onClick={refreshRooms} className="font-semibold underline">Try again</button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </main>
        </>
    );
}
