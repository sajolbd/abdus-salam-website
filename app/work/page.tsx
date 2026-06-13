import React from "react";
import FeaturedWork from "components/FeaturedWork";
import ProcessSection from "components/ProcessSection";
import PricingSection from "components/PricingSection";
import MarqueeSection from "components/MarqueeSection";

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[#0C0C0E]">
      <FeaturedWork />
      <MarqueeSection />
      <ProcessSection />
      <PricingSection />
    </main>
  );
}
