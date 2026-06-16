"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

// Custom vector SVG icons matching the mockup design
const DiscoverIcon = ({ active }: { active: boolean }) => (
  <svg
    className={`w-6 h-6 transition-colors duration-500 ${active ? "text-[#FF5C00]" : "text-gray-400"}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Lightbulb outline */}
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    {/* Glow rays */}
    <path d="M12 2v2" className={active ? "animate-pulse" : ""} />
    <path d="M4.9 4.9l1.4 1.4" className={active ? "animate-pulse" : ""} />
    <path d="M19.1 4.9l-1.4 1.4" className={active ? "animate-pulse" : ""} />
  </svg>
);

const ProductionIcon = ({ active }: { active: boolean }) => (
  <svg
    className={`w-6 h-6 transition-colors duration-500 ${active ? "text-[#FF5C00]" : "text-gray-400"}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Magic Wand */}
    <path d="M15 4l5 5L8 21H3v-5L15 4z" />
    {/* Sparkles */}
    <path d="M9.5 6.5l.5-.5.5.5-.5.5z" className={active ? "animate-pulse" : ""} />
    <path d="M5 9.5l.5-.5.5.5-.5.5z" className={active ? "animate-pulse" : ""} />
    <path d="M19 15.5l.5-.5.5.5-.5.5z" className={active ? "animate-pulse" : ""} />
    <path d="M14.5 19.5l.5-.5.5.5-.5.5z" className={active ? "animate-pulse" : ""} />
  </svg>
);

const ReviewIcon = ({ active }: { active: boolean }) => (
  <svg
    className={`w-6 h-6 transition-colors duration-500 ${active ? "text-[#FF5C00]" : "text-gray-400"}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Chat Bubble with Eye outline */}
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <circle cx="12" cy="11" r="1.5" />
    <path d="M8.5 11c1.5-1.5 5.5-1.5 7 0" />
  </svg>
);

const DeliveryIcon = ({ active }: { active: boolean }) => (
  <svg
    className={`w-6 h-6 transition-colors duration-500 ${active ? "text-[#FF5C00]" : "text-gray-400"}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Package box on hand */}
    <path d="M3 15h12M3 18h18M18 15v-4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v4" />
    <path d="M8 9V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v4" />
    <path d="M12 4v5" />
  </svg>
);

const processSteps = [
  {
    id: 1,
    title: "Discover & Strategy",
    description: "Understanding your goals, audience, and vision to set a clear direction for the edit.",
    Icon: DiscoverIcon,
  },
  {
    id: 2,
    title: "Creative Production",
    description: "Transforming raw footage into a polished, engaging video through clean cuts and storytelling.",
    Icon: ProductionIcon,
  },
  {
    id: 3,
    title: "Review & Revisions",
    description: "Sharing previews, gathering feedback, and refining the edit for the best result.",
    Icon: ReviewIcon,
  },
  {
    id: 4,
    title: "Final Delivery",
    description: "Delivering the final video in ready-to-publish formats, on time.",
    Icon: DeliveryIcon,
  },
];

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  // Desktop horizontal visualizer ticks configuration
  const desktopTotalTicks = 96;
  const desktopActiveRatios = [0.125, 0.375, 0.625, 0.875];
  const desktopActiveCount = Math.round(desktopTotalTicks * desktopActiveRatios[activeStep]);

  // Mobile vertical visualizer ticks configuration
  const mobileTotalTicks = 48;
  const mobileActiveCount = Math.round(mobileTotalTicks * ((activeStep + 0.5) / 4));

  return (
    <section className="relative w-full bg-[#0C0C0E] py-8 lg:py-12 px-6 sm:px-12 md:px-16 overflow-hidden select-none">
      {/* Background glow effects matching the right-side orange visual design */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[650px] h-[300px] md:h-[650px] bg-gradient-to-bl from-[#FF5C00]/12 via-[#FF5C00]/2 to-transparent rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[200px] md:w-[450px] h-[200px] md:h-[450px] bg-gradient-to-tr from-[#FF5C00]/3 to-transparent rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-16 md:gap-24">
        {/* Section Heading */}
        <div className="flex flex-col gap-3 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Process Of Working
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-light">
            From concept to completion in four seamless steps
          </p>
        </div>

        {/* ----------------- DESKTOP LAYOUT (md and up) ----------------- */}
        <div className="hidden md:flex flex-col relative w-full">
          {/* Steps Grid Row */}
          <div className="grid grid-cols-4 w-full h-[400px] relative">
            {processSteps.map((step, index) => {
              const StepIcon = step.Icon;
              const isActive = activeStep === index;

              return (
                <div
                  key={step.id}
                  className="relative flex flex-col items-center cursor-pointer group"
                  onClick={() => setActiveStep(index)}
                  onMouseEnter={() => setActiveStep(index)}
                >
                  {/* Step Card Staggered Margin */}
                  <div
                    className={`flex flex-col items-center text-center transition-all duration-500 max-w-[220px] z-10 ${index % 2 === 0 ? "transform -translate-y-4" : "transform translate-y-16"
                      }`}
                  >
                    {/* Icon Container */}
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-500 mb-6 ${isActive
                        ? "bg-[#FF5C00]/10 border-[#FF5C00] text-[#FF5C00] shadow-[0_0_20px_rgba(255,92,0,0.35)]"
                        : "bg-white/5 border-white/10 text-gray-400 group-hover:border-[#FF5C00]/40 group-hover:text-gray-200"
                        }`}
                    >
                      <StepIcon active={isActive} />
                    </div>

                    {/* Step Title */}
                    <h3
                      className={`text-lg font-bold tracking-tight mb-3 transition-colors duration-500 ${isActive ? "text-[#FF5C00]" : "text-white"
                        }`}
                    >
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-light px-1">
                      {step.description}
                    </p>
                  </div>

                  {/* Staggered Vertical Drop Line connecting to bottom tick-bar */}
                  <div
                    className={`absolute w-[1.5px] bottom-0 transition-all duration-500 origin-bottom ${index % 2 === 0 ? "top-[190px]" : "top-[270px]"
                      } ${isActive
                        ? "bg-gradient-to-b from-[#FF5C00] to-[#FF5C00]/40 shadow-[0_0_10px_#FF5C00,0_0_4px_rgba(255,92,0,0.6)] h-auto scale-y-100"
                        : "bg-neutral-800 h-auto scale-y-100 opacity-30"
                      }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Bottom Visualizer Grid (Tick Bar) */}
          <div className="w-full relative pt-6">
            <div className="flex justify-between items-end w-full h-8 gap-[3px] px-1 relative">
              {Array.from({ length: desktopTotalTicks }).map((_, i) => {
                const isActive = i < desktopActiveCount;
                return (
                  <div
                    key={i}
                    className={`w-[2px] rounded-full transition-all duration-500 ${isActive
                      ? "h-6 bg-[#FF5C00] shadow-[0_0_8px_rgba(255,92,0,0.9),0_0_2px_rgba(255,92,0,0.6)]"
                      : "h-3 bg-neutral-800/80"
                      }`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* ----------------- MOBILE LAYOUT (sm and below) ----------------- */}
        <div className="block md:hidden w-full relative">
          <div className="flex gap-6 items-stretch min-h-[480px]">
            {/* Left Vertical Tick Visualizer Column */}
            <div className="flex flex-col justify-between items-center w-8 py-4 relative">
              {Array.from({ length: mobileTotalTicks }).map((_, i) => {
                const isActive = i < mobileActiveCount;
                return (
                  <div
                    key={i}
                    className={`h-[2px] rounded-full transition-all duration-500 ${isActive
                      ? "w-5 bg-[#FF5C00] shadow-[0_0_6px_rgba(255,92,0,0.9)]"
                      : "w-2.5 bg-neutral-800"
                      }`}
                  />
                );
              })}
            </div>

            {/* Right Steps Stack Column */}
            <div className="flex flex-col gap-6 flex-1">
              {processSteps.map((step, index) => {
                const StepIcon = step.Icon;
                const isActive = activeStep === index;

                return (
                  <motion.div
                    key={step.id}
                    onClick={() => setActiveStep(index)}
                    className={`flex flex-col gap-4 p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${isActive
                      ? "bg-[#FF5C00]/5 border-[#FF5C00]/50 shadow-[0_0_20px_rgba(255,92,0,0.1)]"
                      : "bg-gray-950/20 border-gray-800/60"
                      }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Header: Icon + Title */}
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-500 ${isActive
                          ? "bg-[#FF5C00]/10 border-[#FF5C00] text-[#FF5C00]"
                          : "bg-white/5 border-white/10 text-gray-400"
                          }`}
                      >
                        <StepIcon active={isActive} />
                      </div>
                      <span className="text-gray-500 text-xs font-bold font-mono tracking-widest uppercase">
                        Step 0{step.id}
                      </span>
                    </div>

                    {/* Step Body */}
                    <div className="flex flex-col gap-2 pl-1">
                      <h3
                        className={`text-lg font-bold transition-colors duration-500 ${isActive ? "text-[#FF5C00]" : "text-white"
                          }`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-light">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
