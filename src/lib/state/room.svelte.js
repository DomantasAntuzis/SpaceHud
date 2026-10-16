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
  slug: null,
  invite: null, // invite token from the link the visitor opened
  inviteToken: null, // only set for the host, used to build the shareable link
  isHost: false,
  status: "idle", // idle | loading | waiting | denied | notfound | error | ready
  error: "",
  members: [],
  requests: [], // host only: visitors waiting to be let in
  toasts: [],
});

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

/** Shareable link that lets people in without the host's approval (host only). */
export function inviteLink() {
  if (!room.inviteToken) return "";
  return `${location.origin}/room/${room.slug}?invite=${room.inviteToken}`;
}

function removeRequest(u) {
  room.requests = room.requests.filter((r) => r.id !== String(u.id));
}

export async function openRoom(slug, invite = null) {
  closeRoom();
  room.slug = slug;
  room.invite = invite;
  room.status = "loading";
  try {
    const data = await getRoom(slug, invite); // also creates a guest session if needed
    room.isHost = data.isHost;
    room.inviteToken = data.inviteToken ?? null;
    room.members = data.members.map(toMember);
    await refreshUser();
    room.status = data.allowed ? "ready" : "waiting";
    connectToRoom(slug, invite, {
      // The server sends the member list once we are actually in the room
      onMembers: (list) => {
        room.members = list.map(toMember);
        if (room.status === "waiting") room.status = "ready";
      },
      onWaiting: () => (room.status = "waiting"),
      onDenied: () => (room.status = "denied"),
      onJoined: (u) => pushToast(`${u.username} has joined`),
      onPending: (list) => (room.requests = list.map(toMember)),
      onKnockRequest: (u) => {
        removeRequest(u);
        room.requests.push(toMember(u));
        pushToast(`${u.username} wants to join`);
      },
      onKnockCancel: removeRequest,
      onJoinError: (msg) => {
        room.status = "error";
        room.error = msg;
      },
      onConnectError: async (err) => {
        if (err.message === "unauthorized") {
          await getRoom(slug, invite).catch(() => {});
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
  room.slug = null;
  room.invite = null;
  room.inviteToken = null;
  room.isHost = false;
  room.members = [];
  room.requests = [];
  room.toasts = [];
  room.status = "idle";
  room.error = "";
}
