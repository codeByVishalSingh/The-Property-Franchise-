"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { scifiAudio } from "@/lib/audio";

export function Footer() {
  const scrollTo = (id: string) => {
    scifiAudio.playHoloBeep(800, 0.05);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    scifiAudio.playHoloBeep(980, 0.08);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-20 border-t border-[#38BDF8]/30 bg-[#0B254A] text-white px-6 sm:px-12 lg:px-20 pt-16 sm:pt-20 pb-10 selection:bg-[#38BDF8] selection:text-[#082230] overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* ========================================================
            1. TOP ROW: Brand Positioning & Nav Columns
           ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start">
          {/* Left Column: Brand Mission Statement */}
          <div className="md:col-span-6 lg:col-span-5">
            <p className="font-sans text-sm sm:text-base text-[#E0F2FE] leading-relaxed max-w-lg">
              The Property Franchise is the institutional commercial real estate network built for premier franchisees, asset managers, and property leaders.
            </p>
          </div>

          {/* Right Columns: Navigation Links */}
          <div className="md:col-span-6 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1: Franchise Navigation */}
            <div>
              <h4 className="font-sans font-semibold text-xs sm:text-sm text-white mb-3.5 tracking-wide">
                The Property Franchise
              </h4>
              <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-[#BAE6FD]">
                <li>
                  <button
                    onClick={scrollToTop}
                    className="hover:text-[#38BDF8] hover:underline transition-colors cursor-pointer text-left"
                  >
                    Control Bridge (Hero)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("real-estate-reels")}
                    className="hover:text-[#38BDF8] hover:underline transition-colors cursor-pointer text-left"
                  >
                    Archive (Reels)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("horizontal-gallery")}
                    className="hover:text-[#38BDF8] hover:underline transition-colors cursor-pointer text-left"
                  >
                    Asset Showcase
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("franchise-game")}
                    className="hover:text-[#38BDF8] hover:underline transition-colors cursor-pointer text-left"
                  >
                    Join Franchise (Game)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("contact-us")}
                    className="inline-flex items-center gap-1 hover:text-[#38BDF8] hover:underline transition-colors cursor-pointer text-left"
                  >
                    <span>Contact & Enquiries</span>
                    <ChevronDown className="h-3.5 w-3.5 text-[#38BDF8]" />
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Company Information */}
            <div>
              <h4 className="font-sans font-semibold text-xs sm:text-sm text-white mb-3.5 tracking-wide">
                Company
              </h4>
              <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-[#BAE6FD]">
                <li>
                  <button
                    onClick={() => scrollTo("horizontal-gallery")}
                    className="hover:text-[#38BDF8] hover:underline transition-colors cursor-pointer text-left"
                  >
                    Asset Portfolio
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("real-estate-reels")}
                    className="hover:text-[#38BDF8] hover:underline transition-colors cursor-pointer text-left"
                  >
                    Property Archive
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("contact-us")}
                    className="hover:text-[#38BDF8] hover:underline transition-colors cursor-pointer text-left"
                  >
                    Licensing Mandates
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("contact-us")}
                    className="hover:text-[#38BDF8] hover:underline transition-colors cursor-pointer text-left"
                  >
                    Contact Directorate
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ========================================================
            2. MASSIVE BRAND LOGOTYPE (The Signature Visual)
            Guaranteed 100% full visibility across all screen sizes:
            Scales responsively edge-to-edge without overflow or cut-off.
           ======================================================== */}
        <div className="mt-12 sm:mt-16 border-t border-[#38BDF8]/20 pt-8 sm:pt-10">
          <h1 className="sr-only">The Property Franchise</h1>
          <div className="w-full select-none" aria-hidden="true">
            <svg
              viewBox="0 0 1440 140"
              className="w-full h-auto block overflow-visible"
              preserveAspectRatio="xMinYMid meet"
              role="img"
              aria-label="The Property Franchise"
            >
              <text
                x="0"
                y="110"
                fill="#FFFFFF"
                style={{
                  fontFamily: "Georgia, Cambria, 'Times New Roman', Times, serif",
                  fontWeight: 400,
                }}
                fontSize="128"
                letterSpacing="-0.02em"
                textLength="1420"
                lengthAdjust="spacing"
              >
                The Property Franchise
              </text>
            </svg>
          </div>
        </div>

        {/* ========================================================
            4. BOTTOM ROW: Copyright & Disclaimers
            Fully visible and responsive without overlapping or cutoff.
           ======================================================== */}
        <div className="mt-8 sm:mt-10 pt-6 border-t border-[#38BDF8]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#BAE6FD]/70">
          <p className="text-center sm:text-left">
            © 2026 The Property Franchise Network. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-6 text-xs">
            <button
              onClick={() => scrollTo("contact-us")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => scrollTo("contact-us")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() => scrollTo("contact-us")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Franchise Disclosures
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
