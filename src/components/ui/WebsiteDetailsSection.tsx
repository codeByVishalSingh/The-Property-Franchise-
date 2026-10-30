"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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
    "relative inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 py-2.5 sm:py-3.5 text-[11px] sm:text-xs font-semibold tracking-[0.14em] sm:tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer select-none group border rounded-full";

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
// Commercial Real Estate Dossier Data (Edge-to-Edge Stacking Cards)
// ============================================================================
export interface PropertyDossier {
  id: string;
  categoryIndex: string;
  eyebrow: string;
  title: string;
  displayWord: string;
  subtitle: string;
  leadText: string;
  description: string;
  features: string[];
  ctaLabel: string;
  image: string;
  location: string;
  assetType: string;
  specs: { label: string; value: string }[];
  statPills: { stat: string; label: string; note: string }[];
}

export const DOSSIERS: PropertyDossier[] = [
  {
    id: "chapter-01",
    categoryIndex: "01",
    eyebrow: "PRIME COMMERCIAL ASSETS",
    title: "Class-A Trophy Towers & Headquarter Landmarks",
    displayWord: "TROPHY TOWERS",
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
    statPills: [
      { stat: "$280M+", label: "Asset Valuation", note: "Prime CBD Landmark" },
      { stat: "850,000", label: "Gross RSF", note: "50+ Stories LEED Platinum" },
      { stat: "99.4%", label: "Tenancy Leased", note: "Fortune 100 Anchor" },
    ],
  },
  {
    id: "chapter-02",
    categoryIndex: "02",
    eyebrow: "CORPORATE CAMPUS NETWORKS",
    title: "Metropolitan Business Parks & Innovation Campuses",
    displayWord: "BUSINESS CAMPUSES",
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
    statPills: [
      { stat: "640,000", label: "Total Footprint", note: "4 Linked Modern Pavilions" },
      { stat: "$42.5M", label: "Deal Volume", note: "Institutional Investment Size" },
      { stat: "4.2/1k", label: "Parking Allocation", note: "Green Commons & Solar" },
    ],
  },
  {
    id: "chapter-03",
    categoryIndex: "03",
    eyebrow: "INDUSTRIAL INFRASTRUCTURE",
    title: "Intermodal Logistics Hubs & Supply Arteries",
    displayWord: "LOGISTICS HUBS",
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
    statPills: [
      { stat: "12M+ SF", label: "Under Management", note: "Intermodal Freight Arteries" },
      { stat: "40-Foot", label: "Clear Height", note: "Heavy Concrete Staging Aprons" },
      { stat: "15.4%", label: "Target Portfolio IRR", note: "Triple-Net (NNN) Cash Flow" },
    ],
  },
  {
    id: "chapter-04",
    categoryIndex: "04",
    eyebrow: "CAPITAL ADVISORY & SYNDICATION",
    title: "Institutional Syndicate & Private Capital Placements",
    displayWord: "CAPITAL SYNDICATE",
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
    statPills: [
      { stat: "$3.8B+", label: "Placements Facilitated", note: "Bilateral Co-Investment" },
      { stat: "7.8%", label: "Annual Cash Yield", note: "Audited Quarterly Distributions" },
      { stat: "$10M+", label: "Minimum Placement", note: "Sovereign Core Mandates" },
    ],
  },
];

// ============================================================================
// Edge-to-Edge Stacking Card Component (Kigo.studio Layered Overlapping Style)
// Details alongside 100% visible image (object-fit: contain)
// ============================================================================
interface StackedCardProps {
  dossier: PropertyDossier;
  index: number;
  totalCards: number;
  onOpenDossier: (dossier: PropertyDossier) => void;
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
}

function StackedCard({
  dossier,
  index,
  totalCards,
  onOpenDossier,
  scrollContainerRef,
}: StackedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isLast = index === totalCards - 1;

  // Track scroll position to subtly scale down and dim as the next card stacks over it
  const { scrollYProgress } = useScroll({
    target: cardRef,
    container: scrollContainerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, isLast ? 1 : 0.88]);

  return (
    <div
      ref={cardRef}
      style={{
        zIndex: (index + 1) * 10,
      }}
      className={`sticky top-[52px] sm:top-[56px] w-full ${
        isLast ? "mb-0" : "mb-[28vh] sm:mb-[36vh]"
      }`}
    >
      <motion.div
        style={{
          scale,
          opacity,
          transformOrigin: "top center",
        }}
        className="w-full min-h-[calc(100vh-56px)] flex flex-col justify-between bg-[#FCF8F3] border-t-2 border-[#012169]/15 shadow-[0_-25px_60px_rgba(1,33,105,0.22)] rounded-t-2xl sm:rounded-t-[32px] overflow-hidden"
      >
        {/* ================================================================
            1. TOP METRICS BAR & CTA BUTTON (kigo.studio style layout)
            ================================================================ */}
        <div className="w-full px-4 sm:px-8 lg:px-12 pt-3.5 sm:pt-5 pb-3 border-b border-[#012169]/10 flex flex-wrap items-center justify-between gap-4 select-none bg-[#FCF8F3]/95 backdrop-blur-sm z-20 flex-shrink-0">
          {/* Left: Metric Callouts with bold numbers */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 lg:gap-10">
            {dossier.statPills.map((pill, pIdx) => (
              <div key={pIdx} className="flex items-baseline gap-2">
                <span className="font-['Condor_Med_Cond',sans-serif] text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#A10728] leading-none">
                  {pill.stat}
                </span>
                <div>
                  <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#012169] block leading-tight">
                    {pill.label}
                  </span>
                  <span className="font-sans text-[9px] sm:text-[10px] text-[#012169]/60 hidden md:block leading-tight">
                    {pill.note}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Primary Action CTA Button */}
          <div className="flex-shrink-0">
            <LuxuryButton
              onClick={() => onOpenDossier(dossier)}
              variant="primary"
              className="shadow-sm hover:shadow-md"
            >
              {dossier.ctaLabel}
            </LuxuryButton>
          </div>
        </div>

        {/* ================================================================
            2. MAIN 2-COLUMN ALONGSIDE STAGE: DETAILS ON LEFT, FULL IMAGE ON RIGHT
            ================================================================ */}
        <div className="w-full flex-1 flex items-center px-4 sm:px-8 lg:px-12 py-3 sm:py-5 z-10">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-center">
            {/* ------------------------------------------------------------
                LEFT COLUMN: Company Details, Giant Headline, Quote & Specs
                ------------------------------------------------------------ */}
            <div className="lg:col-span-5 flex flex-col justify-center select-none">
              <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A10728] animate-pulse" />
                <span className="font-sans text-[10px] sm:text-xs font-bold text-[#A10728] tracking-[0.2em] uppercase">
                  {dossier.categoryIndex} &bull; {dossier.eyebrow}
                </span>
              </div>

              <h3 className="font-['Condor_Med_Cond',sans-serif] text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black uppercase tracking-tight text-[#012169] leading-[0.95] mb-2 sm:mb-3">
                {dossier.displayWord}
              </h3>

              <p className="font-sans text-xs sm:text-[13px] font-medium leading-relaxed text-[#012169] mb-3 sm:mb-4 border-l-2 border-[#A10728] pl-3 py-1 bg-[#012169]/[0.02]">
                {dossier.leadText}
              </p>

              {/* Specifications Matrix Grid (2x2) */}
              <div className="grid grid-cols-2 gap-2 mb-3 sm:mb-4">
                {dossier.specs.map((spec, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-2 sm:p-2.5 rounded-lg border border-[#012169]/10 bg-white/70 shadow-xs flex flex-col"
                  >
                    <span className="font-sans text-[9px] sm:text-[10px] text-[#012169]/60 uppercase tracking-wider">
                      {spec.label}
                    </span>
                    <span className="font-mono text-[11px] sm:text-xs font-bold text-[#012169] truncate">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Feature Tags */}
              <div className="flex flex-wrap items-center gap-1.5">
                {dossier.features.slice(0, 3).map((feat, fIdx) => (
                  <span
                    key={fIdx}
                    className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-[#012169]/15 bg-[#012169]/5 text-[#012169]"
                  >
                    {feat}
                  </span>
                ))}
              </div>
            </div>

            {/* ------------------------------------------------------------
                RIGHT COLUMN: 100% Fully Visible Image with object-contain
                ------------------------------------------------------------ */}
            <div className="lg:col-span-7 flex items-center justify-center select-none">
              <div className="relative w-full h-[260px] sm:h-[360px] md:h-[420px] lg:h-[480px] xl:h-[520px] rounded-2xl overflow-hidden bg-[#0A1224] border-2 border-[#012169]/20 shadow-[0_20px_50px_rgba(1,33,105,0.25)] flex items-center justify-center p-2 sm:p-3 group">
                {/* 100% Fully Visible Image - Zero Cropping, Zero Cutting */}
                <img
                  src={dossier.image}
                  alt={dossier.title}
                  className="w-full h-full object-contain rounded-xl transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />

                {/* Subtle Vignette Gradient for Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1224]/80 via-transparent to-[#0A1224]/20 pointer-events-none rounded-xl" />

                {/* Floating Image Metadata Strip */}
                <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-white pointer-events-none z-10">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-[#012169]/90 backdrop-blur-md px-2.5 py-1 rounded border border-white/20">
                      {dossier.assetType}
                    </span>
                    <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white/90 drop-shadow-sm">
                      {dossier.location}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-white/80 hidden sm:inline">
                    MANDATE 0{index + 1} &bull; FULL VISUAL SPECS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom subtle status accent */}
        <div className="w-full border-t border-[#012169]/10 py-1.5 px-4 sm:px-8 lg:px-12 flex items-center justify-between text-[#012169]/60 font-mono text-[9px] sm:text-[10px] bg-[#FCF8F3] select-none">
          <span>THE PROPERTY FRANCHISE &bull; ASSET SPECIFICATION CHAPTER 0{index + 1}</span>
          <span>SCROLL DOWN TO REVEAL NEXT STACKED MANDATE &darr;</span>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================================
// Main Website Details Section Component (Edge-to-Edge Stacking Showcase)
// ============================================================================
interface WebsiteDetailsSectionProps {
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
}

export function WebsiteDetailsSection({ scrollContainerRef }: WebsiteDetailsSectionProps) {
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

  return (
    <div className="relative w-full bg-[#FCF8F3] text-[#012169] selection:bg-[#A10728] selection:text-[#FCF8F3]">
      {/* Subtle Architectural Grid Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[linear-gradient(to_right,rgba(1,33,105,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(1,33,105,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* ====================================================================
          EDGE-TO-EDGE STACKED CARDS CONTAINER (Layered Overlapping Effect)
          ==================================================================== */}
      <div className="relative w-full pb-16 sm:pb-24">
        {DOSSIERS.map((dossier, idx) => (
          <StackedCard
            key={dossier.id}
            dossier={dossier}
            index={idx}
            totalCards={DOSSIERS.length}
            onOpenDossier={handleOpenDossier}
            scrollContainerRef={scrollContainerRef}
          />
        ))}
      </div>

      {/* ====================================================================
          INTERACTIVE PROPERTY DOSSIER MODAL / INQUIRY VIEWER
          ==================================================================== */}
      <AnimatePresence>
        {activeDossier && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0E1B33]/65 backdrop-blur-md overflow-y-auto"
            onClick={handleCloseDossier}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl border border-[#012169]/20 bg-[#FCF8F3] text-[#012169] shadow-2xl p-5 sm:p-10 my-4 sm:my-8"
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
