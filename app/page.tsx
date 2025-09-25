import FooterOne from "./components/FooterOne";
import FooterTwo from "./components/FooterTwo";
import Generate from "./components/Generate";
import HeroCarousel from "./components/HeroCarousal";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroCarousel />
      <Generate />
      <FooterOne />
      <FooterTwo />
    </div>
  );
}
