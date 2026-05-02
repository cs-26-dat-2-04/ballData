"use client";

import Goal from "./GoalPage.jsx";
import Shot from "./ShotPage.jsx";
import Foul from "./FoulPage.jsx";
import Subs from "./SubsPage.jsx";
import AppCard from '../../../components/AppCard/AppCard.jsx';
import TimerCard from '../../../components/TimerCard/TimerCard.jsx';
import Score from '../../../components/Score/Score.jsx';
import Clock from '../../../components/Clock/Clock.jsx';
import React, { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";


let playersIn = [
  {
    id: "5ab46e31-391c-46a7-8e45-db9ada07626d",
    pName: "Pelle Pedersen",
    jerseyNum: "69"
  },
  {
    id: "58aacbcd-2344-40f1-a9e9-11c70d44cbb4",
    pName: "Magnus Pedersen",
    jerseyNum: "67"
  },
  {
    id: "58aacbcd-2344-40f1-a9e9-11c70d44cbb3",
    pName: "Erik Pedersen",
    jerseyNum: "65"
  },
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    pName: "Lars Jensen",
    jerseyNum: "7"
  },
  {
    id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    pName: "Søren Nielsen",
    jerseyNum: "11"
  },
  {
    id: "c3d4e5f6-a7b8-9012-cdef-123456789012",
    pName: "Anders Hansen",
    jerseyNum: "23"
  },
  {
    id: "d4e5f6a7-b8c9-0123-defa-234567890123",
    pName: "Mikkel Christensen",
    jerseyNum: "4"
  },
  {
    id: "e5f6a7b8-c9d0-1234-efab-345678901234",
    pName: "Rasmus Andersen",
    jerseyNum: "17"
  },
  {
    id: "f6a7b8c9-d0e1-2345-fabc-456789012345",
    pName: "Kasper Thomsen",
    jerseyNum: "3"
  },
  {
    id: "a7b8c9d0-e1f2-3456-abcd-567890123456",
    pName: "Nicolai Larsen",
    jerseyNum: "99"
  },
  {
    id: "b8c9d0e1-f2a3-4567-bcde-678901234567",
    pName: "Frederik Møller",
    jerseyNum: "14"
  },
  {
    id: "c9d0e1f2-a3b4-5678-cdef-789012345678",
    pName: "Oliver Kristensen",
    jerseyNum: "88"
  },
  {
    id: "d0e1f2a3-b4c5-6789-defa-890123456789",
    pName: "Christian Madsen",
    jerseyNum: "5"
  },
  {
    id: "e1f2a3b4-c5d6-7890-efab-901234567890",
    pName: "Emil Rasmussen",
    jerseyNum: "21"
  },
  {
    id: "f2a3b4c5-d6e7-8901-fabc-012345678901",
    pName: "Victor Jørgensen",
    jerseyNum: "10"
  },
  {
    id: "a3b4c5d6-e7f8-9012-abcd-123456789012",
    pName: "Mathias Petersen",
    jerseyNum: "33"
  },
  {
    id: "b4c5d6e7-f8a9-0123-bcde-234567890123",
    pName: "Jonas Olsen",
    jerseyNum: "8"
  },
  {
    id: "c5d6e7f8-a9b0-1234-cdef-345678901234",
    pName: "Tobias Sørensen",
    jerseyNum: "44"
  },
  {
    id: "d6e7f8a9-b0c1-2345-defa-456789012345",
    pName: "Sebastian Berg",
    jerseyNum: "16"
  },
  {
    id: "e7f8a9b0-c1d2-3456-efab-567890123456",
    pName: "Alexander Holm",
    jerseyNum: "2"
  },
];

let playerOut = [
  {
    id: "1a2b3c4d-5e6f-7a8b-9c0d-e1f2a3b4c5d6",
    pName: "Bjarne Vestergaard",
    jerseyNum: "9"
  },
  {
    id: "2b3c4d5e-6f7a-8b9c-0d1e-f2a3b4c5d6e7",
    pName: "Flemming Dalgaard",
    jerseyNum: "22"
  },
  {
    id: "3c4d5e6f-7a8b-9c0d-1e2f-a3b4c5d6e7f8",
    pName: "Torben Kjeldsen",
    jerseyNum: "31"
  },
  {
    id: "4d5e6f7a-8b9c-0d1e-2f3a-b4c5d6e7f8a9",
    pName: "Henrik Bøgvad",
    jerseyNum: "6"
  },
  {
    id: "5e6f7a8b-9c0d-1e2f-3a4b-c5d6e7f8a9b0",
    pName: "Jeppe Nørgaard",
    jerseyNum: "18"
  },
  {
    id: "6f7a8b9c-0d1e-2f3a-4b5c-d6e7f8a9b0c1",
    pName: "Mads Fuglsang",
    jerseyNum: "77"
  },
  {
    id: "7a8b9c0d-1e2f-3a4b-5c6d-e7f8a9b0c1d2",
    pName: "Claus Aaberg",
    jerseyNum: "13"
  },
  {
    id: "8b9c0d1e-2f3a-4b5c-6d7e-f8a9b0c1d2e3",
    pName: "Niels Brøndberg",
    jerseyNum: "55"
  },
  {
    id: "9c0d1e2f-3a4b-5c6d-7e8f-a9b0c1d2e3f4",
    pName: "Preben Damgaard",
    jerseyNum: "26"
  },
  {
    id: "0d1e2f3a-4b5c-6d7e-8f9a-b0c1d2e3f4a5",
    pName: "Rune Elkjær",
    jerseyNum: "42"
  },
  {
    id: "1e2f3a4b-5c6d-7e8f-9a0b-c1d2e3f4a5b6",
    pName: "Steffen Holmgaard",
    jerseyNum: "37"
  },
  {
    id: "2f3a4b5c-6d7e-8f9a-0b1c-d2e3f4a5b6c7",
    pName: "Troels Iversen",
    jerseyNum: "19"
  },
  {
    id: "3a4b5c6d-7e8f-9a0b-1c2d-e3f4a5b6c7d8",
    pName: "Ulrik Juulsgaard",
    jerseyNum: "71"
  },
  {
    id: "4b5c6d7e-8f9a-0b1c-2d3e-f4a5b6c7d8e9",
    pName: "Vagn Kragelund",
    jerseyNum: "48"
  },
  {
    id: "5c6d7e8f-9a0b-1c2d-3e4f-a5b6c7d8e9f0",
    pName: "Bent Lykke",
    jerseyNum: "1"
  },
  {
    id: "6d7e8f9a-0b1c-2d3e-4f5a-b6c7d8e9f0a1",
    pName: "Carsten Munksgaard",
    jerseyNum: "60"
  },
  {
    id: "7e8f9a0b-1c2d-3e4f-5a6b-c7d8e9f0a1b2",
    pName: "Ditte Nørskov",
    jerseyNum: "29"
  },
  {
    id: "8f9a0b1c-2d3e-4f5a-6b7c-d8e9f0a1b2c3",
    pName: "Eigil Overgaard",
    jerseyNum: "53"
  },
  {
    id: "9a0b1c2d-3e4f-5a6b-7c8d-e9f0a1b2c3d4",
    pName: "Gunnar Primdahl",
    jerseyNum: "12"
  },
  {
    id: "0b1c2d3e-4f5a-6b7c-8d9e-f0a1b2c3d4e5",
    pName: "Loke Qvist",
    jerseyNum: "36"
  },
];

export default function HomePage({}) {

    const [scoreUs, setscoreUs] = useState(0);
    const [scoreOpp, setscoreOpp] = useState(0);

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
                    playerIn={playersIn}/>
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
                    playerIn={playersIn}/>
                </div>
            )}
            {activeModal === "foul" && (
                <div className={styles.modal}>
                    <Foul 
                    scoreUs={scoreUs} 
                    scoreOpp={scoreOpp} 
                    onClose={() => setActiveModal(null)} 
                    closePrev={() => setActiveModal(null)}
                    foulType={[]} 
                    time={formatTime()}
                    startTime={start}
                    stopTime={stop}
                    mode={mode}
                    bdcolor={bdColor}
                    isRunning={isRunning}
                    playerIn={playersIn}/>
                </div>
            )}
            {activeModal === "subs" && (
                <div className={styles.modal}>
                    <Subs 
                    onClose={() => setActiveModal(null)}
                    closePrev={() => setActiveModal(null)}
                    playerIn={playersIn} 
                    playerOut={playerOut}/>
                </div>
            )}
        </>
    )
}