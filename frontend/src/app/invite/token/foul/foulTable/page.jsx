import PlayerColl from '../../playerCollection/PlayerColl.jsx'
import Back from '../../../../../components/BackButton/BackButton.jsx'
import styles from "../../page.module.css";

let players = [
  {
    id: "5ab46e31-391c-46a7-8e45-db9ada07626d",
    pName: "Pelle Pedersen",
    jerseyNum: "69"
  },
  {
    id: "58aacbcd-2344-40f1-a9e9-11c70d44cbb4",
    pName: "Magnus Pedersen",
    jerseyNum: "67"
  },
  {
    id: "58aacbcd-2344-40f1-a9e9-11c70d44cbb3",
    pName: "Erik Pedersen",
    jerseyNum: "65"
  },
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    pName: "Lars Jensen",
    jerseyNum: "7"
  },
  {
    id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    pName: "Søren Nielsen",
    jerseyNum: "11"
  },
  {
    id: "c3d4e5f6-a7b8-9012-cdef-123456789012",
    pName: "Anders Hansen",
    jerseyNum: "23"
  },
  {
    id: "d4e5f6a7-b8c9-0123-defa-234567890123",
    pName: "Mikkel Christensen",
    jerseyNum: "4"
  },
  {
    id: "e5f6a7b8-c9d0-1234-efab-345678901234",
    pName: "Rasmus Andersen",
    jerseyNum: "17"
  },
  {
    id: "f6a7b8c9-d0e1-2345-fabc-456789012345",
    pName: "Kasper Thomsen",
    jerseyNum: "3"
  },
  {
    id: "a7b8c9d0-e1f2-3456-abcd-567890123456",
    pName: "Nicolai Larsen",
    jerseyNum: "99"
  },
  {
    id: "b8c9d0e1-f2a3-4567-bcde-678901234567",
    pName: "Frederik Møller",
    jerseyNum: "14"
  },
  {
    id: "c9d0e1f2-a3b4-5678-cdef-789012345678",
    pName: "Oliver Kristensen",
    jerseyNum: "88"
  },
  {
    id: "d0e1f2a3-b4c5-6789-defa-890123456789",
    pName: "Christian Madsen",
    jerseyNum: "5"
  },
  {
    id: "e1f2a3b4-c5d6-7890-efab-901234567890",
    pName: "Emil Rasmussen",
    jerseyNum: "21"
  },
  {
    id: "f2a3b4c5-d6e7-8901-fabc-012345678901",
    pName: "Victor Jørgensen",
    jerseyNum: "10"
  },
  {
    id: "a3b4c5d6-e7f8-9012-abcd-123456789012",
    pName: "Mathias Petersen",
    jerseyNum: "33"
  },
  {
    id: "b4c5d6e7-f8a9-0123-bcde-234567890123",
    pName: "Jonas Olsen",
    jerseyNum: "8"
  },
  {
    id: "c5d6e7f8-a9b0-1234-cdef-345678901234",
    pName: "Tobias Sørensen",
    jerseyNum: "44"
  },
  {
    id: "d6e7f8a9-b0c1-2345-defa-456789012345",
    pName: "Sebastian Berg",
    jerseyNum: "16"
  },
  {
    id: "e7f8a9b0-c1d2-3456-efab-567890123456",
    pName: "Alexander Holm",
    jerseyNum: "2"
  },
];
export default function FoulTable() {

  return (
      <>
        <div className={styles.containerBack}>
            <Back/>
        </div>
        <div className={styles.containerColumn}>
            <h1 className={styles.pageHeader}>Forseelse</h1>
            <PlayerColl route={"/invite/token"} data={players}/>
        </div>
      </>
    )
}