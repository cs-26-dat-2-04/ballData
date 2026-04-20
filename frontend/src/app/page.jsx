import Image from "next/image";
import Card from "../components/KPI-Card.jsx";

export default function Home() {
  return <Card 
            title={"Seirsrate"} 
            data={"64.3%"} 
            extra_info={"18V - 7T - 3U"}
            icon={"./icon1.jpg"}
            />
}