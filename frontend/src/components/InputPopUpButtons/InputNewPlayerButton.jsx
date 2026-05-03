"use client";

import Popup from "reactjs-popup";
import styles from "./inputPopUpButtons.css";

export default function PopUpInputPlayer() {
  return (
    <>
      <Popup
        trigger={<button className="trigger-button">Tilføj spiller</button>}
        position="right center"
        modal
        nested
      >
        {(close) => (
          <div className="modal">
            <div className="header">
              Tilføj spiller
              <button className="close" onClick={close}>
                &times;
              </button>{" "}
            </div>
            <form
              autoComplete="off"
              action={(data) => {
                if (test(data)) close();
              }}
            >
              <div className="content">
                <a className="disclaimer">* påkrævede felter</a>
                <div className="input-container">
                  <label>Navn: </label>
                  <div className="inputBox">
                    {/*only allows input with letters A-Z, a-z, æøå, and ÆØÅ*/}
                    <input
                      type="text"
                      name="name"
                      pattern="[A-Za-zæøåÆØÅ]*"
                      required
                    />
                    <a className="disclaimer"> *</a>
                  </div>
                  <label>Position: </label>
                  <div className="inputBox">
                    {/*no restrictions, just has to be filled*/}
                    <input type="text" name="position" required />
                    <a className="disclaimer"> *</a>
                  </div>
                  <label>Spiller nummer: </label>
                  <div className="inputBox">
                    {/*not required, but has to be number and max 50*/}
                    <input type="number" min="0" max="50" name="jerseyNumber" />
                  </div>
                </div>
              </div>
              <input className="button" type="submit" value="Færdig"></input>
            </form>
          </div>
        )}
      </Popup>
    </>
  );
}

function test(data) {
  console.log(data);
  return true;
}
