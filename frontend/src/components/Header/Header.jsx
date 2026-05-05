import styles from "../Header/header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className={styles.ballDataHeader}>
        <div>
          <Link href={"/"} style={{ textDecoration: "none" }}>
            <h3>ballData</h3>
          </Link>
          <a style={{ color: "var(--muted)" }}>Sæson {currentSeasonString()}</a>
        </div>

          <nav className={styles.headerNav}>
           <Link href={"/teams/5ab46e31-391c-46a7-8e45-db9ada07626d"} className={styles.navLink} style={{borderRight:"2px solid var(--rule)"}}> Hold</Link>
        
        
        <Link href={"/matches"} className={styles.navLink}> Kampe</Link>
          </nav>
      </header>
    </>
  );
}

function currentSeasonString() {
  let currentDate = new Date();

  //new season starts in september as far as I could find
  return 8 <= currentDate.getMonth()
    ? `${currentDate.getFullYear()}/${currentDate.getFullYear() + 1}`
    : `${currentDate.getFullYear() - 1}/${currentDate.getFullYear()}`;
}