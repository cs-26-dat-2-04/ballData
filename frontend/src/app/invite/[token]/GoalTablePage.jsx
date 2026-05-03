"use client";

import PlayerColl from '../../../components/PlayerCollection/PlayerColl.jsx';
import Back from '../../../components/BackButton/BackButton.jsx';
import styles from "./page.module.css";

export default function GoalTable({ onClose, playersIn, closePrev, scoreUs, setscoreUs }) {

  return (
      <>
        <div className={styles.containerBack}>
            <Back onClose={onClose}/>
        </div>
        <div className={styles.containerColumn}>
            <h1 className={styles.pageHeader}>Mål</h1>
            <PlayerColl 
            data={playersIn} 
            onClose={() => {
              setscoreUs(scoreUs + 1);
              onClose
            }} 
            closePrev={closePrev}/>
        </div>
      </>
    )
}