"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "./playerSeasonGraph.module.css";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

export default function PlayerSeasonGraph({ matchStats, title }) {
  const labels = matchStats.map((m) =>
    new Date(m.matchDate).toLocaleDateString("da-DK")
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Mål",
        data: matchStats.map((m) => m.goals),
        borderColor: "rgb(75, 156, 120)",
        backgroundColor: "rgba(75, 156, 120, 0.1)",
        tension: 0.3,
      },
      {
        label: "Assists",
        data: matchStats.map((m) => m.assists),
        borderColor: "rgb(230, 170, 45)",
        backgroundColor: "rgba(230, 170, 45, 0.1)",
        tension: 0.3,
      },
      {
        label: "Skud",
        data: matchStats.map((m) => m.shots),
        borderColor: "rgb(52, 105, 190)",
        backgroundColor: "rgba(52, 105, 190, 0.1)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
  };

  return (
    <article className={styles.graphCard}>
      <p className={styles.graphTitle}>{title}</p>
      <Line data={chartData} options={options} />
    </article>
  );
}