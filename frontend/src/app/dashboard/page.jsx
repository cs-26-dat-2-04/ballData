import StatCard from "../../components/StatCard.jsx";
import BarChart from "../../components/SeasonGraph.jsx";
import Matches from "../../components/MatchCollection.jsx";


let match_res=[
        {
            "id": "5ab46e31-391c-46a7-8e45-db9ada07626d",
            "result": "win",
            "iconAlt": "test",
            "loc": "Hjemme",
            "team": "Team 1",
            "date": "2026-04-05",
            "score": "28-24"
        },
        {
            "id": "58aacbcd-2344-40f1-a9e9-11c70d44cbb4",
            "result": "loss",
            "iconAlt": "test",
            "loc": "Ude",
            "team": "Team 2",
            "date": "2026-04-02",
            "score": "22-25"
        },
        {
            "id": "58aacbcd-2344-40f1-a9e9-11c70d44cbb3",
            "result": "draw",
            "iconAlt": "test",
            "loc": "Ude",
            "team": "Team 2",
            "date": "2026-04-02",
            "score": "22-25"
        }
    ]

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
                <div className="statCards">
                    <StatCard
                            title={"Sejrsrate"}
                            body={"64.3%"}
                            footer={"18V - 7T - 3U"}
                            icon={"/icon1.jpg"}
                            iconAlt={"Win rate icon"}
                        />
                    <StatCard
                            title={"Skudpræcision"}
                            body={"75.7%"}
                            footer={"Gns. 40.5 skud på mål pr. kamp"}
                            icon={"/icon1.jpg"}
                            iconAlt={"Win rate icon"}
                        />
                    <StatCard
                            title={"Målmandsrednings\u{000AD}procent"} //\u{000AD} is a soft hyphen that suggests where to hyphenate the word if it is too long for the textbox
                            body={"28.1%"}
                            footer={"Gns. 19.0 redninger pr. kamp"}
                            icon={"/icon1.jpg"}
                            iconAlt={"Win rate icon"}
                        />
                    <StatCard
                            title={"Aktive spillere"}
                            body={"18"}
                            footer={"2 nye denne sæson"}
                            icon={"/icon1.jpg"}
                            iconAlt={"Win rate icon"}
                        />
                </div>
                <div className="matchCollection-statistics">
                    <Matches data={match_res}>
                        </Matches>
                    <div style={{marginLeft:"auto"}}>
                        <BarChart 
                                labels={['Sejre', 'Nederlag', 'Uafgjort']}
                                data={[18, 7, 3]}
                                bdcolor={['rgb(75, 156, 120)', 'rgb(209, 86, 80)', 'rgb(155, 160, 172)']}
                                bgcolor={['rgb(75, 156, 120, 1)', 'rgb(209, 86, 80, 1)', 'rgb(155, 160, 172, 1)']}
                                title={'Sæsonresultat'}
                              />
                    </div>
                </div>
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