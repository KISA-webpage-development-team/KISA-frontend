// sub-ui components
import HomeCarousel from "../components/Home/HomeCarousel";
import QuickLinks from "../components/Home/QuickLinks";
import BoardsSummary from "../components/Home/BoardsSummary";
import SchoolCalendar from "../components/Home/SchoolCalendar";
import SponsorCarousel from "../components/Home/SponsorCarousel";
import "./home.css";

export default function Home() {
  return (
    <section
      className="h-full w-full 
    flex flex-col items-center
     gap-8 md:gap-8 -mt-2"
    >
      <HomeCarousel />
      <BoardsSummary />
      <SponsorCarousel />
      <SchoolCalendar />
      <QuickLinks />
    </section>
  );
}
