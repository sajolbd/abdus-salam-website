"use client";

import React from "react";
import { Video, Smartphone, Sparkles, TrendingUp, ArrowUpRight } from "lucide-react";
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

export default function Services() {
  const triggerBooking = () => {
    window.dispatchEvent(new CustomEvent("open-booking-modal"));
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
              Our Services
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

        {/* Services 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((svc, index) => {
            const IconComponent = svc.icon;

            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                className="flex flex-col gap-5 p-6 md:p-8 rounded-[24px] border border-gray-800 bg-gray-950/20 backdrop-blur-sm hover:border-[#FF5C00]/50 transition-all duration-500 hover:-translate-y-1 hover:bg-gray-950/45 group"
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
    </section>
  );
}
