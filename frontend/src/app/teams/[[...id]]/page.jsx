import Header from "../../../components/Header/Header.jsx";
import TeamCollection from "../../../components/Collections/TeamCollection.jsx";
import PlayerCollection from "../../../components/Collections/PlayerCollection.jsx";
import InputButton from "../../../components/InputPopUpButtons/InputNewPlayerButton.jsx";
import { redirect } from "next/navigation";

export default async function Teams({ params }) {
  const { id } = await params; //gets the id from the route

  //dynamic route uses optional catch-all so it is possible to do teams/[id]/{anything} which would add more values to id
  //this if statement ensures that can't happen by redirecting back to the /teams page in that case
  if (id && id[1] !== undefined) {
    //if route includes more than one additional path (e.g. teams/123/{anything})
    redirect(`/teams`);
  }
  let title, body;
  if (id === undefined) {
    //if id isn't specified in route (e.g. /teams/)
    title = "Teams overview";
    body = (
      <>
        <TeamCollection
          data={[
            {
              id: "5ab46e31-391c-46a7-8e45-db9ada07626d",
              uDivision: "U13",
              team: "Team 1",
              season: "2026/2027",
            },
          ]}
        />
      </>
    );
  } else {
    //if id is specified in route (e.g. /teams/123)
    title = "*insert team name here*";
    body = (
      <>
        <div style={{ width: "fit-content", margin: "20px auto 20px" }}>
          <InputButton />
        </div>
        <PlayerCollection
          data={[
            {
              id: "2",
              position: "Målvogter",
              firstName: "Carl",
              lastName: "Carlsen",
              //jerseyNumber: "50",
            },
          ]}
          team={`team ${id}`}
        />
      </>
    );
  }

  return (
      <>
        <title>{title}</title>
        <Header />
        <div className={"main-container"}>{body}</div>
      </>
  );
}