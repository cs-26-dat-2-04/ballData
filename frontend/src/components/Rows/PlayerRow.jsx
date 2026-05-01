import styles from "../styles.module.css";
import rowStyles from "../Rows/rows.module.css";

export default function PlayerRow({ data }) {
  return (
    <>
      {data?.map((info) => (
        <article className={rowStyles.rowCard} style={{padding: "30px 20px 30px"}} key={info.id}>
            <div className={styles.container}>
                
                <div className={rowStyles.coloredDiv} 
                        style={{
                            backgroundColor: "var(--ice)", 
                            color:"var(--navy)",
                            marginRight:"10px"}}
                        >
                        <>{info.position}</>
                </div>
                <p className={rowStyles.leftSideText}>{info.firstName} {info.lastName}{info.jerseyNumber && ` - #${info.jerseyNumber}`}</p>
                <p className={rowStyles.rightSideText}>{info.season}</p>
            </div>
        </article>
      ))}
    </>
  );
}
