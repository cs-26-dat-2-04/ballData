"use client";

import AppCard from "../../../components/AppCard/AppCard.jsx";
import TimerCard from "../../../components/TimerCard/TimerCard.jsx";
import Submit from "../../../components/SubmitButton/SubmitButton.jsx";
import Back from "../../../components/BackButton/BackButton.jsx";
import Score from "../../../components/Score/Score.jsx";
import Clock from "../../../components/Clock/Clock.jsx";
import FoulTable from "./FoulTablePage.jsx";
import React, { useState } from "react";
import styles from "./page.module.css";

export default function FoulAddOnPage({
  scoreUs,
  scoreOpp,
  onClose,
  closePrev,
  setFoulType,
  foulType,
  matchID,
  playersIn,
  time,
  startTime,
  stopTime,
  mode,
  bdColor,
  isRunning,
  sendJsonMessage,
}) {
  const [activeModal, setActiveModal] = useState(null);

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
        <Back
          onClose={() => {
            setFoulType(
              foulType.filter(
                (item) =>
                  !["Udvisning", "Frikast", "Straffekast"].includes(item),
              ),
            );
            onClose();
          }}
        />
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
          onClick={() => {
            setActiveModal("foulTable");
          }}
          page={true}
        />
      </div>
      {activeModal === "foulTable" && (
        <div className={styles.modal}>
          <FoulTable
            onClose={() => setActiveModal(null)}
            closePrev={closePrev}
            playersIn={playersIn}
            setFoulType={setFoulType}
            foulType={foulType}
            matchID={matchID}
            sendJsonMessage={sendJsonMessage}
          />
        </div>
      )}
    </>
  );
}
