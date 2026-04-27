import styles from "../components/styles.module.css";
import Image from "next/image";
import Row from "../components/MatchRow.jsx";

export default function MatchRow({ data }) {
  return (
    <article className={styles.collCard}>
      <div style={{ marginBottom: "-15px" }} className={styles.container}>
        <div>
          <Image
            style={{ padding: "25px 25px 25px", marginRight: "-15px" }}
            src={"/calender.svg"}
            alt={"calendarIcon"}
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
            Seneste Kampe
          </p>
        </div>
      </div>
      <div style={{ marginBottom: "5px" }} className={styles.container}>
        <p
          style={{ padding: "0px 25px 25px", fontSize: "14px" }}
          className={styles.cardFooter}
        >
          Klik på en kamp for at se detaljer of tilføje noter
        </p>
      </div>
      <Row data={data} />
    </article>
  );
}
