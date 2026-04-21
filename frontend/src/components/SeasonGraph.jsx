'use client';  // ← must be the first line

import styles from "../components/styles.module.css";
import {Bar} from 'react-chartjs-2';

import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export default function SeasonGraph({labels, data, bgcolor, bdcolor, title}) {

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
                    hoverBackgroundColor: bgcolor
                }
            ]
        };

    const chartOptions = {
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false,
                },
            maintainAspectRatio: false,
            responsive: true,
            }
    }

    return(
        <>
        <article className={styles.graphCard}>
                <p className={styles.graphTitle}>{title ?? "-"}</p>
                <Bar className={styles.graph} data={chartData} options={chartOptions}/>
        </article>
        </>
    )
}