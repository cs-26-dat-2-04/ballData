import Header from "../../../components/Header/Header.jsx";
import MatchCollection from "../../../components/Collections/MatchCollection.jsx";
import { redirect } from "next/navigation";
import { getMe } from "../../../server-services/authService.js";
import { getMatches } from "../../../server-services/matchService.js";

export default async function Matches({ params }) {
  const { id } = await params;

  // Dynamic route uses optional catch-all — redirect if more than one segment
  if (id?.[1] !== undefined) {
    redirect("/matches");
  }

  const matchId = id?.[0];
  const isOverview = !matchId;
  const title = isOverview ? "Kampe" : "Kampdetaljer";

  // Fetch team and matches server-side
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
      <Header />
      <div className="main-container">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {isOverview ? (
          <MatchCollection data={matches} />
        ) : (
          // TODO: Replace with real match detail component
          <p>Kampdetaljer for ID: {matchId}</p>
        )}
      </div>
    </>
  );
}
