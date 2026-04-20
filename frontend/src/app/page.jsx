import StatCard from "../components/StatCard.jsx";

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
    </>
  );
}
