import { apiFetch } from "../lib/api";

// Til at få coach info
export async function getMe() {
  return apiFetch("/auth/me");
}
