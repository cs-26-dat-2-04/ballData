import styles from "../styles.module.css";
import collectionStyles from "../Collections/collections.module.css"
import Row from "../Rows/TeamRow.jsx";
import Image from "next/image";

export default function MatchRow({ data }) {
  return (
    <article className={collectionStyles.collCard}>
      <div style={{ marginBottom: "-15px" }} className={styles.container}>
        <div>
          <Image
            style={{ padding: "25px 25px 25px", marginRight: "-15px" }}
            src={"/team.svg"}
            alt={"teamIcon"}
            width={30}
            height={30}
          />
        </div>
        <div>
          <p
            style={{
              color: "black",
              fontSize: "24px",
              fontFamily: "var(--sans)",
              fontWeight: "500",
            }}
          >
            Alle dine hold
          </p>
        </div>
      </div>
      <div style={{ marginBottom: "5px" }} className={styles.container}>
        <p
          style={{ padding: "0px 25px 25px", fontSize: "14px" }}
          className={styles.cardFooter}
        >
          Klik på et hold for at se detaljer og tilføje noter
        </p>
      </div>
      <Row data={data} />
    </article>
  );
}