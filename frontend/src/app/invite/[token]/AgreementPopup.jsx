"use client";

import Accept from "../../../components/AgreementButtons/AcceptButton.jsx";
import Decline from "../../../components/AgreementButtons/DeclineButton.jsx";
import styles from "./page.module.css";

export default function AgreementPopup({
  onClose,
  matchID,
  time,
  sendJsonMessage,
}) {
  return (
    <>
      <div className={styles.containerColumn}>
        <p className={styles.headerBody}>Vil du gerne afslutte kampen?</p>
      </div>
      <div className={styles.containerRow}>
        <Accept
          body={"Acceptere"}
          bdColor={"rgb(29, 158, 117)"}
          sendJsonMessage={sendJsonMessage}
          matchID={matchID}
          timeMatch={time}
          onClose={onClose}
        />
        <Decline
          body={"Afvis"}
          bdColor={"rgb(232, 67, 12)"}
          onClose={onClose}
        />
      </div>
    </>
  );
}
