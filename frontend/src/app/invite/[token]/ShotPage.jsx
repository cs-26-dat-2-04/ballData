"use client";

import AppCard from "../../../components/AppCard/AppCard.jsx";
import TimerCard from "../../../components/TimerCard/TimerCard.jsx";
import Back from "../../../components/BackButton/BackButton.jsx";
import Score from "../../../components/Score/Score.jsx";
import Clock from "../../../components/Clock/Clock.jsx";
import ShotTable from "./ShotTablePage.jsx";
import React, { useState } from "react";
import styles from "./page.module.css";

export default function ShotPage({
  onClose,
  closePrev,
  playersIn,
  matchID,
  scoreUs,
  scoreOpp,
  time,
  startTime,
  stopTime,
  mode,
  bdColor,
  isRunning,
  sendJsonMessage,
}) {
  const [activeModal, setActiveModal] = useState(null);
  const [typeMessage, setTypeMessage] = useState("");

  if (isRunning) {
    bdColor = "black";
    mode = "Pause";
  } else {
    bdColor = "rgb(209, 209, 209)";
    mode = "Start";
  }

  return (
    <>
      <div className={styles.containerBack}>
        <Back onClose={onClose} />
      </div>
      <div className={styles.containerRow} style={{ paddingTop: "20px" }}>
        <Score identifier={"Os"} score={scoreUs} />
        <Clock icon={"/clockApp.jpg"} iconAlt={"Clock icon"} time={time} />
        <Score identifier={"Modstandere"} score={scoreOpp} />
      </div>
      <div className={styles.containerRow}>
        <TimerCard
          style={{ borderColor: "red" }}
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
          icon={"/checkApp.svg"}
          iconColor={"rgb(29, 158, 117)"}
          iconAlt={"Skud på mål icon"}
          onClick={() => {
            setActiveModal("shotTable");
            setTypeMessage("playerShotOn");
          }}
          body={"På mål"}
        />
        <AppCard
          icon={"/xApp.svg"}
          iconColor={"rgb(232, 67, 12)"}
          iconAlt={"Skud uden for mål icon"}
          onClick={() => {
            setActiveModal("shotTable");
            setTypeMessage("playerShotOff");
          }}
          body={"Uden for mål"}
        />
      </div>
      {activeModal === "shotTable" && (
        <div className={styles.modal}>
          <ShotTable
            onClose={() => setActiveModal(null)}
            closePrev={closePrev}
            playersIn={playersIn}
            matchID={matchID}
            message={typeMessage}
            sendJsonMessage={sendJsonMessage}
          />
        </div>
      )}
    </>
  );
}
