"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * Real Estate Portfolio & Core Services
 * Directly aligned with The Property Franchise's institutional operations:
 * Commercial brokerage, luxury residential, capital syndication, property management, & franchise licensing
 */
const ITEMS = [
  {
    id: 1,
    number: "01",
    label: "Metropolitan Commercial Tower",
    category: "COMMERCIAL BROKERAGE & ACQUISITIONS",
    color: "#38BDF8", // Cyan
    image: "/commercial_office_tower.jpg",
    valuation: "$185,000,000",
    location: "Metropolis Financial Core",
    service: "Class-A Office Towers & Institutional Brokerage",
    description:
      "Exclusive transaction advisory and institutional placement for a 48-storey column-free commercial skyscraper featuring LEED Platinum infrastructure and 98% leased tenancy.",
    highlight: "98% Tenancy",
  },
  {
    id: 2,
    number: "02",
    label: "Sovereign Coastal Residence",
    category: "LUXURY RESIDENTIAL & SYNDICATES",
    color: "#F59E0B", // Amber Gold
    image: "/real_estate_exterior.jpg",
    valuation: "$92,500,000",
    location: "Pacific Coastal Headland",
    service: "Private Wealth & Ultra-Prime Residential",
    description:
      "Turnkey architectural coastal estate brokered for private syndicate co-investors, featuring panoramic ocean terraces, private security perimeter, and smart-estate automation.",
    highlight: "Private Syndicate",
  },
  {
    id: 3,
    number: "03",
    label: "Pacific Commerce Corporate Campus",
    category: "FRANCHISE OPPORTUNITIES & TERRITORIES",
    color: "#10B981", // Emerald
    image: "/commercial_business_campus.jpg",
    valuation: "$124,500,000",
    location: "Silicon Innovation Corridor",
    service: "Turnkey Commercial Franchise Licensing",
    description:
      "Turnkey franchise opportunity providing accredited partners with exclusive metropolitan territory rights, proprietary commercial valuation technology, and institutional deal flow.",
    highlight: "24 National Hubs",
  },
  {
    id: 4,
    number: "04",
    label: "Continental Freight & Trade Gateway",
    category: "INDUSTRIAL & LOGISTICS ASSETS",
    color: "#8B5CF6", // Electric Purple
    image: "/commercial_logistics_center.jpg",
    valuation: "$96,000,000",
    location: "Intermodal Freight Corridor",
    service: "Supply Chain & Industrial Property Management",
    description:
      "Next-generation intermodal freight facility with 120 cross-dock loading bays, 40-foot clear clearance, and 100% rooftop solar array integration for national distribution.",
    highlight: "12M+ Sq.Ft Managed",
  },
  {
    id: 5,
    number: "05",
    label: "The Regent Luxury Commercial Galleria",
    category: "PROPERTY MANAGEMENT & LEASING",
    color: "#EC4899", // Rose Pink
    image: "/commercial_retail_pavilion.jpg",
    valuation: "$142,000,000",
    location: "Central Flagship Promenade",
    service: "Commercial Asset Stewardship & Operations",
    description:
      "Full-lifecycle commercial property management maximizing net operating income, green-building efficiencies, and premier tenant retention across high-footfall retail promenades.",
    highlight: "99.4% Occupancy",
  },
  {
    id: 6,
    number: "06",
    label: "Executive Boardroom & Investment Headquarters",
    category: "PROPERTY INVESTMENT & SYNDICATION",
    color: "#06B6D4", // Electric Teal
    image: "/commercial_boardroom.jpg",
    valuation: "$78,000,000",
    location: "Sovereign Financial District",
    service: "Private Equity Real Estate Syndications",
    description:
      "Structured co-investment vehicles and bilateral syndicate placements offering inflation-hedged commercial yields and long-term capital appreciation for institutional capital.",
    highlight: "15.4% Target IRR",
  },
];

const ITEM_WIDTH = 440;
const GAP = 32;

export function ScrollHorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track vertical scroll progress across the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Translate from first item centered to last item centered (exact reference logic)
  const totalDistance = (ITEMS.length - 1) * (ITEM_WIDTH + GAP);
  const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance]);

  return (
    <section id="horizontal-gallery" className="relative z-20 bg-[#1E7796] text-white border-t border-[#38BDF8]/30">
      {/* 1. Intro Section: Section Title */}
      <div className="pt-20 sm:pt-28 pb-10 sm:pb-14 px-4 sm:px-8 text-center max-w-5xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold uppercase tracking-tight text-white leading-tight">
          REAL ESTATE SERVICES & <span className="text-[#38BDF8]">SHOWCASE</span>
        </h2>
      </div>

      {/* 2. Sticky Scroll Container (Exact reference structure: fixed in view during scroll, zero extra space below) */}
      <div ref={containerRef} className="relative h-[240vh]">
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          <div className="w-[300px] sm:w-[420px] md:w-[440px] mx-auto overflow-visible flex items-center justify-start">
            <motion.div
              className="flex will-change-transform"
              style={{
                x,
                gap: `${GAP}px`,
              }}
            >
              {ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex-shrink-0 w-[300px] sm:w-[420px] md:w-[440px] h-[460px] sm:h-[520px] md:h-[550px] rounded-3xl overflow-hidden border-2 border-[#38BDF8]/40 bg-[#0B254A] shadow-[0_20px_50px_rgba(7,25,39,0.5)] transition-all duration-300 hover:border-white hover:shadow-[0_24px_60px_rgba(56,189,248,0.35)] select-none"
                  style={
                    {
                      "--item-color": item.color,
                      "--item-image": `url(${item.image})`,
                    } as React.CSSProperties
                  }
                >
                  {/* High Quality Real Estate Image */}
                  <img
                    src={item.image}
                    alt={item.label}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />

                  {/* Gradient Color Overlay (Matches Reference Multiply Style) */}
                  <div
                    className="absolute inset-0 opacity-80 transition-opacity duration-500 group-hover:opacity-95 pointer-events-none"
                    style={{
                      background: `linear-gradient(to bottom, transparent 35%, rgba(10, 22, 40, 0.65) 60%, ${item.color} 130%)`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/95 via-[#0A1628]/40 to-transparent pointer-events-none" />

                  {/* Bottom Content Container (Exact Reference Layout) */}
                  <div className="absolute bottom-6 sm:bottom-7 left-6 sm:left-7 right-6 sm:right-7 z-10 text-[#EFF6FF]">
                    {/* Title */}
                    <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#EFF6FF] leading-snug group-hover:text-white transition-colors drop-shadow-md">
                      {item.label}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-xs sm:text-sm text-[#EFF6FF]/85 line-clamp-2 font-sans leading-relaxed">
                      {item.description}
                    </p>

                    {/* Service & Action Prompt */}
                    <div className="mt-3.5 pt-3 border-t border-[#EFF6FF]/20 flex items-center justify-between">
                      <span className="font-mono text-[10px] sm:text-[11px] text-[#EFF6FF]/75 tracking-wider uppercase truncate max-w-[70%]">
                        {item.service}
                      </span>
                      <span
                        className="inline-flex items-center gap-1 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                        style={{ color: item.color }}
                      >
                        <span>Details</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Accessibility Fallback for Reduced Motion */}
      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          #horizontal-gallery .will-change-transform {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
