import FooterOne from "./components/FooterOne";
import FooterTwo from "./components/FooterTwo";
import Generate from "./components/Generate";
import HeroCarousel from "./components/HeroCarousal";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroCarousel />
        <Generate />
      </main>

      <FooterOne />
      <FooterTwo />
    </div>
  );
}
