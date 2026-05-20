import PlayerColl from "../../../components/PlayerCollection/PlayerColl.jsx";
import Back from "../../../components/BackButton/BackButton.jsx";
import React, { useMemo, useState } from "react";
import styles from "./page.module.css";

export default function SubsTablePage({
  onClose,
  playersOut,
  closePrev,
  matchID,
  sendJsonMessage,
}) {
  const [players, setPlayers] = useState(playersOut);

  const filtered = useMemo(() => {
    return players?.map((p) => ({
      id: p.id,
      pName: `${p.first_name} ${p.last_name}`,
      jerseyNum: p.jersey_number?.toString() ?? "",
    }));
  }, [players]);

  return (
    <>
      <div className={styles.containerBack}>
        <Back onClose={onClose} />
      </div>
      <div className={styles.containerColumn}>
        <h1 className={styles.pageHeader}>Udskiftninger-Ind</h1>
        <PlayerColl
          data={filtered}
          message={"playerSubs"}
          onClose={onClose}
          closePrev={closePrev}
          matchID={matchID}
          sendJsonMessage={sendJsonMessage}
        />
      </div>
    </>
  );
}
