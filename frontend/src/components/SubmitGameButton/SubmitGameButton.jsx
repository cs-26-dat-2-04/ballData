"use client";

import styles from "./submitGame.module.css";
import { useRouter } from "next/navigation";

export default function AppCard({
  body,
  bdColor,
  sendJsonMessage,
  matchID,
  timeMatch,
}) {
  return (
    // We are currently using placeholders until we link frontend to backend
    <button
      onClick={() => {
        sendJsonMessage({
          event: "submitGame",
          matchID: matchID,
          time: timeMatch,
        });
      }}
      className={styles.card}
      style={{ borderColor: bdColor }}
    >
      <div className={styles.cardBody}>
        <p>{body ?? "-"}</p>
      </div>
    </button>
  );
}
