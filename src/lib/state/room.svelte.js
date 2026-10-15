import { getRoom } from "$lib/api/room";
import { ApiError } from "$lib/api/http";
import { connectToRoom, disconnectSocket } from "$lib/api/socket";
import { refreshUser } from "./user.svelte.js";

const COLORS = [
  "var(--color-accent)",
  "var(--color-note-teal)",
  "var(--color-note-pink)",
  "var(--color-note-coral)",
  "var(--color-note-purple)",
];

export const room = $state({
  id: null,
  status: "idle", // idle | loading | notfound | error | ready
  error: "",
  members: [],
  toasts: [],
});

// ids of rooms created by this client, so the host UI can show "delete"
const created = new Set();
export const markCreated = (id) => created.add(String(id));
export const isCreator = () => room.id != null && created.has(String(room.id));

function colorFor(id) {
  let h = 0;
  for (const c of String(id)) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return COLORS[h % COLORS.length];
}

function toMember(m) {
  const id = String(m.id);
  return { id, username: m.username, type: m.type, color: colorFor(id) };
}

export function pushToast(text) {
  const id = crypto.randomUUID();
  room.toasts.push({ id, text });
  setTimeout(() => {
    room.toasts = room.toasts.filter((t) => t.id !== id);
  }, 3000);
}

export async function openRoom(id) {
  closeRoom();
  room.id = id;
  room.status = "loading";
  try {
    const data = await getRoom(id); // also creates a guest session if needed
    room.members = data.members.map(toMember);
    await refreshUser();
    room.status = "ready";
    connectToRoom(id, {
      onMembers: (list) => (room.members = list.map(toMember)),
      onJoined: (u) => pushToast(`${u.username} has joined`),
      onJoinError: (msg) => {
        room.status = "error";
        room.error = msg;
      },
      onConnectError: async (err) => {
        if (err.message === "unauthorized") {
          await getRoom(id).catch(() => {});
          await refreshUser();
        }
      },
    });
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) room.status = "notfound";
    else {
      room.status = "error";
      room.error = e.message;
    }
  }
}

export function closeRoom() {
  disconnectSocket();
  room.id = null;
  room.members = [];
  room.toasts = [];
  room.status = "idle";
  room.error = "";
}
