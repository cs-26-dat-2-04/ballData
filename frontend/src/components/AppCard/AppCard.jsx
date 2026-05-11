"use client";

import styles from "./app.module.css";
import Image from "next/image";
import { useState } from "react";
import useWebSocket from "react-use-websocket"

export default function AppCard({
  icon,
  iconColor,
  iconAlt = "",
  body,
  bdColor,
  mode,
  onSelect,
  foulType,
  onClick,
  onClose,
  message,
  playerID,
  matchID
}) {
  // The backend will insert the values into the parameters.

  const WS_URL = "ws://localhost:3002";

  const { sendJsonMessage } = useWebSocket(WS_URL);

  const handleEvent = () => {
    sendJsonMessage({
      event: message,
      data: {
        playerID: playerID,
        matchID: matchID
      }
    });
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (onClose) {
      onClose();
    }
  }
  const [clicked, setClick] = useState(true);

  const beenClicked = () => {
    clicked ? setClick(false): setClick(true);
  }

  const [color, changeColor] = useState(bdColor);

  const setIsSelected = () => {
    if (clicked === true) {
      changeColor("black");
      foulType.push(onSelect);
    } else {
      changeColor(bdColor);
      for (let i = 0; i < 3; i++){ 
        if (onSelect === foulType[i]) {
          foulType.splice(i, 1);
        }
      }
    }
  }

  return (
    // We are currently using placeholders until we link frontend to backend
        <button 
        onClick={mode === "select" 
        ? () => { beenClicked(); setIsSelected(); } 
        : () => {handleClick(); handleEvent(); }}
        className={styles.card}
        style={{borderColor: color}}>
          <div className={styles.iconContainer} style={{background: iconColor}}>
              {icon && <Image src={icon} width={19} height={19} alt={iconAlt} />}
          </div>
          <div className={styles.cardBody}>
            <p>{body ?? "-"}</p>
          </div>
        </button>
  );
}
