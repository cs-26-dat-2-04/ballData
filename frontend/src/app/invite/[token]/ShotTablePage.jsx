import PlayerColl from '../../../components/PlayerCollection/PlayerColl.jsx';
import Back from '../../../components/BackButton/BackButton.jsx';
import styles from "./page.module.css";

export default function ShotTable({ onClose, playersIn, closePrev }) {
  return (
      <>
        <div className={styles.containerBack}>
            <Back onClose={onClose}/>
        </div>
        <div className={styles.containerColumn}>
            <h1 className={styles.pageHeader}>Skud</h1>
            <PlayerColl data={playersIn} onClose={onClose} closePrev={closePrev}/>
        </div>
      </>
    )
}