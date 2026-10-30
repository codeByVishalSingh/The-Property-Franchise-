"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "./ui/Navigation";
import { RealEstateIntroVideo } from "./ui/RealEstateIntroVideo";
import { RealEstateReelsSection } from "./ui/RealEstateReelsSection";
import { WebsiteDetailsSection } from "./ui/WebsiteDetailsSection";
import { FranchiseMiniGame } from "./ui/FranchiseMiniGame";
import { ContactSection } from "./ui/ContactSection";
import { Footer } from "./ui/Footer";
import { scifiAudio } from "@/lib/audio";
import { X, Sparkles } from "lucide-react";

// Dynamically import SceneCanvas with SSR disabled for safe WebGL initialization
const SceneCanvas = dynamic(
  () => import("./3d/SceneCanvas").then((mod) => mod.SceneCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-0 flex items-center justify-center bg-[#0E1B33] text-[#FAF9F6]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#A10728] border-t-transparent" />
          <span className="font-mono text-xs tracking-widest uppercase text-[#FAF9F6]/80">
            Initializing Spaceship Flight & Control Bridge...
          </span>
        </div>
      </div>
    ),
  }
);

type ActiveModal = "none" | "reels" | "details" | "contact";

export function LandingExperience() {
  const [activeModal, setActiveModal] = useState<ActiveModal>("none");
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const modalScrollRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut: Escape smoothly dismisses any open modal or video
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        scifiAudio.playHoloBeep(720, 0.06);
        setActiveModal("none");
        setIsVideoOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Character 1 (Sue Storm) click -> Commercial Archives & Reels
  const handleReelsClick = () => {
    scifiAudio.playHoloBeep(920, 0.12);
    setActiveModal("reels");
  };

  // Character 2 (Reed Richards) click -> Website Introduction Video
  const handleMainCharacterClick = () => {
    scifiAudio.playHoloBeep(920, 0.12);
    setIsVideoOpen(true);
  };

  // Character 3 (Johnny Storm) click -> Commercial Showcase & Details
  const handlePlanetsClick = () => {
    scifiAudio.playHoloBeep(1000, 0.12);
    setActiveModal("details");
  };

  // Character 4 (Ben Grimm) click -> Contact & Franchise Consultations
  const handleThirdCharacterClick = () => {
    scifiAudio.playHoloBeep(1050, 0.12);
    setActiveModal("contact");
  };

  const handleCloseModal = () => {
    scifiAudio.playHoloBeep(750, 0.08);
    setActiveModal("none");
  };

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-[#FCF8F3] text-[#012169] selection:bg-[#A10728] selection:text-[#FCF8F3]">
      {/* Global Navigation Bar */}
      <Navigation
        onOpenVideo={() => setIsVideoOpen(true)}
        onReset={handleCloseModal}
      />

      {/* 3D Scene Background (Fixed full-screen Control Bridge view with cinematic depth-of-field) */}
      <SceneCanvas
        scrollProgress={1.0}
        onMainCharacterClick={handleMainCharacterClick}
        onReelsClick={handleReelsClick}
        onPlanetsClick={handlePlanetsClick}
        onThirdCharacterClick={handleThirdCharacterClick}
        isDimmed={activeModal !== "none" || isVideoOpen}
      />

      {/* Cinematic Modal Transition for Character Sections */}
      <AnimatePresence mode="wait">
        {activeModal !== "none" && (
          <motion.div
            key={activeModal}
            ref={modalScrollRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-[#012169]/50 backdrop-blur-md selection:bg-[#A10728] selection:text-[#FAF9F6]"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Card with Natural Floating Entrance */}
            <motion.div
              initial={{ opacity: 0, y: 36, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.985 }}
              transition={{
                duration: 0.42,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative min-h-screen bg-[#FCF8F3] text-[#012169] shadow-2xl flex flex-col justify-between"
            >
              {/* Sticky Top Header Bar */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="sticky top-0 z-50 flex items-center justify-between border-b border-[#012169]/10 bg-[#FCF8F3]/95 px-4 sm:px-8 py-3.5 backdrop-blur-md shadow-sm"
              >
                {/* Active Section Identity */}
                <div className="flex items-center">
                  <span className="font-serif text-sm sm:text-base font-extrabold uppercase tracking-wider text-[#012169]">
                    {activeModal === "reels" && <>Commercial Archives <span className="text-[#A10728]">&</span> Video Reels</>}
                    {activeModal === "details" && <>Commercial Services <span className="text-[#A10728]">&</span> Trophy Showcase</>}
                    {activeModal === "contact" && <>Commercial Franchise Enquiries <span className="text-[#A10728]">&</span> Consultations</>}
                  </span>
                </div>

                {/* Close / Return Button */}
                <button
                  onClick={handleCloseModal}
                  className="flex items-center gap-2 rounded-full border border-[#012169]/20 bg-[#012169] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#FAF9F6] shadow-md transition-all hover:bg-[#A10728] hover:border-[#A10728] hover:scale-105 active:scale-95 cursor-pointer"
                  title="Return to 3D Bridge Command (ESC)"
                >
                  <span>Return to Bridge</span>
                  <X className="h-4 w-4" />
                </button>
              </motion.div>

              {/* Dynamic Content Views */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1"
              >
                {/* 1. Reels View (Sue Storm) */}
                {activeModal === "reels" && <RealEstateReelsSection />}

                {/* 2. Details & Showcase View (Johnny Storm) */}
                {activeModal === "details" && (
                  <>
                    <WebsiteDetailsSection scrollContainerRef={modalScrollRef} />
                    <FranchiseMiniGame />
                  </>
                )}

                {/* 3. Contact View (Ben Grimm) */}
                {activeModal === "contact" && (
                  <ContactSection onOpenVideo={() => setIsVideoOpen(true)} />
                )}
              </motion.div>

              {/* Corporate Footer */}
              <Footer />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-Screen Website Intro Video Modal (Triggered by Reed Richards) */}
      <RealEstateIntroVideo
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        companyName="THE PROPERTY FRANCHISE"
        tagline="COMMERCIAL REAL ESTATE FRANCHISE NETWORK & GLOBAL TERRITORIES"
      />
    </div>
  );
}
