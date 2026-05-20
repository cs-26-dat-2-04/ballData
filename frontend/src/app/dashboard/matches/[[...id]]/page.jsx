"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./matchstats.module.css";

import MatchPageClient from "../../../../components/PageClient/MatchPageClient.jsx";
import { redirect } from "next/navigation";
import { getMe } from "../../../../server-services/authService.js";
import { getMatches } from "../../../../server-services/matchService.js";
import { getPlayers } from "../../../../server-services/playerService.js";


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
      {
        title: "Skud",
        value: 27,
        footer: "Snit 9.0 pr. kamp",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#D0F0E6"><path d="m368-4-70-40 120-208-68-40-60 104-70-40 206-356q-38-39-57-89t-19-103q0-36 9-71.5t29-68.5l68 40q-14 23-20 47.5t-6 50.5q0 53 26 99.5t74 74.5l90 52q62 36 91 103.5T740-322q0 38-10 74t-28 68l-70-40q14-24 20-49t6-51q0-32-9-62t-29-56L368-4Zm272-596q-33 0-56.5-23.5T560-680q0-33 23.5-56.5T640-760q33 0 56.5 23.5T720-680q0 33-23.5 56.5T640-600ZM540-800q-26 0-43-18t-17-42q0-26 18-43t42-17q26 0 43 18t17 42q0 26-18 43t-42 17Z"/></svg>',
      },

      {
        title: "Mål",
        value: 18,
        footer: "Snit 6.8 pr. kamp",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm200-500 54-18 16-54q-32-48-77-82.5T574-786l-54 38v56l160 112Zm-400 0 160-112v-56l-54-38q-54 17-99 51.5T210-652l16 54 54 18Zm-42 308 46-4 30-54-58-174-56-20-40 30q0 65 18 118.5T238-272Zm293 108q25-4 49-12l28-60-26-44H378l-26 44 28 60q24 8 49 12t51 4q26 0 51-4ZM390-360h180l56-160-146-102-144 102 54 160Zm332 88q42-50 60-103.5T800-494l-40-28-56 18-58 174 30 54 46 4Z"/></svg>',
      },

      {
        title: "Redninger",
        value: 6,
        footer: "Målmandens bedste kamp",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M324-111.5Q251-143 197-197t-85.5-127Q80-397 80-480t31.5-156Q143-709 197-763t127-85.5Q397-880 480-880t156 31.5Q709-817 763-763t85.5 127Q880-563 880-480t-31.5 156Q817-251 763-197t-127 85.5Q563-80 480-80t-156-31.5ZM480-160q54 0 104-17.5t92-50.5L228-676q-33 42-50.5 92T160-480q0 134 93 227t227 93Zm252-124q33-42 50.5-92T800-480q0-134-93-227t-227-93q-54 0-104 17.5T284-732l448 448ZM480-480Z"/></svg>',
      },

      {
        title: "Fejl",
        value: 4,
        footer: "Holdet holdt fokus",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M320-80q-33 0-56.5-23.5T240-160v-640q0-33 23.5-56.5T320-880h320q33 0 56.5 23.5T720-800v640q0 33-23.5 56.5T640-80H320Zm0-80h320v-640H320v640Zm0 0v-640 640Z"/></svg>',
      },
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
        content: "Mikkel er Fkn sej",
        createdAt: "2024-03-12",
      },
      {
        id: "n2",
        content: "Tue er bare stadig sejere",
        createdAt: "2024-03-16",
      },
    ],
    discipline: {
      suspensions: 3,
      redCards: 0,
      freethrow: 8,
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

function StatCard({ title, value, footer, icon }) {
  return (
    <article className={styles.statCard}>
      <div className={styles.statCardTop}>
        <div>
          <span className={styles.statCardTitle}>{title}</span>
          <p className={styles.statCardValue}>{value}</p>
        </div>

        {icon ? (
          <div
            className={styles.statCardIcon}
            dangerouslySetInnerHTML={{ __html: icon }}
          />
        ) : null}
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



export default async function Matches({ params }) {
  const { id } = await params;

  if (id?.[1] !== undefined) {
    redirect("/matches");
  }
  
  const matchId = id?.[0];
  const isOverview = !matchId;
  const title = isOverview ? "Kampe" : "Kampdetaljer";

  let matches = [];
  let players = [];
  let error = null;

  let teamId;

  if (isOverview) {
    try {
      const { coach } = await getMe();
      teamId = coach.team.id;
      if (!coach.team) {
        redirect("/create-team");
      }

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

      matches = await getMatches(teamId);
      players = await getPlayers(teamId);
    } catch (err) {
      error = err.message;
    }
  }

  return (
    <>
      <title>{title}</title>
      <div className="main-container">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {isOverview ? (
          <>
            <MatchPageClient matches={matches} players={players} teamId={teamId} />
          </>
        ) : (
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
                    {!inviteLink ? (
                      <button
                        className={styles.inviteButton}
                        onClick={generateInviteLink}
                      >
                        Generer forældre-link
                      </button>
                    ) : (
                      <>
                        <input
                          className={styles.inviteInput}
                          value={inviteLink}
                          readOnly
                        />
          
                        <button className={styles.copyButton} onClick={copyInviteLink}>
                          {copied ? "Kopieret" : "Kopiér"}
                        </button>
          
                        <button
                          className={styles.closeInviteButton}
                          onClick={() => {
                            setInviteLink("");
                            setCopied(false);
                          }}
                          aria-label="Luk invite link"
                        >
                          Luk
                        </button>
                      </>
                    )}
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
                        icon={card.icon}
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
                                <p className={styles.emptyPanelText}>
                                  Ingen noter endnu.
                                </p>
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
                                <div className={styles.substitutionPlayers}>
                                  <div className={styles.substitutionOut}>
                                    <span className={styles.substitutionLabel}>UD</span>
                                    <strong>{change.from}</strong>
                                  </div>
          
                                  <div className={styles.substitutionIn}>
                                    <span className={styles.substitutionLabel}>IND</span>
                                    <strong>{change.to}</strong>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </Panel>
          
                      <Panel title="Disciplin" subtitle="Kort og frikast">
                        <div className={styles.disciplineGrid}>
                          <div>
                            <strong>{match.discipline.suspensions}</strong>
                            <span>2 minutters udvisninger</span>
                          </div>
          
                          <div>
                            <strong>{match.discipline.redCards}</strong>
                            <span>Røde kort</span>
                          </div>
          
                          <div>
                            <strong>{match.discipline.freethrow}</strong>
                            <span>Frikast</span>
                          </div>
                        </div>
                      </Panel>
                    </aside>
                  </section>
         </main>
        )}
      </div>
    </>
  );
}
