import { serverApiFetch } from "../lib/serverApi.js";

export async function getPlayers(teamId) {
  return serverApiFetch(`/teams/${teamId}/players`);
}

export async function getPlayer(playerId) {
  return serverApiFetch(`/players/${playerId}`);
}

export async function getPlayerStats(playerId) {
  return serverApiFetch(`/players/${playerId}/stats`);
}