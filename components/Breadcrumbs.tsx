"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Image from "next/image";


// Beautiful SVG representing video editing timeline tracks (cuts, audio & video blocks)
const TimelineBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.06] z-0 select-none">
    {/* Large ambient orange glow */}
    <div className="absolute right-0 top-0 w-[400px] h-[100%] bg-[radial-gradient(circle_at_top_right,rgba(255,92,0,0.18)_0%,transparent_70%)] blur-[50px]" />
    
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Track pattern representing editing grid lines */}
        <pattern id="timelineGrid" width="120" height="36" patternUnits="userSpaceOnUse">
          <line x1="0" y1="36" x2="120" y2="36" stroke="white" strokeWidth="0.8" />
          <line x1="30" y1="31" x2="30" y2="36" stroke="white" strokeWidth="0.8" />
          <line x1="90" y1="31" x2="90" y2="36" stroke="white" strokeWidth="0.8" />
        </pattern>
      </defs>

      {/* Editing Grid lines */}
      <rect width="100%" height="100%" fill="url(#timelineGrid)" />

      {/* Track 1: Video Blocks */}
      <rect x="8%" y="12" width="18%" height="12" rx="3" fill="#FF5C00" opacity="0.4" />
      <rect x="29%" y="12" width="22%" height="12" rx="3" fill="#FF5C00" opacity="0.4" />
      <rect x="54%" y="12" width="12%" height="12" rx="3" fill="#FF5C00" opacity="0.4" />
      <rect x="69%" y="12" width="25%" height="12" rx="3" fill="#FF5C00" opacity="0.4" />

      {/* Track 2: Overlays / Text Graphics */}
      <rect x="15%" y="48" width="10%" height="12" rx="3" fill="white" opacity="0.25" />
      <rect x="45%" y="48" width="15%" height="12" rx="3" fill="white" opacity="0.25" />
      <rect x="75%" y="48" width="8%" height="12" rx="3" fill="white" opacity="0.25" />

      {/* Track 3: Audio waveform bars */}
      <rect x="5%" y="84" width="20%" height="12" rx="3" fill="#FF5C00" opacity="0.3" />
      <rect x="30%" y="84" width="35%" height="12" rx="3" fill="white" opacity="0.15" />
      <rect x="68%" y="84" width="15%" height="12" rx="3" fill="white" opacity="0.15" />
      <rect x="86%" y="84" width="10%" height="12" rx="3" fill="#FF5C00" opacity="0.3" />
    </svg>
  </div>
);

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Exclude homepage from rendering subpage banner and breadcrumbs
  if (pathname === "/") return null;

  // Split URL segments
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1] || "";

  // Dynamic overrides for subpage titles
  const getPageTitle = (seg: string) => {
    const overrides: Record<string, string> = {
      "about-us": "About Me",
      "faq": "Frequently Asked Questions",
      "services": "My Services",
      "work": "My Featured Work",
    };
    return overrides[seg.toLowerCase()] || seg.replace(/-/g, " ");
  };

  const formatSegmentLabel = (str: string) => {
    const overrides: Record<string, string> = {
      "about-us": "About Me",
      "faq": "FAQ",
      "services": "Services",
      "work": "My Work",
    };
    if (overrides[str.toLowerCase()]) {
      return overrides[str.toLowerCase()];
    }
    return str
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <nav className="w-full bg-[#0C0C0E] border-b border-white/5 relative pt-32 pb-14 px-6 sm:px-12 md:px-16 overflow-hidden z-40 select-none">
      {/* Background Image Watermark */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/images/our-process/who-we-are/img1.png"
          alt="Video Editing Workspace"
          fill
          sizes="100vw"
          className="object-cover opacity-[0.09] filter grayscale contrast-[1.1] brightness-[0.35]"
          priority
        />
        {/* Dark linear gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0C0E] via-[#0C0C0E]/90 to-[#0C0C0E]/40" />
      </div>

      {/* Video editing timeline SVG background pattern */}
      <TimelineBackground />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-5 text-left">
        {/* Breadcrumb Trail */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 font-light">
          <Link
            href="/"
            className="hover:text-[#FF5C00] transition-colors duration-200"
          >
            Home
          </Link>

          {segments.map((segment, index) => {
            const isLast = index === segments.length - 1;
            const href = "/" + segments.slice(0, index + 1).join("/");

            return (
              <React.Fragment key={href}>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-600 flex-shrink-0" />
                {isLast ? (
                  <span className="text-[#FF5C00] font-medium tracking-wide">
                    {formatSegmentLabel(segment)}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="hover:text-[#FF5C00] transition-colors duration-200"
                  >
                    {formatSegmentLabel(segment)}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Dynamic Page Header Title */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight capitalize">
          {getPageTitle(lastSegment)}
        </h1>
      </div>
    </nav>
  );
}
