import styles from "../styles.module.css";
import rowStyles from "../Rows/rows.module.css";
import Link from "next/link";

export default function PlayerRow({ data }) {
  return (
    <>
      {data?.map((info) => (
        <Link
          className={rowStyles.rowCard}
          key={info.id}
          href={`/players/${info.id}`}
        >
          <div className={styles.container}>
            <div
              className={rowStyles.coloredDiv}
              style={{
                backgroundColor: "var(--ice)",
                color: "var(--navy)",
                marginRight: "10px",
              }}
            >
              <>{info.position}</>
            </div>
            <p className={rowStyles.leftSideText}>
              {info.firstName} {info.lastName}
              {info.jerseyNumber && ` - #${info.jerseyNumber}`}
            </p>
            <p className={rowStyles.rightSideText}>{info.season}</p>
          </div>
        </Link>
      ))}
    </>
  );
}
