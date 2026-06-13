import HeroSection from "../components/HeroSection";
import MarqueeSection from "../components/MarqueeSection";
import AboutSection from "../components/AboutSection";
import FeaturedWork from "../components/FeaturedWork";
import Services from "../components/Services";
import ProcessSection from "../components/ProcessSection";
import Testimonials from "../components/Testimonials";
import PricingSection from "components/PricingSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <FeaturedWork />
      <Services />
      <ProcessSection />
      <PricingSection />
      <Testimonials />
    </div>
  );
}


