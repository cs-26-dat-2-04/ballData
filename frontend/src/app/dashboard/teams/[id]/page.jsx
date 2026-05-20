import TeamPageClient from "../../../../components/PageClient/TeamPageClient.jsx";
import { getPlayers } from "../../../../server-services/playerService.js";
import { getMe } from "../../../../server-services/authService.js";
import { redirect } from "next/navigation";

export default async function Teams({ params }) {
  const { id } = await params;

  let players = [];
  let error = null;
  let team;

  try {
    const { coach } = await getMe();

    if (!coach.team) {
      redirect("/login");
    }

    const teamId = id ?? coach.team.id;
    team = coach.team;

    players = await getPlayers(teamId);
  } catch (err) {
    error = err.message;
  }
  
  return (
    <>
      <title>Hold — Spillere</title>
      <div className="main-container">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <TeamPageClient players={players} team={team} />
      </div>
    </>
  );
}
