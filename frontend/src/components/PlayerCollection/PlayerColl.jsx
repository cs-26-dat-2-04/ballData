import styles from "./player.module.css";
import PlayerRow from "./PlayerRow.jsx";

export default function PlayerColl({ data, onClick, onClose, closePrev, foulType }) {

  return (
    <div className={styles.collCard}>
        <PlayerRow 
        data={data} 
        onClick={onClick} 
        onClose={onClose} 
        closePrev={closePrev} 
        foulType={foulType}/>
    </div>
  );
}
