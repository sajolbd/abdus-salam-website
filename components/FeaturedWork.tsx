"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import featuredWorkData from "../data/featured-work.json";

type FeaturedWorkItem = {
  id: number;
  title: string;
  thumbnail: string;
  videoUrl: string;
};

const CARD_GAP = 24;
const categories = featuredWorkData.categories;
const worksByCategory = featuredWorkData.worksByCategory as Record<string, FeaturedWorkItem[]>;

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\/shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && /^[A-Za-z0-9_-]{11}$/.test(match[2]) ? match[2] : "";
}

export default function FeaturedWork() {
  const [activeCategory, setActiveCategory] = useState("short-form");
  const [activeIndex, setActiveIndex] = useState(0);
  const [activePlayingKey, setActivePlayingKey] = useState<string | null>(null);
  const [slideOffset, setSlideOffset] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const filteredWorks = worksByCategory[activeCategory] ?? [];
  const L = filteredWorks.length;
  const isInfinite = L > 1 && isScrollable;
  const extendedWorks = isInfinite ? [...filteredWorks, ...filteredWorks, ...filteredWorks] : filteredWorks;

  const isWideCard = activeCategory === "long-form" || activeCategory === "podcast";
  const safeActiveIndex = isInfinite ? activeIndex % L : 0;

  const measureSlide = useCallback(() => {
    if (!trackRef.current || !viewportRef.current) return;

    const child = trackRef.current.firstElementChild;
    if (!child) return;

    const childWidth = child.getBoundingClientRect().width;
    const nextSlideOffset = childWidth + CARD_GAP;

    const originalScrollWidth = L * nextSlideOffset - CARD_GAP;
    const viewportWidth = viewportRef.current.clientWidth;
    const nextIsScrollable = originalScrollWidth > viewportWidth;

    setSlideOffset(nextSlideOffset);
    setIsScrollable(nextIsScrollable);

    setActiveIndex((prev) => {
      if (nextIsScrollable) {
        return prev >= L && prev < 2 * L ? prev : L;
      }
      return 0;
    });
  }, [L]);

  const handlePrev = useCallback(() => {
    setActivePlayingKey(null);
    setTransitionEnabled(true);
    setActiveIndex((prev) => prev - 1);
  }, []);

  const handleNext = useCallback(() => {
    setActivePlayingKey(null);
    setTransitionEnabled(true);
    setActiveIndex((prev) => prev + 1);
  }, []);

  const goToWork = useCallback((index: number) => {
    setActivePlayingKey(null);
    setTransitionEnabled(true);
    setActiveIndex(index + L);
  }, [L]);

  const handleTransitionEnd = () => {
    if (!isInfinite) return;
    if (activeIndex >= 2 * L) {
      setTransitionEnabled(false);
      setActiveIndex(activeIndex - L);
    } else if (activeIndex < L) {
      setTransitionEnabled(false);
      setActiveIndex(activeIndex + L);
    }
  };

  // Re-enable CSS transitions after disabling them for instant jumps
  useEffect(() => {
    if (!transitionEnabled) {
      if (trackRef.current) {
        void trackRef.current.offsetHeight; // Force reflow
      }
      const timeout = setTimeout(() => {
        setTransitionEnabled(true);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [transitionEnabled]);

  // Handle window resizing
  useEffect(() => {
    const frameId = window.requestAnimationFrame(measureSlide);
    window.addEventListener("resize", measureSlide);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", measureSlide);
    };
  }, [measureSlide, activeCategory]);

  // Handle category change reset
  useEffect(() => {
    setActivePlayingKey(null);
    setTransitionEnabled(false);
    const frameId = window.requestAnimationFrame(measureSlide);

    return () => window.cancelAnimationFrame(frameId);
  }, [activeCategory, measureSlide]);

  // Autoplay functionality
  useEffect(() => {
    if (activePlayingKey !== null || isHovered || !isInfinite) return;

    const intervalId = window.setInterval(() => {
      handleNext();
    }, 3800);

    return () => window.clearInterval(intervalId);
  }, [activePlayingKey, isHovered, isInfinite, handleNext]);

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === activeCategory) return;
    setActivePlayingKey(null);
    setTransitionEnabled(false);

    const nextWorks = worksByCategory[categoryId] ?? [];
    const nextL = nextWorks.length;
    const isWide = categoryId === "long-form" || categoryId === "podcast";

    let estimatedCardWidth = 210;
    if (typeof window !== "undefined") {
      const w = window.innerWidth;
      if (isWide) {
        estimatedCardWidth = w < 640 ? 285 : w < 768 ? 380 : w < 1024 ? 440 : 500;
      } else {
        estimatedCardWidth = w < 640 ? 150 : w < 768 ? 190 : 210;
      }
    }
    const estimatedOffset = estimatedCardWidth + CARD_GAP;
    const originalScrollWidth = nextL * estimatedOffset - CARD_GAP;
    const viewportWidth = viewportRef.current?.clientWidth ?? 0;
    const nextIsScrollable = originalScrollWidth > viewportWidth;

    setActiveCategory(categoryId);
    setActiveIndex(nextIsScrollable && nextL > 1 ? nextL : 0);
  };

  const getCardKey = (workId: number, idx: number) => `${activeCategory}-${workId}-${idx}`;

  const sliderTransform = {
    transform: `translate3d(-${activeIndex * slideOffset}px, 0, 0)`,
  };

  return (
    <section className="relative w-full bg-[#0C0C0E] py-8 lg:py-16 px-6 sm:px-12 md:px-16 overflow-hidden select-none">
      <div className="absolute top-1/2 left-[-10%] w-[350px] md:w-[700px] h-[350px] md:h-[700px] bg-[#FF5C00]/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2 text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              My Featured Work
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-light">
              A glimpse into my recent editing work and collaborations
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-6 py-2.5 rounded-full border text-sm font-semibold tracking-wide transition-all duration-300 ${activeCategory === cat.id
                  ? "bg-[#FF5C00] border-[#FF5C00] text-white shadow-[0_0_20px_rgba(255,92,0,0.4)]"
                  : "border-gray-800 text-gray-400 hover:border-gray-600 hover:text-white"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={viewportRef}
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isInfinite && (
            <>
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-[#0C0C0E] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-[#0C0C0E] to-transparent" />
            </>
          )}

          <div
            ref={trackRef}
            className={`flex gap-6 py-5 px-2 will-change-transform ${isInfinite
              ? transitionEnabled
                ? "transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                : ""
              : "transition-transform duration-500 ease-out"
              }`}
            style={sliderTransform}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedWorks.map((work, index) => {
              const cardKey = getCardKey(work.id, index);
              const isPlaying = activePlayingKey === cardKey;
              return (
                <motion.div
                  key={cardKey}
                  onClick={() => !isPlaying && setActivePlayingKey(cardKey)}
                  className={`flex-shrink-0 overflow-hidden border bg-gray-900/40 relative cursor-pointer group transition-all duration-500 border-gray-800/80 shadow-lg hover:border-[#FF5C00]/70 hover:shadow-[0_12px_40px_rgba(255,92,0,0.15)] ${isWideCard
                    ? "w-[285px] sm:w-[380px] md:w-[440px] lg:w-[500px] aspect-video rounded-[18px]"
                    : "w-[150px] sm:w-[190px] md:w-[210px] aspect-[9/16] rounded-[24px]"
                    }`}
                >
                  <AnimatePresence mode="wait">
                    {isPlaying ? (
                      <motion.div
                        key="video"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="absolute inset-0 w-full h-full z-20 bg-black"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePlayingKey(null);
                          }}
                          className="absolute top-2 right-2 z-30 w-7 h-7 rounded-full bg-black/70 hover:bg-black/90 flex items-center justify-center text-white transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        {(work.videoUrl.includes("youtube.com") || work.videoUrl.includes("youtu.be")) && getYouTubeId(work.videoUrl) ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${getYouTubeId(work.videoUrl)}?autoplay=1&mute=0`}
                            className="w-full h-full object-cover"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={work.title}
                          />
                        ) : work.videoUrl.includes("youtube.com") || work.videoUrl.includes("youtu.be") ? (
                          <div className="flex h-full w-full items-center justify-center bg-black px-6 text-center">
                            <a
                              href={work.videoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-full bg-[#FF5C00] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#FF7324]"
                            >
                              Open video
                            </a>
                          </div>
                        ) : (
                          <video
                            src={work.videoUrl}
                            className="w-full h-full object-cover"
                            controls
                            autoPlay
                            playsInline
                            onEnded={() => setActivePlayingKey(null)}
                          />
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="thumbnail"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.25 }}
                        className="absolute inset-0 w-full h-full"
                      >
                        <img
                          src={work.thumbnail}
                          alt={work.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-black/35 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center" />

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                          <Play className="w-4 h-4 text-black fill-black ml-0.5" />
                        </div>

                        <div className={`absolute text-left ${isWideCard ? "bottom-5 left-5 right-5" : "bottom-4 left-4 right-4"}`}>
                          <h4 className={`text-white font-bold drop-shadow-md ${isWideCard ? "text-base sm:text-lg line-clamp-2" : "text-sm sm:text-base line-clamp-2"
                            }`}>
                            {work.title}
                          </h4>
                          <p className="text-gray-300 text-[10px] sm:text-xs mt-0.5 font-medium tracking-wide uppercase drop-shadow-sm">
                            {activeCategory.replace(/-/g, " ")}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2.5 text-center text-gray-400 text-xl md:text-3xl font-semibold mt-4">
          <span className="w-3 h-3 rounded-full bg-[#FF5C00] animate-pulse" />
          <span>All The Videos Have Been Edited According To The Clients Preferences</span>
        </div>

        {isInfinite && (
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-2">
              {Array.from({ length: L }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToWork(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${safeActiveIndex === idx
                    ? "w-8 bg-[#FF5C00]"
                    : "w-2.5 bg-gray-700 hover:bg-gray-500"
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border border-gray-700 text-white hover:border-[#FF5C00] hover:text-[#FF5C00] flex items-center justify-center transition-all duration-300"
                aria-label="Previous work"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-[#FF5C00] text-white hover:bg-[#FF7324] shadow-[0_0_15px_rgba(255,92,0,0.3)] flex items-center justify-center transition-all duration-300"
                aria-label="Next work"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}