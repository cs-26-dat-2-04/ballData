import styles from "../components/styles.module.css";
import Image from "next/image";

export default function StatCard({ title, body, footer, icon, iconAlt = "" }) {
  // The backend will insert the values into the parameters.
  return (
    // We are currently using placeholders until we link frontend to backend
    <article className={styles.card}>
      <span className={styles.cardTitle}>{title}</span>
      <p className={styles.cardBody}>{body ?? "-"}</p>
      <span className={styles.cardFooter}>{footer ?? ""}</span>
      {icon && <Image src={icon} width={64} height={64} alt={iconAlt} />}
    </article>
  );
}
