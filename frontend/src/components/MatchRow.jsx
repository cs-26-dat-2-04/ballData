import Image from "next/image";
import styles from "../components/styles.module.css";

export default function MatchRow({ data }) {
  return (
    <>
      {data?.map((info) => (
        <article className={styles.matchCard} key={info.id}>
          <div className={styles.container}>
            <div className={styles.icondiv}>
              {info.result && (
                <div
                  className={styles.resultDiv}
                  style={{
                    backgroundColor:
                      info.result === "win"
                        ? "#D0F0E6"
                        : info.result === "loss"
                          ? "#FCEBEB"
                          : "#EAF1FB",
                    color:
                      info.result === "win"
                        ? "#1D9E75"
                        : info.result === "loss"
                          ? "#E24B4A"
                          : "#1D3A6E",
                  }}
                >
                  <>{info.result}</>
                </div>
              )}
            </div>
            <div className={styles.textdiv}>
              <p className={styles.locText}>{info.loc}</p>
            </div>
          </div>
          <div className={styles.container}>
            <p className={styles.teamText}>{info.team}</p>
            <p className={styles.scoreText}>{info.score}</p>
          </div>
          <p className={styles.dateText}>{info.date}</p>
        </article>
      ))}
    </>
  );
}
