import seasonStyles from "./SeasonStats.module.css";

export default function SeasonStats({ label, value, color, dividerAfter = true }) {
  return (
    <li
      className={`${seasonStyles.statRow} ${dividerAfter ? seasonStyles.dividerAfter : ""}`}
    >
      <span className={seasonStyles.statLabel}>{label}</span>
      <span
        className={seasonStyles.statValue}
        style={color ? { color: color } : undefined}
      >
        {value ?? "-"}
      </span>
    </li>
  );
}