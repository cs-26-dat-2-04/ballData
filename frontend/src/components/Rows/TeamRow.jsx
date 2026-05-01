import styles from "../styles.module.css";
import rowStyles from "../Rows/rows.module.css";

export default function TeamRow({ data }) {
  return (
    <>
      {data?.map((info) => (
        <article className={rowStyles.rowCard} style={{padding:"30px 20px 30px"}} key={info.id}>
          <div className={styles.container}>
          </div>
          <div className={styles.container}>
            {info.uDivision && (
                <div className={rowStyles.coloredDiv} 
                    style={{
                        backgroundColor: "var(--ice)", 
                        color:"var(--navy)",
                        marginRight:"10px"}}
                    >
                  <>{info.uDivision}</>
                </div>
            )}
            <p className={rowStyles.leftSideText}>{info.team}</p>
            <p className={rowStyles.rightSideText}>{info.season}</p>
          </div>
        </article>
      ))}
    </>
  );
}
