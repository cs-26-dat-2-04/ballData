"use client";

import Popup from "reactjs-popup";
import styles from "./inputPopUpButton.module.css";
import { useState } from "react";
import { createMatch } from "../../services/matchService.js"


export default function InputNewMatchButton({ teamId, onMatchAdded }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nowDate = new Date();
  
  const timeString = (nowDate.getHours() > 9
      ? nowDate.getHours()
      : "0" + nowDate.getHours())
    + ":" +
    (nowDate.getMinutes() > 9
      ? nowDate.getMinutes()
      : "0" + nowDate.getMinutes())
    
  const dateString = nowDate.getFullYear()
    + "-" +
    (nowDate.getMonth() > 8
      ? (nowDate.getMonth() + 1)
      : "0" + (nowDate.getMonth() + 1))
    + "-" +
    (nowDate.getDate() > 9
      ? nowDate.getDate()
      : "0" + nowDate.getDate())
  

  function handleRadioChange(event){
    let homeRadioButton = document.querySelector("#inp-home").parentNode.parentNode;
    let awayRadioButton = document.querySelector("#inp-away").parentNode.parentNode;

    switch (event.target.value){
        case "home":
            homeRadioButton.style.backgroundColor = "var(--ice)";
            awayRadioButton.style.backgroundColor = "";
            break;
        case "away":
            homeRadioButton.style.backgroundColor = "";
            awayRadioButton.style.backgroundColor = "var(--ice)";
            break;
    }
  }

  async function handleSubmit(formData, close) {
    setError("");
    setLoading(true);

    const opponent = formData.get("opponent").trim();
    const date = formData.get("date");
    const time = formData.get("time");
    const location = formData.get("home")
      ? "home"
      : "away";
    const scoreHome = 1;
    const scoreAway = 0;
    console.log(opponent);
    console.log(date);
    console.log(time);
    console.log(location);


    try {
      const newMatch = await createMatch(teamId, {
        opponent: opponent, 
        match_date: date,
        location: location,
        score_home: scoreHome,
        score_away: scoreHome,
      });
      onMatchAdded(newMatch);
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
          Tilføj Ny Kamp
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
                  fill="#000000"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  >
                    <path d="M19,4H17V3a1,1,0,0,0-2,0V4H9V3A1,1,0,0,0,7,3V4H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4Zm1,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V12H20Zm0-9H4V7A1,1,0,0,1,5,6H7V7A1,1,0,0,0,9,7V6h6V7a1,1,0,0,0,2,0V6h2a1,1,0,0,1,1,1Z"/> 
                </svg>
              </div>
              <div>
                <h2 className={styles.modalTitle}>Tilføj Ny Kamp</h2>
                <p className={styles.modalSubtitle}>
                  Udfyld kampens detaljer
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
                <label className={styles.label} htmlFor="inp-opponent">
                  Modstander <span className={styles.required}>*</span>
                </label>
                <input
                  id="inp-opponent"
                  className={styles.input}
                  type="text"
                  name="opponent"
                  pattern="[A-Za-zæøåÆØÅ\s]*"
                  placeholder="Modstander Klubnavn"
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <div className={styles.twoFields}>
                    <div>
                        <label className={styles.label} htmlFor="inp-date">
                        Dato <span className={styles.required}>*</span>
                        </label>
                        <input
                        id="inp-date"
                        className={styles.input}
                        type="date"
                        name="date"
                        defaultValue={dateString}
                        required
                        />
                    </div>
                    <div>
                        <label className={styles.label} htmlFor="inp-time">
                        Tidspunkt <span className={styles.required}>*</span>
                        </label>
                        <input
                        id="inp-time"
                        className={styles.input}
                        type="time"
                        name="time"
                        defaultValue={timeString}
                        required
                        />
                    </div>
                </div>
              </div>
            
              <div className={styles.fieldGroup}>
                <span className={styles.label}>Lokation <span className={styles.required}>*</span></span>
                <div className={styles.twoFields}>
                    <label className={styles.radioButton} style={{backgroundColor:"var(--ice)"}} htmlFor="inp-home">
                        <div>
                            <input
                            id="inp-home"
                            type="radio"
                            name="location"
                            value="home"
                            onChange={handleRadioChange}
                            defaultChecked
                            />Hjemmebane
                        </div>
                    </label>
        
                    <label className={styles.radioButton} htmlFor="inp-away">
                        <div>
                            <input
                            id="inp-away"
                            type="radio"
                            name="location"
                            value="away"
                            onChange={handleRadioChange}
                            />Udebane
                        </div>
                    </label>
                </div>
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
