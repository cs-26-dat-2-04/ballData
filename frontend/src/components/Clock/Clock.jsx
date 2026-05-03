import styles from "./clock.module.css";
import Image from "next/image";

export default function Clock({
  icon,
  iconAlt = "",
  time
}) {

  return (
    // We are currently using placeholders until we link frontend to backend
        <div className={styles.card}>
            {icon && <Image style={{paddingLeft: "5px"}} src={icon} width={22} height={22} alt={iconAlt} />}
            <p className={styles.time}>{time ?? "-"}</p>
        </div>
  );
}