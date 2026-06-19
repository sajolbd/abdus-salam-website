"use client";

import React from "react";
import Image from "next/image";

const brands = [
  { name: "Acticraft", src: "/images/home/brands/brand-1.webp" },
  { name: "The Arrows", src: "/images/home/brands/brand-2.jpg" },
  { name: "Nutrivix", src: "/images/home/brands/brand-3.png" },
  { name: "Firmum", src: "/images/home/brands/brand-4.jpeg" },
  { name: "TWEWIN", src: "/images/home/brands/brand-5.jpg" },
  { name: "HouseFrame", src: "/images/home/brands/brand-6.jpg" },
  { name: "HouseFrame", src: "/images/home/brands/brand-7.jpg" },
  { name: "HouseFrame", src: "/images/home/brands/brand-8.jpg" },
  { name: "HouseFrame", src: "/images/home/brands/brand-9.jpeg" },
  { name: "HouseFrame", src: "/images/home/brands/brand-10.jpg" },
  { name: "HouseFrame", src: "/images/home/brands/brand-11.png" },
  { name: "HouseFrame", src: "/images/home/brands/brand-12.jpg" },
  { name: "HouseFrame", src: "/images/home/brands/brand-13.jpg" },
  { name: "HouseFrame", src: "/images/home/brands/brand-14.png" },
  { name: "HouseFrame", src: "/images/home/brands/brand-15.png" },
  { name: "HouseFrame", src: "/images/home/brands/brand-16.jpg" },
  { name: "HouseFrame", src: "/images/home/brands/brand-17.jpg" },
  { name: "HouseFrame", src: "/images/home/brands/brand-18.jpg" },
  { name: "HouseFrame", src: "/images/home/brands/brand-19.jpeg" },
];

export default function MarqueeSection() {
  return (
    <div className="relative w-full py-5 bg-[#0C0C0E] overflow-visible select-none">
      {/* ---------------- GLOWING NEON BORDERS ---------------- */}
      {/* Top Glowing Border (Multi-layered gradient to match the mockup image) */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5C00] to-transparent z-20" />
      <div className="absolute top-[-8px] left-0 right-0 h-[18px] bg-gradient-to-r from-transparent via-[#FF5C00]/40 to-transparent blur-[6px] z-10 pointer-events-none" />
      <div className="absolute top-[-16px] left-0 right-0 h-[32px] bg-gradient-to-r from-transparent via-[#FF5C00]/15 to-transparent blur-[12px] z-10 pointer-events-none" />

      {/* Bottom Glowing Border (Multi-layered gradient to match the mockup image) */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5C00] to-transparent z-20" />
      <div className="absolute bottom-[-8px] left-0 right-0 h-[18px] bg-gradient-to-r from-transparent via-[#FF5C00]/40 to-transparent blur-[6px] z-10 pointer-events-none" />
      <div className="absolute bottom-[-16px] left-0 right-0 h-[32px] bg-gradient-to-r from-transparent via-[#FF5C00]/15 to-transparent blur-[12px] z-10 pointer-events-none" />

      {/* ---------------- SLIDING TRACK ---------------- */}
      <div className="flex w-full overflow-hidden relative py-2">
        {/* Double standard flex row for smooth seamless infinite loop scroll */}
        <div className="flex gap-6 md:gap-10 items-center whitespace-nowrap marquee-track cursor-pointer">
          {/* Render first copy */}
          {brands.map((brand, index) => (
            <div
              key={`c1-${index}`}
              className="inline-flex items-center justify-center h-[35px] md:h-[50px] shrink-0 hover:opacity-100 transition-opacity duration-300"
            >
              <img
                src={brand.src}
                alt={brand.name}
                className="h-full w-auto object-contain"
              />
            </div>
          ))}

          {/* Render second copy for seamless loop */}
          {brands.map((brand, index) => (
            <div
              key={`c2-${index}`}
              className="inline-flex items-center justify-center h-[35px] md:h-[50px] shrink-0 hover:opacity-100 transition-opacity duration-300"
            >
              <img
                src={brand.src}
                alt={brand.name}
                className="h-full w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
