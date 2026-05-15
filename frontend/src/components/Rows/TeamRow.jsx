import styles from "../styles.module.css";
import rowStyles from "../Rows/rows.module.css";
import Link from "next/link";


export default function TeamRow({ data }) {
  return (
    <>
      {data?.map((info) => (
        <Link className={rowStyles.rowCard} key={info.id} href={`/teams/${info.id}`}>
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
        </Link>
      ))}
    </>
  );
}
