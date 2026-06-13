import React from "react";
import Services from "components/Services";
import ProcessSection from "components/ProcessSection";
import PricingSection from "components/PricingSection";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#0C0C0E]">
      <Services />
      <ProcessSection />
      <PricingSection />
    </main>
  );
}
