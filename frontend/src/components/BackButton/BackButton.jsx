import styles from "./back.module.css";
import Image from "next/image";

export default function BackButton({ onClose }) {
  // The backend will insert the values into the parameters.
  const handleClick = () => {
    if (onClose) {
      onClose();
    }
  }

  return (
    // We are currently using placeholders until we link frontend to backend
        <button 
        onClick={handleClick}
        className={styles.iconContainer}>
            <Image src={"/backApp.svg"} width={40} height={40} alt={"Back button icon"} />
        </button>
  );
}