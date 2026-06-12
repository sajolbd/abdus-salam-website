"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight, Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { id: "short-form", label: "Short Form" },
  { id: "long-form", label: "Long Form" },
  { id: "ads-vsl", label: "Ads & VSL" },
];

const works = [
  {
    id: 1,
    title: "AI Tool For Students",
    category: "short-form",
    thumbnail: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-holding-smartphone-and-editing-video-41775-large.mp4",
  },
  {
    id: 2,
    title: "Make Edit 10X Faster",
    category: "short-form",
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-video-editor-using-a-keyboard-and-mouse-41777-large.mp4",
  },
  {
    id: 3,
    title: "MrBeast's YouTube Secret",
    category: "short-form",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-video-editor-working-on-his-workspace-41778-large.mp4",
  },
  {
    id: 4,
    title: "Nega Aynan Impulse",
    category: "short-form",
    thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-working-on-video-editing-software-41779-large.mp4",
  },
  {
    id: 5,
    title: "Cinematic Color Grading",
    category: "long-form",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-adjusting-sound-on-an-audio-mixer-41783-large.mp4",
  },
  {
    id: 6,
    title: "Commercial Ads Promo",
    category: "ads-vsl",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-holding-smartphone-and-editing-video-41775-large.mp4",
  },
  {
    id: 1,
    title: "AI Tool For Students",
    category: "short-form",
    thumbnail: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-holding-smartphone-and-editing-video-41775-large.mp4",
  },
  {
    id: 2,
    title: "Make Edit 10X Faster",
    category: "short-form",
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-video-editor-using-a-keyboard-and-mouse-41777-large.mp4",
  },
  {
    id: 3,
    title: "MrBeast's YouTube Secret",
    category: "short-form",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-video-editor-working-on-his-workspace-41778-large.mp4",
  },
  {
    id: 4,
    title: "Nega Aynan Impulse",
    category: "short-form",
    thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-working-on-video-editing-software-41779-large.mp4",
  },
  {
    id: 5,
    title: "Cinematic Color Grading",
    category: "long-form",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-adjusting-sound-on-an-audio-mixer-41783-large.mp4",
  },
  {
    id: 6,
    title: "Commercial Ads Promo",
    category: "ads-vsl",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-holding-smartphone-and-editing-video-41775-large.mp4",
  }
];

export default function FeaturedWork() {
  const [activeCategory, setActiveCategory] = useState("short-form");
  const [activeIndex, setActiveIndex] = useState(0);
  const [activePlayingId, setActivePlayingId] = useState<number | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const filteredWorks = works.filter((item) => item.category === activeCategory);

  // Sync scroll position with activeIndex dot
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const child = scrollContainerRef.current.firstElementChild;
      if (child) {
        const childWidth = child.getBoundingClientRect().width;
        // The container gap is gap-6 which is 24px
        const index = Math.round(scrollLeft / (childWidth + 24));
        setActiveIndex(Math.min(Math.max(index, 0), filteredWorks.length - 1));
      }
    }
  };

  // Click handler to slide to specific index
  const scrollTo = (index: number) => {
    if (scrollContainerRef.current) {
      const child = scrollContainerRef.current.firstElementChild;
      if (child) {
        const childWidth = child.getBoundingClientRect().width;
        const targetScrollLeft = index * (childWidth + 24);
        scrollContainerRef.current.scrollTo({
          left: targetScrollLeft,
          behavior: "smooth",
        });
        setActiveIndex(index);
      }
    }
  };

  // Prev/Next handlers
  const handlePrev = () => {
    scrollTo(Math.max(activeIndex - 1, 0));
  };

  const handleNext = () => {
    scrollTo(Math.min(activeIndex + 1, filteredWorks.length - 1));
  };

  // Reset index and stop any playing video when changing category
  useEffect(() => {
    setActiveIndex(0);
    setActivePlayingId(null);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [activeCategory]);

  return (
    <section className="relative w-full bg-[#0C0C0E] py-8 lg:py-16 px-6 sm:px-12 md:px-16 overflow-hidden select-none">

      {/* Glow highlight */}
      <div className="absolute top-1/2 left-[-10%] w-[350px] md:w-[700px] h-[350px] md:h-[700px] bg-[#FF5C00]/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-12">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2 text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Featured Work
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-light">
              A glimpse into our recent editing work and collaborations
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
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

        {/* Video Slider Viewport */}
        <div className="relative w-full">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory py-4 px-2"
            style={{ scrollbarWidth: "none" }}
          >
            {filteredWorks.map((work) => (
              <div
                key={work.id}
                onClick={() => activePlayingId !== work.id && setActivePlayingId(work.id)}
                className="flex-shrink-0 w-[150px] sm:w-[190px] md:w-[210px] aspect-[9/16] rounded-[24px] overflow-hidden border border-gray-800/80 bg-gray-900/40 relative cursor-pointer group snap-start shadow-lg hover:border-[#FF5C00]/50 transition-all duration-500"
              >
                <AnimatePresence mode="wait">
                  {activePlayingId === work.id ? (
                    <motion.div
                      key="video"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 w-full h-full z-20 bg-black"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Video Close Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePlayingId(null);
                        }}
                        className="absolute top-2 right-2 z-30 w-7 h-7 rounded-full bg-black/70 hover:bg-black/90 flex items-center justify-center text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      {/* Video Player */}
                      <video
                        src={work.videoUrl}
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                        playsInline
                        onEnded={() => setActivePlayingId(null)}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="thumbnail"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 w-full h-full"
                    >
                      {/* Thumbnail Background */}
                      <img
                        src={work.thumbnail}
                        alt={work.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Dark Hover overlay */}
                      <div className="absolute inset-0 bg-black/35 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center" />

                      {/* Pulsing Play Button */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                        <Play className="w-4 h-4 text-black fill-black ml-0.5" />
                      </div>

                      {/* Title Card */}
                      <div className="absolute bottom-4 left-4 right-4 text-left">
                        <h4 className="text-white text-sm sm:text-base font-bold drop-shadow-md line-clamp-2">
                          {work.title}
                        </h4>
                        <p className="text-gray-300 text-[10px] sm:text-xs mt-0.5 font-medium tracking-wide uppercase drop-shadow-sm">
                          {activeCategory.replace("-", " ")}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Controls: Pagination & Arrows */}
        <div className="flex items-center justify-between mt-4">

          {/* Pagination Indicators (Dots) */}
          <div className="flex gap-2">
            {filteredWorks.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === idx
                  ? "w-8 bg-[#FF5C00]"
                  : "w-2.5 bg-gray-700 hover:bg-gray-500"
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-4">
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${activeIndex === 0
                ? "border-gray-800 text-gray-700 cursor-not-allowed"
                : "border-gray-700 text-white hover:border-[#FF5C00] hover:text-[#FF5C00]"
                }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={activeIndex === filteredWorks.length - 1}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${activeIndex === filteredWorks.length - 1
                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                : "bg-[#FF5C00] text-white hover:bg-[#FF7324] shadow-[0_0_15px_rgba(255,92,0,0.3)]"
                }`}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
