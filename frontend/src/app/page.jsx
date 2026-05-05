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

const TEAM_ID = "c18c0a69-c2af-4759-9726-ea5037749a02";

function deriveStats(matches) {
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

export default function Dashboard() {
  const [matches, setMatches] = useState([]);
  const [seasonStats, setSeasonStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const match_data = await getMatches(TEAM_ID);
        setMatches(match_data);

        const season_data = await getSeasonStats(TEAM_ID);
        setSeasonStats(season_data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const { counts, winRate, winRateFooter } = deriveStats(matches);

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
