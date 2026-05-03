import Header from "../../../components/Header/Header.jsx";
import MatchCollection from "../../../components/Collections/MatchCollection.jsx";
import PlayerCollection from "../../../components/Collections/PlayerCollection.jsx";
import { redirect } from "next/navigation";


export default async function Matches({ params }) {
  const { id } = await params; //gets the id from the route

  //dynamic route uses optional catch-all so it is possible to do teams/[id]/{anything} which would add more values to id
  //this if statement ensures that can't happen by redirecting back to the /teams page in that case
  if (id && id[1] !== undefined) {
    //if route includes more than one additional path (e.g. teams/123/{anything})
    redirect(`/matches`);
  }
  let title, body;
  if (id === undefined) {
    //if id isn't specified in route (e.g. /teams/)
    title = "Teams overview";
    body = (
      <>
        <MatchCollection
          data={[
            {
                id: "5ab46e31-391c-46a7-8e45-db9ada07626d",
                result: "win",
                iconAlt: "test",
                loc: "Hjemme",
                team: "Team 1",
                date: "2026-04-05",
                score: "28-24",
            },
            {
                id: "58aacbcd-2344-40f1-a9e9-11c70d44cbb4",
                result: "loss",
                iconAlt: "test",
                loc: "Ude",
                team: "Team 2",
                date: "2026-04-02",
                score: "22-25",
            },
            {
                id: "58aacbcd-2344-40f1-a9e9-11c70d44cbb3",
                result: "draw",
                iconAlt: "test",
                loc: "Ude",
                team: "Team 2",
                date: "2026-04-02",
                score: "22-25",
            },
            {
                id: "5ab46e31-391c-46a7-8e45-db9ada07626b",
                result: "draw",
                iconAlt: "test",
                loc: "Hjemme",
                team: "Team 1",
                date: "2026-10-05",
                score: "28-24",
            },
          ]}
        />
      </>
    );
  } else {
    //if id is specified in route (e.g. /teams/123)
    title = "*insert match info here*";
    body = (
      <>
        {/*add match page here*/}
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
