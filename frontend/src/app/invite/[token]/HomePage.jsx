"use client";

import Goal from "./GoalPage.jsx";
import Shot from "./ShotPage.jsx";
import FoulCard from "./FoulCardPage.jsx";
import Subs from "./SubsPage.jsx";
import SaveTable from "./SaveTablePage.jsx";
import AppCard from '../../../components/AppCard/AppCard.jsx';
import TimerCard from '../../../components/TimerCard/TimerCard.jsx';
import Score from '../../../components/Score/Score.jsx';
import Clock from '../../../components/Clock/Clock.jsx';
import React, { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";

// Create websocket from url
// Send JSONmessage with type of event, playerID and matchID
// ws.addEventListener that has switch cases depending on what event it is
// Each case has a function with params playerID and matchID that uses prisma.MatchStats.update to update the changes in matchstats
// Since we have playerID and matchID we can easily differentiate between the players

export default function HomePage({ playersIN, playersOUT, matchID, scoreUS, scoreOPP }) {
    const [scoreUs, setscoreUs] = useState(scoreUS);
    const [scoreOpp, setscoreOpp] = useState(scoreOPP);
    const [foulType, setFoulType] = useState([]);

    const [activeModal, setActiveModal] = useState(null);
    const [mode, setMode] = useState("Start");
    const [bdColor, setbdColor] = useState(null);

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setelapsedTime] = useState(0);
    const IntervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {

        if(isRunning) {
            IntervalIdRef.current = setInterval(() => {
                setelapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            clearInterval(IntervalIdRef.current);
        }

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
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
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
                        time={formatTime()}
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
            {activeModal === "goal" && (
                <div className={styles.modal}>
                    <Goal 
                    scoreUs={scoreUs} 
                    scoreOpp={scoreOpp} 
                    setscoreUs={setscoreUs}
                    setscoreOpp={setscoreOpp}
                    onClose={() => setActiveModal(null)} 
                    closePrev={() => setActiveModal(null)}
                    time={formatTime()}
                    startTime={start}
                    stopTime={stop}
                    mode={mode}
                    bdcolor={bdColor}
                    isRunning={isRunning}
                    playersIn={playersIN}
                    matchID={matchID}/>
                </div>
            )}
            {activeModal === "shot" && (
                <div className={styles.modal}>
                    <Shot 
                    scoreUs={scoreUs} 
                    scoreOpp={scoreOpp} 
                    onClose={() => setActiveModal(null)} 
                    closePrev={() => setActiveModal(null)}
                    time={formatTime()}
                    startTime={start}
                    stopTime={stop}
                    mode={mode}
                    bdcolor={bdColor}
                    isRunning={isRunning}
                    playersIn={playersIN}
                    matchID={matchID}/>
                </div>
            )}
            {activeModal === "foul" && (
                <div className={styles.modal}>
                    <FoulCard 
                    scoreUs={scoreUs} 
                    scoreOpp={scoreOpp} 
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
                    matchID={matchID}/>
                </div>
            )}
            {activeModal === "subs" && (
                <div className={styles.modal}>
                    <Subs 
                    onClose={() => setActiveModal(null)}
                    closePrev={() => setActiveModal(null)}
                    playersIn={playersIN} 
                    playersOut={playersOUT}/>
                </div>
            )}
            {activeModal === "save" && (
                <div className={styles.modal}>
                    <SaveTable 
                    onClose={() => setActiveModal(null)}
                    playersIn={playersIN}
                    matchID={matchID}
                    />
                </div>
            )}
        </>
    )
}