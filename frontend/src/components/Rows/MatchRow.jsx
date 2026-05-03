import styles from "../styles.module.css";
import rowStyles from "../Rows/rows.module.css";
import Link from "next/link";


export default function MatchRow({ data }) {
  return (
    <>
      {data?.map((info) => (
        <Link href={`/matches/${info.id}`} className={rowStyles.rowCard} key={info.id}>
          <div className={styles.container}>
            <div>
              {info.result && (
                <div
                  className={rowStyles.coloredDiv}
                  style={{
                    backgroundColor:
                      info.result === "win"
                        ? "var(--performance-light)"
                        : info.result === "loss"
                          ? "var(--red-light)"
                          : "var(--ice)",
                    color:
                      info.result === "win"
                        ? "var(--performance)"
                        : info.result === "loss"
                          ? "var(--red)"
                          : "var(--navy)",
                  }}
                >
                  <>{info.result}</>
                </div>
              )}
            </div>
            <div className={rowStyles.textdiv}>
              <p className={rowStyles.locText}>{info.loc}</p>
            </div>
          </div>
          <div className={styles.container}>
            <p className={rowStyles.leftSideText}>{info.team}</p>
            <p className={rowStyles.rightSideText}>{info.score}</p>
          </div>
          <p className={rowStyles.rowFooterText}>{info.date}</p>
        </Link>
      ))}
    </>
  );
}
