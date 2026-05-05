import Header from "../../../components/Header/Header.jsx";
import TeamPageClient from "../../../components/TeamPageClient/TeamPageClient.jsx";

const MOCK_PLAYERS = [
  {
    id: "1",
    position: "Målvogter",
    firstName: "Carl",
    lastName: "Carlsen",
    jerseyNumber: "1",
  },
  {
    id: "2",
    position: "Højre back",
    firstName: "Mikkel",
    lastName: "Hansen",
    jerseyNumber: "4",
  },
  {
    id: "3",
    position: "Venstre back",
    firstName: "Jonas",
    lastName: "Pedersen",
    jerseyNumber: "7",
  },
  {
    id: "4",
    position: "Playmaker",
    firstName: "Rasmus",
    lastName: "Nielsen",
    jerseyNumber: "13",
  },
  {
    id: "5",
    position: "Streg",
    firstName: "Thomas",
    lastName: "Andersen",
    jerseyNumber: "21",
  },
  {
    id: "6",
    position: "Højre fløj",
    firstName: "Søren",
    lastName: "Kristensen",
    jerseyNumber: "17",
  },
  {
    id: "7",
    position: "Venstre fløj",
    firstName: "Emil",
    lastName: "Larsen",
  },
  {
    id: "8",
    position: "Playmaker",
    firstName: "Oliver",
    lastName: "Jørgensen",
    jerseyNumber: "9",
  },
  {
    id: "9",
    position: "Streg",
    firstName: "Magnus",
    lastName: "Christensen",
    jerseyNumber: "33",
  },
  {
    id: "10",
    position: "Målvogter",
    firstName: "Frederik",
    lastName: "Møller",
    jerseyNumber: "16",
  },
];

export default async function Teams({ params }) {
  const { id } = await params;

  return (
    <>
      <title>Team {id} — Spillere</title>
      <Header />
      <div className="main-container">
        <TeamPageClient players={MOCK_PLAYERS} teamId={id} />
      </div>
    </>
  );
}
