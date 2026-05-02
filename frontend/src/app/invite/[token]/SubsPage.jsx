"use client"

import PlayerColl from '../../../components/PlayerCollection/PlayerColl.jsx';
import Back from '../../../components/BackButton/BackButton.jsx';
import SubsTable from "./SubsTablePage.jsx";
import React, { useState } from "react";
import styles from "./page.module.css";

export default function SubsPage({ onClose, playerIn, playerOut, closePrev }) {
  const [activeModal, setActiveModal] = useState(null);

  return (
      <>
        <div className={styles.containerBack}>
            <Back onClose={onClose}/>
        </div>
        <div className={styles.containerColumn}>
            <h1 className={styles.pageHeader}>Udskiftninger-Ud</h1>
            <PlayerColl 
            onClick={() => setActiveModal("foulTable")}
            data={playerIn}/>
        </div>
        {activeModal === "foulTable" && (
            <div className={styles.modal}>
                <SubsTable onClose={() => setActiveModal(null)} closePrev={closePrev} playerOut={playerOut} />
            </div>
        )}
      </>
    )
}