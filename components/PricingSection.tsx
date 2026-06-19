"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Checkmark SVG icon that transitions colors based on highlighted state
const CheckIcon = ({ active }: { active: boolean }) => (
  <svg
    className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${
      active
        ? "text-[#FF5C00] drop-shadow-[0_0_3px_rgba(255,92,0,0.6)]"
        : "text-neutral-400"
    }`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Glowing wave SVG background matching the mockup arc design
const GlowingCardWave = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 rounded-[28px]">
    {/* Base ambient radial glow */}
    <div className="absolute -left-1/4 bottom-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_bottom_left,rgba(255,92,0,0.15)_0%,transparent_60%)] blur-[40px]" />

    {/* Wave graphics */}
    <svg
      className="absolute bottom-0 left-0 w-full h-full opacity-60"
      viewBox="0 0 320 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        {/* Glow filter */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Wave gradient */}
        <linearGradient id="waveGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF5C00" stopOpacity="0.75" />
          <stop offset="50%" stopColor="#FF7A00" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FF5C00" stopOpacity="0" />
        </linearGradient>
        {/* Line gradient */}
        <linearGradient id="lineGrad" x1="0%" y1="90%" x2="90%" y2="20%">
          <stop offset="0%" stopColor="#FF7A00" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#FF5C00" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#FF3C00" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Background filled wave curve */}
      <path
        d="M-20 410 C70 370 110 270 150 90 C170 -10 190 -50 190 -50 L-50 -50 L-50 500 Z"
        fill="url(#waveGrad)"
        opacity="0.1"
      />

      {/* Main neon vector glow line */}
      <path
        d="M-50 470 C90 430 150 290 200 110 C220 30 240 -20 240 -20"
        stroke="url(#lineGrad)"
        strokeWidth="3.5"
        fill="none"
        filter="url(#glow)"
      />

      {/* Offset secondary vector curve */}
      <path
        d="M-30 500 C110 450 170 310 220 130 C240 50 260 0 260 0"
        stroke="url(#lineGrad)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
    </svg>
  </div>
);

// Tab definitions
const tabs = [
  { id: "short", label: "Short Form" },
  { id: "long", label: "Long Form" },
  { id: "promotional", label: "Promotional Video" },
  { id: "podcast", label: "Podcast" },
];

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState("short");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const triggerBooking = () => {
    window.dispatchEvent(new CustomEvent("open-booking-modal"));
  };

  // Pricing details mapping
  const pricingData: Record<
    string,
    {
      standard: { price: string; description: string; features: string[] };
      premium?: { price: string; description: string; features: string[] };
      custom: { description: string; features: string[] };
    }
  > = {
    short: {
      standard: {
        price: "$10",
        description: "Shorts Edit Package",
        features: [
          "Basic cuts/trimming",
          "Background music (BGM)",
          "Simple sound effects (whoosh, pop, ding etc)",
          "Basic text animations (titles,captions/subtitles)",
          "Auto-captions with stylized design",
          "Simple transitions (cut, fade, zoom)",
          "Color correction (basic)",
          "Aspect ratio adjustment (9:16 vertical format)",
          "3-5 day delivery",
          "1-2 revisions",
        ],
      },
      premium: {
        price: "$25",
        description: "Shorts Edit Package",
        features: [
          "Advanced/dynamic text animations (kinetic typography)",
          "Multiple custom transitions (zoom blast, glitch, slide etc)",
          "Professional color grading",
          "Stock footage/B-roll integration",
          "Auto-captions with stylized design (karaoke-style highlight)",
          "Sound design (layered SFX, audio ducking)",
          "Motion graphics elements (lower thirds, callouts, emojis/stickers animation)",
          "Thumbnail design",
          "Hook optimization",
          "2-3 revisions",
          "Faster delivery time",
        ],
      },
      custom: {
        description: "A Custom Editing Package, Built Just for You",
        features: [
          "Professional video editing tailored to your content",
          "Clean cuts, pacing, and storytelling",
          "Color correction & basic sound balance",
          "Revisions based on your feedback",
          "Final delivery in platform-ready formats",
        ],
      },
    },
    long: {
      standard: {
        price: "$40",
        description: "Ideal for YouTube videos, podcasts, and vlogs",
        features: [
          "Up to 15 minutes of content",
          "Multi-cam sync & editing",
          "Standard color grading",
          "Audio cleanup & leveling",
          "2 rounds of revisions",
          "3-4 day delivery",
          "Full HD export (1080p)",
        ],
      },
      premium: {
        price: "$65",
        description: "Cinematic documentaries, online courses & movies",
        features: [
          "Up to 25 minutes + of content",
          "Full cinematic styling & grading",
          "Motion intros & transitions",
          "Custom sound design & sound effects",
          "Subtitles & text styling",
          "3 rounds of revisions",
          "Priority delivery (3-5 days)",
          "4K rendering & upload-ready export",
          "Dedicated project manager",
        ],
      },
      custom: {
        description: "A Custom Editing Package, Built Just for You",
        features: [
          "Professional video editing tailored to your content",
          "Clean cuts, pacing, and storytelling",
          "Color correction & basic sound balance",
          "Revisions based on your feedback",
          "Final delivery in platform-ready formats",
        ],
      },
    },
    promotional: {
      standard: {
        price: "$20",
        description: "Basic Promo Edit",
        features: [
          "Footage trimming and sequencing",
          "Background music (BGM)",
          "Basic sound effects",
          "Text overlays (product name, offer, CTA)",
          "Simple transitions",
          "Basic color correction",
          "Logo placement (static)",
          "Aspect ratio formatting (square/vertical/horizontal)",
          "1-2 revisions",
        ],
      },
      premium: {
        price: "$35",
        description: "Premium Promo Edit",
        features: [
          "Professional pacing for high conversion",
          "Dynamic text animations with brand fonts/colors",
          "Advanced transitions (zoom, slide, glitch effects)",
          "Sound design (SFX layering, audio mixing/ducking)",
          "Professional color grading",
          "Animated logo intro/outro",
          "Motion graphics (highlight boxes, arrows, price tags, callouts)",
          "Stock footage/B-roll integration if needed",
          "Subtitle/caption styling",
          "Strong hook (first 3 sec) and CTA optimization",
          "Thumbnail design",
          "Multiple aspect ratio exports (for different platforms)",
          "2-3 revisions",
          "Priority delivery",
        ],
      },
      custom: {
        description: "A Custom Editing Package, Built Just for You",
        features: [
          "Professional video editing tailored to your content",
          "Clean cuts, pacing, and storytelling",
          "Color correction & basic sound balance",
          "Revisions based on your feedback",
          "Final delivery in platform-ready formats",
        ],
      },
    },
    podcast: {
      standard: {
        price: "$50",
        description: "Advanced Podcast Edit",
        features: [
          "Multi-camera switching/angles (based on speaker)",
          "Advanced audio mixing and mastering",
          "Dynamic subtitles/captions (styled, animated)",
          "B-roll/stock footage insertion for engagement",
          "Highlight clips/shorts creation from main episode (1-2 clips)",
          "Lower thirds with guest info (animated)",
          "Motion graphics (waveforms, transitions, callouts)",
          "Background music throughout (subtle, mood-based)",
          "Color grading/correction",
          "Thumbnail design",
          "Chapter markers/timestamps",
          "2-3 revisions",
          "Priority delivery",
        ],
      },
      custom: {
        description: "Custom Podcast Production & Editing Package",
        features: [
          "Podcast editing tailored to your format",
          "Video and audio optimization",
          "Snippets/Shorts created from your episodes",
          "Sound branding, intros, and outros",
          "Final delivery in podcast-platform ready formats",
        ],
      },
    },
  };

  const currentPlans = pricingData[activeTab];
  const defaultHighlightedCardIndex: number = currentPlans.premium ? 1 : 0;
  const isStandardActive =
    hoveredCard !== null
      ? hoveredCard === 0
      : defaultHighlightedCardIndex === 0;
  const isPremiumActive =
    hoveredCard !== null
      ? hoveredCard === 1
      : defaultHighlightedCardIndex === 1;
  const isCustomActive =
    hoveredCard !== null
      ? hoveredCard === 2
      : defaultHighlightedCardIndex === 2;

  return (
    <section className="relative w-full bg-[#0C0C0E] py-20 lg:py-32 px-6 sm:px-12 md:px-16 overflow-hidden select-none">
      {/* Background glow effects */}
      <div className="absolute top-[20%] left-[-10%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-[#FF5C00]/3 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-to-t from-[#FF5C00]/5 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-12 items-center">
        {/* Header Block */}
        <div className="flex flex-col gap-3 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Pricing Plan
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-light">
            Transparent pricing for every project size
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-3 bg-[#121215] border border-white/5 p-1.5 rounded-full">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
                  isActive ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="pricingActiveTab"
                    className="absolute inset-0 bg-[#FF5C00] rounded-full shadow-[0_0_15px_rgba(255,92,0,0.4)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Pricing Cards Grid */}
        <div
          className={`grid grid-cols-1 ${currentPlans.premium ? "md:grid-cols-3" : "md:grid-cols-2 max-w-4xl mx-auto"} gap-8 w-full items-stretch pt-4`}
        >
          {/* Card 1: Standard Plan */}
          <div
            onMouseEnter={() => setHoveredCard(0)}
            onMouseLeave={() => setHoveredCard(null)}
            className={`relative flex flex-col justify-between p-8 md:p-10 rounded-[28px] border transition-all duration-500 overflow-hidden min-h-[550px] ${
              isStandardActive
                ? "bg-[#0F0F12] border-white/10 text-white shadow-[0_0_40px_rgba(255,92,0,0.18)] scale-[1.02] z-20"
                : "bg-white border-neutral-200 text-neutral-900 scale-100 z-10"
            }`}
          >
            {/* Conditional Wave Background for Active Card */}
            {isStandardActive && <GlowingCardWave />}

            <div className="relative z-10 flex flex-col gap-6">
              {/* Title Section */}
              <div className="flex flex-col gap-1 text-left">
                <h3 className="text-3xl font-extrabold tracking-tight">
                  Standard
                </h3>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-4xl font-extrabold">
                    {currentPlans.standard.price}
                  </span>
                  <span
                    className={`text-sm ${
                      isStandardActive ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  >
                    per project
                  </span>
                </div>
                <p
                  className={`text-sm font-light mt-3 leading-relaxed ${
                    isStandardActive ? "text-neutral-300" : "text-neutral-600"
                  }`}
                >
                  {currentPlans.standard.description}
                </p>
              </div>

              {/* Divider */}
              <hr
                className={`w-full ${
                  isStandardActive ? "border-white/10" : "border-neutral-200"
                }`}
              />

              {/* Features List */}
              <div className="flex flex-col gap-4 text-left">
                {currentPlans.standard.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckIcon active={isStandardActive} />
                    <span
                      className={`text-sm font-light leading-none ${
                        isStandardActive ? "text-gray-100" : "text-neutral-800"
                      }`}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Button */}
            <div className="relative z-10 pt-8">
              <button
                onClick={triggerBooking}
                className={`w-full py-3 px-6 rounded-full text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-300 ${
                  isStandardActive
                    ? "bg-[#FF5C00] text-white hover:bg-[#FF7324] hover:shadow-[0_0_20px_rgba(255,92,0,0.4)] border border-transparent hover:scale-[1.02] active:scale-[0.98]"
                    : "border border-[#FF5C00] text-[#FF5C00] bg-transparent hover:bg-[#FF5C00] hover:text-white hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                BOOK A CALL <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Premium Plan (Default Highlighted) */}
          {currentPlans.premium && (
            <div
              onMouseEnter={() => setHoveredCard(1)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative flex flex-col justify-between p-8 md:p-10 rounded-[28px] border transition-all duration-500 overflow-hidden min-h-[550px] ${
                isPremiumActive
                  ? "bg-[#0F0F12] border-white/10 text-white shadow-[0_0_40px_rgba(255,92,0,0.18)] scale-[1.02] z-20"
                  : "bg-white border-neutral-200 text-neutral-900 scale-100 z-10"
              }`}
            >
              {/* Wave Background logic: active when hoveredCard is null (default) OR hoveredCard === 1 */}
              {isPremiumActive && <GlowingCardWave />}

              <div className="relative z-10 flex flex-col gap-6">
                {/* Title Section */}
                <div className="flex flex-col gap-1 text-left">
                  <div className="flex items-center justify-between w-full">
                    <h3 className="text-3xl font-extrabold tracking-tight">
                      Premium
                    </h3>
                    <span className="bg-[#FF5C00] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                      Most popular
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1.5 mt-2">
                    <span className="text-4xl font-extrabold">
                      {currentPlans.premium.price}
                    </span>
                    <span
                      className={`text-sm ${
                        isPremiumActive
                          ? "text-neutral-400"
                          : "text-neutral-500"
                      }`}
                    >
                      per project
                    </span>
                  </div>
                  <p
                    className={`text-sm font-light mt-3 leading-relaxed ${
                      isPremiumActive ? "text-neutral-300" : "text-neutral-600"
                    }`}
                  >
                    {currentPlans.premium.description}
                  </p>
                </div>

                {/* Divider */}
                <hr
                  className={`w-full ${
                    isPremiumActive ? "border-white/10" : "border-neutral-200"
                  }`}
                />

                {/* Features List */}
                <div className="flex flex-col gap-4 text-left">
                  {currentPlans.premium.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckIcon active={isPremiumActive} />
                      <span
                        className={`text-sm font-light leading-none ${
                          isPremiumActive ? "text-gray-100" : "text-neutral-800"
                        }`}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Button */}
              <div className="relative z-10 pt-8">
                <button
                  onClick={triggerBooking}
                  className={`w-full py-3 px-6 rounded-full text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-300 ${
                    isPremiumActive
                      ? "bg-[#FF5C00] text-white hover:bg-[#FF7324] hover:shadow-[0_0_20px_rgba(255,92,0,0.4)] border border-transparent hover:scale-[1.02] active:scale-[0.98]"
                      : "border border-[#FF5C00] text-[#FF5C00] bg-transparent hover:bg-[#FF5C00] hover:text-white hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                >
                  BOOK A CALL <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Card 3: Custom Plan */}
          <div
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
            className={`relative flex flex-col justify-between p-8 md:p-10 rounded-[28px] border transition-all duration-500 overflow-hidden min-h-[550px] ${
              isCustomActive
                ? "bg-[#0F0F12] border-white/10 text-white shadow-[0_0_40px_rgba(255,92,0,0.18)] scale-[1.02] z-20"
                : "bg-white border-neutral-200 text-neutral-900 scale-100 z-10"
            }`}
          >
            {/* Conditional Wave Background for Active Card */}
            {isCustomActive && <GlowingCardWave />}

            <div className="relative z-10 flex flex-col gap-6">
              {/* Title Section */}
              <div className="flex flex-col gap-1 text-left">
                <h3 className="text-3xl font-extrabold tracking-tight">
                  Custom
                </h3>
                <p
                  className={`text-sm font-light mt-3 leading-relaxed ${
                    isCustomActive ? "text-neutral-300" : "text-neutral-600"
                  }`}
                >
                  {currentPlans.custom.description}
                </p>
                <p
                  className={`text-xs mt-1 leading-relaxed ${
                    isCustomActive ? "text-neutral-400" : "text-neutral-500"
                  }`}
                >
                  No fixed plans. No unnecessary extras. Just the exact editing
                  solution your project needs.
                </p>
              </div>

              {/* Divider */}
              <hr
                className={`w-full ${
                  isCustomActive ? "border-white/10" : "border-neutral-200"
                }`}
              />

              {/* Features List */}
              <div className="flex flex-col gap-4 text-left">
                {currentPlans.custom.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckIcon active={isCustomActive} />
                    <span
                      className={`text-sm font-light leading-none ${
                        isCustomActive ? "text-gray-100" : "text-neutral-800"
                      }`}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Button */}
            <div className="relative z-10 pt-8">
              <button
                onClick={triggerBooking}
                className={`w-full py-3 px-6 rounded-full text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-300 ${
                  isCustomActive
                    ? "bg-[#FF5C00] text-white hover:bg-[#FF7324] hover:shadow-[0_0_20px_rgba(255,92,0,0.4)] border border-transparent hover:scale-[1.02] active:scale-[0.98]"
                    : "border border-[#FF5C00] text-[#FF5C00] bg-transparent hover:bg-[#FF5C00] hover:text-white hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                BOOK A CALL <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
