"use client";

import { useEffect, useState } from "react";
import StatCard from "../components/StatCard/StatCard.jsx";
import BarChart from "../components/SeasonGraph/SeasonGraph.jsx";
import StatsCollection from "../components/SeasonStats/StatsCollection.jsx";
import Matches from "../components/Collections/MatchCollection.jsx";
import Header from "../components/Header/Header.jsx";
import DashboardStyles from "../app/app.module.css";
import { getMatches } from "../services/matchService";
import { getSeasonStats } from "../services/statsService.js";
import { getTeam } from "../services/teamService.js";

const TEAM_ID = "0503a14a-a2d5-4af6-9d59-a4ceb442d09c";

function deriveMatchStats(matches) {
  const counts = { win: 0, loss: 0, draw: 0 };

  for (const match of matches) {
    if (match.result === "win") counts.win++;
    else if (match.result === "loss") counts.loss++;
    else if (match.result === "draw") counts.draw++;
  }

  const total = counts.win + counts.loss + counts.draw;
  const winRate = total > 0 ? ((counts.win / total) * 100).toFixed(1) : "0.0";
  const winRateFooter = `${counts.win}V - ${counts.loss}T - ${counts.draw}U`;

  return { counts, winRate, winRateFooter };
}

function deriveSeasonStats(seasonData, totalMatches) {
  const shotPrecision =
    seasonData.goals > 0
      ? ((seasonData.shotsOnGoal / seasonData.goals) * 100).toFixed(1)
      : "0.0";

  const shotPrecisionFooter = `Gns. ${totalMatches > 0 ? seasonData.goals / totalMatches : 0.0} skud på mål pr. kamp`;

  const goalKeeperSavePercent = seasonData.savePercentage;

  return { shotPrecision, shotPrecisionFooter, goalKeeperSavePercent };
}

export default function Dashboard() {
  const [matches, setMatches] = useState([]);
  const [seasonStats, setSeasonStats] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const match_data = await getMatches(TEAM_ID);
        setMatches(match_data);

        const season_data = await getSeasonStats(TEAM_ID);
        setSeasonStats(season_data);

        const team_data = await getTeam(TEAM_ID);
        setTeamData(team_data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const { counts, winRate, winRateFooter } = deriveMatchStats(matches);
  const { shotPrecision, shotPrecisionFooter, goalKeeperSavePercent } =
    deriveSeasonStats(seasonStats, matches.length);

  return (
    <>
      <title>Dashboard</title>
      <Header />
      <div className="main-container">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className={DashboardStyles.statCardsContainer}>
          <StatCard
            title={"Sejrsrate"}
            body={loading ? "-" : `${winRate}%`}
            footer={loading ? "-" : winRateFooter}
            iconColor={"#D0F0E6"}
            icon={"/trophy.svg"}
            iconAlt={"Win rate icon"}
          />
          <StatCard
            title={"Skudpræcision"}
            body={loading ? "-" : `${shotPrecision}%`}
            footer={loading ? "-" : `${shotPrecisionFooter}`}
            iconColor={"#EAF1FB"}
            icon={"/target.svg"}
            iconAlt={"Win rate icon"}
          />
          <StatCard
            title={"Målmandsrednings\u{000AD}procent"} //\u{000AD} is a soft hyphen that suggests where to hyphenate the word if it is too long for the textbox
            body={loading ? "-" : `${goalKeeperSavePercent}%`}
            footer={"Gns. 19.0 redninger pr. kamp"}
            iconColor={"#FEF3DA"}
            icon={"/shield.svg"}
            iconAlt={"Win rate icon"}
          />
          <StatCard
            title={"Aktive spillere"}
            body={loading ? "-" : `${teamData.players?.length ?? 0}`}
            footer={
              loading
                ? "-"
                : `${teamData.players?.length ?? 0} spillere på holdet`
            }
            iconColor={"#F3E8FF"}
            icon={"/active-players.svg"}
            iconAlt={"Win rate icon"}
          />
        </div>
        <div className={DashboardStyles.matchCollectionStatisticsContainer}>
          <Matches data={loading ? [] : matches}></Matches>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <BarChart
              labels={["Sejre", "Nederlag", "Uafgjort"]}
              data={
                loading ? [0, 0, 0] : [counts.win, counts.loss, counts.draw]
              }
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
            <StatsCollection stats={loading ? [] : seasonStats} />
          </div>
        </div>
      </div>
    </>
  );
}
