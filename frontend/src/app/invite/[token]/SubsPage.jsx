"use client";

import PlayerColl from "../../../components/PlayerCollection/PlayerColl.jsx";
import Back from "../../../components/BackButton/BackButton.jsx";
import SubsTable from "./SubsTablePage.jsx";
import React, { useMemo, useState } from "react";
import styles from "./page.module.css";

export default function SubsPage({
  onClose,
  playersIn,
  playersOut,
  closePrev,
  matchID,
  sendJsonMessage,
}) {
  const [players, setPlayers] = useState(playersIn);

  const filtered = useMemo(() => {
    return players?.map((p) => ({
      id: p.id,
      pName: `${p.first_name} ${p.last_name}`,
      jerseyNum: p.jersey_number?.toString() ?? "",
    }));
  }, [players]);

  const [activeModal, setActiveModal] = useState(null);

  return (
    <>
      <div className={styles.containerBack}>
        <Back onClose={onClose} />
      </div>
      <div className={styles.containerColumn}>
        <h1 className={styles.pageHeader}>Udskiftninger-Ud</h1>
        <PlayerColl
          onClick={() => setActiveModal("subsTable")}
          data={filtered}
          message={"playerSubs"}
          sendJsonMessage={sendJsonMessage}
        />
      </div>
      {activeModal === "subsTable" && (
        <div className={styles.modal}>
          <SubsTable
            onClose={() => setActiveModal(null)}
            closePrev={closePrev}
            playersOut={playersOut}
            matchID={matchID}
            sendJsonMessage={sendJsonMessage}
          />
        </div>
      )}
    </>
  );
}
