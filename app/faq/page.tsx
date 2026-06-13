"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const faqs = [
  {
    question: "What video editing software do you use?",
    answer:
      "We utilize the industry-standard post-production suite including Adobe Premiere Pro, Adobe After Effects, DaVinci Resolve, and Audition to deliver professional-grade color grading, audio engineering, and dynamic motion graphics.",
  },
  {
    question: "What is your typical turnaround time?",
    answer:
      "Turnaround times depend on the project size. Short Form content is delivered within 3-5 days. Premium and complex campaigns typically require 7-10 business days. Custom rush deliveries can also be arranged.",
  },
  {
    question: "Can you edit vertical videos for TikTok, Reels, and Shorts?",
    answer:
      "Yes, we specialize in viral-optimized vertical editing. We design high-retention hooks, custom motion subtitles, crop-sensitive animations, and fast-paced styling specifically tailored for mobile algorithms.",
  },
  {
    question: "How do we transfer large raw video files?",
    answer:
      "We support secure cloud file transfers through Google Drive, Dropbox, WeTransfer, and specialized post-production collaboration platforms like Frame.io.",
  },
  {
    question: "What is your revisions policy?",
    answer:
      "Standard packages include 2 rounds of refinement. Premium packages offer unlimited adjustments. We work closely with you via frame-accurate review timestamps to guarantee you are 100% satisfied with the final cut.",
  },
  {
    question: "Do you offer custom pricing packages?",
    answer:
      "Absolutely. If your requirements don't fit into our standard pricing tabs, we will analyze your budget, timeline, and delivery specifications to customize a bespoke editing plan tailored exactly to your brand.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main
      className={`${plusJakarta.className} min-h-screen bg-[#0C0C0E] text-white py-12 px-6 sm:px-12 md:px-16 relative`}
    >
      {/* Background glow effects */}
      <div className="absolute top-[10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-to-br from-[#FF5C00]/10 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-[#FF5C00]/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col gap-8">


        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-[#121215] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300"
              >
                {/* Header */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 flex items-center justify-between text-left gap-4 hover:bg-white/5 transition-colors duration-200"
                >
                  <span className="text-base sm:text-lg font-bold tracking-tight text-white hover:text-[#FF5C00] transition-colors duration-200">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 ${
                      isOpen ? "border-[#FF5C00]/40 text-[#FF5C00] rotate-180" : ""
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Content */}
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-[300px] border-t border-white/5" : "max-h-0"
                  } overflow-hidden`}
                >
                  <p className="p-6 text-gray-400 text-sm sm:text-base leading-relaxed font-light bg-neutral-900/10">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
