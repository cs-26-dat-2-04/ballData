import styles from "./player.module.css";
import PlayerRow from "./PlayerRow.jsx";

export default function PlayerColl({
  data,
  matchID,
  message,
  onClick,
  onClose,
  closePrev,
  closePrevPrev,
  foulType,
  scoreUs,
  scoreOpp,
  sendJsonMessage,
}) {
  return (
    <div className={styles.collCard}>
      <PlayerRow
        data={data}
        matchID={matchID}
        message={message}
        sendJsonMessage={sendJsonMessage}
        onClick={onClick}
        onClose={onClose}
        closePrev={closePrev}
        closePrevPrev={closePrevPrev}
        foulType={foulType}
        scoreUs={scoreUs}
        scoreOpp={scoreOpp}
      />
    </div>
  );
}
