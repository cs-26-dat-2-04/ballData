import { serverApiFetch } from "../lib/serverApi.js";

export async function getMatches(teamId) {
  return serverApiFetch(`/teams/${teamId}/matches`);
}

export async function getMatch(matchId) {
  return serverApiFetch(`/matches/${matchId}`);
}

export async function getMatchStats(matchId) {
  return serverApiFetch(`/matches/${matchId}/stats`);
}
