import { apiFetch } from "../lib/api.js";

export async function getTeam(teamId) {
  return apiFetch(`/teams/${teamId}`);
}

export async function createTeam(teamData) {
  return apiFetch("/teams", {
    method: "POST",
    body: JSON.stringify(teamData),
  });
}
