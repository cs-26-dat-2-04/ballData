import AppCard from '../../../../components/AppCard/AppCard.jsx'
import TimerCard from '../../../../components/TimerCard/TimerCard.jsx'
import Submit from '../../../../components/SubmitButton/SubmitButton.jsx'
import Back from '../../../../components/BackButton/BackButton.jsx'
import Score from '../../../../components/Score/Score.jsx'
import Clock from '../../../../components/Clock/Clock.jsx'
import styles from "../page.module.css";

export default function Foul() {
  let scoreUs = 14;
  let scoreOpp = 3;
  const foulType =[];

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
                    icon={"/cardApp.svg"}
                    iconAlt={"2 min suspension icon"}
                    body={"2-min udvisning"}
                    bdColor={"rgb(232, 67, 12)"}
                    mode={"select"}
                    onSelect={"Udvisning"}
                    foulType={foulType}
                />
                <AppCard 
                    icon={"/cardApp.svg"}
                    iconAlt={"Free throw icon"}
                    bdColor={"rgb(239, 159, 39)"}
                    body={"Frikast"}
                    mode={"select"}
                    onSelect={"Frikast"}
                    foulType={foulType}
                />
            </div>
            <div className={styles.containerRow}>
                <AppCard 
                    icon={"/cardApp.svg"}
                    iconAlt={"Penalty throw icon"}
                    bdColor={"rgb(232, 67, 12)"}
                    body={"Straffekast"}
                    mode={"select"}
                    onSelect={"Straffekast"}
                    foulType={foulType}
                />
            </div>
            <div className={styles.containerRow}>
                <Submit
                    body={"Submit"}
                    bdColor={"rgb(29, 158, 117)"}
                    foulType={foulType}
                    route={"/invite/token/foul/foulTable"}
                />
            </div>
        </>
    )
}
