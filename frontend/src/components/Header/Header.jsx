import styles from "../Header/header.module.css";
import Link from "next/link";
import { getMe } from "../../server-services/authService.js";

export default async function Header() {
  let teamId = null;

  try {
    const { coach } = await getMe();
    teamId = coach.team?.id ?? null;
  } catch {
    // ingenting
  }

  return (
    <>
      <header className={styles.ballDataHeader}>
        <div>
          <Link href={"/dashboard"} style={{ textDecoration: "none" }}>
            <h3>ballData</h3>
          </Link>
          <a style={{ color: "var(--muted)" }}>Sæson {currentSeasonString()}</a>
        </div>

        <nav className={styles.headerNav}>
          {teamId && (
            <Link
              href={`/dashboard/teams/${teamId}`}
              className={styles.navLink}
              style={{ borderRight: "2px solid var(--rule)" }}
            >
              Hold
            </Link>
          )}
          <Link href={`/dashboard/matches`} className={styles.navLink}>
            Kampe
          </Link>
        </nav>
      </header>
    </>
  );
}

function currentSeasonString() {
  let currentDate = new Date();
  return 8 <= currentDate.getMonth()
    ? `${currentDate.getFullYear()}/${currentDate.getFullYear() + 1}`
    : `${currentDate.getFullYear() - 1}/${currentDate.getFullYear()}`;
}
