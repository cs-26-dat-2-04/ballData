"use client";

import { useState, useMemo } from "react";
import PlayerCollection from "../Collections/PlayerCollection.jsx";
import InputNewPlayerButton from "../InputPopUpButtons/InputNewPlayerButton.jsx";
import styles from "./teamPageClient.module.css";

export default function TeamPageClient({ players: initialPlayers, teamId }) {
  const [players, setPlayers] = useState(initialPlayers);
  const [query, setQuery] = useState("");

  function handlePlayerAdded(newPlayer) {
    setPlayers((prev) => [...prev, newPlayer]);
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return players;
    return players.filter((p) => {
      const fullName = `${p.first_name} ${p.last_name}`.toLowerCase();
      const jersey = p.jersey_number?.toString() ?? "";
      return fullName.includes(q) || jersey.includes(q);
    });
  }, [query, players]);

  return (
    <>
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <h1 className={styles.teamTitle}>Hold Oversigt</h1>
          <p className={styles.playerCount}>
            {players.length} spillere på holdet
          </p>
        </div>
        <div className={styles.headerRight}>
          <InputNewPlayerButton
            teamId={teamId}
            onPlayerAdded={handlePlayerAdded}
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
            placeholder="Søg efter navn eller trøjenummer..."
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
              ? "Ingen spillere fundet"
              : `${filtered.length} spiller${filtered.length !== 1 ? "e" : ""} fundet`}
          </p>
        )}
      </div>

      <PlayerCollection data={filtered} />
    </>
  );
}
