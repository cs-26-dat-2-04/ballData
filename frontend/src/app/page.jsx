import StatCard from "../components/StatCard.jsx";
import BarChart from "../components/SeasonGraph.jsx";
import Matches from "../components/MatchCollection.jsx";


export default function Home() {

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

  return (
    <>
      <StatCard
        title={"Sejrsrate"}
        body={"64.3%"}
        footer={"18V - 7T - 3U"}
        icon={"/icon1.jpg"}
        iconAlt={"Win rate icon"}
      />
      <BarChart 
        labels={['Sejre', 'Nederlag', 'Uafgjort']}
        data={[18, 7, 3]}
        bdcolor={['rgb(75, 156, 120)', 'rgb(209, 86, 80)', 'rgb(155, 160, 172)']}
        bgcolor={['rgb(75, 156, 120, 1)', 'rgb(209, 86, 80, 1)', 'rgb(155, 160, 172, 1)']}
        title={'Sæsonresultat'}
      />
      <Matches data={match_res}>
      </Matches>
    </>
  );
}
