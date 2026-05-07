import { apiFetch } from "../lib/api.js";

export async function createPlayer(teamId, playerData) {
  return apiFetch(`/teams/${teamId}/players`, {
    method: "POST",
    body: JSON.stringify(playerData),
  });
}

export async function deletePlayer(playerId) {
  return apiFetch(`/players/${playerId}`, {
    method: "DELETE",
  });
}

export async function updatePlayer(playerId, playerData) {
  return apiFetch(`/players/${playerId}`, {
    method: "PATCH",
    body: JSON.stringify(playerData),
  });
}
