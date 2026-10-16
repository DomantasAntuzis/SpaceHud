import { io } from "socket.io-client";
import { API_URL } from "$lib/config";

let socket = null;
let current = null; // { slug, invite, handlers }

function join() {
  const { slug, invite, handlers } = current;
  socket.emit("room:join", { slug, invite }, (ack) => {
    if (ack?.ok) return;
    if (ack?.code === "needs_approval") knock();
    else handlers.onJoinError?.(ack?.msg ?? "Failed to join room");
  });
}

function knock() {
  const { slug, handlers } = current;
  socket.emit("room:knock", { slug }, (ack) => {
    if (!ack?.ok) handlers.onJoinError?.(ack?.msg ?? "Failed to request access");
    else if (ack.admitted) join();
    else handlers.onWaiting?.();
  });
}

function ensure() {
  if (socket) return socket;
  socket = io(API_URL, { withCredentials: true, autoConnect: false });
  socket.on("connect", () => {
    if (current) join();
  });
  socket.on("connect_error", (err) => current?.handlers.onConnectError?.(err));
  socket.on("room:members", (m) => current?.handlers.onMembers?.(m));
  socket.on("user:joined", (u) => current?.handlers.onJoined?.(u));
  socket.on("user:left", (u) => current?.handlers.onLeft?.(u));
  socket.on("room:pending", (list) => current?.handlers.onPending?.(list));
  socket.on("room:knock-request", (u) => current?.handlers.onKnockRequest?.(u));
  socket.on("room:knock-cancel", (u) => current?.handlers.onKnockCancel?.(u));
  socket.on("room:admitted", () => {
    if (current) join();
  });
  socket.on("room:denied", () => current?.handlers.onDenied?.());
  return socket;
}

/** Call only after a REST call has created the session. */
export function connectToRoom(slug, invite, handlers) {
  const s = ensure();
  current = { slug, invite, handlers };
  if (s.connected) s.disconnect();
  s.connect();
}

/** Host answers a visitor's request to enter. */
export function answerKnock(allow, userId) {
  if (!current) return;
  socket.emit(allow ? "room:admit" : "room:deny", { slug: current.slug, userId });
}

/** Session changed (login/register): drop the connection and rejoin. */
export function reconnectSocket() {
  if (!socket || !current) return;
  socket.disconnect();
  socket.connect();
}

export function disconnectSocket() {
  current = null;
  if (socket?.connected) socket.emit("room:leave");
  socket?.disconnect();
}
