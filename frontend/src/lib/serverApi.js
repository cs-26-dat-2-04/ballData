import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://backend:3001";

// Til server side funktioner
export async function serverApiFetch(path, options = {}) {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;
  let data;
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Cookie: `token=${token}` } : {}),
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
