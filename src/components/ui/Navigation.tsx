"use client";

import React, { useState } from "react";
import { scifiAudio } from "@/lib/audio";
import { Volume2, VolumeX, FastForward } from "lucide-react";

interface NavigationProps {
  onOpenVideo?: () => void;
  onSkipIntro?: () => void;
  showSkipIntro?: boolean;
}

export function Navigation({ onSkipIntro, showSkipIntro }: NavigationProps) {
  const [isAudioActive, setIsAudioActive] = useState(false);

  const handleAudioToggle = () => {
    const muted = scifiAudio.toggleMute();
    setIsAudioActive(!muted);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 sm:p-6 pointer-events-none">
      {/* Brand Monogram: The Property Franchise */}
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="pointer-events-auto flex items-center gap-3 group cursor-pointer rounded-full border border-[#38BDF8]/40 bg-[#0B254A]/90 px-3.5 py-1.5 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-[#38BDF8] hover:shadow-[0_4px_20px_rgba(56,189,248,0.25)]"
        title="Return to Bridge Command"
      >
        <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full overflow-hidden border border-[#38BDF8]/60 bg-[#EFF6FF] shadow-sm transition-transform duration-300 group-hover:scale-105">
          <img
            src="/tpf_logo.jpg"
            alt="The Property Franchise Emblem"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col pr-1">
          <span className="font-serif text-xs sm:text-sm font-extrabold tracking-widest text-[#EFF6FF] uppercase transition-colors group-hover:text-[#FFFFFF]">
            THE PROPERTY
          </span>
          <span className="font-mono text-[8px] sm:text-[9px] font-bold tracking-[0.22em] text-[#38BDF8] uppercase">
            FRANCHISE
          </span>
        </div>
      </a>

      {/* Right Controls: Skip Intro & Ambient Audio Toggle */}
      <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
        {showSkipIntro && onSkipIntro && (
          <button
            onClick={onSkipIntro}
            className="flex items-center gap-1.5 rounded-full border border-[#38BDF8]/40 bg-[#0B254A]/90 px-3.5 py-2 text-[11px] font-mono font-bold tracking-wider uppercase text-[#EFF6FF] backdrop-blur-md hover:bg-[#0D7CD6] hover:border-[#38BDF8] transition-all shadow-md cursor-pointer"
            title="Skip Opening Spaceship Descent to Bridge"
          >
            <span>Skip Intro</span>
            <FastForward className="h-3.5 w-3.5" />
          </button>
        )}

        <button
          onClick={handleAudioToggle}
          className={`flex items-center gap-2 rounded-full border px-3.5 sm:px-4 py-2 text-xs font-mono backdrop-blur-md transition-all duration-200 cursor-pointer shadow-md ${
            isAudioActive
              ? "border-[#38BDF8] bg-[#0D7CD6] text-[#FFFFFF] shadow-[0_2px_14px_rgba(56,189,248,0.45)]"
              : "border-[#38BDF8]/40 bg-[#0B254A]/90 text-[#EFF6FF]/90 hover:border-[#38BDF8] hover:text-[#FFFFFF]"
          }`}
          title="Toggle Ambient Audio"
        >
          {isAudioActive ? (
            <>
              <Volume2 className="h-3.5 w-3.5 text-[#FFFFFF]" />
              <span className="hidden sm:inline font-bold">AUDIO ON</span>
            </>
          ) : (
            <>
              <VolumeX className="h-3.5 w-3.5 text-[#EFF6FF]/70" />
              <span className="hidden sm:inline">AUDIO MUTED</span>
            </>
          )}
        </button>
      </div>
    </nav>
  );
}
