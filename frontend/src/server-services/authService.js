import { serverApiFetch } from "../lib/serverApi.js";

export async function getMe() {
  return serverApiFetch("/auth/me");
}
