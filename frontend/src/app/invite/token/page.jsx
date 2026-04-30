"use client";

import AppCard from '../../../components/AppCard/AppCard.jsx';
import TimerCard from '../../../components/TimerCard/TimerCard.jsx';
import Score from '../../../components/Score/Score.jsx';
import Clock from '../../../components/Clock/Clock.jsx';
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";

export default function homePage() {
  let scoreUs = 0;
  let scoreOpp = 0;
  const searchParams = useSearchParams();

  if (searchParams.get("scoreUs") && searchParams.get("scoreOpp")){
    scoreUs = searchParams.get("scoreUs");
    scoreOpp = searchParams.get("scoreOpp");
  }


  return (
        <>
            <div className={styles.containerRow} style={{paddingTop: "20px"}}>
                    <Score
                        identifier={"Os"}
                        score={scoreUs}
                    />
                    <Clock 
                        icon={"/clockApp.jpg"}
                        iconAlt={"Clock icon"}
                        time={"17:53"}
                    />
                    <Score
                        identifier={"Modstandere"}
                        score={scoreOpp}
                    />
            </div>
            <div className={styles.containerRow}>
                <TimerCard
                    icon={"/playApp.svg"}
                    iconAlt={"Begin timer icon"}
                    bdColor={"rgb(209, 209, 209)"}
                />
            </div>
            <div className={styles.containerRow}>
                <AppCard 
                    icon={"/targetApp.svg"}
                    iconAlt={"Goal icon"}
                    body={"Mål"}
                    bdColor={"rgb(209, 209, 209)"}
                    scores={[scoreUs, scoreOpp]}
                    route={"/invite/token/goal"}
                />
                <AppCard 
                    icon={"/zapApp.svg"}
                    iconAlt={"Shot icon"}
                    bdColor={"rgb(209, 209, 209)"}
                    body={"Skud"}
                    route={"/invite/token/shot"}
                />
            </div>
            <div className={styles.containerRow}>
                <AppCard 
                    icon={"/xcircleApp.svg"}
                    iconAlt={"Foul icon"}
                    bdColor={"rgb(209, 209, 209)"}
                    body={"Forseelse"}
                    route={"/invite/token/foul"}
                />
                <AppCard 
                    icon={"/shieldApp.svg"}
                    iconAlt={"Save icon"}
                    bdColor={"rgb(209, 209, 209)"}
                    body={"Redning"}
                    route={"/invite/token/"}
                />
            </div>
            <div className={styles.containerRow}>
                <AppCard 
                    icon={"/usersApp.svg"}
                    iconAlt={"Substitution icon"}
                    bdColor={"rgb(209, 209, 209)"}
                    body={"Udskiftninger"}
                    route={"/invite/token/subs"}
                />
            </div>
        </>
    )
}
