"use client";

import React, { useState } from "react";
import {
  ArrowUpRight,
  Play,
  Pause,
  Scissors,
  Crop,
  RotateCw,
  Lock,
  Eye,
  Volume2,
  Sparkles,
  Music,
  Menu,
  X,
  ChevronDown,
  RotateCcw,
  Maximize2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  // Floating animation settings for widgets
  const floatAnimation = (delay = 0) => ({
    animate: {
      y: [0, -8, 0],
    },
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }
  });

  return (
    <div className={`${plusJakarta.className} relative min-h-screen bg-[#0C0C0E] text-white overflow-hidden select-none`}>

      {/* ---------------- GLOW EFFECTS & STREAKS ---------------- */}
      {/* Central Radial Glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] md:w-[900px] h-[300px] sm:h-[600px] md:h-[700px] bg-gradient-to-b from-[#FF5C00]/25 to-transparent rounded-full blur-[100px] md:blur-[140px] pointer-events-none z-0" />

      {/* Geometric Light Arches (as seen in screenshot) */}
      <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[350px] sm:w-[650px] md:w-[950px] h-[250px] sm:h-[450px] md:h-[550px] border border-[#FF5C00]/10 rounded-full blur-[2px] pointer-events-none z-0" />
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[450px] sm:w-[780px] md:w-[1100px] h-[300px] sm:h-[550px] md:h-[650px] border border-[#FF5C00]/5 rounded-full blur-[4px] pointer-events-none z-0" />

      {/* ---------------- HERO CONTENT ---------------- */}
      <main className="relative max-w-7xl mx-auto px-6 pt-12 md:pt-20 pb-32 flex flex-col items-center justify-center text-center z-10">

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-16 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white max-w-4xl"
        >
          Editing Stories <br className="hidden sm:inline" />
          That Inspire Audiences
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mt-6 leading-relaxed"
        >
          Transforming raw footage into cinematic videos for creators, brands and storytellers.
        </motion.p>

        {/* CTA and Reviews Group */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 mt-10 w-full px-4"
        >
          {/* Main CTA Button */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-booking-modal"))}
            className="bg-[#FF5C00] text-white px-8 py-4 rounded-full font-bold text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 hover:bg-[#FF7324] hover:shadow-[0_0_35px_rgba(255,92,0,0.55)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto"
          >
            GET A FREE STRATEGY CALL <ArrowUpRight className="w-4 h-4 stroke-[2.5px]" />
          </button>

          {/* Social Proof Badge */}
          <div className="flex items-center gap-3">
            {/* Avatars */}
            <div className="flex -space-x-3">
              <div className="w-9 h-9 rounded-full border-2 border-[#0C0C0E] overflow-hidden relative">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Creator Avatar"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <div className="w-9 h-9 rounded-full border-2 border-[#0C0C0E] overflow-hidden relative">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                  alt="Creator Avatar"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <div className="w-9 h-9 rounded-full border-2 border-[#0C0C0E] overflow-hidden relative">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                  alt="Creator Avatar"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <div className="w-9 h-9 rounded-full border-2 border-[#0C0C0E] bg-black/90 text-white text-[10px] font-bold flex items-center justify-center">
                2k
              </div>
            </div>

            {/* Stars & Text */}
            <div className="flex flex-col items-start text-left">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#FFAE00]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-[11px] font-medium text-gray-400 mt-0.5">I Have Worked On 350+  Projects And Popular Creators</span>
            </div>
          </div>
        </motion.div>

        {/* ---------------- SHOWCASE MOCKUP ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="relative w-full max-w-5xl mt-16 md:mt-24 px-1 sm:px-4"
        >
          {/* Mockup Outer Board with Glowing Border */}
          <div className="w-full bg-[#121214] p-2 sm:p-4 rounded-[2rem] border border-[#FF5C00]/25 shadow-[0_0_80px_rgba(255,92,0,0.18)] relative overflow-hidden">

            {/* Real Interface Canvas */}
            <div className="w-full bg-[#F3F1EC] rounded-[1.6rem] p-4 sm:p-6 md:p-8 flex flex-col gap-6 text-gray-800 relative z-10 overflow-hidden">

              {/* Top Main Workspace Row */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center min-h-[380px] relative">

                {/* 1. LEFT TOOLBAR (Floating or aligned) */}
                <div className="md:col-span-2 flex md:justify-start justify-center">
                  <motion.div
                    {...floatAnimation(0.2)}
                    className="bg-white p-2 rounded-full md:rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex md:flex-col gap-3 sm:gap-4 border border-gray-100/80 w-auto md:w-16 items-center py-2.5 md:py-6"
                  >
                    <button className="p-2.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="rotate-[-45deg] scale-[0.9]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    </button>
                    <button className="p-2.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors">
                      <Scissors className="w-5 h-5" />
                    </button>
                    <button className="p-2.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors">
                      <RotateCw className="w-5 h-5" />
                    </button>

                    {/* Active Crop Tool (Exactly as screenshot) */}
                    <div className="relative">
                      <button className="p-2.5 rounded-xl bg-gray-50 text-gray-800 border border-gray-100/50 shadow-sm relative">
                        <Crop className="w-5 h-5 text-gray-800" />
                        <span className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-[#FF5C00] rounded-full" />
                      </button>

                      {/* Mouse Pointer hovering over crop tool */}
                      <svg className="absolute bottom-[-16px] left-[24px] w-5 h-5 drop-shadow-md pointer-events-none z-30" viewBox="0 0 24 24" fill="none">
                        <path d="M4.5 3V17L9.5 13.5L14.5 20.5L17.5 18.5L12.5 11.5L17.5 11V3H4.5Z" fill="black" stroke="white" strokeWidth="1.5" />
                      </svg>
                    </div>

                    <button className="p-2.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </motion.div>
                </div>

                {/* 2. CENTRAL VIDEO PREVIEW */}
                <div className="md:col-span-8 flex justify-center w-full">
                  <div className="relative w-full max-w-[500px] aspect-[4/3] bg-white rounded-3xl p-3 shadow-[0_12px_40px_rgba(0,0,0,0.05)] border border-gray-100/80 overflow-hidden group">
                    {/* Outer Portrait Image Wrapper */}
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-100">
                      <Image
                        src="/images/home/hero-section/video_preview_portrait.png"
                        alt="Editing Portrait Preview"
                        fill
                        priority
                        className="object-cover"
                      />

                      {/* Green Selection Box Overlaid (Exact crop frame) */}
                      <div className="absolute inset-8 border-2 border-[#57F287] rounded-xl shadow-[0_0_0_9999px_rgba(0,0,0,0.4)]">
                        {/* Corners Selection Handles */}
                        <span className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 bg-white border-2 border-[#57F287] rounded-sm" />
                        <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-white border-2 border-[#57F287] rounded-sm" />
                        <span className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 bg-white border-2 border-[#57F287] rounded-sm" />
                        <span className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-white border-2 border-[#57F287] rounded-sm" />

                        {/* Grid lines inside crop */}
                        <div className="w-full h-full grid grid-cols-3 grid-rows-3 opacity-30">
                          <div className="border-r border-b border-[#57F287] border-dashed" />
                          <div className="border-r border-b border-[#57F287] border-dashed" />
                          <div className="border-b border-[#57F287] border-dashed" />
                          <div className="border-r border-b border-[#57F287] border-dashed" />
                          <div className="border-r border-b border-[#57F287] border-dashed" />
                          <div className="border-b border-[#57F287] border-dashed" />
                          <div className="border-r border-[#57F287] border-dashed" />
                          <div className="border-r border-[#57F287] border-dashed" />
                          <div className="" />
                        </div>
                      </div>

                      {/* Video Player Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        {/* Play button with pulsing orange glow ring */}
                        <div
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="relative w-14 h-14 bg-[#FF5C00] rounded-full flex items-center justify-center text-white cursor-pointer shadow-[0_0_30px_rgba(255,92,0,0.5)] active:scale-95 hover:scale-110 transition-transform duration-300"
                        >
                          {isPlaying ? (
                            <Pause className="w-5 h-5 fill-white text-white" />
                          ) : (
                            <Play className="w-5 h-5 fill-white text-white translate-x-[2px]" />
                          )}

                          {/* Animated Ripple ring */}
                          <span className="absolute -inset-2.5 border-2 border-white/40 rounded-full animate-ping pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. RIGHT FLOATING BADGES (absolute or responsive column) */}
                {/* Floating "Video Effects" Badges */}
                <div className="md:col-span-2 flex flex-col gap-4 items-center md:items-end w-full">
                  {/* Video Effects Widget */}
                  <motion.div
                    {...floatAnimation(0.4)}
                    className="bg-white py-3 px-4 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.06)] border border-gray-100 flex items-center gap-3 w-48 md:absolute md:right-[-20px] md:top-[12%]"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#57F287] to-[#8EFAAB] flex items-center justify-center text-white">
                      <Sparkles className="w-4 h-4 fill-white" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-gray-800">Video Effects</span>
                    </div>

                    {/* Dark cursor arrow */}
                    <svg className="absolute bottom-[-14px] left-[32px] w-5 h-5 drop-shadow-md pointer-events-none z-30" viewBox="0 0 24 24" fill="none">
                      <path d="M4.5 3V17L9.5 13.5L14.5 20.5L17.5 18.5L12.5 11.5L17.5 11V3H4.5Z" fill="black" stroke="white" strokeWidth="1.5" />
                    </svg>
                  </motion.div>

                  {/* Creator chat Widget */}
                  <motion.div
                    {...floatAnimation(0.7)}
                    className="bg-[#19191D] text-white py-2 px-3 rounded-2xl shadow-[0_12px_35px_rgba(0,0,0,0.12)] border border-white/5 flex items-center gap-2.5 w-32 md:absolute md:right-[10px] md:top-[60%]"
                  >
                    <div className="w-6 h-6 rounded-full relative overflow-hidden bg-gray-600">
                      <Image
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                        alt="User Profile"
                        fill
                        sizes="24px"
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[11px] font-bold tracking-wide">Hi! ✌️</span>
                  </motion.div>
                </div>

              </div>

              {/* Bottom Timeline Panel */}
              <div className="w-full bg-white rounded-2xl p-4 sm:p-5 shadow-[0_8px_35px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col gap-4 relative">

                {/* 1. Timeline Controls Header */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pb-2 border-b border-gray-100">
                  {/* Time Counter */}
                  <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors">
                    00:34:587 <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </div>

                  {/* Playback Controls */}
                  <div className="flex items-center gap-5">
                    <button className="text-gray-400 hover:text-gray-700 transition-colors"><RotateCcw className="w-4 h-4" /></button>
                    <button className="text-gray-400 hover:text-gray-700 transition-colors">
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    </button>
                    <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors">
                      {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current translate-x-[1px]" />}
                    </button>
                    <button className="text-gray-400 hover:text-gray-700 transition-colors">
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 12l-18 12v-24z" />
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-gray-700 transition-colors"><Maximize2 className="w-4 h-4" /></button>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#57F287] animate-pulse" />
                    Start animating
                  </div>
                </div>

                {/* 2. Timeline Tracks Grid */}
                <div className="relative flex flex-col gap-3.5 pt-2">

                  {/* Scrubber Playhead Line (Exactly vertical) */}
                  <div className="absolute left-[35%] top-0 bottom-0 w-[1.5px] bg-black/80 z-20 flex flex-col items-center">
                    <div className="w-3.5 h-3.5 bg-black rounded-b-md transform translate-y-[-6px]" />
                  </div>

                  {/* Time indicators (small grid marks) */}
                  <div className="w-full flex justify-between px-[5%] text-[9px] font-bold text-gray-400">
                    <span>0s</span><span>5s</span><span>10s</span><span>15s</span><span>20s</span><span>25s</span><span>30s</span><span>35s</span><span>40s</span><span>45s</span><span>50s</span>
                  </div>

                  {/* Track 1: Video Footage (Green theme) */}
                  <div className="grid grid-cols-12 items-center gap-4">
                    <div className="col-span-12 lg:col-span-3 flex items-center justify-between text-xs font-bold text-gray-600 px-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        Video Footage
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Eye className="w-3.5 h-3.5 cursor-pointer hover:text-gray-600" />
                        <Volume2 className="w-3.5 h-3.5 cursor-pointer hover:text-gray-600" />
                        <Lock className="w-3.5 h-3.5 cursor-pointer hover:text-gray-600" />
                      </div>
                    </div>

                    <div className="col-span-12 lg:col-span-9 bg-[#EBF7EE] border border-[#C6ECCF] rounded-xl h-12 overflow-hidden flex items-center p-1 relative gap-1">
                      {/* Repeated Video Thumbnail Frames */}
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-full aspect-[4/3] rounded-md overflow-hidden relative opacity-85">
                          <Image
                            src="/images/home/hero-section/video_preview_portrait.png"
                            alt="Frame"
                            fill
                            sizes="60px"
                            className="object-cover scale-110"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Track 2: Audio / Commercial Sound (Purple/Blue theme) */}
                  <div className="grid grid-cols-12 items-center gap-4 relative">

                    {/* Floating Audio Tag element with Note (matching screenshot exactly) */}
                    <div className="absolute left-[45%] top-[-32px] z-30">
                      <motion.div
                        {...floatAnimation(0.9)}
                        className="bg-white p-2 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-gray-100 flex items-center justify-center w-12 h-12 relative"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#E2FFF0] flex items-center justify-center text-emerald-500">
                          <Music className="w-5 h-5 fill-current" />
                        </div>
                        {/* Cursor hovering/clicking tag */}
                        <svg className="absolute bottom-[-14px] right-[-10px] w-4.5 h-4.5 drop-shadow-md pointer-events-none z-30" viewBox="0 0 24 24" fill="none">
                          <path d="M4.5 3V17L9.5 13.5L14.5 20.5L17.5 18.5L12.5 11.5L17.5 11V3H4.5Z" fill="black" stroke="white" strokeWidth="1.5" />
                        </svg>
                      </motion.div>
                    </div>

                    <div className="col-span-12 lg:col-span-3 flex items-center justify-between text-xs font-bold text-gray-600 px-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-400" />
                        Commercial Sound
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Eye className="w-3.5 h-3.5 cursor-pointer hover:text-gray-600" />
                        <Volume2 className="w-3.5 h-3.5 cursor-pointer hover:text-gray-600" />
                        <Lock className="w-3.5 h-3.5 cursor-pointer hover:text-gray-600" />
                      </div>
                    </div>

                    <div className="col-span-12 lg:col-span-9 bg-[#EBF0FF] border border-[#CBD5E0] rounded-xl h-12 overflow-hidden flex items-center px-4 relative">
                      {/* Audio Waveform Graphic */}
                      <svg className="w-full h-8 text-[#A0AEC0] opacity-80" viewBox="0 0 400 40" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 20 H5 M5 20 V12 H8 V28 H11 V20 H16 V5 H19 V35 H22 V20 H28 V15 H31 V25 H34 V20 H40 V10 H43 V30 H46 V20 H52 V8 H55 V32 H58 V20 H64 V18 H67 V22 H70 V20 H75 V14 H78 V26 H81 V20 H86 V4 H89 V36 H92 V20 H98 V16 H101 V24 H104 V20 H110 V12 H113 V28 H116 V20 H122 V8 H125 V32 H128 V20 H134 V18 H137 V22 H140 V20 H145 V5 H148 V35 H151 V20 H157 V15 H160 V25 H163 V20 H169 V10 H172 V30 H175 V20 H181 V8 H184 V32 H187 V20 H193 V18 H196 V22 H199 V20 H205 V14 H208 V26 H211 V20 H216 V4 H219 V36 H222 V20 H228 V16 H231 V24 H234 V20 H240 V12 H243 V28 H246 V20 H252 V8 H255 V32 H258 V20 H264 V18 H267 V22 H270 V20 H275 V5 H278 V35 H281 V20 H287 V15 H290 V25 H293 V20 H299 V10 H302 V30 H305 V20 H311 V8 H314 V32 H317 V20 H323 V18 H326 V22 H329 V20 H335 V14 H338 V26 H341 V20 H346 V4 H349 V36 H352 V20 H358 V16 H361 V24 H364 V20 H370 V12 H373 V28 H376 V20 H382 V8 H385 V32 H388 V20 H394 V18 H397 V22 H400 V20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  {/* 3. Slider properties (Scale X and Opacity slider indicators) */}
                  <div className="flex gap-6 mt-1 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-gray-400">Scale X</span>
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full relative">
                        <div className="absolute left-0 top-0 bottom-0 w-[70%] bg-emerald-400 rounded-full" />
                        <div className="absolute left-[70%] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white border border-gray-300 rounded-full shadow-sm" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-gray-400">Opacity</span>
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full relative">
                        <div className="absolute left-0 top-0 bottom-0 w-[45%] bg-emerald-400 rounded-full" />
                        <div className="absolute left-[45%] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white border border-gray-300 rounded-full shadow-sm" />
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* Glowing Accent Border at bottom window */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF5C00] to-transparent opacity-60 blur-[1px]" />
          </div>
        </motion.div>

      </main>

    </div>
  );
}
