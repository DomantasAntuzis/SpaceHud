import { io } from "socket.io-client";
import { API_URL } from "$lib/config";

let socket = null;
let current = null; // { roomId, handlers }

function ensure() {
  if (socket) return socket;
  socket = io(API_URL, { withCredentials: true, autoConnect: false });
  socket.on("connect", () => {
    if (!current) return;
    const { roomId, handlers } = current;
    socket.emit("room:join", { roomId: Number(roomId) }, (ack) => {
      if (!ack?.ok) handlers.onJoinError?.(ack?.msg ?? "Failed to join room");
    });
  });
  socket.on("connect_error", (err) => current?.handlers.onConnectError?.(err));
  socket.on("room:members", (m) => current?.handlers.onMembers?.(m));
  socket.on("user:joined", (u) => current?.handlers.onJoined?.(u));
  socket.on("user:left", (u) => current?.handlers.onLeft?.(u));
  return socket;
}

/** Call only after a REST call has created the session. */
export function connectToRoom(roomId, handlers) {
  const s = ensure();
  current = { roomId, handlers };
  if (s.connected) s.disconnect();
  s.connect();
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
