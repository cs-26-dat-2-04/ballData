"use client";

import styles from "./agreementButtons.module.css";

export default function AppCard({
  body,
  bdColor,
  sendJsonMessage,
  matchID,
  timeMatch,
  onClose,
}) {
  const handleClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    // We are currently using placeholders until we link frontend to backend
    <button
      onClick={() => {
        sendJsonMessage({
          event: "submitGame",
          matchID: matchID,
          time: timeMatch,
        });
        handleClick();
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
