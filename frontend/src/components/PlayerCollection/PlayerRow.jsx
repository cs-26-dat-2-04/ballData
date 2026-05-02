import styles from "./player.module.css";

export default function PlayerRow({ data, onClick, onClose, closePrev, foulType }) {

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
  }

  return (
    <>
      {data?.map((info) => (
        <button 
        onClick={handleClick} 
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
