"use client";

import styles from "./submitGame.module.css";

export default function AppCard({ body, bdColor, onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    // We are currently using placeholders until we link frontend to backend
    <button
      onClick={handleClick}
      className={styles.card}
      style={{ borderColor: bdColor }}
    >
      <div className={styles.cardBody}>
        <p>{body ?? "-"}</p>
      </div>
    </button>
  );
}
