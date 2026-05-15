import { apiFetch } from "../lib/api.js";

export async function getMatches(teamId) {
  return apiFetch(`/teams/${teamId}/matches`);
}

export async function getMatch(matchId) {
  return apiFetch(`/matches/${matchId}`);
}

export async function getMatchStats(matchId) {
  return apiFetch(`/matches/${matchId}/stats`);
}

export async function createMatch(teamId, matchData) {
  return apiFetch(`/teams/${teamId}/matches`, {
    method: "POST",
    body: JSON.stringify(matchData),
  });
}

export async function upsertMatchStats(matchId, statsData) {
  return apiFetch(`/matches/${matchId}/stats`, {
    method: "POST",
    body: JSON.stringify(statsData),
  });
}
