import styles from "./player.module.css";
import PlayerRow from "./PlayerRow.jsx";

export default function PlayerColl({ data, route, scores }) {
  return (
    <div className={styles.collCard}>
        <PlayerRow scores={scores} data={data} route={route}/>
    </div>
  );
}
