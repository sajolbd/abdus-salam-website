import HeroSection from "../components/HeroSection";
import MarqueeSection from "../components/MarqueeSection";
import AboutSection from "../components/AboutSection";
import FeaturedWork from "../components/FeaturedWork";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <FeaturedWork />
      <Services />
      <Testimonials />
    </div>
  );
}
