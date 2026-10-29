"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navigation } from "./ui/Navigation";
import { RealEstateIntroVideo } from "./ui/RealEstateIntroVideo";
import { RealEstateReelsSection } from "./ui/RealEstateReelsSection";
import { ScrollHorizontalGallery } from "./ui/ScrollHorizontalGallery";
import { FranchiseMiniGame } from "./ui/FranchiseMiniGame";
import { ContactSection } from "./ui/ContactSection";
import { Footer } from "./ui/Footer";
import { scifiAudio } from "@/lib/audio";

// Dynamically import SceneCanvas with SSR disabled for safe WebGL initialization
const SceneCanvas = dynamic(
  () => import("./3d/SceneCanvas").then((mod) => mod.SceneCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-0 flex items-center justify-center bg-[#071927] text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#38BDF8] border-t-transparent" />
          <span className="font-mono text-xs tracking-widest uppercase text-[#BAE6FD]">
            Initializing Spaceship Flight & Control Bridge...
          </span>
        </div>
      </div>
    ),
  }
);

export function LandingExperience() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Create ScrollTrigger on the 3D scroll container
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6, // Smooth scrubbing
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      trigger.kill();
    };
  }, []);

  // Captain click -> Open website introduction video popup
  const handleMainCharacterClick = () => {
    scifiAudio.playHoloBeep(920, 0.12);
    setIsVideoOpen(true);
  };

  // Character 1 click -> Archive / Memory Reels
  const handleReelsClick = () => {
    scifiAudio.playHoloBeep(920, 0.12);
    const reelsElement = document.getElementById("real-estate-reels");
    if (reelsElement) {
      reelsElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Character 2 click -> Scroll-Linked Horizontal Showcase Gallery
  const handlePlanetsClick = () => {
    scifiAudio.playHoloBeep(1000, 0.12);
    const targetElement = document.getElementById("horizontal-gallery");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Character 3 click -> Contact details / enquiries
  const handleThirdCharacterClick = () => {
    scifiAudio.playHoloBeep(1050, 0.12);
    const contactElement = document.getElementById("contact-us");
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Skip Intro Option
  const handleSkipIntro = () => {
    scifiAudio.playHoloBeep(950, 0.1);
    if (containerRef.current) {
      const targetScroll = containerRef.current.offsetTop + containerRef.current.offsetHeight * 0.72;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#2285A8] text-[#FFFFFF] selection:bg-[#38BDF8] selection:text-[#082230]">
      {/* Global Navigation Bar */}
      <Navigation
        onOpenVideo={() => setIsVideoOpen(true)}
        onSkipIntro={handleSkipIntro}
        showSkipIntro={scrollProgress < 0.65}
      />

      {/* Control Bridge Interactive HUD Guide (active when inside bridge) */}
      {scrollProgress >= 0.65 && scrollProgress <= 0.98 && (
        <div
          style={{ opacity: Math.min(1, (scrollProgress - 0.65) * 4) }}
          className="fixed bottom-6 sm:bottom-10 left-0 right-0 z-10 pointer-events-none flex justify-center px-4 transition-opacity duration-300"
        >
          <div className="rounded-full border border-[#38BDF8]/50 bg-[#0B254A]/90 px-4 sm:px-6 py-2 sm:py-2.5 backdrop-blur-md shadow-[0_8px_32px_rgba(14,116,144,0.4)] flex items-center gap-2.5 font-mono text-[10px] sm:text-xs text-[#EFF6FF] max-w-[94vw] sm:max-w-none text-center">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#38BDF8] animate-ping" />
            <span className="font-bold tracking-wider truncate sm:whitespace-normal">
              FANTASTIC FOUR COMMAND BRIDGE — CLICK MR. FANTASTIC FOR INTRO • CREW FOR REELS, SHOWCASE & ENQUIRIES ↓
            </span>
          </div>
        </div>
      )}

      {/* 3D Scene Background (fixed full-screen during scroll sequence) */}
      <SceneCanvas
        scrollProgress={scrollProgress}
        onMainCharacterClick={handleMainCharacterClick}
        onReelsClick={handleReelsClick}
        onPlanetsClick={handlePlanetsClick}
        onThirdCharacterClick={handleThirdCharacterClick}
      />

      {/* Scroll Container for 3D spaceship journey and bridge entry */}
      <div id="hero" ref={containerRef} className="relative h-[480vh] pointer-events-none" />

      {/* 1. Archive / Memory Reels Section (Character 1) */}
      <RealEstateReelsSection />

      {/* 2. Scroll-Linked Horizontal Showcase Gallery (Character 2) */}
      <ScrollHorizontalGallery />

      {/* 3. Mini Game to Join Franchise */}
      <FranchiseMiniGame />

      {/* 5. Contact Details & Commercial Franchise Enquiries (Character 3) */}
      <ContactSection onOpenVideo={() => setIsVideoOpen(true)} />

      {/* Corporate Footer */}
      <Footer />

      {/* Full-Screen Website Intro Video Modal (Triggered by Captain) */}
      <RealEstateIntroVideo
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        companyName="THE PROPERTY FRANCHISE"
        tagline="COMMERCIAL REAL ESTATE FRANCHISE NETWORK & GLOBAL TERRITORIES"
      />
    </div>
  );
}
