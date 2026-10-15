import { me } from "$lib/api/auth";

export const user = $state({ current: null, ready: false });

export async function refreshUser() {
  try {
    user.current = await me();
  } catch {
    user.current = null;
  }
  user.ready = true;
  return user.current;
}

export function clearUser() {
  user.current = null;
}
