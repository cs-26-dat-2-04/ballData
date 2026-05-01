import styles from "../Header/header.module.css";


export default function Header() {
  return (
    <>
    <header className={styles.ballDataHeader}>
          <div>
            <h3>ballData</h3>
            <a style={{ color: "var(--muted)" }}>
              Sæson {currentSeasonString()}
            </a>
          </div>
          <div style={{ marginLeft: "auto", alignSelf: "center" }}>
            <a style={{ color: "var(--hint)" }}>
              Sidst opdateret: {updateTime(new Date())}
            </a>{" "}
            {/*new date() so far, but needs to be changed when data actually gets updated*/}
          </div>
        </header>
    </>
  )}

  function currentSeasonString() {
  let currentDate = new Date();

  //new season starts in september as far as I could find
  return 8 <= currentDate.getMonth()
    ? `${currentDate.getFullYear()}/${currentDate.getFullYear() + 1}`
    : `${currentDate.getFullYear() - 1}/${currentDate.getFullYear()}`;
}

function updateTime(updateDate) {
  const weekDays = [
    "Mandag",
    "Tirsdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lørdag",
    "Søndag",
  ];
  const currentDate = new Date();
  let updateDateString =
    updateDate.getDay() === currentDate.getDay()
      ? "I dag"
      : weekDays[updateDate.getDay()];

  let updateTimeString = `${updateDate.getHours() + updateDate.getTimezoneOffset() / 60}:`;
  updateTimeString +=
    updateDate.getMinutes() <= 9
      ? `0${updateDate.getMinutes()}`
      : updateDate.getMinutes();

  return `${updateDateString}, ${updateTimeString}`;
}