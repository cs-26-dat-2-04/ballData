"use client"; // ← must be the first line

import styles from "../SeasonGraph/seasonGraph.module.css";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function SeasonGraph({ labels, data, bgcolor, bdcolor, title }) {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        borderColor: bdcolor,
        backgroundColor: bgcolor,
        borderWidth: 1,
        borderRadius: 10,
        barThickness: 68,
        hoverBackgroundColor: bgcolor,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      maintainAspectRatio: true,
      responsive: true,
    },
  };

  return (
    <>
      <article className={styles.graphCard}>
        <p className={styles.graphTitle}>{title ?? "-"}</p>
        <div
          style={{ height: "60%", display: "flex", justifyContent: "center" }}
        >
          <Bar
            style={{ float: "center" }}
            data={chartData}
            width={100}
            height={100}
            options={chartOptions}
          />
        </div>
        <div className={styles.graphNumbersContainer}>
          <a style={{ color: "#1D9E75" }}>{data[0]}</a>
          <a style={{ color: "#E24B4A" }}>{data[1]}</a>
          <a style={{ color: "#9AA0AD" }}>{data[2]}</a>
        </div>
        <div className={styles.graphDescriptorsContainer}>
          <a>Sejre</a>
          <a>Nederlag</a>
          <a>Uafgjort</a>
        </div>
      </article>
    </>
  );
}
