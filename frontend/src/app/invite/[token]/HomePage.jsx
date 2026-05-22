"use client";

import Goal from "./GoalPage.jsx";
import Shot from "./ShotPage.jsx";
import FoulCard from "./FoulCardPage.jsx";
import Subs from "./SubsPage.jsx";
import SaveTable from "./SaveTablePage.jsx";
import Agreement from "./AgreementPopup.jsx";

import AppCard from "../../../components/AppCard/AppCard.jsx";
import TimerCard from "../../../components/TimerCard/TimerCard.jsx";
import Score from "../../../components/Score/Score.jsx";
import Clock from "../../../components/Clock/Clock.jsx";
import SubmitGame from "../../../components/SubmitGameButton/SubmitGameButton.jsx";

import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";
import styles from "./page.module.css";

export default function HomePage({
  playersIN,
  playersOUT,
  matchID,
  scoreUS,
  scoreOPP,
}) {
  const router = useRouter();
  const WS_URL = "ws://localhost:3002";

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    shouldReconnect: () => true,
  });

  const [foulType, setFoulType] = useState([]);

  const [activeModal, setActiveModal] = useState(null);
  const [mode, setMode] = useState("Start");
  const [bdColor, setbdColor] = useState(null);

  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setelapsedTime] = useState(0);

  const IntervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (!lastJsonMessage) return;
    console.log(lastJsonMessage.event);
    switch (lastJsonMessage.event) {
      case "playerSubs":
        router.refresh();
        break;
      case "goal":
        router.refresh();
        break;
      case "alert":
        alert("Bemærk: Du har indtastet data på en spiller med rødt kort.");
        break;
      case "submitSuccess":
        alert(`Kampen er afsluttet`);
        break;
      case "submitBlocked":
        alert(`Du kan ikke indtaste mere data: Kampen er allerede afsluttet`);
        break;
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    if (isRunning) {
      IntervalIdRef.current = setInterval(() => {
        setelapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(IntervalIdRef.current);
    };
  }, [isRunning]);

  function start() {
    setMode("Pause");
    setbdColor("black");
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setMode("Start");
    setbdColor("rgb(209, 209, 209)");
    setIsRunning(false);
  }

  function formatTime() {
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return (
    <>
      <div className={styles.containerRow} style={{ paddingTop: "20px" }}>
        <Score identifier={"Os"} score={scoreUS} />
        <Clock
          icon={"/clockApp.jpg"}
          iconAlt={"Clock icon"}
          time={formatTime()}
        />
        <Score identifier={"Modstandere"} score={scoreOPP} />
      </div>

      <div className={styles.containerRow}>
        <TimerCard
          icon={"/playApp.svg"}
          iconAlt={"Begin timer icon"}
          bdColor={bdColor}
          startTime={start}
          stopTime={stop}
          isRunning={isRunning}
          mode={mode}
        />
      </div>

      <div className={styles.containerRow}>
        <AppCard
          icon={"/targetApp.svg"}
          iconAlt={"Goal icon"}
          body={"Mål"}
          bdColor={"rgb(209, 209, 209)"}
          onClick={() => setActiveModal("goal")}
        />
        <AppCard
          icon={"/zapApp.svg"}
          iconAlt={"Shot icon"}
          bdColor={"rgb(209, 209, 209)"}
          body={"Skud"}
          onClick={() => setActiveModal("shot")}
        />
      </div>

      <div className={styles.containerRow}>
        <AppCard
          icon={"/xcircleApp.svg"}
          iconAlt={"Foul icon"}
          bdColor={"rgb(209, 209, 209)"}
          body={"Forseelse"}
          onClick={() => setActiveModal("foul")}
        />
        <AppCard
          icon={"/shieldApp.svg"}
          iconAlt={"Save icon"}
          bdColor={"rgb(209, 209, 209)"}
          body={"Redning"}
          onClick={() => setActiveModal("save")}
        />
      </div>

      <div className={styles.containerRow}>
        <AppCard
          icon={"/usersApp.svg"}
          iconAlt={"Substitution icon"}
          bdColor={"rgb(209, 209, 209)"}
          body={"Udskiftninger"}
          onClick={() => setActiveModal("subs")}
        />
      </div>
      <div className={styles.containerRow}>
        <SubmitGame
          body={"Submit Game"}
          bdColor={"rgb(29, 158, 117)"}
          onClick={() => setActiveModal("agreement")}
        />
      </div>

      {activeModal === "goal" && (
        <div className={styles.modal}>
          <Goal
            scoreUs={scoreUS}
            scoreOpp={scoreOPP}
            onClose={() => setActiveModal(null)}
            closePrev={() => setActiveModal(null)}
            time={formatTime()}
            startTime={start}
            stopTime={stop}
            mode={mode}
            bdcolor={bdColor}
            isRunning={isRunning}
            playersIn={playersIN}
            matchID={matchID}
            sendJsonMessage={sendJsonMessage}
          />
        </div>
      )}

      {activeModal === "shot" && (
        <div className={styles.modal}>
          <Shot
            scoreUs={scoreUS}
            scoreOpp={scoreOPP}
            onClose={() => setActiveModal(null)}
            closePrev={() => setActiveModal(null)}
            time={formatTime()}
            startTime={start}
            stopTime={stop}
            mode={mode}
            bdcolor={bdColor}
            isRunning={isRunning}
            playersIn={playersIN}
            matchID={matchID}
            sendJsonMessage={sendJsonMessage}
          />
        </div>
      )}

      {activeModal === "foul" && (
        <div className={styles.modal}>
          <FoulCard
            scoreUs={scoreUS}
            scoreOpp={scoreOPP}
            onClose={() => {
              setFoulType([]);
              setActiveModal(null);
            }}
            closePrev={() => {
              setFoulType([]);
              setActiveModal(null);
            }}
            foulType={foulType}
            setFoulType={setFoulType}
            time={formatTime()}
            startTime={start}
            stopTime={stop}
            mode={mode}
            bdcolor={bdColor}
            isRunning={isRunning}
            playersIn={playersIN}
            matchID={matchID}
            sendJsonMessage={sendJsonMessage}
          />
        </div>
      )}

      {activeModal === "subs" && (
        <div className={styles.modal}>
          <Subs
            onClose={() => setActiveModal(null)}
            closePrev={() => setActiveModal(null)}
            playersIn={playersIN}
            playersOut={playersOUT}
            matchID={matchID}
            sendJsonMessage={sendJsonMessage}
          />
        </div>
      )}

      {activeModal === "save" && (
        <div className={styles.modal}>
          <SaveTable
            onClose={() => setActiveModal(null)}
            playersIn={playersIN}
            matchID={matchID}
            sendJsonMessage={sendJsonMessage}
          />
        </div>
      )}

      {activeModal === "agreement" && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <Agreement
              onClose={() => setActiveModal(null)}
              matchID={matchID}
              time={formatTime()}
              sendJsonMessage={sendJsonMessage}
            />
          </div>
        </div>
      )}
    </>
  );
}
