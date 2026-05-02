"use client";

import styles from "./timer.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function TimerCard({
  icon,
  iconAlt = "",
  bdColor,
  startTime,
  stopTime,
  isRunning,
  mode
}) {

  const handleClick = () => {
    if (!isRunning) {
      startTime();
    } else {
      stopTime();
    }
  }

  return (
    // We are currently using placeholders until we link frontend to backend
        <button 
        onClick={handleClick}
        className={styles.card}
        style={{borderColor: bdColor}}>
          <div className={styles.iconContainer}>
              {icon && <Image src={icon} width={19} height={19} alt={iconAlt} />}
          </div>
          <div className={styles.cardBody}>
            <p>{mode ?? "-"}</p>
          </div>
        </button>
  );
}