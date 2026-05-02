import PlayerColl from '../../../components/PlayerCollection/PlayerColl.jsx';
import Back from '../../../components/BackButton/BackButton.jsx';
import styles from "./page.module.css";

export default function FoulTable({ playerIn, onClose, closePrev, foulType }) {

  return (
      <>
        <div className={styles.containerBack}>
            <Back onClose={onClose}/>
        </div>
        <div className={styles.containerColumn}>
            <h1 className={styles.pageHeader}>Forseelse</h1>
            <PlayerColl data={playerIn} onClose={onClose} closePrev={closePrev} foulType={foulType}/>
        </div>
      </>
    )
}