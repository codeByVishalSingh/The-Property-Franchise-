"use client";

import React, { useState, useRef, useEffect } from "react";
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
    videoSrc: "/sample_video.mp4",
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

export function RealEstateReelsSection() {
  const [selectedProperty, setSelectedProperty] = useState<ReelProperty | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [likedReels, setLikedReels] = useState<Record<string, boolean>>({});
  const [inquirySent, setInquirySent] = useState(false);

  // References for continuous loop & interaction
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInViewRef = useRef(false);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const hasMovedRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const scrollPosRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  const filteredProperties = REEL_PROPERTIES;

  // Repeat items for an uninterrupted continuous horizontal loop
  const repeatCount = 4;
  const loopedProperties = Array.from({ length: repeatCount }, () => filteredProperties).flat();

  // 1. Viewport detection: detect when user reaches the section
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const checkVisibility = () => {
      const rect = section.getBoundingClientRect();
      const visible = rect.top < window.innerHeight && rect.bottom > 0;
      isInViewRef.current = visible;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
      },
      { threshold: 0, rootMargin: "150px 0px 150px 0px" }
    );

    observer.observe(section);
    window.addEventListener("scroll", checkVisibility, { passive: true });
    checkVisibility();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", checkVisibility);
    };
  }, []);

  // 2. Initialize scroll position centered so it can loop seamlessly
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Small timeout to allow container.scrollWidth to calculate after DOM render
    const timer = setTimeout(() => {
      const singleSetWidth = container.scrollWidth / repeatCount;
      if (singleSetWidth > 0) {
        container.scrollLeft = singleSetWidth;
        scrollPosRef.current = singleSetWidth;
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [repeatCount]);

  // 3. Smooth, continuous horizontal marquee auto-scroll loop
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let lastTime = performance.now();

    const loopStep = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // Only scroll when visible and not currently being dragged
      if (
        container &&
        isInViewRef.current &&
        !isHoveredRef.current &&
        !isDraggingRef.current
      ) {
        // Steady cinematic marquee velocity (~42px/sec)
        const speed = 42;
        const pixelsToScroll = speed * Math.min(delta, 0.1);
        scrollPosRef.current += pixelsToScroll;

        // Wrap seamlessly around single set boundaries
        const singleSetWidth = container.scrollWidth / repeatCount;
        if (singleSetWidth > 0) {
          if (scrollPosRef.current >= singleSetWidth * 2) {
            scrollPosRef.current -= singleSetWidth;
          } else if (scrollPosRef.current <= 0) {
            scrollPosRef.current += singleSetWidth;
          }
        }

        container.scrollLeft = Math.round(scrollPosRef.current);
      }

      animationFrameIdRef.current = requestAnimationFrame(loopStep);
    };

    animationFrameIdRef.current = requestAnimationFrame(loopStep);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [repeatCount]);

  // Mouse drag-to-scroll interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftStartRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.25;
    if (Math.abs(walk) > 6) {
      hasMovedRef.current = true;
    }
    el.scrollLeft = scrollLeftStartRef.current - walk;
    scrollPosRef.current = el.scrollLeft;

    const singleSetWidth = el.scrollWidth / repeatCount;
    if (singleSetWidth > 0) {
      if (el.scrollLeft >= singleSetWidth * 2) {
        el.scrollLeft -= singleSetWidth;
        scrollLeftStartRef.current -= singleSetWidth;
        scrollPosRef.current = el.scrollLeft;
      } else if (el.scrollLeft <= 0) {
        el.scrollLeft += singleSetWidth;
        scrollLeftStartRef.current += singleSetWidth;
        scrollPosRef.current = el.scrollLeft;
      }
    }
  };

  const handleMouseUpOrLeave = () => {
    if (isDraggingRef.current && scrollContainerRef.current) {
      scrollPosRef.current = scrollContainerRef.current.scrollLeft;
    }
    isDraggingRef.current = false;
  };

  // Video modal handling
  const handleOpenReel = (property: ReelProperty) => {
    if (hasMovedRef.current) return;
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
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleNextReel = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!selectedProperty) return;
    const currentIndex = REEL_PROPERTIES.findIndex((p) => p.id === selectedProperty.id);
    const nextIndex = (currentIndex + 1) % REEL_PROPERTIES.length;
    setSelectedProperty(REEL_PROPERTIES[nextIndex]);
    setCurrentTime(0);
    setInquirySent(false);
  };

  const handlePrevReel = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!selectedProperty) return;
    const currentIndex = REEL_PROPERTIES.findIndex((p) => p.id === selectedProperty.id);
    const prevIndex = (currentIndex - 1 + REEL_PROPERTIES.length) % REEL_PROPERTIES.length;
    setSelectedProperty(REEL_PROPERTIES[prevIndex]);
    setCurrentTime(0);
    setInquirySent(false);
  };

  // Video sync
  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => { });
        }
      });
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying, selectedProperty]);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = isMuted;
  }, [isMuted]);

  // Keyboard navigation
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
      ref={sectionRef}
      id="real-estate-reels"
      className="relative z-20 bg-[#FCF8F3] py-18 sm:py-24 text-[#012169] selection:bg-[#A10728] selection:text-[#FCF8F3] overflow-hidden border-t border-[#012169]/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 mb-6 sm:mb-8 text-center">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold uppercase tracking-wider text-center max-w-3xl mx-auto px-4">
          <span className="text-[#012169]">FRANCHISE ARCHIVE</span> <span className="text-[#A10728]">&</span> <span className="text-[#012169]">COMMERCIAL REELS</span>
        </h2>
      </div>

      {/* 
        Horizontal Continuous Loop Reels Container
        Standard 9:16 vertical aspect ratio with consistent spacing and alignment
      */}
      <div className="relative w-full">
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseEnter={() => {
            isHoveredRef.current = true;
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
            isDraggingRef.current = false;
          }}
          onTouchStart={() => {
            isHoveredRef.current = true;
          }}
          onTouchEnd={() => {
            setTimeout(() => {
              isHoveredRef.current = false;
            }, 1000);
          }}
          className="flex gap-6 overflow-x-hidden py-4 px-6 sm:px-12 no-scrollbar select-none cursor-grab active:cursor-grabbing"
          style={{ scrollBehavior: "auto" }}
        >
          {loopedProperties.map((property, idx) => {
            const isLiked = likedReels[property.id];

            return (
              <div
                key={`${property.id}-${idx}`}
                onClick={() => handleOpenReel(property)}
                className="group relative flex-shrink-0 w-[260px] sm:w-[285px] md:w-[310px] aspect-[9/16] rounded-3xl overflow-hidden border-2 border-[#012169]/15 bg-white shadow-[0_8px_30px_rgba(1,33,105,0.08)] transition-all duration-300 hover:-translate-y-2 hover:border-[#A10728] hover:shadow-[0_20px_45px_rgba(161,7,40,0.2)] cursor-pointer"
              >
                {/* Full-Bleed Vertical Reel Image */}
                <img
                  src={property.image}
                  alt={property.title}
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1B33]/90 via-[#0E1B33]/25 to-transparent" />

                {/* Bottom Property Details */}
                <div className="absolute bottom-4 left-4 right-4 z-10 text-[#FAF9F6]">
                  <span className="font-mono text-xs font-bold text-[#FCF8F3] bg-[#A10728] px-2.5 py-0.5 rounded shadow-sm inline-block mb-1">
                    {property.price}
                  </span>
                  <h3 className="font-serif text-sm font-bold leading-snug line-clamp-1 text-white">
                    {property.title}
                  </h3>
                </div>
              </div>
            );
          })}
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
            className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-30 h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#0E1B33]/90 text-[#FAF9F6] backdrop-blur-md hover:border-[#A10728] hover:bg-[#A10728] transition-colors cursor-pointer shadow-xl"
            title="Previous Reel"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={handleNextReel}
            className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-30 h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#0E1B33]/90 text-[#FAF9F6] backdrop-blur-md hover:border-[#A10728] hover:bg-[#A10728] transition-colors cursor-pointer shadow-xl"
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
              ref={videoRef}
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
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full bg-[#A10728] transition-all duration-100 ease-linear shadow-[0_0_10px_#A10728]"
                  style={{
                    width: duration > 0 ? `${(currentTime / duration) * 100}%` : "0%",
                  }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#A10728] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#FAF9F6] border border-white/20 shadow-sm">
                    {selectedProperty.categoryLabel}
                  </span>
                  <span className="font-mono text-xs text-[#FAF9F6]/80">
                    {selectedProperty.duration}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0E1B33]/80 backdrop-blur-md text-[#FAF9F6] border border-white/20 hover:bg-[#A10728] transition-colors cursor-pointer"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={handleCloseReel}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0E1B33]/80 backdrop-blur-md text-[#FAF9F6] border border-white/20 hover:bg-[#A10728] transition-colors cursor-pointer"
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
                className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer bg-black/35"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#A10728] text-[#FAF9F6] shadow-[0_0_30px_rgba(161,7,40,0.5)] transition-transform hover:scale-110">
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
                  className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#0E1B33]/85 backdrop-blur-md transition-transform group-hover/btn:scale-110 ${likedReels[selectedProperty.id] ? "text-[#A10728] border-[#A10728]" : "text-white"
                    }`}
                >
                  <Heart
                    className={`h-5 w-5 ${likedReels[selectedProperty.id] ? "fill-[#A10728] text-[#A10728]" : ""
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
              <h3 className="mt-1 font-serif text-base sm:text-lg font-bold text-white leading-snug line-clamp-1">
                {selectedProperty.title}
              </h3>
              <p className="mt-1 flex items-center gap-1 text-xs font-mono text-[#FAF9F6]/85">
                <MapPin className="h-3 w-3 text-[#A10728] shrink-0" />
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
                className="mt-3.5 flex items-center gap-2 rounded-xl bg-[#A10728] text-[#FAF9F6] hover:bg-[#720808] px-4 py-2 font-mono text-[11px] font-bold uppercase shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
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
