"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "../../../components/Header/Header.jsx";
import styles from "./matchstats.module.css";

const MOCK_MATCHES = [
  {
    id: "m1",
    homeTeam: "Team A",
    awayTeam: "Team B",
    scoreHome: 28,
    scoreAway: 24,
    matchDate: "2024-03-01",
    location: "Hjemmebane",
    duration: "60 min",
    result: "Sejr",
    summaryCards: [
      { title: "Mål", value: 14, footer: "Snit 4.7 pr. kamp" },
      { title: "Skud", value: 27, footer: "Snit 9.0 pr. kamp" },
      { title: "Redninger", value: 6, footer: "Målmandens bedste kamp" },
      { title: "Fejl", value: 4, footer: "Holdet holdt fokus" },
    ],
    timeline: [
      { time: "04:12", text: "Team A — Mål", type: "goal" },
      { time: "11:03", text: "Team B — Mål", type: "goalAgainst" },
      { time: "18:40", text: "Team A — Mål", type: "goal" },
      { time: "27:21", text: "Udvisning til Team B", type: "card" },
      { time: "33:08", text: "Team A — Mål", type: "goal" },
      { time: "45:56", text: "Team B — Mål", type: "goalAgainst" },
      { time: "56:10", text: "Team A lukker kampen", type: "goal" },
    ],
    substitutions: [
      { time: "09:30", from: "Jonas", to: "Tue" },
      { time: "22:15", from: "Emil", to: "Mads" },
      { time: "36:00", from: "Rasmus", to: "Philip" },
      { time: "51:20", from: "Carl", to: "Noah" },
    ],
    notes: [
      {
        id: "n1",
        content:
          "God struktur i angrebet. Husk hurtigere hjemad efter afslutning.",
        createdAt: "2024-03-12",
      },
      {
        id: "n2",
        content: "Stærk afslutning på kampen og god ro i de sidste minutter.",
        createdAt: "2024-03-16",
      },
    ],
    discipline: {
      suspensions: 2,
      redCards: 0,
      minutes: 173,
    },
  },
];

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("da-DK");
}

function getBadgeTone(type) {
  if (type === "goal") return styles.timelineGoal;
  if (type === "goalAgainst") return styles.timelineAgainst;
  if (type === "card") return styles.timelineCard;
  if (type === "error") return styles.timelineError;
  return styles.timelineNeutral;
}

function StatCard({ title, value, footer }) {
  return (
    <article className={styles.statCard}>
      <div className={styles.statCardTop}>
        <div>
          <span className={styles.statCardTitle}>{title}</span>
          <p className={styles.statCardValue}>{value}</p>
        </div>
      </div>
      <span className={styles.statCardFooter}>{footer}</span>
    </article>
  );
}

function Panel({ title, subtitle, children }) {
  return (
    <article className={styles.panel}>
      <header className={styles.panelHeader}>
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </header>
      <div className={styles.panelBody}>{children}</div>
    </article>
  );
}

function createEmptyNote() {
  return {
    id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    content: "",
    createdAt: new Date().toISOString().slice(0, 10),
  };
}

export default function MatchStatsPage({ params }) {
  const { id } = params || {};
  const matchId = id?.[0];
  const match =
    MOCK_MATCHES.find((item) => item.id === matchId) || MOCK_MATCHES[0];

  const [inviteLink, setInviteLink] = useState("");
  const [copied, setCopied] = useState(false);

  const [notes, setNotes] = useState(match.notes);
  const [draftNotes, setDraftNotes] = useState(match.notes);
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  function generateInviteLink() {
    const randomId = Math.random().toString(36).slice(2, 10);
    const link = `${window.location.origin}/invite/${randomId}`;
    setInviteLink(link);
    setCopied(false);
  }

  async function copyInviteLink() {
    if (!inviteLink) return;
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
  }

  function startEditingNotes() {
    setDraftNotes(notes.map((note) => ({ ...note })));
    setIsEditingNotes(true);
  }

  function cancelEditingNotes() {
    setDraftNotes(notes.map((note) => ({ ...note })));
    setIsEditingNotes(false);
  }

  function saveNotes() {
    setNotes(draftNotes.map((note) => ({ ...note })));
    setIsEditingNotes(false);
  }

  function updateDraftNote(noteId, field, value) {
    setDraftNotes((current) =>
      current.map((note) =>
        note.id === noteId ? { ...note, [field]: value } : note,
      ),
    );
  }

  function addNote() {
    setDraftNotes((current) => [...current, createEmptyNote()]);
  }

  function removeNote(noteId) {
    setDraftNotes((current) => current.filter((note) => note.id !== noteId));
  }

  if (!match) {
    return (
      <>
        <title>Kamp ikke fundet</title>
        <Header />
        <main className={`main-container ${styles.page}`}>
          <p className={styles.emptyState}>Kampen blev ikke fundet.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <title>
        {match.homeTeam} - {match.awayTeam} | Kampstatistik
      </title>

      <Header />

      <main className={`main-container ${styles.page}`}>
        <div className={styles.topBar}>
          <Link href="/matches" className={styles.backLink}>
            ← Tilbage til kampe
          </Link>
          <span className={styles.topBarMeta}>
            {formatDate(match.matchDate)} · {match.location}
          </span>
        </div>

        <div className={styles.inviteActions}>
          <button className={styles.inviteButton} onClick={generateInviteLink}>
            Generer forældre-link
          </button>

          {inviteLink ? (
            <>
              <input
                className={styles.inviteInput}
                value={inviteLink}
                readOnly
              />

              <button className={styles.copyButton} onClick={copyInviteLink}>
                {copied ? "Kopieret" : "Kopiér"}
              </button>
            </>
          ) : null}
        </div>

        <section className={styles.hero}>
          <div className={styles.teamGrid}>
            <div className={styles.teamBlock}>
              <p className={styles.teamLabel}>Hjemmehold</p>
              <h1 className={styles.teamName}>{match.homeTeam}</h1>
            </div>

            <div className={styles.scoreBlock}>
              <p className={styles.score}>
                {match.scoreHome} - {match.scoreAway}
              </p>
              <span className={styles.resultBadge}>{match.result}</span>
            </div>

            <div className={styles.teamBlockRight}>
              <p className={styles.teamLabel}>Udehold</p>
              <h1 className={styles.teamName}>{match.awayTeam}</h1>
            </div>
          </div>

          <div className={styles.metaRow}>
            <span>{formatDate(match.matchDate)}</span>
            <span>{match.location}</span>
            <span>{match.duration}</span>
          </div>
        </section>

        <section className={styles.summaryGrid}>
          {match.summaryCards.map((card) => (
            <StatCard
              key={card.title}
              title={card.title}
              value={card.value}
              footer={card.footer}
            />
          ))}
        </section>

        <section className={styles.contentGrid}>
          <div className={styles.leftColumn}>
            <Panel
              title="Kampforløb"
              subtitle="Oversigt over kampens vigtigste hændelser"
            >
              <div className={styles.timelineList}>
                {match.timeline.map((event) => (
                  <div
                    key={`${event.time}-${event.text}`}
                    className={styles.timelineRow}
                  >
                    <span className={styles.timelineTime}>{event.time}</span>
                    <div
                      className={`${styles.timelineBadge} ${getBadgeTone(
                        event.type,
                      )}`}
                    >
                      {event.text}
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            <article className={styles.panel}>
              <header className={styles.panelHeaderWithButton}>
                <div>
                  <h2>Noter</h2>
                  <p>Coachens noter om kampen</p>
                </div>

                {!isEditingNotes ? (
                  <button
                    className={styles.editButton}
                    onClick={startEditingNotes}
                  >
                    Rediger
                  </button>
                ) : (
                  <div className={styles.editActionRow}>
                    <button className={styles.addButton} onClick={addNote}>
                      + Tilføj note
                    </button>
                    <button className={styles.saveButton} onClick={saveNotes}>
                      Gem
                    </button>
                    <button
                      className={styles.cancelButton}
                      onClick={cancelEditingNotes}
                    >
                      Annuller
                    </button>
                  </div>
                )}
              </header>

              <div className={styles.panelBody}>
                {isEditingNotes ? (
                  <div className={styles.noteEditList}>
                    {draftNotes.length === 0 ? (
                      <p className={styles.emptyPanelText}>Ingen noter endnu.</p>
                    ) : (
                      draftNotes.map((note) => (
                        <div key={note.id} className={styles.noteEditor}>
                          <div className={styles.noteEditorTop}>
                            <input
                              type="date"
                              className={styles.noteDateInput}
                              value={note.createdAt}
                              onChange={(e) =>
                                updateDraftNote(
                                  note.id,
                                  "createdAt",
                                  e.target.value,
                                )
                              }
                            />
                            <button
                              className={styles.removeButton}
                              onClick={() => removeNote(note.id)}
                            >
                              Fjern
                            </button>
                          </div>

                          <textarea
                            className={styles.noteTextarea}
                            value={note.content}
                            onChange={(e) =>
                              updateDraftNote(
                                note.id,
                                "content",
                                e.target.value,
                              )
                            }
                            rows={4}
                            placeholder="Skriv en note..."
                          />
                        </div>
                      ))
                    )}
                  </div>
                ) : notes.length === 0 ? (
                  <p className={styles.emptyPanelText}>Ingen noter endnu.</p>
                ) : (
                  <div className={styles.noteList}>
                    {notes.map((note) => (
                      <div key={note.id} className={styles.noteItem}>
                        <p>{note.content}</p>
                        <span>{formatDate(note.createdAt)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </article>
          </div>

          <aside className={styles.rightColumn}>
            <Panel
              title="Udskiftninger"
              subtitle="Ind- og udskiftninger under kampen"
            >
              {match.substitutions.length === 0 ? (
                <p className={styles.emptyPanelText}>
                  Ingen udskiftninger registreret.
                </p>
              ) : (
                <div className={styles.substitutionList}>
                  {match.substitutions.map((change) => (
                    <div
                      key={`${change.time}-${change.from}-${change.to}`}
                      className={styles.substitutionItem}
                    >
                      <span className={styles.substitutionTime}>
                        {change.time}
                      </span>
                      <p>
                        {change.from} → {change.to}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Panel>

            <Panel title="Disciplin" subtitle="Kort og spilletid">
              <div className={styles.disciplineGrid}>
                <div>
                  <strong>{match.discipline.suspensions} min</strong>
                  <span>Udvisninger</span>
                </div>

                <div>
                  <strong>{match.discipline.redCards}</strong>
                  <span>Røde kort</span>
                </div>

                <div>
                  <strong>{match.discipline.minutes}</strong>
                  <span>Minutter</span>
                </div>
              </div>
            </Panel>
          </aside>
        </section>
      </main>
    </>
  );
}