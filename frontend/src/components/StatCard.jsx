import styles from "../components/styles.module.css";
import Image from "next/image";

export default function StatCard({ title, body, footer, iconColor, icon, iconAlt = "" }) {
  // The backend will insert the values into the parameters.
  return (
    // We are currently using placeholders until we link frontend to backend
    <article className={styles.card}>
      <div style={{display:"flex"}}>
        <div>
          <span className={styles.cardTitle}>{title}</span>
          <p className={styles.cardBody}>{body ?? "-"}</p>  
        </div>
          <div style={{marginLeft:"auto", marginRight:"25px", alignSelf:"center"}}>
            <div className={styles.iconContainer} style={{backgroundColor:iconColor}}>
            {icon && <Image src={icon} width={64} height={64} alt={iconAlt} />}
          </div>
        </div>
      </div>
      <span className={styles.cardFooter}>{footer ?? ""}</span>
    </article>
  );
}
