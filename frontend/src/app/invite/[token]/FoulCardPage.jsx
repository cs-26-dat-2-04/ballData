"use client";

import AppCard from '../../../components/AppCard/AppCard.jsx'
import TimerCard from '../../../components/TimerCard/TimerCard.jsx'
import Submit from '../../../components/SubmitButton/SubmitButton.jsx'
import Back from '../../../components/BackButton/BackButton.jsx'
import Score from '../../../components/Score/Score.jsx'
import Clock from '../../../components/Clock/Clock.jsx'
import FoulAddOn from "./FoulAddOnPage.jsx";
import React, { useState } from "react";
import styles from "./page.module.css";

export default function FoulCardOnPage({ 
    scoreUs, 
    scoreOpp, 
    onClose, 
    closePrev, 
    foulType, 
    setFoulType,
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
                <Back 
                onClose={() => {
                    setFoulType([]);
                    onClose();
                }}/>
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
                    icon={"/cardApp.svg"}
                    iconAlt={"Rødt kort icon"}
                    body={"Rødt Kort"}
                    bdColor={"rgb(232, 67, 12)"}
                    mode={"select"}
                    onSelect={"RødtK"}
                    foulType={foulType}
                />
                <AppCard 
                    icon={"/cardApp.svg"}
                    iconAlt={"Gult kort icon"}
                    bdColor={"rgb(239, 159, 39)"}
                    body={"Gult Kort"}
                    mode={"select"}
                    onSelect={"GultK"}
                    foulType={foulType}
                />
            </div>
            <div className={styles.containerRow}>
                <AppCard 
                    icon={"/xcircleApp.svg"}
                    iconAlt={"Penalty throw icon"}
                    bdColor={"rgb(209, 209, 209)"}
                    body={"Ingen Kort"}
                    mode={"select"}
                    onSelect={"Ingenting"}
                    foulType={foulType}
                />
            </div>
            <div className={styles.containerRow}>
                <Submit
                    body={"Submit"}
                    bdColor={"rgb(29, 158, 117)"}
                    foulType={foulType}
                    onClick={() => { setActiveModal("foulAddOn")}}
                />
            </div>
            {activeModal === "foulAddOn" && (
                <div className={styles.modal}>
                    <FoulAddOn 
                    scoreUs={scoreUs} 
                    scoreOpp={scoreOpp} 
                    onClose={() => setActiveModal(null)} 
                    closePrev={closePrev}
                    foulType={foulType} 
                    setFoulType={setFoulType}
                    time={time}
                    startTime={startTime}
                    stopTime={stopTime}
                    mode={mode}
                    bdcolor={bdColor}
                    isRunning={isRunning}
                    playersIn={playersIn}
                    matchID={matchID}/>
                </div>
            )}
        </>
    )
}
