"use client";

import styles from "./player.module.css";
import { useRouter} from "next/navigation"

export default function PlayerRow({ data, route, scores }) {
  const router = useRouter()
  const handleClick = () => {
    router.push(`${route}?scoreUs=${scores[0]}&scoreOpp=${scores[1]}`);
  }

  return (
    <>
      {data?.map((info) => (
        <button 
        onClick={handleClick} 
        className={styles.playerCard} 
        key={info.id}>
          <div className={styles.container}>
            <p className={styles.name}>{info.pName}</p>
            <p className={styles.number}>{info.jerseyNum}</p>
          </div>
        </button>
      ))}
    </>
  );
}
