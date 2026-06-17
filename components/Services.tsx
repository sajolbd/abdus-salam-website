"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Smartphone, Sparkles, TrendingUp, Video } from "lucide-react";
import { motion } from "framer-motion";

const servicesList = [
  {
    id: 1,
    title: "Video Editing",
    description: "Transform raw footage into polished, professional content that captivates audiences and drives engagement across all platforms.",
    icon: Video,
  },
  {
    id: 2,
    title: "Shorts & Reels",
    description: "Create viral-worthy vertical content optimized for TikTok, Instagram Reels, and YouTube Shorts that maximizes reach and conversion.",
    icon: Smartphone,
  },
  {
    id: 3,
    title: "Social Media Videos",
    description: "Editing engaging social media videos with smooth transitions, trending effects, and eye-catching visuals that boost reach and engagement.",
    icon: Sparkles,
  },
  {
    id: 4,
    title: "Promotional Videos",
    description: "Creating compelling promotional videos that highlight your product or brand, crafted with skill and clarity to leave a lasting impression.",
    icon: TrendingUp,
  },
];

const CARD_GAP = 24;

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideOffset, setSlideOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const renderedServices = [...servicesList, ...servicesList];
  const activeDotIndex = activeIndex % servicesList.length;

  const triggerBooking = () => {
    window.dispatchEvent(new CustomEvent("open-booking-modal"));
  };

  const measureSlide = useCallback(() => {
    if (!trackRef.current) return;

    const child = trackRef.current.firstElementChild;
    if (!child) return;

    const childWidth = child.getBoundingClientRect().width;
    setSlideOffset(childWidth + CARD_GAP);
  }, []);

  const goToService = useCallback((index: number) => {
    setIsAnimating(true);
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    measureSlide();
    window.addEventListener("resize", measureSlide);

    return () => window.removeEventListener("resize", measureSlide);
  }, [measureSlide]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setIsAnimating(true);
      setActiveIndex((currentIndex) => {
        return currentIndex + 1;
      });
    }, 3600);

    return () => window.clearInterval(intervalId);
  }, []);

  const handlePrev = () => {
    goToService(activeDotIndex === 0 ? servicesList.length - 1 : activeDotIndex - 1);
  };

  const handleNext = () => {
    goToService(activeIndex + 1);
  };

  const handleTransitionEnd = () => {
    if (activeIndex < servicesList.length) return;

    setIsAnimating(false);
    setActiveIndex(activeIndex % servicesList.length);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsAnimating(true));
    });
  };

  return (
    <section className="relative w-full bg-[#0C0C0E] py-8 lg:py-16 px-6 sm:px-12 md:px-16 overflow-hidden select-none">

      {/* Glow highlight */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-to-t from-[#FF5C00]/5 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[20%] right-[-10%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-[#FF5C00]/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-12 sm:gap-16">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2 text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              My Services
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-light">
              Comprehensive video production solutions tailored to your goals
            </p>
          </div>

          {/* Book a Call Button */}
          <button
            onClick={triggerBooking}
            className="bg-[#FF5C00] text-white px-6 py-3 rounded-full text-sm font-bold flex items-center justify-center gap-1.5 hover:bg-[#FF7324] hover:shadow-[0_0_25px_rgba(255,92,0,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto"
          >
            Book a Call <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Services Slider */}
        <div className="relative w-full overflow-hidden">
          <div
            ref={trackRef}
            onTransitionEnd={handleTransitionEnd}
            className={`flex gap-6 py-2 px-1 ${isAnimating ? "transition-transform duration-700 ease-out" : ""}`}
            style={{ transform: `translateX(-${activeIndex * slideOffset}px)` }}
          >
            {renderedServices.map((svc, index) => {
              const IconComponent = svc.icon;

              return (
                <motion.div
                  key={`${svc.id}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                  className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px] h-[340px] sm:h-[320px] lg:h-[300px] flex flex-col gap-5 p-6 md:p-8 rounded-[24px] border border-gray-800 bg-gray-950/20 backdrop-blur-sm hover:border-[#FF5C00]/50 transition-colors duration-500 hover:bg-gray-950/45 group"
                >
                  {/* Icon Outline container */}
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-[#FF5C00] group-hover:border-[#FF5C00]/30 transition-all duration-500">
                    <IconComponent className="w-6 h-6 stroke-[1.5px]" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-3 text-left">
                    <h3 className="text-lg font-bold text-white group-hover:text-gray-200 transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed font-light">
                      {svc.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between gap-6">
          <div className="flex gap-2">
            {servicesList.map((_, index) => (
              <button
                key={index}
                onClick={() => goToService(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeDotIndex === index ? "w-8 bg-[#FF5C00]" : "w-2.5 bg-gray-700 hover:bg-gray-500"
                }`}
                aria-label={`Go to service ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full border border-gray-700 text-white hover:border-[#FF5C00] hover:text-[#FF5C00] flex items-center justify-center transition-all duration-300"
              aria-label="Previous service"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full bg-[#FF5C00] text-white hover:bg-[#FF7324] shadow-[0_0_15px_rgba(255,92,0,0.3)] flex items-center justify-center transition-all duration-300"
              aria-label="Next service"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
