import { request, ApiError } from "./http";

/** Returns { type, id, username } or null when not signed in. */
export async function me() {
  try {
    const { user } = await request("/auth/me");
    return { type: user.type, id: String(user.guestId ?? user.id), username: user.username };
  } catch (e) {
    if (e instanceof ApiError && e.status === 401) {
      return null;
    }
    throw e;
  }
}

export const register = (username, password) =>
  request("/auth/register", { method: "POST", body: { username, password } });
export const login = (username, password) =>
  request("/auth/login", { method: "POST", body: { username, password } });
export const logout = () => request("/auth/logout", { method: "POST" });
