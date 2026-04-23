export default function Dashboard() {
  
  return (
    <html 
    lang="en"
    className="__variable_188709 __variable_9a8899 h-full antialiased"
    >
        <head>
            <title>Coach Dashboard</title>
        </head>
        <body className="min-h-full flex flex-col vc-init">
            <header className="ballData-header">
                <div>
                    <h3>ballData</h3>
                    <a style={{color:"var(--muted)"}}>Sæson {CurrentSeasonString()}</a>
                </div>
                <div style={{marginLeft:"auto", alignSelf:"center"}}>
                    <a style={{color:"var(--hint)"}}>Sidst opdateret: {UpdateTime(new Date())}</a> {/*new date() so far, but needs to be changed when data actually gets updated*/}
                </div>
            </header>
            <div className="dashboard-container">
                
                {/*tilføj komponenter her*/}
            </div>
        </body>
    </html>
  );
}

function CurrentSeasonString()
{
    let currentDate = new Date();
    
    //new season starts in september as far as I could find
    return 8 <= currentDate.getMonth() ? 
        `${currentDate.getFullYear()}/${currentDate.getFullYear() + 1}` : 
        `${currentDate.getFullYear() - 1}/${currentDate.getFullYear()}`;
}

function UpdateTime(updateDate)
{
    const weekDays = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"];
    const currentDate = new Date();
    let updateDateString = updateDate.getDay() === currentDate.getDay() ? "I dag" : weekDays[updateDate.getDay()];

    let updateTimeString = `${updateDate.getHours() + updateDate.getTimezoneOffset() / 60}:`; 
    updateTimeString += updateDate.getMinutes() <= 9 ?
        `0${updateDate.getMinutes()}` : 
        updateDate.getMinutes();

    return `${updateDateString}, ${updateTimeString}`;
}