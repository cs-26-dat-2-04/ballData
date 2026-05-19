import HomePage from "./HomePage";
import { getPlayers } from "../../../server-services/playerService.js";
import { getMe } from "../../../server-services/authService.js";

export default async function Page({ params }) {
  const { token } = await params;
  const { id } = await params;

  const res = await fetch(`http://backend:3001/invite/${token}`);
  const match = await res.json();
  const matchID = match.id;
  const scoreUS = match.score_home;
  const scoreOPP = match.score_away;

  console.log("Token:", token);
  console.log("Status:", res.status);

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

  return <HomePage 
    playersIN={players}
    playersOUT={players}
    matchID={matchID}
    scoreUS={scoreUS}
    scoreOPP={scoreOPP}
  />;
}