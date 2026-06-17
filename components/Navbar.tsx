"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";
import { usePathname } from "next/navigation";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("navbar-menu-toggle", { detail: mobileMenuOpen }));
  }, [mobileMenuOpen]);

  return (
    <div
      className={`${plusJakarta.className} fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isHome
          ? scrolled
            ? "bg-[#0C0C0E]/80 backdrop-blur-md border-b border-white/5 shadow-lg"
            : "bg-transparent border-transparent"
          : "bg-[#0C0C0E]/80 backdrop-blur-md border-b border-white/5"
      }`}
    >
      <header className="relative w-full max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-[#FF5C00]/30 transition-all duration-300">
            {/* Custom Camera Aperture SVG */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white group-hover:text-[#FF5C00] transition-colors duration-300">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4C14.07 4 15.93 4.83 17.29 6.17L12.54 10.92C12.38 10.97 12.2 11 12 11C11.45 11 11 10.55 11 10C11 9.8 11.03 9.62 11.08 9.46L6.17 4.55C7.75 3.58 9.8 3 12 3V4ZM4.55 6.17L9.46 11.08C9.3 11.24 9.2 11.46 9.2 11.7C9.2 12.25 9.65 12.7 10.2 12.7C10.44 12.7 10.66 12.6 10.82 12.44L15.73 17.35C14.15 18.32 12.1 18.9 9.9 18.9C7.83 18.9 5.97 18.07 4.61 16.73L9.36 11.98C9.52 11.93 9.7 11.9 9.9 11.9C10.45 11.9 10.9 12.35 10.9 12.9C10.9 13.1 10.87 13.28 10.82 13.44L15.73 18.35C14.15 19.32 12.1 19.9 9.9 19.9C5.48 19.9 1.9 16.32 1.9 11.9C1.9 7.48 5.48 3.9 9.9 3.9V4.9L4.55 6.17ZM17.35 15.73L12.44 10.82C12.6 10.66 12.7 10.44 12.7 10.2C12.7 9.65 12.25 9.2 11.7 9.2C11.46 9.2 11.24 9.3 11.08 9.46L6.17 4.55C7.75 3.58 9.8 3 12 3C16.42 3 20 6.58 20 11C20 13.07 19.17 14.93 17.83 16.29L13.08 11.54C13.13 11.38 13.16 11.2 13.16 11C13.16 10.45 12.71 10 12.16 10C11.96 10 11.78 10.03 11.62 11.08L17.35 15.73Z" fill="currentColor" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-gray-200 transition-colors">JihadHasan</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full backdrop-blur-md">
          <Link
            href="/"
            className={`text-sm transition-colors duration-200 ${
              pathname === "/" ? "font-semibold text-[#FF5C00]" : "font-medium text-gray-400 hover:text-white"
            }`}
          >
            Home
          </Link>
          <Link
            href="/about-us"
            className={`text-sm transition-colors duration-200 ${
              pathname === "/about-us" ? "font-semibold text-[#FF5C00]" : "font-medium text-gray-400 hover:text-white"
            }`}
          >
            About me
          </Link>
          <Link
            href="/work"
            className={`text-sm transition-colors duration-200 ${
              pathname === "/work" ? "font-semibold text-[#FF5C00]" : "font-medium text-gray-400 hover:text-white"
            }`}
          >
            Work
          </Link>
          <Link
            href="/services"
            className={`text-sm transition-colors duration-200 ${
              pathname === "/services" ? "font-semibold text-[#FF5C00]" : "font-medium text-gray-400 hover:text-white"
            }`}
          >
            Services
          </Link>
        </nav>

        {/* Contact CTA */}
        <div className="hidden md:block">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent("open-booking-modal"))}
            className="bg-[#FF5C00] text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-1.5 hover:bg-[#FF7324] hover:shadow-[0_0_25px_rgba(255,92,0,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            Contact us <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-0 right-0 mx-6 p-6 bg-[#121215] border border-white/10 rounded-2xl flex flex-col gap-4 z-40 md:hidden shadow-2xl"
          >
            <Link
              href="/"
              className={`text-base transition-colors duration-200 ${
                pathname === "/" ? "font-semibold text-[#FF5C00]" : "font-medium text-gray-300 hover:text-white"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about-us"
              className={`text-base transition-colors duration-200 ${
                pathname === "/about-us" ? "font-semibold text-[#FF5C00]" : "font-medium text-gray-300 hover:text-white"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About me
            </Link>
            <Link
              href="/work"
              className={`text-base transition-colors duration-200 ${
                pathname === "/work" ? "font-semibold text-[#FF5C00]" : "font-medium text-gray-300 hover:text-white"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Work
            </Link>
            <Link
              href="/services"
              className={`text-base transition-colors duration-200 ${
                pathname === "/services" ? "font-semibold text-[#FF5C00]" : "font-medium text-gray-300 hover:text-white"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <hr className="border-white/10 my-2" />
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                window.dispatchEvent(new CustomEvent("open-booking-modal"));
              }}
              className="bg-[#FF5C00] text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 hover:bg-[#FF7324] w-full"
            >
              Contact us <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
