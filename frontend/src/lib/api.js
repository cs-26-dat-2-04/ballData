const API_URL = "http://localhost:3001";

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (res.status === 204) return null;

  const data = await res.json();

  if (!res.ok) {
    const message = data?.error ?? data?.message ?? "Noget gik galt";
    throw new Error(message);
  }

  return data;
}
