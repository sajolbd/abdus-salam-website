"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { id: "short-form", label: "Short Form" },
  { id: "long-form", label: "Long Form" },
  { id: "promotional-video", label: "Promotional Video" },
  { id: "podcast", label: "Podcast" },
];

const CARD_GAP = 24;
const LOOP_COPIES = 4;

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\/shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : "";
}

const works = [
  {
    id: 1,
    title: "Instagram Free Subtitles for All Your Reels 💬🍿 (No App Needed!)",
    category: "short-form",
    thumbnail: "https://img.youtube.com/vi/jbm0U5dJNyU/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/shorts/jbm0U5dJNyU",
  },
  {
    id: 2,
    title: "20th February Induction – A Brilliant Start at SIRM Leicester!",
    category: "long-form",
    thumbnail: "https://img.youtube.com/vi/DCOVbKvUhx4/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=DCOVbKvUhx4",
  },
  {
    id: 3,
    title: "How hamza react on his ai pics and video? clear men",
    category: "short-form",
    thumbnail: "https://img.youtube.com/vi/2Mjk2oX0Ie0/hqdefault.jpg",
    videoUrl: "https://youtube.com/shorts/2Mjk2oX0Ie0",
  },
  {
    id: 4,
    title: "Commercial Ads Promo",
    category: "promotional-video",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-holding-smartphone-and-editing-video-41775-large.mp4",
  },
  {
    id: 5,
    title: "হামজা কি পারবে বিকাশ-এর এই চ্যালেঞ্জ নিতে?",
    category: "short-form",
    thumbnail: "https://img.youtube.com/vi/-lvuoX064qI/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/shorts/-lvuoX064qI",
  },
  {
    id: 6,
    title: "পাগল নাকি 🤪 | Let’s Fix Our English & Teach Them Bangla! | 🇧🇩🇬🇧 Banglish Ep-2",
    category: "short-form",
    thumbnail: "https://img.youtube.com/vi/G9G_czgfgyI/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=G9G_czgfgyI",
  },
  {
    id: 7,
    title: "One dream. One cup. Get Ready Bangladesh bKash X Hamza",
    category: "podcast",
    thumbnail: "https://img.youtube.com/vi/z9Z_ksiQx6g/hqdefault.jpg",
    videoUrl: "https://youtube.com/shorts/z9Z_ksiQx6g",
  },
  {
    id: 8,
    title: "ম্যাচের আগে হামজা কী মিস করে না?",
    category: "short-form",
    thumbnail: "https://img.youtube.com/vi/ZX-HBEB_XbQ/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/shorts/ZX-HBEB_XbQ",
  },
  {
    id: 9,
    title: "2-Minutes Study Abroad – Episode 7: Life as a Student in the UK",
    category: "long-form",
    thumbnail: "https://img.youtube.com/vi/b-d0wMgGHAw/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=b-d0wMgGHAw",
  },
  {
    id: 10,
    title: "Are Romanians really open minded when it comes to interracial relationships?",
    category: "short-form",
    thumbnail: "https://img.youtube.com/vi/WcJD0SwNBkk/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/shorts/WcJD0SwNBkk",
  },
  {
    id: 11,
    title: "Commercial Ads Promo",
    category: "promotional-video",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-holding-smartphone-and-editing-video-41775-large.mp4",
  },
  {
    id: 12,
    title: "Finest Trailer,Promotional Video.Jihad hasan editor.",
    category: "podcast",
    thumbnail: "https://img.youtube.com/vi/Zp6WSVS7X5o/hqdefault.jpg",
    videoUrl: "https://youtu.be/Zp6WSVS7X5o",
  },
  {
    id: 13,
    title: "মারিয়াম অফিসের নতুন বস , আজকে আমাকে কি কাজে দিল? - Xobaer Vlog 432",
    category: "long-form",
    thumbnail: "https://img.youtube.com/vi/ev7zCJwi0bk/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=ev7zCJwi0bk",
  },
  {
    id: 14,
    title: "Graduation 2024 at SIRM: Where Memories Meet New Beginnings.",
    category: "long-form",
    thumbnail: "https://img.youtube.com/vi/J-QvxJkOuEQ/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=J-QvxJkOuEQ",
  },
  {
    id: 15,
    title: "জ্যামাইকা এসে তাজ্জব হয়ে গেলাম 😱 । Jamaica tour l Sagar Ahmed | Bangla Vlog 2023",
    category: "long-form",
    thumbnail: "https://img.youtube.com/vi/Vpk1IkDB29c/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=Vpk1IkDB29c",
  },
  {
    id: 16,
    title: "ডকুমেন্টারি ফিল্ম মেকিং এ হাতেখড়ি দ্বিতিও পর্ব  | Documentary film making in Bangla Part 2",
    category: "long-form",
    thumbnail: "https://img.youtube.com/vi/RL7JGjaLQH0/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=RL7JGjaLQH0",
  },
  {
    id: 17,
    title: "আজকাল কেন এত বিয়ে ব্যর্থ হয় 💔 | হাফ আ দ্বীন : হাফ আ ড্রামা পর্ব ১",
    category: "podcast",
    thumbnail: "https://img.youtube.com/vi/_-Yh_44HnPs/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=_-Yh_44HnPs",
  },
  {
    id: 18,
    title: "Are they real? zombie 3 Movie Trailer (2024). A zombie movie Official Trailer by J production.",
    category: "podcast",
    thumbnail: "https://img.youtube.com/vi/tsMzpRjMKP0/hqdefault.jpg",
    videoUrl: "https://youtu.be/tsMzpRjMKP0",
  },
  {
    id: 19,
    title: "🎧 Partnerships and Student Focus",
    category: "podcast",
    thumbnail: "https://img.youtube.com/vi/QMtWA8Kzf6Y/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=QMtWA8Kzf6Y",
  },
  {
    id: 20,
    title: "Made in Brum Ep. 1 | Building Business, Careers & Community in Birmingham",
    category: "podcast",
    thumbnail: "https://img.youtube.com/vi/MKz3SSt49Ak/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=MKz3SSt49Ak",
  }
];

export default function FeaturedWork() {
  const [activeCategory, setActiveCategory] = useState("short-form");
  const [activeIndex, setActiveIndex] = useState(0);
  const [activePlayingKey, setActivePlayingKey] = useState<string | null>(null);
  const [slideOffset, setSlideOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const trackRef = useRef<HTMLDivElement>(null);
  const filteredWorks = works.filter((item) => item.category === activeCategory);
  const renderedWorks = filteredWorks.length > 1
    ? Array.from({ length: LOOP_COPIES }, () => filteredWorks).flat()
    : filteredWorks;
  const isWideCard = activeCategory === "long-form" || activeCategory === "podcast";
  const activeDotIndex = filteredWorks.length > 0 ? activeIndex % filteredWorks.length : 0;

  const measureSlide = useCallback(() => {
    if (!trackRef.current) return;

    const child = trackRef.current.firstElementChild;
    if (!child) return;

    const childWidth = child.getBoundingClientRect().width;
    setSlideOffset(childWidth + CARD_GAP);
  }, []);

  const goToWork = useCallback((index: number) => {
    if (filteredWorks.length <= 1) return;

    setIsAnimating(true);
    setActiveIndex(index);
  }, [filteredWorks.length]);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(measureSlide);
    window.addEventListener("resize", measureSlide);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", measureSlide);
    };
  }, [measureSlide]);

  useEffect(() => {
    setIsAnimating(false);
    setActiveIndex(0);
    setActivePlayingKey(null);

    const measureFrameId = window.requestAnimationFrame(measureSlide);
    let restoreFrameId = 0;
    const resetFrameId = window.requestAnimationFrame(() => {
      restoreFrameId = window.requestAnimationFrame(() => setIsAnimating(true));
    });

    return () => {
      window.cancelAnimationFrame(measureFrameId);
      window.cancelAnimationFrame(resetFrameId);
      window.cancelAnimationFrame(restoreFrameId);
    };
  }, [activeCategory, measureSlide]);

  useEffect(() => {
    if (activePlayingKey !== null || filteredWorks.length <= 1) return;

    const intervalId = window.setInterval(() => {
      setIsAnimating(true);
      setActiveIndex((currentIndex) => currentIndex + 1);
    }, 4200);

    return () => window.clearInterval(intervalId);
  }, [activePlayingKey, filteredWorks.length]);

  const handleTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (filteredWorks.length <= 1 || activeIndex < filteredWorks.length) return;

    setIsAnimating(false);
    setActiveIndex(activeIndex % filteredWorks.length);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsAnimating(true));
    });
  };

  const loopBackToLast = () => {
    setIsAnimating(false);
    setActiveIndex(filteredWorks.length);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsAnimating(true);
        setActiveIndex(filteredWorks.length - 1);
      });
    });
  };

  const handlePrev = () => {
    if (filteredWorks.length <= 1) return;

    if (activeDotIndex === 0) {
      loopBackToLast();
      return;
    }

    goToWork(activeIndex - 1);
  };

  const handleNext = () => {
    if (filteredWorks.length <= 1) return;
    goToWork(activeIndex + 1);
  };

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === activeCategory) return;
    setActiveCategory(categoryId);
  };

  const handleDotClick = (index: number) => {
    goToWork(index);
  };

  const getCardKey = (workId: number, index: number) => `${workId}-${index}`;

  const sliderTransform = {
    transform: `translate3d(-${activeIndex * slideOffset}px, 0, 0)`,
  };

  return (
    <section className="relative w-full bg-[#0C0C0E] py-8 lg:py-16 px-6 sm:px-12 md:px-16 overflow-hidden select-none">

      {/* Glow highlight */}
      <div className="absolute top-1/2 left-[-10%] w-[350px] md:w-[700px] h-[350px] md:h-[700px] bg-[#FF5C00]/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-12">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2 text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              My Featured Work
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-light">
              A glimpse into my recent editing work and collaborations
            </p>
          </div>

          {/* Filter Pills */}
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

        {/* Video Slider Viewport */}
        <div className="relative w-full overflow-hidden">
          <div
            ref={trackRef}
            onTransitionEnd={handleTransitionEnd}
            className={`flex gap-6 py-4 px-2 ${isAnimating ? "transition-transform duration-700 ease-out" : ""}`}
            style={sliderTransform}
          >
            {renderedWorks.map((work, index) => {
              const cardKey = getCardKey(work.id, index);
              const isPlaying = activePlayingKey === cardKey;

              return (
                <div
                  key={cardKey}
                  onClick={() => !isPlaying && setActivePlayingKey(cardKey)}
                  className={`flex-shrink-0 overflow-hidden border border-gray-800/80 bg-gray-900/40 relative cursor-pointer group shadow-lg hover:border-[#FF5C00]/50 transition-all duration-500 ${
                    isWideCard
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
                        className="absolute inset-0 w-full h-full z-20 bg-black"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Video Close Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePlayingKey(null);
                          }}
                          className="absolute top-2 right-2 z-30 w-7 h-7 rounded-full bg-black/70 hover:bg-black/90 flex items-center justify-center text-white transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        {/* Video Player */}
                        {work.videoUrl.includes("youtube.com") || work.videoUrl.includes("youtu.be") ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${getYouTubeId(work.videoUrl)}?autoplay=1&mute=0`}
                            className="w-full h-full object-cover"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={work.title}
                          />
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
                        <div className={`absolute text-left ${isWideCard ? "bottom-5 left-5 right-5" : "bottom-4 left-4 right-4"}`}>
                          <h4 className={`text-white font-bold drop-shadow-md ${
                            isWideCard ? "text-base sm:text-lg line-clamp-2" : "text-sm sm:text-base line-clamp-2"
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
                </div>
              );
            })}
          </div>
        </div>

        {/* Client Loved Tagline */}
        <div className="flex items-center justify-center gap-2.5 text-center text-gray-400 text-xl  md:text-3xl font-semibold mt-4">
          <span className="w-3 h-3 rounded-full bg-[#FF5C00] animate-pulse" />
          <span>Works loved by our clients</span>
        </div>

        {/* Bottom Controls: Pagination & Arrows */}
        <div className="flex items-center justify-between mt-4">

          {/* Pagination Indicators (Dots) */}
          <div className="flex gap-2">
            {filteredWorks.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${activeDotIndex === idx
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
              className="w-12 h-12 rounded-full border border-gray-700 text-white hover:border-[#FF5C00] hover:text-[#FF5C00] flex items-center justify-center transition-all duration-300"
              aria-label="Previous work"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-[#FF5C00] text-white hover:bg-[#FF7324] shadow-[0_0_15px_rgba(255,92,0,0.3)] flex items-center justify-center transition-all duration-300"
              aria-label="Next work"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
