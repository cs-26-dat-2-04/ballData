import Header from "../../../components/Header/Header.jsx";
import TeamCollection from "../../../components/Collections/TeamCollection.jsx";
import PlayerCollection from "../../../components/Collections/PlayerCollection.jsx";
import InputButton from "../../../components/InputPopUpButtons/InputNewPlayerButton.jsx";
import { redirect } from "next/navigation";

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

  return (
    <>
      <title>Team details</title>
      <Header />
      <div className="main-container">
          <div style={{ width: "fit-content", margin: "20px auto" }}>
            <InputButton />
          </div>
          <PlayerCollection data={MOCK_PLAYERS} team={`team ${id}`} />
      </div>
    </>
  );
}
