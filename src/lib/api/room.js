import { request } from "./http";

export const createRoom = () => request("/room", { method: "POST" });
export const getRoom = (id) => request(`/room/${encodeURIComponent(id)}`);
export const deleteRoom = (id) =>
  request(`/room/${encodeURIComponent(id)}`, { method: "DELETE" });
