"use client";

import AppCard from '../../../../components/AppCard/AppCard.jsx'
import TimerCard from '../../../../components/TimerCard/TimerCard.jsx'
import Back from '../../../../components/BackButton/BackButton.jsx'
import Score from '../../../../components/Score/Score.jsx'
import Clock from '../../../../components/Clock/Clock.jsx'
import { useSearchParams, useParams } from "next/navigation";
import styles from "../page.module.css";

export default function Shot() {
  const searchParams = useSearchParams();
  const { token } = useParams();
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
                    icon={"/checkApp.svg"}
                    iconColor={"rgb(29, 158, 117)"}
                    iconAlt={"Skud på mål icon"}
                    body={"På mål"}
                    scores={[scoreUs, scoreOpp]}
                    route={`/invite/${token}/shot/shotTable`}
                />
                <AppCard 
                    icon={"/xApp.svg"}
                    iconColor={"rgb(232, 67, 12)"}
                    iconAlt={"Skud uden for mål icon"}
                    body={"Uden for mål"}
                    scores={[scoreUs, scoreOpp]}
                    route={`/invite/${token}/shot/shotTable`}
                />
            </div>
        </>
    )
}
