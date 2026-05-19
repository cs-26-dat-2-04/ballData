"use client";

import styles from "./submit.module.css";
import { useRouter } from "next/navigation";

export default function AppCard({
  body,
  bdColor,
  foulType,
  onClick,
  page
}) {

  const handleClick = () => {
    const hasYellow = foulType.includes("GultK");
    const hasRed = foulType.includes("RødtK");
    const hasNoCard = foulType.includes("Ingenting");
    const hasBothCards = foulType.includes("GultK") && foulType.includes("RødtK");
    const hasPenalty = foulType.includes("Straffekast");
    const hasFreeThrow = foulType.includes("Frikast");
    const hasEviction = foulType.includes("Udvisning");
    
    if (foulType.length === 0) {
      alert("Du skal vælge mindst en knap");
    } else if (foulType.length >= 4) {
      alert("Følgende kombination er ikke muligt: " + foulType.join(", "));
    } else if (hasBothCards) {
      alert("Du kan ikke vælge et gult kort og et rødt kort på samme tid");
    } else if ((hasYellow || hasRed) && hasNoCard) {
      alert("Du kan ikke vælge et gult kort og ingenting på samme tid");
    } else if (hasYellow && hasEviction) {
      alert("Du kan ikke vælge et gult kort og 2-min udvisning på samme tid");
    } else if (hasFreeThrow && hasPenalty) {
      alert("Du kan ikke vælge straffekast og frikast på samme tid");
    } else if (hasNoCard && page && !(hasEviction || hasPenalty || hasFreeThrow)) {
      alert("Tilføj frikast, straffekast eller udvisning, hvis der ikke gives kort");
    } else {
      onClick();
    }
  }

  console.log(foulType.join(", "));

  return (
    // We are currently using placeholders until we link frontend to backend
        <button 
        onClick={handleClick}
        className={styles.card}
        style={{borderColor: bdColor}}>
          <div className={styles.cardBody}>
            <p>{body ?? "-"}</p>
          </div>
        </button>
  );
}