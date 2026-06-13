import React from "react";
import AboutSection from "components/AboutSection";
import ProcessSection from "components/ProcessSection";
import PricingSection from "components/PricingSection";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-[#0C0C0E]">
      <AboutSection />
      <ProcessSection />
      <PricingSection />
    </main>
  );
}
