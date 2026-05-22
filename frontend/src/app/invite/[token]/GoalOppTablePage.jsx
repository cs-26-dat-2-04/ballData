"use client";

import PlayerColl from "../../../components/PlayerCollection/PlayerColl.jsx";
import Back from "../../../components/BackButton/BackButton.jsx";
import styles from "./page.module.css";

export default function GoalTablePage({
  onClose,
  matchID,
  closePrev,
  scoreUs,
  scoreOpp,
  sendJsonMessage,
}) {
  let opponent = [
    {
      id: null,
      pName: "Modstandere",
      jerseyNum: 67,
    },
  ];

  return (
    <>
      <div className={styles.containerBack}>
        <Back onClose={onClose} />
      </div>
      <div className={styles.containerColumn}>
        <h1 className={styles.pageHeader}>Mål</h1>
        <PlayerColl
          data={opponent}
          matchID={matchID}
          message={"oppGoal"}
          closePrev={closePrev}
          scoreUs={scoreUs}
          scoreOpp={scoreOpp}
          sendJsonMessage={sendJsonMessage}
        />
      </div>
    </>
  );
}
