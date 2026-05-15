import { apiFetch } from "../lib/api.js";

export async function getSeasonStats(teamId) {
  return apiFetch(`/stats/season/${teamId}`);
}
