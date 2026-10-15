import { API_URL } from "$lib/config";

export class ApiError extends Error {
  constructor(status, msg) {
    super(msg);
    this.status = status;
  }
}

export async function request(path, { method = "GET", body } = {}) {
  let res;
  try {
    res = await fetch(API_URL + path, {
      method,
      credentials: "include",
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, "Can't reach the server");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, data.msg ?? "Something went wrong");
  return data;
}
