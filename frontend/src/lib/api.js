const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export async function apiFetch(path, options) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
