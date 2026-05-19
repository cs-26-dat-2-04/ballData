import AppCard from './../../../components/AppCard/AppCard.jsx';
import TimerCard from './../../../components/TimerCard/TimerCard.jsx';
import Back from './../../../components/BackButton/BackButton.jsx';
import Score from './../../../components/Score/Score.jsx';
import Clock from './../../../components/Clock/Clock.jsx';
import GoalTable from "./GoalTablePage.jsx";
import GoalOppTable from "./GoalOppTablePage.jsx";
import React, { useState } from "react";
import styles from "./page.module.css";

export default function GoalPage({ 
    onClose, 
    closePrev, 
    scoreUs, 
    scoreOpp,
    setscoreUs,
    setscoreOpp,
    playersIn,
    matchID, 
    time, 
    startTime, 
    stopTime,
    mode,
    bdColor,
    isRunning }) {

  const [activeModal, setActiveModal] = useState(null);
  if (isRunning) {
    bdColor = "black";
    mode = "Pause";
  } else {
    bdColor = "rgb(209, 209, 209)"
    mode = "Start";
  }
  
  return (
        <>
            <div className={styles.containerBack}>
                <Back onClose={onClose}/>
            </div>
            <div className={styles.containerRow} style={{paddingTop: "20px"}}>
                    <Score
                        identifier={"Os"}
                        score={scoreUs}
                    />
                    <Clock 
                        icon={"/clockApp.jpg"}
                        iconAlt={"Clock icon"}
                        time={time}
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
                    bdColor={bdColor}
                    mode={mode}
                    startTime={startTime}
                    stopTime={stopTime}
                    isRunning={isRunning}
                />
            </div>
            <div className={styles.containerRow}>
                <AppCard 
                    icon={"/usersApp.svg"}
                    iconAlt={"Us icon"}
                    body={"Os"}
                    bdColor={"rgb(29, 158, 177)"}
                    onClick={() => setActiveModal("goalTable")} 
                />
                <AppCard 
                    icon={"/usersApp.svg"}
                    iconAlt={"Opponent icon"}
                    bdColor={"rgb(232, 67, 12)"}
                    body={"Modstandere"}
                    onClick={() => setActiveModal("goalOppTable")} 
                />
            </div>
            {activeModal === "goalTable" && (
                <div className={styles.modal}>
                    <GoalTable 
                    onClose={() => setActiveModal(null)} 
                    closePrev={closePrev} 
                    playersIn={playersIn}
                    matchID={matchID}
                    setscoreUs={setscoreUs}
                    scoreUs={scoreUs}
                    scoreOpp={scoreOpp}/>
                </div>
            )}
            {activeModal === "goalOppTable" && (
                <div className={styles.modal}>
                    <GoalOppTable 
                    onClose={() => setActiveModal(null)} 
                    closePrev={closePrev} 
                    matchID={matchID}
                    setscoreOpp={setscoreOpp}
                    scoreUs={scoreUs}
                    scoreOpp={scoreOpp}/>
                </div>
            )}
        </>
    )
}
