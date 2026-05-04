import seasonStyles from "./SeasonStats.module.css";
import SeasonStats from "./SeasonStats.jsx";

export default function StatsCollection() {
  return (
    <article className={seasonStyles.card}>
      <div className={seasonStyles.cardHeader}>
        <span className={seasonStyles.cardTitle}>Sæsonstatistik</span>
      </div>
      <ul className={seasonStyles.statList}>
        <SeasonStats label="Samlede mål" value={567} />
        <SeasonStats label="Skud på mål" value={1098} />
        <SeasonStats label="Skud forbi mål" value={301} />
        <SeasonStats label="Målmandsredninger" value={473} />
        <SeasonStats label="Samlede fejl" value={173} />
        <SeasonStats label="2 min udvisninger" value={43} color="var(--caution)" />
        <SeasonStats label="Røde kort" value={3} color="var(--red)" dividerAfter={false} />
      </ul>
    </article>
  );
}