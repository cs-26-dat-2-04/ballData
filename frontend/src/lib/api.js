const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

// Til client side funktioner
export async function apiFetch(path, options = {}) {
 let data;
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (res.status === 204) return null;

    data = await res.json();

    if (!res.ok) {
      const message = data?.error ?? data?.message ?? "Noget gik galt";
      throw new Error(message);
    }

  } catch (err) {
    console.log(err);
    throw err;
  }

  return data;
}
