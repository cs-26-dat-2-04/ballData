import seasonStyles from "./SeasonStats.module.css";
import SeasonStats from "./SeasonStats.jsx";

export default function StatsCollection({ stats }) {
  return (
    <article className={seasonStyles.card}>
      <div className={seasonStyles.cardHeader}>
        <span className={seasonStyles.cardTitle}>Sæsonstatistik</span>
      </div>
      <ul className={seasonStyles.statList}>
        <SeasonStats label="Samlede mål" value={stats.goals} />
        <SeasonStats label="Skud på mål" value={stats.shotsOnGoal} />
        <SeasonStats label="Skud forbi mål" value={stats.shotsOffGoal} />
        <SeasonStats label="Målmandsredninger" value={stats.saves} />
        <SeasonStats label="Samlede fejl" value={stats.fouls} />
        <SeasonStats
          label="2 min udvisninger"
          value={stats.redCards} // TODO: Ændre til udvisninger
          color="var(--caution)"
        />
        <SeasonStats
          label="Røde kort"
          value={stats.redCards}
          color="var(--red)"
          dividerAfter={false}
        />
      </ul>
    </article>
  );
}
