import styles from "../styles.module.css";
import statCardStyles from "../StatCard/statCard.module.css";
import Image from "next/image";

export default function StatCard({
  title,
  body,
  footer,
  iconColor,
  icon,
  iconAlt = "",
}) {
  // The backend will insert the values into the parameters.
  return (
    // We are currently using placeholders until we link frontend to backend
    <article className={statCardStyles.card}>
      <div style={{ display: "flex" }}>
        <div>
          <span className={statCardStyles.cardTitle}>{title}</span>
          <p className={statCardStyles.cardBody}>{body ?? "-"}</p>
        </div>
        <div
          className={statCardStyles.iconContainer}
          style={{ backgroundColor: iconColor }}
        >
          {icon && <Image src={icon} width={64} height={64} alt={iconAlt} />}
        </div>
      </div>
      <span className={styles.cardFooter}>{footer ?? ""}</span>
    </article>
  );
}
