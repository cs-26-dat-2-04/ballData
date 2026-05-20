import { useMemo, useState } from "react";
import PlayerColl from "../../../components/PlayerCollection/PlayerColl.jsx";
import Back from "../../../components/BackButton/BackButton.jsx";
import styles from "./page.module.css";

export default function FoulTablePage({
  playersIn,
  onClose,
  closePrev,
  foulType,
  matchID,
  sendJsonMessage,
}) {
  const [players, setPlayers] = useState(playersIn);

  const filtered = useMemo(() => {
    return players?.map((p) => {
      return {
        id: p.id,
        pName: `${p.first_name} ${p.last_name}`,
        jerseyNum: p.jersey_number?.toString() ?? "",
      };
    });
  }, [players]);

  return (
    <>
      <div className={styles.containerBack}>
        <Back onClose={onClose} />
      </div>
      <div className={styles.containerColumn}>
        <h1 className={styles.pageHeader}>Forseelse</h1>
        <PlayerColl
          data={filtered}
          message={"playerFoul"}
          onClose={onClose}
          closePrev={closePrev}
          foulType={foulType}
          matchID={matchID}
          sendJsonMessage={sendJsonMessage}
        />
      </div>
    </>
  );
}
