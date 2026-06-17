"use client";

import React from "react";
import Image from "next/image";
import CountUp from "react-countup";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="relative w-full bg-[#0C0C0E] py-6 lg:py-16 px-6 sm:px-12 md:px-16 overflow-hidden select-none">

      {/* Background glow effects */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-to-t from-[#FF5C00]/10 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[20%] left-[-10%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-gradient-to-b from-[#FF5C00]/5 to-transparent rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10">

        {/* Left Column: Image with rounded corners & motion fade-in */}
        <motion.div
          className="lg:col-span-5 w-full flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative w-full aspect-[4/5] sm:aspect-[4/5] md:max-w-md lg:max-w-none rounded-[32px] overflow-hidden border border-gray-800/60 shadow-[0_12px_40px_rgba(0,0,0,0.5)] group">
            <Image
              src="/images/about/jihad-hasan.png"
              alt="Jihad Hasan Portrait"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            {/* Soft dark overlay overlaying the image */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0E]/50 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Right Column: Heading, Subtitle & Smooth Stats Counter */}
        <motion.div
          className="lg:col-span-7 flex flex-col gap-6 text-left"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
            Turning Raw Footage <br />
            <span className="text-white">Into Pure Art</span>
          </h2>

          {/* Paragraph Description */}
          <div className="flex flex-col gap-4 text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed font-light">
            <p>
              I&apos;m Jihad Hasan, a <span className="font-semibold text-white">professional Video Editor</span> with <span className="font-semibold text-[#FF5C00]">6+ years of experience</span> creating content that helps brands and creators stand out in a crowded digital world. Having worked with <span className="font-semibold text-white">international clients across the UK and Germany</span>, as well as <span className="font-semibold text-white">top-tier Bangladeshi brands like bKash, Clear Men</span>, and leading creators, I understand what it takes to make a video <span className="font-semibold text-[#FF5C00]">stand out in a crowded feed</span>.
            </p>
            <p>
              My goal is simple: to turn your raw footage and ideas into <span className="font-semibold text-white">professional, engaging videos</span> that <span className="font-semibold text-[#FF5C00]">connect with your audience</span> and <span className="font-semibold text-white">elevate your brand</span>. If you want content that stands out and <span className="font-semibold text-[#FF5C00]">delivers results</span>, let&apos;s work together.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-gray-800/60 mt-4">

            {/* Stat 1: Projects Delivered */}
            <div className="flex flex-col gap-1 group">
              <span className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight transition-colors duration-300 group-hover:text-[#FF5C00]">
                <CountUp end={350} duration={2.5} enableScrollSpy scrollSpyOnce suffix="+" />
              </span>
              <span className="text-gray-400 text-[10px] sm:text-xs md:text-sm font-medium tracking-wide uppercase">
                Projects Delivered
              </span>
            </div>

            {/* Stat 2: Global Clients */}
            <div className="flex flex-col gap-1 group">
              <span className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight transition-colors duration-300 group-hover:text-[#FF5C00]">
                <CountUp end={40} duration={2.5} enableScrollSpy scrollSpyOnce suffix="+" />
              </span>
              <span className="text-gray-400 text-[10px] sm:text-xs md:text-sm font-medium tracking-wide uppercase">
                Global Clients
              </span>
            </div>

            {/* Stat 3: Total Video Views */}
            <div className="flex flex-col gap-1 group">
              <span className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight transition-colors duration-300 group-hover:text-[#FF5C00]">
                <CountUp end={70000000} duration={2.5} enableScrollSpy scrollSpyOnce suffix="+" />
              </span>
              <span className="text-gray-400 text-[10px] sm:text-xs md:text-sm font-medium tracking-wide uppercase">
                Total Video Views
              </span>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
