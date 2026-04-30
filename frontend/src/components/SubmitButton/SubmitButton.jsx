"use client";

import styles from "./submit.module.css";
import { useRouter } from "next/navigation";

export default function AppCard({
  body,
  bdColor,
  foulType,
  route
}) {
  // The backend will insert the values into the parameters.

  const router = useRouter()
  const handleClick = () => {
    if (foulType.length > 0 && foulType.length < 3) {
        if ((foulType[0] === "Frikast" && foulType[1] === "Straffekast") || 
            (foulType[0] === "Straffekast" && foulType[1] === "Frikast")) {
                alert("Du kan ikke vælge straffekast og frikast på samme tid")
            } else {
                router.push(route);
            }
    } else {
        if (foulType.length === 0) {
            alert("Du skal vælge mindst en knap");
        } else {
            alert("Du kan ikke vælge alle tre knapper");
        }
    }
  }

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