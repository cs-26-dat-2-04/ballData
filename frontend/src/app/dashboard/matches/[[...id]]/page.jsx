import MatchPageClient from "../../../../components/PageClient/MatchPageClient.jsx";
import { redirect } from "next/navigation";
import { getMe } from "../../../../server-services/authService.js";
import { getMatches } from "../../../../server-services/matchService.js";
import { getPlayers } from "../../../../server-services/playerService.js";

export default async function Matches({ params }) {
  const { id } = await params;

  if (id?.[1] !== undefined) {
    redirect("/matches");
  }
  
  const matchId = id?.[0];
  const isOverview = !matchId;
  const title = isOverview ? "Kampe" : "Kampdetaljer";

  let matches = [];
  let players = [];
  let error = null;

  let teamId;

  if (isOverview) {
    try {
      const { coach } = await getMe();
      teamId = coach.team.id;
      if (!coach.team) {
        redirect("/create-team");
      }

      matches = await getMatches(teamId);
      players = await getPlayers(teamId);
    } catch (err) {
      error = err.message;
    }
  }

  return (
    <>
      <title>{title}</title>
      <div className="main-container">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {isOverview ? (
          <>
            <MatchPageClient matches={matches} players={players} teamId={teamId} />
          </>
        ) : (
          // TODO: Erstat med rigtig
          <p>Kampdetaljer for ID: {matchId}</p>
        )}
      </div>
    </>
  );
}
