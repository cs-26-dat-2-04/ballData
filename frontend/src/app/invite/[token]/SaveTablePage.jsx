"use client";

import { useMemo, useState } from "react";
import PlayerColl from '../../../components/PlayerCollection/PlayerColl.jsx';
import Back from '../../../components/BackButton/BackButton.jsx';
import styles from "./page.module.css";

export default function SaveTablePage({ 
  onClose, 
  playersIn, 
  matchID
}) {

  const [players, setPlayers] = useState(playersIn);

  const filtered = useMemo(() => {
    return players?.map((p) => ({
      id: p.id,
      pName: `${p.first_name} ${p.last_name}`,
      jerseyNum: p.jersey_number?.toString() ?? ""
    }));
  }, [players]);

  return (
      <>
        <div className={styles.containerBack}>
            <Back onClose={onClose}/>
        </div>
        <div className={styles.containerColumn}>
            <h1 className={styles.pageHeader}>Redning</h1>
            <PlayerColl 
            data={filtered}
            matchID={matchID}
            message={"playerSave"}
            onClose={onClose}/>
        </div>
      </>
    )
}