"use client";

import AppCard from '../../../../components/AppCard/AppCard.jsx';
import TimerCard from '../../../../components/TimerCard/TimerCard.jsx';
import Back from '../../../../components/BackButton/BackButton.jsx';
import Score from '../../../../components/Score/Score.jsx';
import Clock from '../../../../components/Clock/Clock.jsx';
import { useSearchParams } from "next/navigation";
import styles from "../page.module.css";

export default function Goal() {
  const searchParams = useSearchParams();
  let scoreUs = searchParams.get("scoreUs");
  let scoreOpp = searchParams.get("scoreOpp");

  return (
        <>
            <div className={styles.containerBack}>
                <Back/>
            </div>
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
                <TimerCard style={{ borderColor: 'red' }}
                    icon={"/playApp.svg"}
                    iconAlt={"Begin timer icon"}
                    bdColor={"rgb(209, 209, 209)"}
                />
            </div>
            <div className={styles.containerRow}>
                <AppCard 
                    icon={"/usersApp.svg"}
                    iconAlt={"Us icon"}
                    body={"Os"}
                    bdColor={"rgb(29, 158, 177)"}
                    scores={[scoreUs, scoreOpp]}
                    route={"/invite/token/goal/goalTable"}
                />
                <AppCard 
                    icon={"/usersApp.svg"}
                    iconAlt={"Opponent icon"}
                    bdColor={"rgb(232, 67, 12)"}
                    body={"Modstandere"}
                    scores={[scoreUs, parseInt(scoreOpp)+1]}
                    route={"/invite/token"}
                />
            </div>
        </>
    )
}
