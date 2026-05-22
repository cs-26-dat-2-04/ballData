import HomePage from "./HomePage";
import { getPlayers } from "../../../server-services/playerService.js";
import { getMe } from "../../../server-services/authService.js";

const API_BASE = process.env.API_URL ?? "http://backend:3001";

export default async function Page({ params }) {
  const { token } = await params;
  const { id } = await params;

  const res = await fetch(`${API_BASE}/invite/${token}`);
  const match = await res.json();
  const matchID = match.id;
  const scoreUS = match.score_home;
  const scoreOPP = match.score_away;
  const playerIn = match.in_players;

  if (!res.ok) return <p>Invalid or expired invite link</p>;

  let players = [];
  let error = null;

  try {
    const { coach } = await getMe();

    if (!coach.team) {
      redirect("/login");
    }
    const teamId = id ?? coach.team.id;

    players = await getPlayers(teamId);
  } catch (err) {
    error = err.message;
  }

  function setPlayerSub(players, playersIN) {
    let playersInArray = [];
    let temp = 0;
    for (let i = 0; i < playersIN.length; i++) {
      playersInArray[i] = playersIN[i].split("#").pop();
      temp = parseInt(playersInArray[i]);
      for (let j = 0; j < players.length; j++) {
        if (temp === players[j].jersey_number) {
          playersInArray[i] = players[j];
          players.splice(j, 1);
        }
      }
    }
    return playersInArray;
  }

  let playersIn = setPlayerSub(players, playerIn);

  return (
    <HomePage
      playersIN={playersIn}
      playersOUT={players}
      matchID={matchID}
      scoreUS={scoreUS}
      scoreOPP={scoreOPP}
    />
  );
}
