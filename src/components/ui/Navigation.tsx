"use client";

import React from "react";

interface NavigationProps {
  onOpenVideo?: () => void;
  onReset?: () => void;
}

export function Navigation({ onReset }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 sm:p-6 pointer-events-none">
      {/* Brand Monogram: The Property Franchise */}
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          onReset?.();
        }}
        className="pointer-events-auto flex items-center gap-3 group cursor-pointer rounded-full border border-[#012169]/20 bg-[#FCF8F3]/95 px-3.5 py-1.5 backdrop-blur-md shadow-md transition-all duration-300 hover:border-[#A10728] hover:shadow-[0_4px_20px_rgba(161,7,40,0.2)]"
        title="Return to Bridge Command"
      >
        <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full overflow-hidden border border-[#A10728]/50 bg-[#012169] shadow-sm transition-transform duration-300 group-hover:scale-105">
          <img
            src="/tpf_logo.jpg"
            alt="The Property Franchise Emblem"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col pr-1">
          <span className="font-serif text-xs sm:text-sm font-extrabold tracking-widest text-[#012169] uppercase transition-colors group-hover:text-[#A10728]">
            THE PROPERTY
          </span>
          <span className="font-mono text-[8px] sm:text-[9px] font-bold tracking-[0.22em] text-[#A10728] uppercase">
            FRANCHISE
          </span>
        </div>
      </a>
    </nav>
  );
}
