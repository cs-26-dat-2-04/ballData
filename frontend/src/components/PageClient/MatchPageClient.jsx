"use client";

import { useState, useMemo } from "react";
import MatchCollection from "../Collections/MatchCollection.jsx";
import InputNewMatchButton from "../InputPopUpButtons/InputNewMatchButton.jsx";
import styles from "./pageClient.module.css";

export default function TeamPageClient({ matches: initialMatches, players, teamId }) {
  const [matches, setMatches] = useState(initialMatches);
  const [query, setQuery] = useState("");

  function handleMatchAdded(newMatch) {
    setMatches((prev) => [newMatch, ...prev]);
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return matches;
    return matches.filter((m) => {
      const opponent = m.opponent.toLowerCase();
      const date = m.match_date.toString();
      const location = m.location;
      return opponent.includes(q) || date.includes(q);
    });
  }, [query, matches]);

  return (
    <>
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <h1 className={styles.teamTitle}>Hold Oversigt</h1>
          <p className={styles.playerCount}>
            {matches.length} kampe
          </p>
        </div>
        <div className={styles.headerRight}>
          <InputNewMatchButton
            teamId={teamId}
            players={players}
            onMatchAdded={handleMatchAdded}
          />
        </div>
      </div>

      <div className={styles.searchRow}>
        <div className={styles.searchWrapper}>
          <svg
            className={styles.searchIcon}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Søg efter modstander eller dato..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              className={styles.clearButton}
              onClick={() => setQuery("")}
              aria-label="Ryd søgning"
            >
              &times;
            </button>
          )}
        </div>
        {query && (
          <p className={styles.resultCount}>
            {filtered.length === 0
              ? "Ingen kampe fundet"
              : `${filtered.length} kamp${filtered.length !== 1 ? "e" : ""} fundet`}
          </p>
        )}
      </div>

      <MatchCollection data={filtered} />
    </>
  );
}
