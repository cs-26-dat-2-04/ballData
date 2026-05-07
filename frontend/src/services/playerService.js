import { apiFetch } from "../lib/api.js";

const dummyPlayers = [
  { id: "1",  team_id: "team-1", first_name: "Carl",     last_name: "Carlsen",     position: "Målvogter",    jersey_number: 1  },
  { id: "2",  team_id: "team-1", first_name: "Mikkel",   last_name: "Hansen",      position: "Højre Back",   jersey_number: 4  },
  { id: "3",  team_id: "team-1", first_name: "Jonas",    last_name: "Pedersen",    position: "Venstre Back", jersey_number: 7  },
  { id: "4",  team_id: "team-1", first_name: "Rasmus",   last_name: "Nielsen",     position: "Playmaker",    jersey_number: 13 },
  { id: "5",  team_id: "team-1", first_name: "Thomas",   last_name: "Andersen",    position: "Streg",        jersey_number: 21 },
  { id: "6",  team_id: "team-1", first_name: "Søren",    last_name: "Kristensen",  position: "Højre Fløj",   jersey_number: 17 },
  { id: "7",  team_id: "team-1", first_name: "Emil",     last_name: "Larsen",      position: "Venstre Fløj", jersey_number: null },
  { id: "8",  team_id: "team-1", first_name: "Oliver",   last_name: "Jørgensen",   position: "Playmaker",    jersey_number: 9  },
  { id: "9",  team_id: "team-1", first_name: "Magnus",   last_name: "Christensen", position: "Streg",        jersey_number: 33 },
  { id: "10", team_id: "team-1", first_name: "Frederik", last_name: "Møller",      position: "Målvogter",    jersey_number: 16 },
];

const dummyMatchStats = {
  "1": [ // Carl Carlsen — Målvogter
    { match_id: "m1", opponent: "Skanderborg Håndbold", match_date: "2024-03-01", score_home: 28, score_away: 24, goals: 0, assists: 0, shots: 0, saves: 11, suspension: 0, red_cards: 0, minutes_played: 60 },
    { match_id: "m2", opponent: "TTH Holstebro",        match_date: "2024-03-08", score_home: 22, score_away: 25, goals: 0, assists: 0, shots: 0, saves: 8,  suspension: 0, red_cards: 0, minutes_played: 60 },
    { match_id: "m3", opponent: "Lemvig-Thyborøn HK",   match_date: "2024-03-15", score_home: 31, score_away: 29, goals: 0, assists: 0, shots: 0, saves: 14, suspension: 0, red_cards: 0, minutes_played: 60 },
  ],
  "2": [ // Mikkel Hansen — Højre Back
    { match_id: "m1", opponent: "Skanderborg Håndbold", match_date: "2024-03-01", score_home: 28, score_away: 24, goals: 5, assists: 3, shots: 9,  saves: 0, suspension: 0, red_cards: 0, minutes_played: 55 },
    { match_id: "m2", opponent: "TTH Holstebro",        match_date: "2024-03-08", score_home: 22, score_away: 25, goals: 3, assists: 1, shots: 7,  saves: 0, suspension: 2, red_cards: 0, minutes_played: 58 },
    { match_id: "m3", opponent: "Lemvig-Thyborøn HK",   match_date: "2024-03-15", score_home: 31, score_away: 29, goals: 6, assists: 2, shots: 11, saves: 0, suspension: 0, red_cards: 0, minutes_played: 60 },
  ],
  "4": [ // Rasmus Nielsen — Playmaker
    { match_id: "m1", opponent: "Skanderborg Håndbold", match_date: "2024-03-01", score_home: 28, score_away: 24, goals: 4, assists: 5, shots: 7,  saves: 0, suspension: 0, red_cards: 0, minutes_played: 60 },
    { match_id: "m2", opponent: "TTH Holstebro",        match_date: "2024-03-08", score_home: 22, score_away: 25, goals: 2, assists: 4, shots: 5,  saves: 0, suspension: 0, red_cards: 0, minutes_played: 60 },
    { match_id: "m3", opponent: "Lemvig-Thyborøn HK",   match_date: "2024-03-15", score_home: 31, score_away: 29, goals: 7, assists: 3, shots: 10, saves: 0, suspension: 2, red_cards: 0, minutes_played: 58 },
  ],
};

const dummyCoachNotes = {
  "1": [
    { id: "n1", coach_id: "coach-1", player_id: "1", content: "God til at læse spillet. Skal blive bedre til at kommunikere med forsvaret.", created_at: "2024-03-10T10:00:00Z" },
  ],
  "2": [
    { id: "n1", coach_id: "coach-1", player_id: "2", content:  "Godt skud fra distancen. Skal arbejde på at reducere udvisninger.", created_at: "2024-03-12T10:00:00Z" },
    { id: "n2", coach_id: "coach-1", player_id: "2", content: "God præstation mod Lemvig.", created_at: "2024-03-16T10:00:00Z" },
  ],
  "4": [],
};

export async function getPlayerMatchStats(playerId) {
  //return apiFetch(`/players/${playerId}/match-stats`);
  return dummyMatchStats[String(playerId)] ?? [];
}
 
export async function getPlayerCoachNotes(playerId) {
  // return apiFetch(`/players/${playerId}/notes`);
  return dummyCoachNotes[String(playerId)] ?? [];
}