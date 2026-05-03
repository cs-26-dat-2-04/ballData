import styles from "./score.module.css";

export default function Score({
  identifier,
  score
}) {

  return (
    // We are currently using placeholders until we link frontend to backend
        <div className={styles.card}>
                <p className={styles.identifier}>{identifier ?? "-"}</p>
                <p className={styles.score}>{score ?? "-"}</p>
        </div>
  );
}