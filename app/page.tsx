import HeroSection from "../components/HeroSection";
import MarqueeSection from "../components/MarqueeSection";
import AboutSection from "../components/AboutSection";
import FeaturedWork from "../components/FeaturedWork";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <FeaturedWork />
    </div>
  );
}
