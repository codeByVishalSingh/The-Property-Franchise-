"use client";

import React, { useState, useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import {
  Send,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { scifiAudio } from "@/lib/audio";

export interface ContactSectionProps {
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
  onOpenVideo?: () => void;
}

export function ContactSection({ scrollContainerRef }: ContactSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Form submission state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "Private Commercial Acquisition Mandate",
    note: "",
  });

  // Door opening state: starts closed on initial mount, automatically swings open upon entry
  const [isOpen, setIsOpen] = useState(false);
  const [isHoveringDoor, setIsHoveringDoor] = useState(false);

  // Trigger when entering the section
  const isInView = useInView(containerRef, {
    root: scrollContainerRef,
    once: false,
    amount: 0.15,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isInView) {
      // Small natural delay so user notices the closed estate door before it automatically swings open
      timer = setTimeout(() => {
        setIsOpen(true);
        scifiAudio.playHoloBeep(740, 0.08);
      }, 250);
    } else {
      setIsOpen(false);
    }
    return () => clearTimeout(timer);
  }, [isInView]);

  // Interactive toggle when clicking the door or button
  const handleToggleDoor = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    scifiAudio.playHoloBeep(nextState ? 740 : 420, 0.08);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scifiAudio.playHoloBeep(980, 0.1);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      scifiAudio.playHoloBeep(1200, 0.15);
    }, 600);
  };

  return (
    <section
      id="contact-us"
      ref={containerRef}
      className="relative z-20 bg-[#FCF8F3] text-[#012169] selection:bg-[#A10728] selection:text-[#FCF8F3] min-h-[calc(100vh-52px)] w-full flex items-center justify-center py-8 sm:py-12 lg:py-16 px-4 sm:px-8 lg:px-14 select-none overflow-hidden"
    >
      {/* Subtle Architectural Grid Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[linear-gradient(to_right,rgba(1,33,105,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(1,33,105,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="mx-auto w-full max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 items-center">
          {/* ====================================================================
              LEFT COLUMN: ARCHED FRAME WITH AUTOMATIC ENTRY 3D DOOR ANIMATION
              ==================================================================== */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* Grand Arched Doorway Frame */}
            <div
              onClick={handleToggleDoor}
              onMouseEnter={() => setIsHoveringDoor(true)}
              onMouseLeave={() => setIsHoveringDoor(false)}
              className="group/door relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[410px] aspect-[3/4.6] rounded-t-full rounded-b-2xl overflow-hidden border-[6px] sm:border-[8px] border-[#7A1B2E] shadow-[0_20px_60px_rgba(122,27,46,0.22)] bg-[#7A1B2E] cursor-pointer select-none transition-transform duration-300 hover:scale-[1.01]"
              title="Click to open / close the estate door"
            >
              {/* 1. Underlying Estate Image: Townhouse Facade with Georgian Sash Windows & Pink Door */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src="/contact_arch_house.jpg"
                  alt="The House - 14 Linden Row Townhouse Facade"
                  className="w-full h-full object-cover object-center"
                />
                {/* Natural Light Vignette & Depth Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1B33]/60 via-transparent to-black/15 pointer-events-none" />
              </div>

              {/* 2. Interior Shadow (smoothly fades as doors open and light pours in) */}
              <div
                className="absolute inset-0 bg-[#0E1B33] pointer-events-none transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ opacity: isOpen ? 0 : 0.75 }}
              />

              {/* 3. DOUBLE ARCHED DOORS (3D Perspective Container) */}
              <div
                className="absolute inset-0 flex w-full h-full pointer-events-none"
                style={{ perspective: "1200px" }}
              >
                {/* LEFT DOOR HALF */}
                <div
                  className="relative w-1/2 h-full rounded-tl-full bg-gradient-to-r from-[#620B1E] via-[#731024] to-[#801328] border-r border-[#FAF9F6]/25 shadow-2xl transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transformOrigin: "left center",
                    transform: isOpen
                      ? "perspective(1200px) rotateY(-88deg) translateX(-16%)"
                      : isHoveringDoor
                      ? "perspective(1200px) rotateY(-12deg) translateX(-2%)"
                      : "perspective(1200px) rotateY(0deg) translateX(0%)",
                    boxShadow: isOpen
                      ? "10px 0 30px rgba(0,0,0,0.45)"
                      : "none",
                  }}
                >
                  {/* Carved Architectural Inner Panel Molding */}
                  <div className="absolute inset-3 sm:inset-4 rounded-tl-full border border-white/20 shadow-inner pointer-events-none" />
                  <div className="absolute inset-6 sm:inset-7 rounded-tl-full border border-black/15 pointer-events-none" />

                  {/* Classic Brass Door Handle */}
                  <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 flex items-center">
                    <div className="h-7 w-2 sm:h-9 sm:w-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFF8DC] to-[#AA771C] shadow-md border border-[#8B6508]" />
                  </div>
                </div>

                {/* RIGHT DOOR HALF */}
                <div
                  className="relative w-1/2 h-full rounded-tr-full bg-gradient-to-l from-[#620B1E] via-[#731024] to-[#801328] border-l border-[#FAF9F6]/25 shadow-2xl transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transformOrigin: "right center",
                    transform: isOpen
                      ? "perspective(1200px) rotateY(88deg) translateX(16%)"
                      : isHoveringDoor
                      ? "perspective(1200px) rotateY(12deg) translateX(2%)"
                      : "perspective(1200px) rotateY(0deg) translateX(0%)",
                    boxShadow: isOpen
                      ? "-10px 0 30px rgba(0,0,0,0.45)"
                      : "none",
                  }}
                >
                  {/* Carved Architectural Inner Panel Molding */}
                  <div className="absolute inset-3 sm:inset-4 rounded-tr-full border border-white/20 shadow-inner pointer-events-none" />
                  <div className="absolute inset-6 sm:inset-7 rounded-tr-full border border-black/15 pointer-events-none" />

                  {/* Classic Brass Door Handle */}
                  <div className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 flex items-center">
                    <div className="h-7 w-2 sm:h-9 sm:w-2.5 rounded-full bg-gradient-to-l from-[#D4AF37] via-[#FFF8DC] to-[#AA771C] shadow-md border border-[#8B6508]" />
                  </div>
                </div>
              </div>

              {/* Center Seam when Doors are Closed */}
              {!isOpen && !isHoveringDoor && (
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-white/20 pointer-events-none transition-opacity duration-300" />
              )}
            </div>
          </div>

          {/* ====================================================================
              RIGHT COLUMN: EDITORIAL "COME OVER" HEADLINE, METADATA & FORM
              ==================================================================== */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Top Tagline */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A10728] animate-pulse" />
              <span className="font-sans text-[10px] sm:text-xs font-bold text-[#A10728] tracking-[0.2em] uppercase">
                EDITORIAL ENQUIRIES // PRIVATE MANDATES
              </span>
            </div>

            {/* Big Editorial Headline matching Reference: "Come over" */}
            <h2 className="font-['Condor_Med_Cond',serif] text-5xl sm:text-6xl lg:text-7xl font-light text-[#012169] tracking-tight leading-none">
              Come <span className="font-bold text-[#A10728]">over</span>
            </h2>

            {/* Metadata 2-Column Grid matching Reference */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 my-5 sm:my-6 text-[#012169]">
              {/* Column 1: The House & Write */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#012169]/70">
                    THE HOUSE
                  </h3>
                  <p className="mt-1 font-sans text-xs sm:text-sm text-[#012169] font-medium leading-relaxed">
                    14 Linden Row, Level 42 Commercial Tower
                    <br />
                    Sydney CBD, NSW 2000
                  </p>
                </div>

                <div>
                  <h3 className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#012169]/70">
                    WRITE
                  </h3>
                  <a
                    href="mailto:contact@thepropertyfranchise.com"
                    className="mt-1 inline-block font-sans text-xs sm:text-sm font-semibold text-[#012169] underline decoration-[#012169]/30 hover:decoration-[#A10728] hover:text-[#A10728] transition-colors"
                  >
                    contact@thepropertyfranchise.com
                  </a>
                </div>
              </div>

              {/* Column 2: Hours & Call */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#012169]/70">
                    HOURS
                  </h3>
                  <p className="mt-1 font-sans text-xs sm:text-sm text-[#012169] font-medium leading-relaxed">
                    Mon–Fri 7:30–23:00
                    <br />
                    Sat–Sun 9:00–23:00
                  </p>
                </div>

                <div>
                  <h3 className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#012169]/70">
                    CALL
                  </h3>
                  <a
                    href="tel:+13108449200"
                    className="mt-1 inline-block font-sans text-xs sm:text-sm font-semibold text-[#012169] underline decoration-[#012169]/30 hover:decoration-[#A10728] hover:text-[#A10728] transition-colors"
                  >
                    +1 (310) 844-9200 / +44 20 0000 0000
                  </a>
                </div>
              </div>
            </div>

            {/* Elevated Form Container matching Reference Corner Styling */}
            <div className="relative rounded-tl-[3rem] sm:rounded-tl-[3.5rem] rounded-tr-2xl rounded-b-2xl border border-[#A10728]/15 bg-[#FAF3F0] p-5 sm:p-7 lg:p-8 shadow-sm text-[#012169]">
              {formSubmitted ? (
                <div className="py-8 sm:py-10 flex flex-col items-center text-center animate-in fade-in duration-300">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#A10728] text-white shadow-md">
                    <CheckCircle2 className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </div>
                  <h3 className="mt-4 text-xl sm:text-2xl font-['Condor_Med_Cond',sans-serif] font-bold text-[#012169]">
                    Enquiry Registered
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#012169]/80 max-w-md font-sans leading-relaxed">
                    Thank you for contacting The Property Franchise. A Senior Commercial Director will review your mandate and respond shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        interest: "Private Commercial Acquisition Mandate",
                        note: "",
                      });
                    }}
                    className="mt-6 rounded-full border border-[#012169]/20 bg-[#012169] px-6 py-2.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#FAF9F6] hover:bg-[#A10728] transition-colors cursor-pointer shadow-md"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Row 1: Your Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#A10728] mb-1">
                        YOUR NAME <span className="text-[#A10728]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full bg-transparent border-b border-[#012169]/25 pb-2 pt-1 font-sans text-xs sm:text-sm text-[#012169] placeholder-[#012169]/35 focus:outline-none focus:border-[#A10728] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#A10728] mb-1">
                        EMAIL <span className="text-[#A10728]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full bg-transparent border-b border-[#012169]/25 pb-2 pt-1 font-sans text-xs sm:text-sm text-[#012169] placeholder-[#012169]/35 focus:outline-none focus:border-[#A10728] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: I'd Like (Custom Dropdown) */}
                  <div>
                    <label className="block font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#A10728] mb-1">
                      I&apos;D LIKE
                    </label>
                    <div className="relative">
                      <select
                        value={formData.interest}
                        onChange={(e) =>
                          setFormData({ ...formData, interest: e.target.value })
                        }
                        className="w-full appearance-none bg-transparent border-b border-[#012169]/25 pb-2 pt-1 font-sans text-xs sm:text-sm text-[#012169] focus:outline-none focus:border-[#A10728] cursor-pointer pr-8"
                      >
                        <option className="bg-white text-[#012169]">
                          Private Commercial Acquisition Mandate
                        </option>
                        <option className="bg-white text-[#012169]">
                          Class-A Commercial Office Towers
                        </option>
                        <option className="bg-white text-[#012169]">
                          Corporate Business Campus Inquiry
                        </option>
                        <option className="bg-white text-[#012169]">
                          Industrial &amp; Logistics Hub Investment
                        </option>
                        <option className="bg-white text-[#012169]">
                          Franchise Territory Licensing
                        </option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-[#A10728]">
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: A Note */}
                  <div>
                    <label className="block font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#A10728] mb-1">
                      A NOTE
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Tell us about your mandate or acquisition parameters..."
                      value={formData.note}
                      onChange={(e) =>
                        setFormData({ ...formData, note: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-[#012169]/25 pb-2 pt-1 font-sans text-xs sm:text-sm text-[#012169] placeholder-[#012169]/35 focus:outline-none focus:border-[#A10728] transition-colors resize-none"
                    />
                  </div>

                  {/* Bottom Row: Pill Submit CTA matching Reference */}
                  <div className="pt-2 flex items-center justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-full bg-[#A10728] hover:bg-[#800D26] text-[#FAF9F6] px-7 py-3 font-sans text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2 group cursor-pointer active:scale-95 disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#FAF9F6] border-t-transparent" />
                          <span>SENDING...</span>
                        </span>
                      ) : (
                        <>
                          <span>SEND ENQUIRY</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
