"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import testimonials from "../data/testimonials.json";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;

    const autoplayTimer = window.setInterval(handleNext, 4000);

    return () => window.clearInterval(autoplayTimer);
  }, [handleNext, isPaused]);

  const current = testimonials[currentIndex];

  // Rating stars generator
  const renderStars = (rating: number) => {
    return Array.from({ length: rating }).map((_, idx) => (
      <svg
        key={idx}
        className="w-5 h-5 text-[#FF5C00] fill-[#FF5C00]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.209l8.2-1.191L12 .587z" />
      </svg>
    ));
  };

  return (
    <section className="relative w-full bg-[#0C0C0E] py-8 lg:py-16 px-6 sm:px-12 md:px-16 overflow-hidden select-none">

      {/* Background glow highlights */}
      <div className="absolute top-1/2 left-[-10%] w-[350px] md:w-[700px] h-[350px] md:h-[700px] bg-[#FF5C00]/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-to-t from-[#FF5C00]/5 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-12 sm:gap-16">

        {/* Header Title */}
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Client Testimonials
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-light">
            What our clients say about working with us
          </p>
        </div>

        {/* Group Grid and Navigation Arrows to pull arrows closer to the cards */}
        <div className="flex flex-col gap-8 md:gap-10">
          {/* Main Section Grid */}
          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >

            {/* Left + Middle Content: Active Details (lg:col-span-8) */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-gray-950/20 p-6 md:p-8 rounded-[36px] border border-gray-900/50 backdrop-blur-sm">

              {/* Active Image (md:col-span-5) */}
              <div className="md:col-span-5 w-full flex justify-center">
                <div className="relative w-full aspect-square max-w-[280px] md:max-w-none rounded-[28px] overflow-hidden border border-gray-800/80 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <Image
                        src={current.image}
                        alt={current.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 30vw"
                        className="object-cover"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Active Details text (md:col-span-7) */}
              <div className="md:col-span-7 flex flex-col gap-4 text-left justify-center min-h-[200px]">

                {/* Stars */}
                <div className="flex gap-1">
                  {renderStars(current.rating)}
                </div>

                {/* Text Paragraph with fade animation */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-white text-base sm:text-lg md:text-xl font-medium leading-relaxed drop-shadow-sm">
                      &ldquo;{current.text}&rdquo;
                    </p>

                    {/* Name and Role */}
                    <div className="mt-6">
                      <h4 className="text-white text-lg sm:text-xl font-bold">
                        {current.name}
                      </h4>
                      {(current.role || current.subscriber) && (
                        <p className="text-gray-400 text-xs sm:text-sm mt-0.5 font-medium">
                          {current.role}
                          {current.role && current.subscriber && ", "}
                          {current.subscriber && (
                            <span className="text-[#FF5C00]">{current.subscriber}</span>
                          )}
                        </p>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>

              </div>

            </div>

            {/* Right Column: Stacked Deck of other cards (lg:col-span-4) */}
            <div className="lg:col-span-4 flex items-center justify-center relative w-full h-[260px] sm:h-[300px] md:h-[320px] lg:h-full select-none">
              <div className="relative w-52 h-52 sm:w-60 sm:h-60 md:w-64 md:h-64 flex items-center justify-center">

                {/* Loop to render stacked/folded cards behind the active card */}
                {Array.from({ length: testimonials.length - 1 }).map((_, i) => {
                  const nextOffset = i + 1;
                  const nextIndex = (currentIndex + nextOffset) % testimonials.length;

                  return (
                    <motion.div
                      key={testimonials[nextIndex].id}
                      className="absolute rounded-[28px] overflow-hidden border border-gray-800 bg-gray-900 shadow-2xl"
                      style={{
                        width: "100%",
                        height: "100%",
                        originX: 0.5,
                        originY: 0.5,
                      }}
                      animate={{
                        rotate: nextOffset * 7,
                        x: nextOffset * 16,
                        y: nextOffset * 8,
                        zIndex: 10 - nextOffset,
                        opacity: 1 - nextOffset * 0.25,
                        scale: 1 - nextOffset * 0.05,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                    >
                      {/* Shadow overlay to give depth context */}
                      <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />

                      <Image
                        src={testimonials[nextIndex].image}
                        alt={testimonials[nextIndex].name}
                        fill
                        sizes="240px"
                        className="object-cover pointer-events-none"
                      />
                    </motion.div>
                  );
                })}

              </div>
            </div>

          </div>

          {/* Navigation Arrows at bottom center */}
          <div className="flex justify-center gap-4">
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center text-white hover:border-[#FF5C00] hover:text-[#FF5C00] transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-[#FF5C00] text-white hover:bg-[#FF7324] flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(255,92,0,0.3)]"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

