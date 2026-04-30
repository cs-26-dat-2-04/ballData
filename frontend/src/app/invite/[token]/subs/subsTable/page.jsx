"use client";

import PlayerColl from '../../playerCollection/PlayerColl.jsx';
import Back from '../../../../../components/BackButton/BackButton.jsx';
import { useSearchParams, useParams } from "next/navigation";
import styles from "../../page.module.css";

let players = [
  {
    id: "1a2b3c4d-5e6f-7a8b-9c0d-e1f2a3b4c5d6",
    pName: "Bjarne Vestergaard",
    jerseyNum: "9"
  },
  {
    id: "2b3c4d5e-6f7a-8b9c-0d1e-f2a3b4c5d6e7",
    pName: "Flemming Dalgaard",
    jerseyNum: "22"
  },
  {
    id: "3c4d5e6f-7a8b-9c0d-1e2f-a3b4c5d6e7f8",
    pName: "Torben Kjeldsen",
    jerseyNum: "31"
  },
  {
    id: "4d5e6f7a-8b9c-0d1e-2f3a-b4c5d6e7f8a9",
    pName: "Henrik Bøgvad",
    jerseyNum: "6"
  },
  {
    id: "5e6f7a8b-9c0d-1e2f-3a4b-c5d6e7f8a9b0",
    pName: "Jeppe Nørgaard",
    jerseyNum: "18"
  },
  {
    id: "6f7a8b9c-0d1e-2f3a-4b5c-d6e7f8a9b0c1",
    pName: "Mads Fuglsang",
    jerseyNum: "77"
  },
  {
    id: "7a8b9c0d-1e2f-3a4b-5c6d-e7f8a9b0c1d2",
    pName: "Claus Aaberg",
    jerseyNum: "13"
  },
  {
    id: "8b9c0d1e-2f3a-4b5c-6d7e-f8a9b0c1d2e3",
    pName: "Niels Brøndberg",
    jerseyNum: "55"
  },
  {
    id: "9c0d1e2f-3a4b-5c6d-7e8f-a9b0c1d2e3f4",
    pName: "Preben Damgaard",
    jerseyNum: "26"
  },
  {
    id: "0d1e2f3a-4b5c-6d7e-8f9a-b0c1d2e3f4a5",
    pName: "Rune Elkjær",
    jerseyNum: "42"
  },
  {
    id: "1e2f3a4b-5c6d-7e8f-9a0b-c1d2e3f4a5b6",
    pName: "Steffen Holmgaard",
    jerseyNum: "37"
  },
  {
    id: "2f3a4b5c-6d7e-8f9a-0b1c-d2e3f4a5b6c7",
    pName: "Troels Iversen",
    jerseyNum: "19"
  },
  {
    id: "3a4b5c6d-7e8f-9a0b-1c2d-e3f4a5b6c7d8",
    pName: "Ulrik Juulsgaard",
    jerseyNum: "71"
  },
  {
    id: "4b5c6d7e-8f9a-0b1c-2d3e-f4a5b6c7d8e9",
    pName: "Vagn Kragelund",
    jerseyNum: "48"
  },
  {
    id: "5c6d7e8f-9a0b-1c2d-3e4f-a5b6c7d8e9f0",
    pName: "Bent Lykke",
    jerseyNum: "1"
  },
  {
    id: "6d7e8f9a-0b1c-2d3e-4f5a-b6c7d8e9f0a1",
    pName: "Carsten Munksgaard",
    jerseyNum: "60"
  },
  {
    id: "7e8f9a0b-1c2d-3e4f-5a6b-c7d8e9f0a1b2",
    pName: "Ditte Nørskov",
    jerseyNum: "29"
  },
  {
    id: "8f9a0b1c-2d3e-4f5a-6b7c-d8e9f0a1b2c3",
    pName: "Eigil Overgaard",
    jerseyNum: "53"
  },
  {
    id: "9a0b1c2d-3e4f-5a6b-7c8d-e9f0a1b2c3d4",
    pName: "Gunnar Primdahl",
    jerseyNum: "12"
  },
  {
    id: "0b1c2d3e-4f5a-6b7c-8d9e-f0a1b2c3d4e5",
    pName: "Loke Qvist",
    jerseyNum: "36"
  },
];

export default function PlayerIn() {
  const searchParams = useSearchParams();
  const { token } = useParams();
  let scoreUs = searchParams.get("scoreUs");
  let scoreOpp = searchParams.get("scoreOpp");

  return (
      <>
        <div className={styles.containerBack}>
            <Back/>
        </div>
        <div className={styles.containerColumn}>
            <h1 className={styles.pageHeader}>Udskiftninger-Ind</h1>
            <PlayerColl route={`/invite/${token}`} data={players} scores={[scoreUs, scoreOpp]}/>
        </div>
      </>
    )
}