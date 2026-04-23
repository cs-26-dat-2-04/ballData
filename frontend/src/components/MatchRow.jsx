import Image from "next/image";
import styles from "../components/styles.module.css";

export default function MatchRow({data}) {
    return( 
    <>
        {data?.map((info) => (
              <article className={styles.matchCard} key={info.id}>
                <div className={styles.container}>
                    <div className={styles.icondiv}>
                        {info.result && <Image src={info.result === 'win' ? "/win.jpg" : (info.result === 'loss' ? "/icon1.jpg" : "/win.jpg")} width={60} height={35} alt={info.iconAlt} />}
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