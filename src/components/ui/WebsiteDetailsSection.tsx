"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { scifiAudio } from "@/lib/audio";

// ============================================================================
// Luxury Architectural Action Button
// ============================================================================
interface LuxuryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
}

function LuxuryButton({
  children,
  onClick,
  className = "",
  variant = "primary",
}: LuxuryButtonProps) {
  const base =
    "relative inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer select-none group border";

  const styles =
    variant === "primary"
      ? "border-[#012169] bg-[#012169] text-[#FCF8F3] hover:bg-[#A10728] hover:border-[#A10728] shadow-sm hover:shadow-md active:scale-[0.98]"
      : "border-[#012169]/30 bg-transparent text-[#012169] hover:border-[#A10728] hover:text-[#A10728] hover:bg-[#A10728]/5 active:scale-[0.98]";

  return (
    <button
      onClick={() => {
        scifiAudio.playHoloBeep(920, 0.08);
        onClick?.();
      }}
      className={`${base} ${styles} ${className}`}
    >
      <span>{children}</span>
      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
    </button>
  );
}

// ============================================================================
// Commercial Real Estate Dossier Data (Strictly Authentic Real Estate Details)
// ============================================================================
interface PropertyDossier {
  id: string;
  categoryIndex: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  leadText: string;
  description: string;
  features: string[];
  ctaLabel: string;
  image: string;
  location: string;
  assetType: string;
  specs: { label: string; value: string }[];
}

const DOSSIERS: PropertyDossier[] = [
  {
    id: "chapter-01",
    categoryIndex: "01",
    eyebrow: "PRIME COMMERCIAL ASSETS",
    title: "Class-A Trophy Towers & Headquarter Landmarks",
    subtitle: "Central Business District Portfolio",
    leadText:
      "Exclusive acquisition representation and institutional placement for prime commercial towers across central business districts.",
    description:
      "Our capital advisory team connects sovereign wealth funds, REITs, and private family offices with off-market trophy office landmarks. Each property is characterized by column-free floor plates, destination-dispatch vertical transit, LEED Platinum sustainability certification, and creditworthy enterprise tenancy.",
    features: [
      "Prime Central Business District Location",
      "50+ Stories with 850,000 RSF Footprint",
      "LEED Platinum Environmental Certification",
      "Long-Term Fortune 100 Anchor Tenancy",
    ],
    ctaLabel: "REQUEST ASSET SPECIFICATIONS",
    image: "/commercial_office_tower.jpg",
    location: "Metropolitan Financial District",
    assetType: "Class-A Prime Commercial",
    specs: [
      { label: "Asset Valuation", value: "$280,000,000" },
      { label: "Gross Leasable Area", value: "850,000 SQ.FT" },
      { label: "Occupancy Rate", value: "99.4% Leased Tenancy" },
      { label: "Classification", value: "Class-A Prime Trophy Core" },
    ],
  },
  {
    id: "chapter-02",
    categoryIndex: "02",
    eyebrow: "CORPORATE CAMPUS NETWORKS",
    title: "Metropolitan Business Parks & Innovation Campuses",
    subtitle: "Primary Technology Corridors",
    leadText:
      "Turnkey enterprise business parks and master-planned corporate facilities situated along high-growth economic corridors.",
    description:
      "Providing qualified corporate directors with exclusive regional campus holdings. Properties incorporate sustainable architectural glass facades, dedicated electrical substations, dual-fiber communications infrastructure, and multi-tenant expansion wings configured for premier enterprise headquarters.",
    features: [
      "Master-Planned Multi-Building Campus Layout",
      "Fiber-Redundant Infrastructure & Dedicated Power",
      "Campus-Style Green Commons & Landscaped Waterways",
      "Turnkey Regional Territory Management",
    ],
    ctaLabel: "VIEW CAMPUS SPECIFICATIONS",
    image: "/commercial_business_campus.jpg",
    location: "Silicon Basin Innovation Corridor",
    assetType: "Corporate Business Campus",
    specs: [
      { label: "Total Footprint", value: "640,000 SQ.FT" },
      { label: "Average Deal Volume", value: "$42.5M Institutional Size" },
      { label: "Campus Buildings", value: "4 Linked Modern Pavilions" },
      { label: "Parking Allocation", value: "4.2 Per 1,000 SQ.FT" },
    ],
  },
  {
    id: "chapter-03",
    categoryIndex: "03",
    eyebrow: "INDUSTRIAL INFRASTRUCTURE",
    title: "Intermodal Logistics Hubs & Supply Arteries",
    subtitle: "Transcontinental Freight Terminals",
    leadText:
      "Institutional-grade automated distribution facilities and cross-dock freight centers positioned along critical supply chain corridors.",
    description:
      "Engineered to satisfy 24/7 high-throughput automated fulfillment operations. Featuring 40-foot clear ceiling heights, ESFR fire suppression systems, high-capacity dock levelers, extensive trailer staging aprons, and long-term triple-net (NNN) covenants with leading national logistics operators.",
    features: [
      "40-Foot Clear Ceilings & Heavy Concrete Aprons",
      "Automated High-Speed Cross-Dock Loading Bays",
      "Direct Transcontinental Rail & Highway Access",
      "Triple-Net (NNN) Inflation-Hedged Cash Flows",
    ],
    ctaLabel: "EXPLORE INDUSTRIAL PIPELINE",
    image: "/commercial_logistics_center.jpg",
    location: "Continental Freight & Port Hub",
    assetType: "High-Throughput Logistics",
    specs: [
      { label: "Surface Under Mgmt", value: "12,000,000+ SQ.FT" },
      { label: "Clear Ceiling Height", value: "40-Foot Clear Structural" },
      { label: "Loading Docks", value: "128 Cross-Dock Positions" },
      { label: "Target Portfolio IRR", value: "15.4% Net to Partners" },
    ],
  },
  {
    id: "chapter-04",
    categoryIndex: "04",
    eyebrow: "CAPITAL ADVISORY & SYNDICATION",
    title: "Institutional Syndicate & Private Capital Placements",
    subtitle: "Confidential Transaction Desk",
    leadText:
      "Bilateral co-investment structures and private capital placements for family offices, institutions, and sovereign capital partners.",
    description:
      "Our advisory desk structures bespoke joint venture equity, mezzanine facilities, and tax-efficient syndication vehicles. Every transaction is conducted under strict confidentiality covenants, ensuring discreet acquisition execution, institutional governance, and audited quarterly distributions.",
    features: [
      "Bilateral Co-Investment Facilities ($10M - $250M)",
      "Audited Quarterly Cash-on-Cash Distributions",
      "Confidential Off-Market Transaction Governance",
      "Priority Allocation on New Territory Rollouts",
    ],
    ctaLabel: "SCHEDULE PRIVATE CONSULTATION",
    image: "/commercial_boardroom.jpg",
    location: "Executive Capital Advisory Desk",
    assetType: "Private Institutional Placement",
    specs: [
      { label: "Facilitated Capital", value: "$3.8B+ Total Placements" },
      { label: "Distribution Yield", value: "7.8% Annual Cash-on-Cash" },
      { label: "Governance Model", value: "Institutional LP Co-Investment" },
      { label: "Minimum Placement", value: "$10,000,000 Sovereign Core" },
    ],
  },
];

// ============================================================================
// Interactive 3D Frame Image Component (Refined Architectural Presentation)
// ============================================================================
interface Sticky3DImageFrameProps {
  activeSlide: number;
  dossiers: PropertyDossier[];
}

function Sticky3DImageFrame({ activeSlide, dossiers }: Sticky3DImageFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Subtle 3D mouse perspective tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: -y * 6, y: x * 6 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const activeDossier = dossiers[activeSlide] || dossiers[0];

  return (
    <div
      ref={frameRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-lg lg:max-w-none mx-auto select-none"
      style={{
        perspective: 1200,
      }}
    >
      <div
        className="relative transition-transform duration-200 ease-out"
        style={{
          transform: isHovered
            ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(1.015)`
            : "rotateX(0deg) rotateY(0deg) scale(1)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* End-to-End Full-Bleed Image Card (No outer padding or white borders) */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[4/3] lg:aspect-[1/1] max-h-[480px] overflow-hidden rounded-2xl border-2 border-[#012169]/20 bg-[#012169] shadow-[0_20px_50px_rgba(1,33,105,0.18)] transition-all duration-300 hover:border-[#A10728] hover:shadow-[0_24px_60px_rgba(161,7,40,0.22)]">
          {/* Layered Crossfading Images - 100% Full Card Bleed */}
          {dossiers.map((item, idx) => {
            const isActive = idx === activeSlide;

            return (
              <div
                key={item.id}
                className={`absolute inset-0 transition-all duration-700 ease-out will-change-transform ${
                  isActive
                    ? "opacity-100 scale-100 blur-0 pointer-events-auto"
                    : "opacity-0 scale-105 blur-[2px] pointer-events-none"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>
            );
          })}

          {/* Subtle Bottom Vignette Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#012169]/70 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Main Website Details Section Component (Storytelling Experience)
// ============================================================================
interface WebsiteDetailsSectionProps {
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
}

export function WebsiteDetailsSection({ scrollContainerRef }: WebsiteDetailsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Modal Inquiry Form State
  const [activeDossier, setActiveDossier] = useState<PropertyDossier | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  // Accurate Scroll Tracking through the tall sticky container
  useEffect(() => {
    const getScrollEl = () => scrollContainerRef?.current || null;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollEl = getScrollEl();
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Header offset for the modal's sticky top navigation bar
      const topOffset = scrollEl ? 56 : 0;
      const totalScrollable = containerHeight - (viewportHeight - topOffset);

      if (totalScrollable <= 0) return;

      // Distance from when the sticky header pins at topOffset
      const scrolledPastTop = topOffset - rect.top;
      const progress = Math.max(0, Math.min(1, scrolledPastTop / totalScrollable));

      // Determine active slide across 4 segments [0.0 - 0.25], [0.25 - 0.50], [0.50 - 0.75], [0.75 - 1.0]
      const slide = Math.min(3, Math.floor(progress * 4));
      setActiveSlide(slide);
    };

    const target = getScrollEl() || window;
    target.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    // Re-check after 150ms in case the modal animation or layout shifted
    const timer = setTimeout(handleScroll, 150);

    return () => {
      target.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(timer);
    };
  }, [scrollContainerRef]);

  const handleOpenDossier = (dossier: PropertyDossier) => {
    setActiveDossier(dossier);
    setFormSubmitted(false);
  };

  const handleCloseDossier = () => {
    setActiveDossier(null);
    setFormSubmitted(false);
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    scifiAudio.playHoloBeep(980, 0.1);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      scifiAudio.playHoloBeep(1200, 0.15);
    }, 700);
  };

  const currentDossier = DOSSIERS[activeSlide] || DOSSIERS[0];

  return (
    <div className="relative w-full bg-[#FCF8F3] text-[#012169] selection:bg-[#A10728] selection:text-[#FCF8F3]">
      {/* Subtle Architectural Grid Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[linear-gradient(to_right,rgba(1,33,105,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(1,33,105,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* ====================================================================
          STICKY SCROLL CONTAINER (Height 380vh for 4 synchronized chapters)
          ==================================================================== */}
      <div ref={containerRef} className="relative h-[380vh]">
        {/* Sticky Viewport: Pins image on Left & animates details on Right */}
        <div className="sticky top-0 sm:top-[56px] h-screen sm:h-[calc(100vh-56px)] w-full flex flex-col justify-between py-4 sm:py-6 lg:py-8 px-5 sm:px-8 lg:px-12 overflow-hidden select-none">
          {/* 1. TOP HEADER (Clean, Professional Single Line) */}
          <div className="w-full max-w-7xl mx-auto border-b border-[#012169]/15 pb-3 flex items-center justify-between flex-shrink-0 z-20">
            <h2 className="font-['Condor_Med_Cond',sans-serif] text-lg sm:text-2xl font-bold uppercase tracking-tight text-[#012169]">
              The Property Franchise <span className="text-[#A10728]">•</span> Commercial Portfolio <span className="text-[#A10728]">&</span> Asset Architecture
            </h2>
          </div>

          {/* 2. MAIN 2-COLUMN STORYTELLING STAGE */}
          <div className="w-full max-w-7xl mx-auto flex-1 flex items-center my-auto z-20 py-2 sm:py-4">
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-16 items-center">
              {/* ------------------------------------------------------------
                  LEFT COLUMN: Sticky 3D Interactive Frame with 4 Images
                  ------------------------------------------------------------ */}
              <div className="lg:col-span-6 flex items-center justify-center">
                <Sticky3DImageFrame activeSlide={activeSlide} dossiers={DOSSIERS} />
              </div>

              {/* ------------------------------------------------------------
                  RIGHT COLUMN: Synchronized Details & Real Estate Information
                  ------------------------------------------------------------ */}
              <div className="lg:col-span-6 flex flex-col justify-center min-h-[360px] sm:min-h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentDossier.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col justify-center"
                  >
                    {/* Eyebrow Label */}
                    <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#A10728]" />
                      <span className="font-sans text-xs font-bold text-[#A10728] tracking-[0.2em] uppercase">
                        {currentDossier.categoryIndex} &bull; {currentDossier.eyebrow}
                      </span>
                    </div>

                    {/* Primary Condensed Heading */}
                    <h3 className="font-['Condor_Med_Cond',sans-serif] text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-bold uppercase tracking-tight text-[#012169] leading-[1.1] mb-3 sm:mb-4">
                      {currentDossier.title}
                    </h3>

                    {/* Professional Real Estate Narrative (Clean Sans-Serif Typography) */}
                    <p className="font-sans text-sm sm:text-[15px] font-medium leading-relaxed text-[#012169] mb-3 border-l-2 border-[#A10728] pl-3.5 bg-[#012169]/[0.02] py-1">
                      {currentDossier.leadText}
                    </p>

                    <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#012169]/80 mb-5 sm:mb-6">
                      {currentDossier.description}
                    </p>

                    {/* Key Real Estate Features List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 mb-6 sm:mb-7 border-t border-[#012169]/15 pt-3.5">
                      {currentDossier.features.map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-center gap-2 text-xs text-[#012169] font-sans font-medium"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-[#A10728] flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <div>
                      <LuxuryButton onClick={() => handleOpenDossier(currentDossier)}>
                        {currentDossier.ctaLabel}
                      </LuxuryButton>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          INTERACTIVE PROPERTY DOSSIER MODAL / INQUIRY VIEWER
          ==================================================================== */}
      <AnimatePresence>
        {activeDossier && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0E1B33]/65 backdrop-blur-md overflow-y-auto"
            onClick={handleCloseDossier}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden border border-[#012169]/20 bg-[#FCF8F3] text-[#012169] shadow-2xl p-6 sm:p-10 my-8"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseDossier}
                className="absolute top-6 right-6 p-2 rounded-full border border-[#012169]/20 bg-white/70 text-[#012169] hover:bg-[#A10728] hover:border-[#A10728] hover:text-[#FCF8F3] transition-all cursor-pointer shadow-sm"
                title="Close Window"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Modal Header */}
              <div className="mb-6 border-b border-[#012169]/15 pb-4 pr-10">
                <span className="font-sans text-xs font-bold text-[#A10728] tracking-widest uppercase block mb-1">
                  {activeDossier.categoryIndex} &bull; {activeDossier.eyebrow}
                </span>
                <h4 className="font-['Condor_Med_Cond',sans-serif] text-2xl sm:text-3xl font-bold uppercase text-[#012169]">
                  {activeDossier.title}
                </h4>
              </div>

              {!formSubmitted ? (
                <div>
                  {/* Property Specifications Grid */}
                  <div className="mb-7">
                    <span className="font-sans text-xs font-bold tracking-wider uppercase text-[#012169]/70 block mb-3">
                      Asset Specifications & Telemetry:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeDossier.specs.map((spec, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex items-center justify-between p-3 border border-[#012169]/10 bg-white/70 font-sans text-xs"
                        >
                          <span className="text-[#012169]/70">{spec.label}</span>
                          <span className="font-bold text-[#012169]">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Consultation / Acquisition Form */}
                  <form onSubmit={handleSubmitInquiry} className="space-y-4">
                    <span className="font-sans text-xs font-bold tracking-wider uppercase text-[#A10728] block">
                      Submit Confidential Acquisition Mandate:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-sans text-[11px] font-medium tracking-wide uppercase text-[#012169]/70 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Marcus Vance"
                          className="w-full border border-[#012169]/20 bg-white/80 px-3.5 py-2.5 font-sans text-xs text-[#012169] focus:border-[#A10728] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-sans text-[11px] font-medium tracking-wide uppercase text-[#012169]/70 mb-1">
                          Institutional Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="vance@capitalpartners.com"
                          className="w-full border border-[#012169]/20 bg-white/80 px-3.5 py-2.5 font-sans text-xs text-[#012169] focus:border-[#A10728] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-sans text-[11px] font-medium tracking-wide uppercase text-[#012169]/70 mb-1">
                        Organization / Fund Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Apex Sovereign Holdings"
                        className="w-full border border-[#012169]/20 bg-white/80 px-3.5 py-2.5 font-sans text-xs text-[#012169] focus:border-[#A10728] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-sans text-[11px] font-medium tracking-wide uppercase text-[#012169]/70 mb-1">
                        Mandate Specifics & Target Capitalization
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Specify target corridor, allocation requirements ($50M - $250M), or territory inquiry..."
                        className="w-full border border-[#012169]/20 bg-white/80 px-3.5 py-2.5 font-sans text-xs text-[#012169] focus:border-[#A10728] focus:outline-none resize-none"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="font-sans text-[11px] text-[#012169]/70 flex items-center gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-[#A10728]" />
                        Confidential Bilateral Non-Disclosure
                      </span>
                      <LuxuryButton>
                        {isSubmitting ? "TRANSMITTING..." : "TRANSMIT INQUIRY"}
                      </LuxuryButton>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#A10728]/10 border border-[#A10728] text-[#A10728] mb-4">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h5 className="font-['Condor_Med_Cond',sans-serif] text-2xl font-bold uppercase text-[#012169] mb-2">
                    Mandate Received & Registered
                  </h5>
                  <p className="font-sans text-xs text-[#012169]/80 max-w-md mx-auto mb-6 leading-relaxed">
                    Our Senior Capital Director has received your mandate for <strong>{activeDossier.title}</strong>. A confidential information memorandum will be dispatched to <strong>{formData.email}</strong> within 4 business hours.
                  </p>
                  <LuxuryButton onClick={handleCloseDossier} variant="primary">
                    RETURN TO PORTFOLIO
                  </LuxuryButton>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
