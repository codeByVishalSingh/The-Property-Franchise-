"use client";

import React, { useState, useRef, useEffect } from "react";
import { useScroll, useSpring } from "framer-motion";
import {
  Play,
  X,
  Volume2,
  VolumeX,
  MapPin,
  Calendar,
  Heart,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { scifiAudio } from "@/lib/audio";

export interface ReelProperty {
  id: string;
  title: string;
  category: "towers" | "campus" | "logistics" | "retail";
  categoryLabel: string;
  price: string;
  location: string;
  floors: number;
  tenancy: string;
  sqft: string;
  duration: string;
  image: string;
  videoSrc: string;
  description: string;
  features: string[];
}

export const REEL_PROPERTIES: ReelProperty[] = [
  {
    id: "regent-retail",
    title: "The Regent Commercial Galleria",
    category: "retail",
    categoryLabel: "RETAIL COMPLEX",
    price: "$142,000,000",
    location: "Central Avenue Flagship Promenade",
    floors: 4,
    tenancy: "Luxury Flagship Retail",
    sqft: "280,000 sq.ft",
    duration: "1:32",
    image: "/commercial_retail_pavilion.jpg",
    videoSrc: "/reel_sample_2.mp4",
    description:
      "Iconic multi-tier luxury commercial retail pavilion and pedestrian promenade housing premier international flagship brands and gourmet restaurants.",
    features: ["Flagship Anchor Tenants", "High-Footfall Promenade", "Curated Gourmet Dining"],
  },
  {
    id: "consortium-suites",
    title: "Consortium Executive Commercial Suites",
    category: "towers",
    categoryLabel: "EXECUTIVE SUITES",
    price: "$78,000,000",
    location: "Financial Core Financial Center",
    floors: 12,
    tenancy: "Private Equity Partners",
    sqft: "195,000 sq.ft",
    duration: "0:58",
    image: "/commercial_boardroom.jpg",
    videoSrc: "/sample_video.mp4",
    description:
      "Bespoke turnkey executive commercial suites and boardroom levels designed for private equity firms, asset management partnerships, and sovereign wealth offices.",
    features: ["Panoramic Skyline Boardrooms", "Private Concierge Lift", "Encrypted Fiber Infrastructure"],
  },
  {
    id: "sovereign-tower",
    title: "The Sovereign Financial Tower",
    category: "towers",
    categoryLabel: "OFFICE TOWER",
    price: "$185,000,000",
    location: "Metropolis Financial District",
    floors: 48,
    tenancy: "98% Institutional Leased",
    sqft: "480,000 sq.ft",
    duration: "1:28",
    image: "/commercial_office_tower.jpg",
    videoSrc: "/real-estate-intro.mp4",
    description:
      "A landmark Class-A commercial office skyscraper featuring 48 storeys of column-free floor plates, LEED Platinum certification, and high-speed destination elevators.",
    features: ["48 Commercial Storeys", "LEED Platinum Core", "High-Speed Elevators"],
  },
  {
    id: "pacific-campus",
    title: "Pacific Commerce Business Campus",
    category: "campus",
    categoryLabel: "CORPORATE CAMPUS",
    price: "$124,500,000",
    location: "Silicon Basin Innovation Corridor",
    floors: 6,
    tenancy: "Single-Tenant Tech HQ",
    sqft: "320,000 sq.ft",
    duration: "1:45",
    image: "/commercial_business_campus.jpg",
    videoSrc: "/reel_sample_2.mp4",
    description:
      "State-of-the-art multi-building commercial corporate campus with expansive glass atriums, biophilic collaborative plazas, and fiber-redundant infrastructure.",
    features: ["Triple-Net Institutional Lease", "Electric Fleet Hub", "Biophilic Atrium"],
  },
  {
    id: "aero-logistics",
    title: "Aero-Logistics Distribution Center",
    category: "logistics",
    categoryLabel: "INDUSTRIAL & LOGISTICS",
    price: "$96,000,000",
    location: "Continental Freight & Port Hub",
    floors: 2,
    tenancy: "100% Logistics Leased",
    sqft: "650,000 sq.ft",
    duration: "1:15",
    image: "/commercial_logistics_center.jpg",
    videoSrc: "/sample_video.mp4",
    description:
      "Next-generation high-throughput logistics facility with 40-foot clear ceiling heights, 120 cross-dock loading bays, and full rooftop solar array.",
    features: ["120 Cross-Dock Bays", "40' Clear Height", "100% Rooftop Solar"],
  },
];

// Unified scroll window for simultaneous single-scroll reveal of all 5 video reels
const CARD_SPECS = [
  { start: 0.0, end: 0.6, color: "#720808", indexLabel: "01 // RETAIL" },
  { start: 0.0, end: 0.6, color: "#720808", indexLabel: "02 // SUITES" },
  { start: 0.0, end: 0.6, color: "#720808", indexLabel: "03 // TOWERS" },
  { start: 0.0, end: 0.6, color: "#720808", indexLabel: "04 // CAMPUS" },
  { start: 0.0, end: 0.6, color: "#720808", indexLabel: "05 // LOGISTICS" },
];

export interface RealEstateReelsSectionProps {
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
}

export function RealEstateReelsSection({ scrollContainerRef }: RealEstateReelsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRowRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [maxCardHeight, setMaxCardHeight] = useState(560);

  // Video modal state
  const [selectedProperty, setSelectedProperty] = useState<ReelProperty | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [likedReels, setLikedReels] = useState<Record<string, boolean>>({});
  const [inquirySent, setInquirySent] = useState(false);

  const modalVideoRef = useRef<HTMLVideoElement>(null);

  // Standard Instagram Reel 9:16 responsive height calculation with enlarged display
  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window === "undefined") return;
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (w < 640) {
        // Mobile: large, prominent vertical Reel cards
        const targetH = Math.min(480, Math.round(h * 0.62));
        setMaxCardHeight(Math.max(420, targetH));
      } else if (w < 1024) {
        // Tablet: commanding vertical cards
        const targetH = Math.min(540, Math.round(h * 0.66));
        setMaxCardHeight(Math.max(470, targetH));
      } else {
        // Desktop 5-column grid: prominent vertical 9:16 cards filling the display
        const availableW = Math.min(1560, w - 64);
        const cardW = (availableW - 80) / 5;
        const target916H = Math.round(cardW * (16 / 9));
        // Allow cards to scale up generously while fitting comfortably within viewport height
        const maxFitH = Math.round((h - 120) * 0.82);
        const preferredH = Math.max(540, Math.min(620, target916H));
        setMaxCardHeight(Math.min(maxFitH, preferredH));
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Framer Motion useScroll connected directly to modal or window container
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Cinematic inertia spring for smooth, seamless scroll transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 22,
    mass: 0.15,
    restDelta: 0.0005,
  });

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      setScrollProgress(latest);
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  // Secondary high-frequency fallback listener for immediate layout sync
  useEffect(() => {
    const getScrollEl = () => scrollContainerRef?.current || null;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollEl = getScrollEl();
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      const topOffset = scrollEl ? 52 : 0;
      const totalScrollable = containerHeight - (viewportHeight - topOffset);

      if (totalScrollable <= 0) return;

      const scrolledPastTop = topOffset - rect.top;
      const progress = Math.max(0, Math.min(1, scrolledPastTop / totalScrollable));
      smoothProgress.set(progress);
    };

    const target = getScrollEl() || window;
    target.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    const timer = setTimeout(handleScroll, 120);

    return () => {
      target.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(timer);
    };
  }, [scrollContainerRef, smoothProgress]);

  // Video modal handling
  const handleOpenReel = (property: ReelProperty) => {
    scifiAudio.playHoloBeep(920, 0.1);
    setSelectedProperty(property);
    setIsPlaying(true);
    setCurrentTime(0);
    setInquirySent(false);
    document.body.style.overflow = "hidden";
  };

  const handleCloseReel = () => {
    setSelectedProperty(null);
    document.body.style.overflow = "auto";
  };

  const togglePlay = () => {
    scifiAudio.playHoloBeep(850, 0.05);
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    scifiAudio.playHoloBeep(700, 0.05);
    setIsMuted((prev) => !prev);
  };

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    scifiAudio.playHoloBeep(1100, 0.08);
    setLikedReels((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleTimeUpdate = () => {
    if (modalVideoRef.current) {
      setCurrentTime(modalVideoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (modalVideoRef.current) {
      setDuration(modalVideoRef.current.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
    if (modalVideoRef.current && duration > 0) {
      modalVideoRef.current.currentTime = newProgress * duration;
    }
  };

  const handleNextReel = () => {
    if (!selectedProperty) return;
    scifiAudio.playHoloBeep(800, 0.05);
    const currIdx = REEL_PROPERTIES.findIndex((p) => p.id === selectedProperty.id);
    const nextIdx = (currIdx + 1) % REEL_PROPERTIES.length;
    setSelectedProperty(REEL_PROPERTIES[nextIdx]);
    setIsPlaying(true);
    setCurrentTime(0);
    setInquirySent(false);
  };

  const handlePrevReel = () => {
    if (!selectedProperty) return;
    scifiAudio.playHoloBeep(800, 0.05);
    const currIdx = REEL_PROPERTIES.findIndex((p) => p.id === selectedProperty.id);
    const prevIdx = (currIdx - 1 + REEL_PROPERTIES.length) % REEL_PROPERTIES.length;
    setSelectedProperty(REEL_PROPERTIES[prevIdx]);
    setIsPlaying(true);
    setCurrentTime(0);
    setInquirySent(false);
  };

  // Modal Video play/pause effect
  useEffect(() => {
    if (!modalVideoRef.current) return;
    if (isPlaying) {
      modalVideoRef.current.play().catch(() => {});
    } else {
      modalVideoRef.current.pause();
    }
  }, [isPlaying, selectedProperty]);

  useEffect(() => {
    if (!modalVideoRef.current) return;
    modalVideoRef.current.muted = isMuted;
  }, [isMuted]);

  // Keyboard navigation for video player
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProperty) return;
      if (e.key === "Escape") {
        handleCloseReel();
      } else if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "m" || e.key === "M") {
        setIsMuted((prev) => !prev);
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        handleNextReel();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        handlePrevReel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProperty, isPlaying]);

  return (
    <section
      id="real-estate-reels"
      className="relative z-20 bg-[#FCF8F3] text-[#012169] selection:bg-[#A10728] selection:text-[#FCF8F3]"
    >
      {/* Subtle Architectural Grid Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[linear-gradient(to_right,rgba(1,33,105,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(1,33,105,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* ====================================================================
          STICKY SCROLL CONTAINER (145vh Total Scroll Track)
          Pins sticky stage to the viewport so user expands all 5 reels with a single scroll.
          ==================================================================== */}
      <div ref={containerRef} className="relative h-[145vh]">
        {/* Sticky Viewport: Perfectly pinned under modal header while scrolling */}
        <div className="sticky top-0 sm:top-[52px] h-screen sm:h-[calc(100vh-52px)] w-full flex flex-col justify-between py-3 sm:py-4 lg:py-5 px-3 sm:px-6 lg:px-8 select-none overflow-hidden">
          {/* 1. TOP HEADER: Editorial Title */}
          <div className="w-full max-w-[1560px] mx-auto flex items-center justify-between border-b border-[#012169]/15 pb-2.5 sm:pb-3 flex-shrink-0 z-20">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A10728] animate-pulse" />
                <span className="font-sans text-[10px] sm:text-xs font-bold text-[#A10728] tracking-[0.2em] uppercase">
                  EDITORIAL ARCHIVE // SCROLL TO EXPAND ALL 5 VIDEO REELS
                </span>
              </div>
              <h2 className="font-['Condor_Med_Cond',sans-serif] text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#012169] leading-none">
                Commercial Archives <span className="text-[#A10728] font-normal italic font-serif">&amp;</span> Video Reels
              </h2>
            </div>
          </div>

          {/* 2. MAIN PROGRESSIVE STAGE: 5 Standard 9:16 Instagram Reel Video Cards Growing from Baseline */}
          <div className="w-full max-w-[1560px] mx-auto flex-1 flex flex-col justify-end items-center my-auto z-20 py-1.5 sm:py-2 overflow-visible">
            <div
              ref={cardsRowRef}
              className="w-full flex md:grid md:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5 xl:gap-6 items-end justify-start md:justify-center overflow-x-auto md:overflow-visible pb-2 no-scrollbar"
            >
              {REEL_PROPERTIES.map((property, idx) => {
                const spec = CARD_SPECS[idx];
                const rawT = Math.max(0, Math.min(1, (scrollProgress - spec.start) / (spec.end - spec.start)));

                // Smooth cubic bezier easing
                const easeT =
                  rawT < 0.5 ? 4 * rawT * rawT * rawT : 1 - Math.pow(-2 * rawT + 2, 3) / 2;

                const minHeight = 130;
                const currentHeight = Math.round(minHeight + (maxCardHeight - minHeight) * easeT);
                const opacity = 1;
                const scale = 0.95 + 0.05 * easeT;

                // When closed (easeT === 0), content and video are completely hidden (opacity 0), showing only solid red.
                // As the reel opens with scroll, video and title smoothly fade in.
                const isCardOpen = easeT > 0.05;
                const videoOpacity = Math.max(0, Math.min(1, (easeT - 0.04) / 0.65));
                const contentOpacity = Math.max(0, Math.min(1, (easeT - 0.15) / 0.75));

                return (
                  <div
                    key={property.id}
                    onClick={() => handleOpenReel(property)}
                    className={`group relative flex-shrink-0 w-[260px] sm:w-[290px] md:w-full flex flex-col justify-end overflow-hidden cursor-pointer select-none rounded-2xl sm:rounded-3xl transition-all duration-300 ${
                      isCardOpen
                        ? "border-2 border-white/20 hover:border-white/55 shadow-[0_16px_50px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_60px_rgba(1,33,105,0.3)]"
                        : "border-2 border-[#720808] shadow-[0_12px_40px_rgba(114,8,8,0.22)]"
                    }`}
                    style={{
                      height: `${currentHeight}px`,
                      opacity,
                      transform: `scale(${scale})`,
                      backgroundColor: isCardOpen ? "#0A0F1D" : (spec.color || "#720808"),
                      transformOrigin: "bottom center",
                    }}
                    title={`Click to watch ${property.title}`}
                  >
                    {/* Layer 1: Actual Video Playing Smoothly Inside the Reel Card (Fades in without red tint) */}
                    <video
                      ref={(el) => {
                        if (el) {
                          if (isCardOpen && el.paused) {
                            el.play().catch(() => {});
                          } else if (!isCardOpen && !el.paused) {
                            el.pause();
                          }
                        }
                      }}
                      src={property.videoSrc}
                      poster={property.image}
                      autoPlay={false}
                      loop
                      muted
                      playsInline
                      preload="auto"
                      style={{ opacity: videoOpacity }}
                      className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-out group-hover:scale-105"
                    />

                    {/* Layer 2: Neutral Dark Vignette Overlay for Text Legibility (Zero Red Tint on Open Video) */}
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                      style={{
                        opacity: contentOpacity,
                        background:
                          "linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.3) 35%, transparent 65%)",
                      }}
                    />

                    {/* Layer 3: Clean Property Title & Relevant Reel Details */}
                    <div
                      className="relative z-20 p-3 sm:p-4 lg:p-5 text-white flex flex-col justify-end transition-opacity duration-300"
                      style={{ opacity: contentOpacity }}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className="font-mono text-[9px] sm:text-[10px] font-bold text-white/90 bg-white/15 backdrop-blur-md px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          {spec.indexLabel}
                        </span>
                        <span className="font-mono text-[10px] sm:text-xs font-bold text-white/95">
                          {property.price}
                        </span>
                      </div>
                      <h3 className="font-['Condor_Med_Cond',sans-serif] text-base sm:text-lg lg:text-xl font-bold leading-tight line-clamp-2 text-white group-hover:text-[#FCF8F3] transition-colors drop-shadow-sm">
                        {property.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          AUTHENTIC VERTICAL 9:16 INSTAGRAM REELS VIDEO MODAL
         ======================================================== */}
      {selectedProperty && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0E1B33]/85 backdrop-blur-xl p-3 sm:p-6 select-none animate-in fade-in duration-200">
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={handleCloseReel} />

          {/* Desktop Navigation Chevrons Outside the Vertical Phone Frame */}
          <button
            onClick={handlePrevReel}
            className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-30 h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#0E1B33]/90 text-[#FAF9F6] backdrop-blur-md hover:border-white/50 hover:bg-[#012169] transition-colors cursor-pointer shadow-xl"
            title="Previous Reel"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={handleNextReel}
            className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-30 h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#0E1B33]/90 text-[#FAF9F6] backdrop-blur-md hover:border-white/50 hover:bg-[#012169] transition-colors cursor-pointer shadow-xl"
            title="Next Reel"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Modal Container: Strict 9:16 Aspect Ratio Frame */}
          <div
            className="relative z-20 flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-white/20 bg-[#0E1B33] shadow-[0_24px_70px_rgba(14,27,51,0.8)] w-full max-w-[380px] sm:max-w-[400px] h-[82vh] max-h-[760px] aspect-[9/16]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Native Video Element */}
            <video
              ref={modalVideoRef}
              src={selectedProperty.videoSrc}
              className="absolute inset-0 h-full w-full object-cover cursor-pointer"
              loop
              playsInline
              onClick={togglePlay}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            />

            {/* Subtle Gradient Overlays for Readability */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E1B33] via-transparent to-[#0E1B33]/70" />

            {/* Top Bar: Progress Indicator & Action Controls */}
            <div className="relative z-30 p-4">
              {/* Instagram-style Top Segmented Progress Bar */}
              <div
                onClick={handleSeek}
                className="h-1 w-full overflow-hidden rounded-full bg-white/20 cursor-pointer"
              >
                <div
                  className="h-full bg-white transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(255,255,255,0.7)]"
                  style={{
                    width: duration > 0 ? `${(currentTime / duration) * 100}%` : "0%",
                  }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#012169]/90 backdrop-blur-md px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#FAF9F6] border border-white/25 shadow-sm">
                    {selectedProperty.categoryLabel}
                  </span>
                  <span className="font-mono text-xs text-[#FAF9F6]/80">
                    {selectedProperty.duration}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="flex h-10 w-10 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[#0E1B33]/80 backdrop-blur-md text-[#FAF9F6] border border-white/20 hover:bg-[#012169] transition-colors cursor-pointer"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={handleCloseReel}
                    className="flex h-10 w-10 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[#0E1B33]/80 backdrop-blur-md text-[#FAF9F6] border border-white/20 hover:bg-[#012169] transition-colors cursor-pointer"
                    title="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Center Play/Pause Tap Flash Overlay */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer bg-black/35 backdrop-blur-[2px]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#012169]/90 border border-white/30 backdrop-blur-md text-[#FAF9F6] shadow-[0_0_30px_rgba(1,33,105,0.6)] transition-transform hover:scale-110">
                  <Play className="h-7 w-7 ml-1 fill-current" />
                </div>
              </div>
            )}

            {/* Right Side Social Actions Column */}
            <div className="absolute right-4 bottom-24 z-30 flex flex-col items-center gap-4 text-white">
              <button
                onClick={(e) => toggleLike(e, selectedProperty.id)}
                className="flex flex-col items-center gap-1 group/btn cursor-pointer"
                title="Like"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#0E1B33]/85 backdrop-blur-md transition-transform group-hover/btn:scale-110 ${
                    likedReels[selectedProperty.id] ? "text-rose-400 border-rose-400" : "text-white"
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      likedReels[selectedProperty.id] ? "fill-rose-400 text-rose-400" : ""
                    }`}
                  />
                </div>
                <span className="font-mono text-[9px] text-[#FAF9F6]/80">Save</span>
              </button>

              <button
                onClick={handlePrevReel}
                className="flex md:hidden flex-col items-center gap-1 group/btn cursor-pointer"
                title="Previous Reel"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0E1B33]/85 backdrop-blur-md border border-white/20 text-white group-hover/btn:scale-110 transition-transform">
                  <ChevronLeft className="h-5 w-5" />
                </div>
                <span className="font-mono text-[9px] text-[#FAF9F6]/80">Prev</span>
              </button>

              <button
                onClick={handleNextReel}
                className="flex md:hidden flex-col items-center gap-1 group/btn cursor-pointer"
                title="Next Reel"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0E1B33]/85 backdrop-blur-md border border-white/20 text-white group-hover/btn:scale-110 transition-transform">
                  <ChevronRight className="h-5 w-5" />
                </div>
                <span className="font-mono text-[9px] text-[#FAF9F6]/80">Next</span>
              </button>
            </div>

            {/* Bottom Overlay Info & Call to Action */}
            <div
              className="relative z-30 p-5 text-white max-w-[85%]"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-mono text-xl sm:text-2xl font-bold text-[#FAF9F6]">
                {selectedProperty.price}
              </p>
              <h3 className="mt-1 font-['Condor_Med_Cond',sans-serif] text-base sm:text-lg font-bold text-white leading-snug line-clamp-1">
                {selectedProperty.title}
              </h3>
              <p className="mt-1 flex items-center gap-1 text-xs font-mono text-[#FAF9F6]/85">
                <MapPin className="h-3 w-3 text-sky-300 shrink-0" />
                <span className="truncate">{selectedProperty.location}</span>
              </p>
              <p className="mt-1 text-[11px] font-mono text-[#FAF9F6]/70">
                {selectedProperty.floors} Storeys • {selectedProperty.sqft}
              </p>

              {/* Prospectus Request CTA */}
              <button
                onClick={() => {
                  scifiAudio.playHoloBeep(980, 0.1);
                  setInquirySent(true);
                }}
                className="mt-3.5 flex items-center gap-2 rounded-xl bg-[#012169] text-[#FAF9F6] hover:bg-[#002B7F] border border-white/20 px-4 py-2 font-mono text-[11px] font-bold uppercase shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Calendar className="h-3.5 w-3.5 text-[#FAF9F6]" />
                <span>{inquirySent ? "PROSPECTUS REQUESTED ✓" : "REQUEST PROSPECTUS"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
