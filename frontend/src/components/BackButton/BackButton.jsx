"use client";

import styles from "./back.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BackButton() {
  // The backend will insert the values into the parameters.
    const router = useRouter();

  return (
    // We are currently using placeholders until we link frontend to backend
        <button 
        onClick={() => router.back()}
        className={styles.iconContainer}>
            <Image src={"/backApp.svg"} width={40} height={40} alt={"Back button icon"} />
        </button>
  );
}