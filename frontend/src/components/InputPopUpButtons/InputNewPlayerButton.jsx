"use client";

import Popup from "reactjs-popup";
import styles from "./InputNewPlayerButton.module.css";
import { useState } from "react";
import { createPlayer } from "../../services/playerService.js";

export default function InputNewPlayerButton({ teamId, onPlayerAdded }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData, close) {
    setError("");
    setLoading(true);

    const name = formData.get("name").trim();
    const nameParts = name.split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");
    const jerseyNumber = formData.get("jerseyNumber")
      ? parseInt(formData.get("jerseyNumber"))
      : undefined;

    try {
      const newPlayer = await createPlayer(teamId, {
        firstName: firstName,
        lastName: lastName,
        jerseyNumber: jerseyNumber,
      });
      onPlayerAdded(newPlayer);
      close();
    } catch (err) {
      setError(err.message || "Noget gik galt");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Popup
      trigger={
        <button className={styles.triggerButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Tilføj Spiller
        </button>
      }
      modal
      nested
      overlayStyle={{
        background: "rgba(18, 30, 58, 0.45)",
        backdropFilter: "blur(3px)",
      }}
      onOpen={() => setError("")}
    >
      {(close) => (
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <div className={styles.modalHeaderLeft}>
              <div className={styles.modalIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div>
                <h2 className={styles.modalTitle}>Tilføj Spiller</h2>
                <p className={styles.modalSubtitle}>
                  Udfyld spillerens oplysninger
                </p>
              </div>
            </div>
            <button
              className={styles.closeButton}
              onClick={close}
              aria-label="Luk"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <form
            autoComplete="off"
            className={styles.form}
            action={(formData) => handleSubmit(formData, close)}
          >
            <div className={styles.formBody}>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="inp-name">
                  Navn <span className={styles.required}>*</span>
                </label>
                <input
                  id="inp-name"
                  className={styles.input}
                  type="text"
                  name="name"
                  pattern="[A-Za-zæøåÆØÅ\s]*"
                  placeholder="Fornavn Efternavn"
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="inp-jersey">
                  Trøjenummer
                  <span className={styles.optional}>valgfri</span>
                </label>
                <input
                  id="inp-jersey"
                  className={styles.input}
                  type="number"
                  min="0"
                  max="50"
                  name="jerseyNumber"
                  placeholder="0 – 50"
                />
              </div>
            </div>

            {error && (
              <p
                style={{
                  color: "var(--red)",
                  padding: "0 24px",
                  fontSize: "14px",
                }}
              >
                {error}
              </p>
            )}

            <div className={styles.formFooter}>
              <p className={styles.requiredNote}>* påkrævede felter</p>
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={close}
                >
                  Annuller
                </button>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={loading}
                >
                  {loading ? "Tilføjer..." : "Tilføj Spiller"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </Popup>
  );
}
