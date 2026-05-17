import styles from "../styles.module.css";
import collectionStyles from "../Collections/collections.module.css";
import Image from "next/image";
import MatchRow from "../Rows/MatchRow.jsx";

export default function MatchCollection({ data }) {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false 
  });
  
  for (let d of data) {
    let date
    try { //I don't even know man, two pieces of invisible data that only exists here and not on /matches that can't be parsed into date, this fixes it
      date = new Date(d.match_date);
      d.match_date = formatter.format(date);
    }
    catch{}
  }
  return (
    <article className={collectionStyles.collCard}>
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
          Klik på en kamp for at se detaljer og tilføje noter
        </p>
      </div>
      <MatchRow data={data} />
    </article>
  );
}
