import Header from "../../../components/Header/Header.jsx";
import TeamCollection from "../../../components/Collections/TeamCollection.jsx";
import PlayerCollection from "../../../components/Collections/PlayerCollection.jsx";
import InputButton from "../../../components/InputPopUpButtons/InputNewPlayerButton.jsx";
import { redirect } from "next/navigation";

const MOCK_TEAMS = [
  {
    id: "5ab46e31-391c-46a7-8e45-db9ada07626d",
    uDivision: "U13",
    team: "Team 1",
    season: "2026/2027",
  },
];

const MOCK_PLAYERS = [
  {
    id: "2",
    position: "Målvogter",
    firstName: "Carl",
    lastName: "Carlsen",
    // jerseyNumber: "50",
  },
];

export default async function Teams({ params }) {
  const { id } = await params; //gets the id from the route

  //dynamic route uses optional catch-all so it is possible to do teams/[id]/{anything} which would add more values to id
  //this if statement ensures that can't happen by redirecting back to the /teams page in that case
  if (id?.[1] !== undefined) {
    //if route includes more than one additional path (e.g. teams/123/{anything})
    redirect(`/teams`);
  }

  const teamId = id?.[0];
  const isOverview = !teamId;

  const title = isOverview ? "Teams overview" : "Team details";

  return (
    <>
      <title>{title}</title>
      <Header />
      <div className="main-container">
        {isOverview ? (
          <TeamCollection data={MOCK_TEAMS} />
        ) : (
          <>
            <div style={{ width: "fit-content", margin: "20px auto" }}>
              <InputButton />
            </div>
            <PlayerCollection data={MOCK_PLAYERS} team={`team ${teamId}`} />
          </>
        )}
      </div>
    </>
  );
}
