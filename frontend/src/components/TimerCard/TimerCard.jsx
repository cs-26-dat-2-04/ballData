"use client";

import styles from "./timer.module.css";
import Image from "next/image";
import { useState } from "react";

export default function AppCard({
  icon,
  iconAlt = "",
  bdColor
}) {

  const [clicked, setClick] = useState(true);

  const beenClicked = () => {
    clicked ? setClick(false): setClick(true);
  }

  const [color, changeColor] = useState(bdColor);
  const [mode, changeMode] = useState("Start");

  const setIsSelected = () => {
    if (clicked === true) {
      changeColor("black");
      changeMode("Pause")
    } else {
      changeColor("rgb(209, 209, 209)");
      changeMode("Start")
    }
  }

  return (
    // We are currently using placeholders until we link frontend to backend
        <button 
        onClick={() => { beenClicked(); setIsSelected(); }} 
        className={styles.card}
        style={{borderColor: color}}>
          <div className={styles.iconContainer}>
              {icon && <Image src={icon} width={19} height={19} alt={iconAlt} />}
          </div>
          <div className={styles.cardBody}>
            <p>{mode ?? "-"}</p>
          </div>
        </button>
  );
}