import TeamPageClient from "../../../../components/PageClient/MatchPageClient.jsx";
import { redirect } from "next/navigation";
import { getMe } from "../../../../server-services/authService.js";
import { getMatches } from "../../../../server-services/matchService.js";

export default async function Matches({ params }) {
  const { id } = await params;

  if (id?.[1] !== undefined) {
    redirect("/matches");
  }
  
  const matchId = id?.[0];
  const isOverview = !matchId;
  const title = isOverview ? "Kampe" : "Kampdetaljer";

  let matches = [];
  let error = null;

  if (isOverview) {
    try {
      const { coach } = await getMe();

      if (!coach.team) {
        redirect("/create-team");
      }

      matches = await getMatches(coach.team.id);
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
            <TeamPageClient matches={matches} teamId={id} />
          </>
        ) : (
          // TODO: Erstat med rigtig
          <p>Kampdetaljer for ID: {matchId}</p>
        )}
      </div>
    </>
  );
}
