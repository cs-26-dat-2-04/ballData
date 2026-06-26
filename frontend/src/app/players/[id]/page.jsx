import Header from "../../../components/Header/Header.jsx";
import StatCard from "../../../components/StatCard/StatCard.jsx";
import PlayerSeasonGraph from "../../../components/PlayerSeasonGraph/PlayerSeasonGraph.jsx";
import styles from "./player.module.css";
import { getPlayer, getPlayerStats } from "../../../server-services/playerService.js";
import { getMe } from "../../../server-services/authService.js";
import { redirect } from "next/navigation";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("da-DK");
}

export default async function PlayerPage({ params }) {
  const { id } = await params;

  let player, matchStats;

  try {
    const { coach } = await getMe();
    if (!coach.team) redirect("/login");

    [player, matchStats] = await Promise.all([
      getPlayer(id),
      getPlayerStats(id),
    ]);
  } catch (err) {
    return (
      <>
        <title>Spiller ikke fundet</title>
        <Header />
        <main className={`main-container ${styles.playerPage}`}>
          <p>{err.message}</p>
        </main>
      </>
    );
  }

  matchStats = matchStats ?? [];

  const p = {
    firstName:    player.first_name,
    lastName:     player.last_name,
    jerseyNumber: player.jersey_number,
    position:     player.position ?? "",
  };

  const totalGoals      = matchStats.reduce((sum, m) => sum + m.goals, 0);
  const totalAssists    = matchStats.reduce((sum, m) => sum + m.assists, 0);
  const totalShots      = matchStats.reduce((sum, m) => sum + m.shots, 0);
  const totalSuspension = matchStats.reduce((sum, m) => sum + m.suspension, 0);
  const totalRedCards   = matchStats.reduce((sum, m) => sum + m.redCards, 0);
  const totalMinutes    = matchStats.reduce((sum, m) => sum + m.minutesPlayed, 0);

  const shotPercent = totalShots > 0 ? Math.round((totalGoals / totalShots) * 100) : 0;

  return (
    <>
      <title>{p.firstName} {p.lastName} — Statistik</title>
      <Header />
      <main className="main-container">

        <section className={styles.playerHero}>
          <div>
            <h1>{p.firstName} {p.lastName}</h1>
            <div className={styles.playerMeta}>
              <span className={styles.positionBadge}>{p.position}</span>
              <span>#{p.jerseyNumber ?? "-"}</span>
            </div>
          </div>
          <p className={styles.matchesPlayed}>{matchStats.length} kampe spillet</p>
        </section>

        <section className={styles.statCardsContainer}>
          <StatCard
            title="Mål"
            body={totalGoals}
            footer={`Snit ${matchStats.length > 0 ? (totalGoals / matchStats.length).toFixed(1) : "0.0"} pr. kamp`}
            icon="/target.svg"
            iconAlt="Mål icon"
          />
          <StatCard
            title="Assists"
            body={totalAssists}
            footer={`Snit ${matchStats.length > 0 ? (totalAssists / matchStats.length).toFixed(1) : "0.0"} pr. kamp`}
            icon="/active-players.svg"
            iconAlt="Assists icon"
          />
          <StatCard
            title="Skud"
            body={totalShots}
            footer={`Snit ${matchStats.length > 0 ? (totalShots / matchStats.length).toFixed(1) : "0.0"} pr. kamp`}
            icon="/target.svg"
            iconAlt="Skud icon"
          />
          <StatCard
            title="Skudprocent"
            body={`${shotPercent}%`}
            footer={`${totalGoals} mål på ${totalShots} skud`}
            icon="/shield.svg"
            iconAlt="Skudprocent icon"
          />
        </section>

        <section className={styles.contentGrid}>
          <div className={styles.leftColumn}>
            <article className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>Seneste kampe</h2>
                <p>Oversigt over spillerens seneste kampe</p>
              </div>
              {matchStats.length === 0 ? (
                <p className={styles.mutedText}>Ingen kampdata endnu.</p>
              ) : (
                <div className={styles.matchList}>
                  {matchStats.map((match) => (
                    <div key={match.matchId} className={styles.matchRow}>
                      <div>
                        <p className={styles.matchOpponent}>{match.opponent}</p>
                        <p className={styles.mutedText}>{formatDate(match.matchDate)}</p>
                      </div>
                      <strong className={styles.matchScore}>
                        {match.scoreHome} - {match.scoreAway}
                      </strong>
                      <p className={styles.matchStats}>
                        {match.goals} mål · {match.assists} assists ·{" "}
                        {match.shots} skud · {match.minutesPlayed} min
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <button className={styles.secondaryButton}>Se alle kampe</button>
            </article>
          </div>

          <aside className={styles.rightColumn}>
            <PlayerSeasonGraph matchStats={matchStats} title="Sæsonoversigt" />
            <article className={styles.card}>
              <div className={styles.cardHeader}><h2>Disciplin</h2></div>
              <div className={styles.disciplineGrid}>
                <div>
                  <strong>{totalSuspension}</strong>
                  <span>min. udvisning</span>
                  <p className={styles.disciplineDetail}>
                    {totalSuspension === 0 ? "Ingen udvisninger" : `Udvist i alt ${totalSuspension} minutter`}
                  </p>
                </div>
                <div>
                  <strong>{totalRedCards}</strong>
                  <span>røde kort</span>
                  <p className={styles.disciplineDetail}>
                    {totalRedCards === 0 ? "Ingen røde kort" : `${totalRedCards} rødt kort`}
                  </p>
                </div>
                <div>
                  <strong>{totalMinutes}</strong>
                  <span>min. spilletid</span>
                  <p className={styles.disciplineDetail}>
                    Snit {matchStats.length > 0 ? Math.round(totalMinutes / matchStats.length) : 0} min. pr. kamp
                  </p>
                </div>
              </div>
            </article>
          </aside>
        </section>

      </main>
    </>
  );
}