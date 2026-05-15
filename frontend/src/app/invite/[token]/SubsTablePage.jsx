import PlayerColl from '../../../components/PlayerCollection/PlayerColl.jsx';
import Back from '../../../components/BackButton/BackButton.jsx';
import styles from "./page.module.css";

export default function SubsPageTable({ onClose, playerOut, closePrev }) {

  return (
      <>
        <div className={styles.containerBack}>
            <Back onClose={onClose}/>
        </div>
        <div className={styles.containerColumn}>
            <h1 className={styles.pageHeader}>Udskiftninger-Ind</h1>
            <PlayerColl data={playerOut} onClose={onClose} closePrev={closePrev}/>
        </div>
      </>
    )
}