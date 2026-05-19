import styles from "./player.module.css";

export default function PlayerRow({ 
  data, 
  onClick, 
  onClose, 
  closePrev, 
  closePrevPrev,
  foulType,
  sendJsonMessage,
  message,
  scoreUs,
  scoreOpp,
  matchID
}) {

  const handleClick = () => {
    if (onClick){
      onClick();
    } 
    if (onClose) {
      onClose();
    }
    if (closePrev) {
      closePrev();
    }
    if (closePrevPrev) {
      closePrevPrev();
    }
  }

  return (
    <>
      {data?.map((info) => (
        <button
          onClick={() => {
            sendJsonMessage({
              event: message,
              playerID: info.id,
              matchID: matchID,
              scoreUs: scoreUs,
              scoreOpp: scoreOpp,
              foulType: foulType
            });
            setTimeout(() => handleClick(), 200);
          }}
          className={styles.playerCard}
          key={info.id}>
          <div className={styles.container}>
            <p className={styles.name}>{info.pName}</p>
            <p className={styles.number}>{info.jerseyNum}</p>
          </div>
        </button>
      ))}
    </>
  );
}
