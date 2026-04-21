import StatCard from "../components/StatCard.jsx";
import BarChart from "../components/SeasonGraph.jsx";


export default function Home() {
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
        title={['Sæsonresultat']}
      />
    </>
  );
}
