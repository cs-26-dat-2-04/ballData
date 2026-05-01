import StatCard from "../components/StatCard/StatCard.jsx";
import BarChart from "../components/SeasonGraph/SeasonGraph.jsx";
import Matches from "../components/Collections/MatchCollection.jsx";
import Header from "../components/Header/Header.jsx";
import DashboardStyles from "../app/app.module.css"


let match_res = [
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
];

export default function Dashboard() {
  return (
    <html
      lang="en"
      className="__variable_188709 __variable_9a8899 h-full antialiased"
    >
      <head>
        <title>Coach Dashboard</title>
      </head>
      <body className="min-h-full flex flex-col vc-init">
        <Header/>
        <div className="main-container">
          <div className={DashboardStyles.statCardsContainer}>
            <StatCard
              title={"Sejrsrate"}
              body={"64.3%"}
              footer={"18V - 7T - 3U"}
              iconColor={"#D0F0E6"}
              icon={"/trophy.svg"}
              iconAlt={"Win rate icon"}
            />
            <StatCard
              title={"Skudpræcision"}
              body={"75.7%"}
              footer={"Gns. 40.5 skud på mål pr. kamp"}
              iconColor={"#EAF1FB"}
              icon={"/target.svg"}
              iconAlt={"Win rate icon"}
            />
            <StatCard
              title={"Målmandsrednings\u{000AD}procent"} //\u{000AD} is a soft hyphen that suggests where to hyphenate the word if it is too long for the textbox
              body={"28.1%"}
              footer={"Gns. 19.0 redninger pr. kamp"}
              iconColor={"#FEF3DA"}
              icon={"/shield.svg"}
              iconAlt={"Win rate icon"}
            />
            <StatCard
              title={"Aktive spillere"}
              body={"18"}
              footer={"2 nye denne sæson"}
              iconColor={"#F3E8FF"}
              icon={"/active-players.svg"}
              iconAlt={"Win rate icon"}
            />
          </div>
          <div className={DashboardStyles.matchCollectionStatisticsContainer}>
            <Matches data={match_res}></Matches>
            <BarChart
              labels={["Sejre", "Nederlag", "Uafgjort"]}
              data={[18, 7, 3]}
              bdcolor={[
                "rgb(75, 156, 120)",
                "rgb(209, 86, 80)",
                "rgb(155, 160, 172)",
              ]}
              bgcolor={[
                "rgb(75, 156, 120, 1)",
                "rgb(209, 86, 80, 1)",
                "rgb(155, 160, 172, 1)",
              ]}
              title={"Sæsonresultat"}
            />
          </div>
        </div>
      </body>
    </html>
  );
}