import styles from "./player.module.css";
import useWebSocket from "react-use-websocket"
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
  scoreOpp
}) {

  const WS_URL = "ws://localhost:3002";

  const { sendJsonMessage } = useWebSocket(WS_URL, {
    shouldReconnect: () => true,
  });

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
        scoreOpp={scoreOpp}/>
    </div>
  );
}
