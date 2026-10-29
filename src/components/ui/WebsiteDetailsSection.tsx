"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Building2,
  Compass,
  TrendingUp,
  Briefcase,
  Layers,
  Lock,
  Send,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { scifiAudio } from "@/lib/audio";

export interface ServiceItem {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  metrics: string;
  tag: string;
  image: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "brokerage",
    icon: Building2,
    title: "Class-A Commercial Brokerage & Acquisitions",
    subtitle: "Prime Office Towers & Landmark Commercial Assets",
    description:
      "Providing exclusive transaction advisory for institutional funds, REITs, and private capital partners acquiring and disposing of trophy office towers and metropolitan commercial premises.",
    metrics: "$3.8B+ Facilitated",
    tag: "Institutional Brokerage",
    image: "/commercial_office_tower.jpg",
  },
  {
    id: "franchise-network",
    icon: Compass,
    title: "National Commercial Franchise Network",
    subtitle: "Turnkey Commercial Brokerage Franchise Licensing",
    description:
      "Equipping accredited franchise directors with proprietary commercial valuation tools, exclusive metropolitan territory rights, national marketing reach, and institutional mandates.",
    metrics: "24 Major Hubs",
    tag: "Franchise Licensing",
    image: "/commercial_business_campus.jpg",
  },
  {
    id: "syndication",
    icon: TrendingUp,
    title: "Institutional Capital & Equity Syndication",
    subtitle: "Co-Investment Structures & Portfolio Placements",
    description:
      "Structuring private equity syndications and institutional co-investment vehicles across prime downtown commercial centers and high-growth logistics corridors with inflation-hedged yields.",
    metrics: "15.4% Target IRR",
    tag: "Capital Syndication",
    image: "/commercial_boardroom.jpg",
  },
  {
    id: "stewardship",
    icon: Briefcase,
    title: "Commercial Asset Stewardship & Management",
    subtitle: "Comprehensive Property Operations & Leasing Strategy",
    description:
      "Full-lifecycle commercial property management maximizing net operating income, tenant retention, green-building efficiencies, and lease compliance across institutional holdings.",
    metrics: "99.4% Leased Tenancy",
    tag: "Asset Stewardship",
    image: "/real_estate_interior.jpg",
  },
  {
    id: "logistics",
    icon: Layers,
    title: "Industrial & Logistics Distribution Facilities",
    subtitle: "High-Throughput Distribution & Supply Chain Assets",
    description:
      "Representing regional logistics parks, cross-dock freight centers, and automated fulfillment hubs situated along critical transport arteries and intermodal container terminals.",
    metrics: "12M+ Sq.Ft Portfolio",
    tag: "Industrial & Logistics",
    image: "/commercial_logistics_center.jpg",
  },
  {
    id: "off-market",
    icon: Lock,
    title: "Confidential Off-Market Transactions",
    subtitle: "Bilateral Institutional Property Advisory",
    description:
      "Orchestrating discrete, non-public commercial transactions for asset owners and institutional buyers requiring absolute confidentiality under bilateral non-disclosure agreements.",
    metrics: "$2.2B Private Pipeline",
    tag: "Off-Market Advisory",
    image: "/real_estate_aerial.jpg",
  },
];



/**
 * Interactive 3D Depth Card
 * Provides subtle perspective tilt on hover and layered stereoscopic depth
 */
interface Interactive3DCardProps {
  service: ServiceItem;
  index: number;
  isVisible: boolean;
  prefersReducedMotion: boolean;
  onSelect: (service: ServiceItem) => void;
}

function Interactive3DCard({
  service,
  index,
  isVisible,
  prefersReducedMotion,
  onSelect,
}: Interactive3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = service.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: -y * 6.5, y: x * 6.5 });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const delayMs = 100 + (index % 3) * 80;

  const transformStyle = prefersReducedMotion
    ? undefined
    : isHovered
    ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(-8px) translateZ(12px)`
    : isVisible
    ? "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) translateZ(0)"
    : "perspective(1000px) rotateX(10deg) translateY(32px) translateZ(-20px)";

  return (
    <div
      ref={cardRef}
      onClick={() => onSelect(service)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: isHovered
          ? "transform 0.12s ease-out, box-shadow 0.2s ease-out, border-color 0.2s ease"
          : `transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, opacity 0.65s ease-out ${delayMs}ms, border-color 0.3s ease, box-shadow 0.3s ease`,
        transformStyle: "preserve-3d",
      }}
      className={`group relative flex h-full flex-col justify-between rounded-2xl border border-[#D9C8AD] bg-[#FAF4E8] p-5 sm:p-6 cursor-pointer select-none will-change-transform ${
        isHovered
          ? "border-[#354F70] shadow-[0_22px_45px_rgba(53,79,112,0.16)]"
          : "shadow-sm hover:shadow-md"
      } ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {/* 3D Depth Inner Layer */}
      <div style={{ transform: "translateZ(18px)", transformStyle: "preserve-3d" }}>
        {/* Architectural Image Presentation with Ciao Energy Smooth Zoom & Mask Reveal */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#D9C8AD]/40 bg-[#1E2E42] mb-4.5 shadow-inner">
          <img
            src={service.image}
            alt={service.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#292824]/80 via-transparent to-transparent pointer-events-none" />

          {/* Top Tag & Metric Badge Overlaid on Image */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 pointer-events-none">
            <span className="font-mono text-[10px] font-bold tracking-wider uppercase text-[#F3E8D2] bg-[#354F70]/90 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-[#D9C8AD]/30 shadow-sm">
              {service.tag}
            </span>
            <span className="rounded-full bg-[#A63D35] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#F3E8D2] shadow-md transition-transform duration-300 group-hover:scale-105">
              {service.metrics}
            </span>
          </div>

          {/* Elevated Icon Badge Anchored at Bottom-Left of Image */}
          <div
            style={{ transform: "translateZ(14px)" }}
            className="absolute bottom-2.5 left-2.5 flex h-9 w-9 items-center justify-center rounded-lg bg-[#354F70] text-[#F3E8D2] shadow-md border border-[#F3E8D2]/25 transition-all duration-300 group-hover:bg-[#A63D35]"
          >
            <Icon className="h-4.5 w-4.5" />
          </div>
        </div>

        {/* Title and Subtitle */}
        <div>
          <h3 className="text-base sm:text-lg font-serif font-bold text-[#292824] leading-snug group-hover:text-[#A63D35] transition-colors">
            {service.title}
          </h3>
          <p className="mt-1 text-[11px] font-mono uppercase tracking-wider text-[#354F70]/85">
            {service.subtitle}
          </p>
        </div>

        {/* Authentic Commercial Description */}
        <p className="mt-2.5 text-xs sm:text-sm text-[#292824]/80 leading-relaxed font-sans line-clamp-3">
          {service.description}
        </p>
      </div>

      {/* Bottom Action Link */}
      <div
        style={{ transform: "translateZ(10px)" }}
        className="mt-6 pt-4 border-t border-[#D9C8AD]/70 flex items-center justify-between"
      >
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#A63D35] group-hover:text-[#8E332C] flex items-center gap-1.5 transition-colors">
          Request Practice Details{" "}
          <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </span>
      </div>
    </div>
  );
}

export function WebsiteDetailsSection() {
  const [selectedService, setSelectedService] = useState<ServiceItem>(SERVICES[0]);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollYOffset, setScrollYOffset] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // ========================================================
  // CAROUSEL & AUTOPLAY STATE (Exactly 3 cards in view on desktop)
  // ========================================================
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Repeat items 3 times for seamless infinite loop (set 1: 0-5, set 2: 6-11, set 3: 12-17)
  const carouselItems = [...SERVICES, ...SERVICES, ...SERVICES];
  const [currentIndex, setCurrentIndex] = useState(SERVICES.length); // Starts at index 6

  // Touch drag tracking for mobile
  const touchStartXRef = useRef(0);
  const touchDeltaXRef = useRef(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "Class-A Commercial Office Towers",
    budget: "$25,000,000 - $50,000,000",
    notes: "",
  });

  // Calculate visible cards & container width responsively
  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCards(1);
      } else if (width < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3); // Exactly 3 cards shown on desktop
      }

      if (carouselContainerRef.current) {
        setContainerWidth(carouselContainerRef.current.clientWidth);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    // Minor delay to ensure fonts & flex layouts settle
    const timer = setTimeout(updateDimensions, 100);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  // Check reduced-motion preference & handle smooth scroll-triggered visibility
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleMediaChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMediaChange);

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(section);

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (section) {
            const rect = section.getBoundingClientRect();
            const offset = (window.innerHeight - rect.top) * 0.08;
            setScrollYOffset(offset);

            if (rect.top < window.innerHeight * 0.88) {
              setIsVisible(true);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Carousel navigation handlers
  const handleNext = useCallback(() => {
    scifiAudio.playHoloBeep(880, 0.05);
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    scifiAudio.playHoloBeep(820, 0.05);
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  const handleSelectDot = (targetOriginalIndex: number) => {
    scifiAudio.playHoloBeep(850, 0.05);
    setIsTransitioning(true);
    setCurrentIndex(SERVICES.length + targetOriginalIndex);
  };

  // Seamless infinite loop transition reset
  const handleTransitionEnd = () => {
    if (currentIndex >= SERVICES.length * 2) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex - SERVICES.length);
    } else if (currentIndex < SERVICES.length) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex + SERVICES.length);
    }
  };

  // Autoplay loop timer (advances every 3.5s when visible and not paused)
  useEffect(() => {
    if (isPaused || consultationModalOpen || prefersReducedMotion || !isVisible) {
      return;
    }

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, consultationModalOpen, prefersReducedMotion, isVisible]);

  // Touch swipe support for mobile/tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchDeltaXRef.current = e.touches[0].clientX - touchStartXRef.current;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (touchDeltaXRef.current < -45) {
      handleNext();
    } else if (touchDeltaXRef.current > 45) {
      handlePrev();
    }
  };

  const handleServiceSelect = (service: ServiceItem) => {
    scifiAudio.playHoloBeep(880, 0.06);
    setSelectedService(service);
    setFormData((prev) => ({
      ...prev,
      category: service.title,
    }));
    setConsultationModalOpen(true);
  };

  const handleSubmitConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    scifiAudio.playHoloBeep(1100, 0.15);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setTimeout(() => {
        setConsultationModalOpen(false);
        setFormSubmitted(false);
      }, 2500);
    }, 600);
  };

  // Carousel item sizing and translation calculation
  const gap = 24; // 1.5rem gap-6
  const cardWidth =
    containerWidth > 0
      ? (containerWidth - (visibleCards - 1) * gap) / visibleCards
      : 360;
  const shiftAmount = currentIndex * (cardWidth + gap);

  // Active original service index for pagination indicators (0 to 5)
  const activeDot =
    ((currentIndex % SERVICES.length) + SERVICES.length) % SERVICES.length;

  return (
    <section
      ref={sectionRef}
      id="website-details"
      className="relative z-20 bg-[#F3E8D2] px-6 sm:px-10 lg:px-16 py-20 sm:py-28 text-[#292824] selection:bg-[#A63D35] selection:text-[#F3E8D2] border-t border-[#D9C8AD] overflow-hidden"
    >
      {/* ========================================================
          PARALLAX ARCHITECTURAL BACKGROUND MOTIFS (Depth Layers)
         ======================================================== */}
      {!prefersReducedMotion && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
          <div
            style={{
              transform: `translateY(${scrollYOffset * 0.4}px)`,
              opacity: isVisible ? 0.35 : 0,
              transition: "opacity 1s ease-out",
            }}
            className="absolute -top-20 -left-20 w-[140%] h-[140%] bg-[radial-gradient(#D9C8AD_1px,transparent_1px)] [background-size:32px_32px]"
          />

          <div
            style={{
              transform: `translateY(${-scrollYOffset * 0.6}px) rotate(${scrollYOffset * 0.5}deg)`,
              opacity: isVisible ? 0.45 : 0,
              transition: "opacity 1.2s ease-out",
            }}
            className="absolute top-12 right-[-50px] sm:right-10 h-72 w-72 rounded-full border border-[#354F70]/20 border-dashed"
          />

          <div
            style={{
              transform: `translateY(${scrollYOffset * 0.8}px) rotate(${-scrollYOffset * 0.4}deg)`,
              opacity: isVisible ? 0.35 : 0,
              transition: "opacity 1.2s ease-out",
            }}
            className="absolute bottom-8 left-[-40px] sm:left-12 h-60 w-60 rounded-3xl border border-[#A63D35]/20"
          />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ========================================================
            1. SECTION HEADER (Scroll-Triggered Progressive 3D Reveal)
           ======================================================== */}
        <div
          style={{
            transform: prefersReducedMotion
              ? undefined
              : isVisible
              ? "perspective(1000px) rotateX(0deg) translateY(0)"
              : "perspective(1000px) rotateX(8deg) translateY(24px)",
            transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-out",
          }}
          className={`flex flex-col items-center text-center will-change-transform ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold uppercase tracking-tight text-[#292824] text-center max-w-4xl mx-auto px-4 leading-tight">
            THE PROPERTY FRANCHISE <span className="text-[#A63D35]">& COMMERCIAL CAPITAL</span>
          </h2>
        </div>

        {/* ========================================================
            2. COMMERCIAL PRACTICE AUTOPLAY CAROUSEL (3 In View)
           ======================================================== */}
        <div className="mt-10 sm:mt-12">
          {/* Carousel Subheader & Control Bar */}
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#354F70]">
              <span className="flex h-2 w-2 rounded-full bg-[#A63D35] animate-pulse" />
              <span>COMMERCIAL PRACTICE CAROUSEL • 3 CARDS IN VIEW</span>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              {/* Autoplay Status Indicator */}
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#D9C8AD] bg-[#FAF4E8] font-mono text-[11px] text-[#292824]/80 select-none">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isPaused ? "bg-[#354F70]" : "bg-[#A63D35] animate-ping"
                  }`}
                />
                <span>{isPaused ? "AUTOPLAY PAUSED" : "AUTOPLAY ACTIVE"}</span>
              </div>

              {/* Previous Slide Button */}
              <button
                onClick={handlePrev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D9C8AD] bg-[#FAF4E8] text-[#354F70] hover:bg-[#A63D35] hover:text-[#F3E8D2] hover:border-[#A63D35] transition-all shadow-sm active:scale-95 cursor-pointer"
                aria-label="Previous commercial practice"
                title="Previous practice"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Next Slide Button */}
              <button
                onClick={handleNext}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D9C8AD] bg-[#FAF4E8] text-[#354F70] hover:bg-[#A63D35] hover:text-[#F3E8D2] hover:border-[#A63D35] transition-all shadow-sm active:scale-95 cursor-pointer"
                aria-label="Next commercial practice"
                title="Next practice"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Carousel Viewport Container */}
          <div
            ref={carouselContainerRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative overflow-hidden py-3 [perspective:1200px]"
          >
            {/* Sliding Track */}
            <div
              onTransitionEnd={handleTransitionEnd}
              style={{
                transform: `translateX(-${shiftAmount}px)`,
                transition: isTransitioning
                  ? "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)"
                  : "none",
              }}
              className="flex gap-6 will-change-transform"
            >
              {carouselItems.map((service, index) => (
                <div
                  key={`${service.id}-${index}`}
                  style={{
                    width: cardWidth > 0 ? `${cardWidth}px` : "auto",
                  }}
                  className="shrink-0 flex flex-col"
                >
                  <Interactive3DCard
                    service={service}
                    index={index}
                    isVisible={isVisible}
                    prefersReducedMotion={prefersReducedMotion}
                    onSelect={handleServiceSelect}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots (6 Practices) */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {SERVICES.map((s, idx) => {
              const isActive = activeDot === idx;
              return (
                <button
                  key={s.id}
                  onClick={() => handleSelectDot(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    isActive
                      ? "w-8 h-2.5 bg-[#A63D35] shadow-sm"
                      : "w-2.5 h-2.5 bg-[#D9C8AD] hover:bg-[#354F70]"
                  }`}
                  aria-label={`Go to slide ${idx + 1}: ${s.title}`}
                  title={s.title}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================
          COMMERCIAL CONSULTATION MODAL
         ======================================================== */}
      {consultationModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#292824]/80 p-4 text-[#292824] backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-[#D9C8AD] bg-[#F3E8D2] p-8 shadow-2xl">
            <button
              onClick={() => setConsultationModalOpen(false)}
              className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-lg border border-[#D9C8AD] bg-white text-[#292824] hover:bg-[#A63D35] hover:text-[#F3E8D2] hover:border-[#A63D35] transition-colors cursor-pointer text-sm font-bold"
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#354F70]">
              <ShieldCheck className="h-4 w-4 text-[#A63D35]" />
              Institutional Consultation Directive
            </div>

            <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-[#292824]">
              {selectedService.title}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-[#292824]/80 font-sans">
              Connect with our Managing Director responsible for {selectedService.subtitle.toLowerCase()}.
            </p>

            {formSubmitted ? (
              <div className="mt-6 rounded-xl border border-[#354F70]/30 bg-[#354F70]/10 p-6 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-[#354F70]" />
                <h4 className="mt-3 font-serif text-lg font-bold text-[#292824]">
                  Consultation Mandate Transmitted
                </h4>
                <p className="mt-1 text-xs text-[#292824]/80">
                  Our Managing Director has received your institutional parameters and will establish confidential contact within 2 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitConsultation} className="mt-6 space-y-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#292824]/80">
                    Principal / Executive Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Marcus Vance"
                    className="mt-1 w-full rounded-xl border border-[#D9C8AD] bg-white px-4 py-2.5 text-sm text-[#292824] placeholder-[#292824]/40 focus:border-[#354F70] focus:outline-none focus:ring-1 focus:ring-[#354F70]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#292824]/80">
                      Executive Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="vance@capital.com"
                      className="mt-1 w-full rounded-xl border border-[#D9C8AD] bg-white px-4 py-2.5 text-sm text-[#292824] placeholder-[#292824]/40 focus:border-[#354F70] focus:outline-none focus:ring-1 focus:ring-[#354F70]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#292824]/80">
                      Telephone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (310) 844-9200"
                      className="mt-1 w-full rounded-xl border border-[#D9C8AD] bg-white px-4 py-2.5 text-sm text-[#292824] placeholder-[#292824]/40 focus:border-[#354F70] focus:outline-none focus:ring-1 focus:ring-[#354F70]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#292824]/80">
                    Target Commercial Allocation Horizon
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-[#D9C8AD] bg-white px-4 py-2.5 text-sm text-[#292824] focus:border-[#354F70] focus:outline-none focus:ring-1 focus:ring-[#354F70]"
                  >
                    <option>$10,000,000 - $25,000,000</option>
                    <option>$25,000,000 - $50,000,000</option>
                    <option>$50,000,000 - $100,000,000</option>
                    <option>$100,000,000+ Institutional Core</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#292824]/80">
                    Mandate Notes & Territory Criteria
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Specify target metropolitan geography, target cap rates, or franchise licensing horizon..."
                    className="mt-1 w-full rounded-xl border border-[#D9C8AD] bg-white px-4 py-2 text-sm text-[#292824] placeholder-[#292824]/40 focus:border-[#354F70] focus:outline-none focus:ring-1 focus:ring-[#354F70]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setConsultationModalOpen(false)}
                    className="rounded-xl px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#292824]/80 hover:text-[#292824] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#A63D35] px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#F3E8D2] shadow-md hover:bg-[#8E332C] transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      "Transmitting..."
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        Transmit Consultation Directive
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
