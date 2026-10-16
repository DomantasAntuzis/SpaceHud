import { request } from "./http";

export const createRoom = () => request("/room", { method: "POST" });
export const getRoom = (slug, invite) => {
  const query = invite ? `?invite=${encodeURIComponent(invite)}` : "";
  return request(`/room/${encodeURIComponent(slug)}${query}`);
};
export const deleteRoom = (slug) =>
  request(`/room/${encodeURIComponent(slug)}`, { method: "DELETE" });
