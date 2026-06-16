"use client";

import React from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const reasons = [
  "6+ Years of Professional Experience",
  "Trusted by Brands & Content Creators",
  "Fast Communication & Reliable Delivery",
  "Detail-Oriented Editing & Storytelling",
  "Focused on Quality, Engagement, and Results",
];

export default function WhyWorkWithMe() {
  return (
    <section className={`${plusJakarta.className} relative w-full bg-[#0C0C0E] py-6 lg:py-16 px-6 sm:px-12 md:px-16 overflow-hidden select-none`}>
      {/* Background radial glow */}
      <div className="absolute top-[30%] right-[-10%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-[#FF5C00]/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-to-t from-[#FF5C00]/3 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10">
        {/* Left Column: Heading & Introduction */}
        <motion.div
          className="lg:col-span-5 flex flex-col gap-6 text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2">
            <span className="w-8 h-[2px] bg-[#FF5C00]" />
            <span className="text-xs font-bold text-[#FF5C00] tracking-widest uppercase">
              Core Strengths
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Why Work <br />
            <span className="text-white">With Me?</span>
          </h2>

          <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed font-light">
            I don't just put clips together. I help creators and brands tell engaging visual stories that hook the viewer, increase watch time, and build long-term trust.
          </p>
        </motion.div>

        {/* Right Column: Key Points */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-4 bg-[#121215]/60 hover:bg-[#121215] border border-white/5 hover:border-[#FF5C00]/30 p-5 rounded-2xl transition-all duration-300 group shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            >
              {/* Glowing Plus Icon */}
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#FF5C00]/40 group-hover:bg-[#FF5C00]/10 flex items-center justify-center text-gray-400 group-hover:text-[#FF5C00] shadow-sm transition-all duration-300">
                <Plus className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
              </div>

              {/* Text */}
              <span className="text-white text-sm sm:text-base md:text-lg font-medium tracking-wide transition-colors duration-300">
                {reason}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
