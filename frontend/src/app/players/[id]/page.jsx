import Header from "../../../components/Header/Header.jsx";
import StatCard from "../../../components/StatCard/StatCard.jsx";
import PlayerSeasonGraph from "../../../components/PlayerSeasonGraph/PlayerSeasonGraph.jsx";
import styles from "./player.module.css";

const MOCK_PLAYERS = [
  {
    id: "1",
    position: "Målvogter",
    firstName: "Carl",
    lastName: "Carlsen",
    jerseyNumber: "1",
  },
  {
    id: "2",
    position: "Højre back",
    firstName: "Mikkel",
    lastName: "Hansen",
    jerseyNumber: "4",
  },
  {
    id: "3",
    position: "Venstre back",
    firstName: "Jonas",
    lastName: "Pedersen",
    jerseyNumber: "7",
  },
  {
    id: "4",
    position: "Playmaker",
    firstName: "Rasmus",
    lastName: "Nielsen",
    jerseyNumber: "13",
  },
];

const MOCK_MATCH_STATS = {
  "2": [
    {
      matchId: "m1",
      opponent: "Skanderborg Håndbold",
      matchDate: "2024-03-01",
      scoreHome: 28,
      scoreAway: 24,
      goals: 5,
      assists: 3,
      shots: 9,
      suspension: 0,
      redCards: 0,
      minutesPlayed: 55,
    },
    {
      matchId: "m2",
      opponent: "TTH Holstebro",
      matchDate: "2024-03-08",
      scoreHome: 22,
      scoreAway: 25,
      goals: 3,
      assists: 1,
      shots: 7,
      suspension: 2,
      redCards: 0,
      minutesPlayed: 58,
    },
    {
      matchId: "m3",
      opponent: "Lemvig-Thyborøn HK",
      matchDate: "2024-03-15",
      scoreHome: 31,
      scoreAway: 29,
      goals: 6,
      assists: 2,
      shots: 11,
      suspension: 0,
      redCards: 0,
      minutesPlayed: 60,
    },
  ],
};

const MOCK_NOTES = {
  "2": [
    {
      id: "n1",
      content:
        "Godt skud fra distancen. Skal arbejde på at reducere udvisninger.",
      createdAt: "2024-03-12",
    },
    {
      id: "n2",
      content: "God præstation mod Lemvig.",
      createdAt: "2024-03-16",
    },
  ],
};

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("da-DK");
}

export default async function PlayerPage({ params }) {
  const { id } = await params;

  const player = MOCK_PLAYERS.find((player) => player.id === id);
  const matchStats = MOCK_MATCH_STATS[id] ?? [];
  const notes = MOCK_NOTES[id] ?? [];

  if (!player) {
    return (
      <>
        <title>Spiller ikke fundet</title>
        <Header />
        <main className={`main-container ${styles.playerPage}`}>
          <p>Spilleren blev ikke fundet.</p>
        </main>
      </>
    );
  }

  const totalGoals = matchStats.reduce((sum, match) => sum + match.goals, 0);
  const totalAssists = matchStats.reduce(
    (sum, match) => sum + match.assists,
    0,
  );
  const totalShots = matchStats.reduce((sum, match) => sum + match.shots, 0);
  const totalSuspension = matchStats.reduce(
    (sum, match) => sum + match.suspension,
    0,
  );
  const totalRedCards = matchStats.reduce(
    (sum, match) => sum + match.redCards,
    0,
  );
  const totalMinutes = matchStats.reduce(
    (sum, match) => sum + match.minutesPlayed,
    0,
  );

  const shotPercent =
    totalShots > 0 ? Math.round((totalGoals / totalShots) * 100) : 0;

  return (
    <>
      <title>
        {player.firstName} {player.lastName} — Statistik
      </title>

      <Header />

      <main className="main-container">
        <section className={styles.playerHero}>
          <div>
            <h1>
              {player.firstName} {player.lastName}
            </h1>

            <div className={styles.playerMeta}>
              <span className={styles.positionBadge}>
                {player.position}
              </span>
              <span>#{player.jerseyNumber ?? "-"}</span>
            </div>
          </div>

          <p className={styles.matchesPlayed}>
            {matchStats.length} kampe spillet
          </p>
        </section>

        <section className={styles.statCardsContainer}>
          <StatCard
            title="Mål"
            body={totalGoals}
            footer={`Snit ${
              matchStats.length > 0
                ? (totalGoals / matchStats.length).toFixed(1)
                : "0.0"
            } pr. kamp`}
            icon="/target.svg"
            iconAlt="Mål icon"
          />

          <StatCard
            title="Assists"
            body={totalAssists}
            footer={`Snit ${
              matchStats.length > 0
                ? (totalAssists / matchStats.length).toFixed(1)
                : "0.0"
            } pr. kamp`}
            icon="/active-players.svg"
            iconAlt="Assists icon"
          />

          <StatCard
            title="Skud"
            body={totalShots}
            footer={`Snit ${
              matchStats.length > 0
                ? (totalShots / matchStats.length).toFixed(1)
                : "0.0"
            } pr. kamp`}
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
                        <p className={styles.matchOpponent}>
                          {match.opponent}
                        </p>
                        <p className={styles.mutedText}>
                          {formatDate(match.matchDate)}
                        </p>
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

              <button className={styles.secondaryButton}>
                Se alle kampe
              </button>
            </article>

            <article className={styles.card}>
                <div className={styles.cardHeaderWithButton}>
                    <div>
                        <h2>Noter</h2>
                        <p>Coachens noter om spilleren</p>
                    </div>

                    <div className={styles.noteActions}>
                        <button className={styles.addNoteButton}>Tilføj</button>
                        <button className={styles.editNotesButton}>Rediger</button>
                    </div>
                </div>

                {notes.length === 0 ? (
                    <p className={styles.mutedText}>Ingen noter endnu.</p>
                ) : (
                    <div className={styles.noteList}>
                        {notes.map((note) => (
                            <div key={note.id} className={styles.note}>
                                <p>{note.content}</p>
                                <span>{formatDate(note.createdAt)}</span>
                            </div>
                        ))}
                    </div>
                )}
            </article>
          </div>

          <aside className={styles.rightColumn}>
            <PlayerSeasonGraph matchStats={matchStats} title="Sæsonoversigt" />
            <article className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2>Disciplin</h2>
                </div>

                <div className={styles.disciplineGrid}>
                    <div>
                        <strong>{totalSuspension}</strong>
                        <span>min. udvisning</span>
                        <p className={styles.disciplineDetail}>
                            {totalSuspension === 0
                                ? "Ingen udvisninger"
                                : `Udvist i alt ${totalSuspension} minutter`}
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
                            Snit {matchStats.length > 0
                                ? Math.round(totalMinutes / matchStats.length)
                                : 0} min. pr. kamp
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