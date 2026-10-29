"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Rocket,
  Trophy,
  ArrowRight,
  RotateCcw,
  Play,
  Building2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { scifiAudio } from "@/lib/audio";

interface Item {
  id: number;
  lane: number; // 0, 1, or 2
  y: number; // 0 to 100%
  type: "tower" | "logistics" | "retail" | "obstacle";
  value: number;
}

export function FranchiseMiniGame() {
  const [gameState, setGameState] = useState<"start" | "playing" | "won">("start");
  const [playerLane, setPlayerLane] = useState(1); // 0 (left), 1 (center), 2 (right)
  const [score, setScore] = useState(0);
  const targetScore = 800; // Target capital to unlock accreditation
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const [items, setItems] = useState<Item[]>([]);
  const nextId = useRef(1);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const startGame = () => {
    scifiAudio.playHoloBeep(920, 0.1);
    setScore(0);
    setPlayerLane(1);
    setItems([
      { id: 1, lane: 0, y: 15, type: "tower", value: 150 },
      { id: 2, lane: 1, y: 45, type: "logistics", value: 150 },
      { id: 3, lane: 2, y: 75, type: "retail", value: 150 },
    ]);
    nextId.current = 4;
    setGameState("playing");
  };

  const moveLeft = useCallback(() => {
    scifiAudio.playHoloBeep(800, 0.04);
    setPlayerLane((prev) => Math.max(0, prev - 1));
  }, []);

  const moveRight = useCallback(() => {
    scifiAudio.playHoloBeep(800, 0.04);
    setPlayerLane((prev) => Math.min(2, prev + 1));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (gameState !== "playing") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        e.preventDefault();
        moveLeft();
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        e.preventDefault();
        moveRight();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, moveLeft, moveRight]);

  // Main game tick loop
  useEffect(() => {
    if (gameState !== "playing") return;

    const interval = setInterval(() => {
      setItems((prevItems) => {
        const speed = 2.4;
        let newScore = score;
        let hitAccreditation = false;

        const updated = prevItems
          .map((item) => {
            const nextY = item.y + speed;

            // Check collision with player shuttle (around y: 80-92%)
            if (nextY >= 80 && nextY <= 92 && item.lane === playerLane) {
              if (item.type !== "obstacle") {
                scifiAudio.playHoloBeep(1100 + item.value, 0.08);
                newScore += item.value;
                if (newScore >= targetScore) {
                  hitAccreditation = true;
                }
              }
              return null;
            }

            if (nextY > 105) return null;
            return { ...item, y: nextY };
          })
          .filter(Boolean) as Item[];

        if (hitAccreditation) {
          scifiAudio.playHoloBeep(1400, 0.25);
          setScore(newScore);
          setGameState("won");
          return [];
        }

        if (newScore !== score) {
          setScore(newScore);
        }

        // Periodically spawn new commercial property opportunities
        if (Math.random() < 0.12 && updated.length < 5) {
          const lane = Math.floor(Math.random() * 3);
          const types: Array<"tower" | "logistics" | "retail"> = [
            "tower",
            "logistics",
            "retail",
          ];
          const chosenType = types[Math.floor(Math.random() * types.length)];
          updated.push({
            id: nextId.current++,
            lane,
            y: -5,
            type: chosenType,
            value: chosenType === "tower" ? 200 : 150,
          });
        }

        return updated;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [gameState, playerLane, score, targetScore]);

  const handleScrollToContact = () => {
    scifiAudio.playHoloBeep(980, 0.08);
    const elem = document.getElementById("contact-us");
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToPlanets = () => {
    scifiAudio.playHoloBeep(980, 0.08);
    const elem = document.getElementById("franchise-planets");
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="franchise-game"
      className="relative z-20 bg-[#2285A8] px-6 py-20 text-white selection:bg-[#38BDF8] selection:text-[#082230] border-t border-[#38BDF8]/30 overflow-hidden"
    >
      <div className="mx-auto max-w-4xl">
        {/* Title Header with smooth reveal */}
        <div
          style={{
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            opacity: isVisible ? 1 : 0,
            transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-out",
          }}
          className="flex flex-col items-center text-center mb-8 will-change-transform"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold uppercase tracking-wider text-white text-center max-w-2xl mx-auto px-4">
            FRANCHISE STAR ROUTE NAVIGATOR
          </h2>
        </div>

        {/* Game Console Frame in Fantastic Four Space Navy */}
        <div
          style={{
            transform: isVisible ? "scale(1) translateY(0)" : "scale(0.96) translateY(24px)",
            opacity: isVisible ? 1 : 0,
            transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 150ms, opacity 0.8s ease-out 150ms",
          }}
          className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-[#38BDF8]/40 bg-gradient-to-b from-[#0B254A] via-[#0E3354] to-[#082238] p-6 shadow-2xl backdrop-blur-xl text-white will-change-transform"
        >
          {/* Top Telemetry Bar */}
          <div className="flex items-center justify-between border-b border-[#38BDF8]/25 pb-4 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#38BDF8] animate-pulse" />
              <span className="font-bold text-[#E0F2FE]">PORTFOLIO CAPITAL:</span>
              <span className="font-black text-white bg-[#0D7CD6] px-2 py-0.5 rounded shadow-[0_0_10px_#38BDF8]">
                ${score.toLocaleString()},000
              </span>
            </div>
            <div className="text-[11px] text-[#BAE6FD]">
              TARGET: ${targetScore.toLocaleString()},000
            </div>
          </div>

          {/* ========================================================
              SCREEN 1: START SCREEN
             ======================================================== */}
          {gameState === "start" && (
            <div className="py-14 sm:py-16 flex flex-col items-center text-center animate-in fade-in duration-300">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#38BDF8]/40 bg-[#0B254A] text-white shadow-xl">
                <Rocket className="h-8 w-8 text-[#38BDF8]" />
              </div>
              <h3 className="mt-5 text-xl sm:text-2xl font-serif font-black text-white">
                READY FOR FRANCHISE FLIGHT?
              </h3>
              <p className="mt-2 max-w-md text-xs sm:text-sm text-[#E0F2FE] font-sans leading-relaxed">
                Use your keyboard arrow keys or touch buttons to collect commercial office towers and logistics parks. Reach $800,000 in portfolio assets to qualify.
              </p>
              <button
                onClick={startGame}
                className="mt-6 flex items-center gap-2 rounded-xl bg-white hover:bg-[#E0F2FE] text-[#0B254A] px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-wider shadow-lg transition-transform hover:scale-105 cursor-pointer"
              >
                <Play className="h-4 w-4 fill-current text-[#0D7CD6]" />
                <span>Launch Franchise Flight</span>
              </button>
            </div>
          )}

          {/* ========================================================
              SCREEN 2: ACTIVE GAMEPLAY CANVAS
             ======================================================== */}
          {gameState === "playing" && (
            <div className="relative h-[340px] sm:h-[380px] w-full overflow-hidden rounded-2xl bg-[#082033] mt-4 border border-[#38BDF8]/30 select-none">
              {/* Star Background Grid */}
              <div className="absolute inset-0 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />

              {/* 3 Corridor Lanes */}
              <div className="absolute inset-0 grid grid-cols-3 divide-x divide-[#38BDF8]/20 pointer-events-none" />

              {/* Falling Commercial Assets */}
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    left: `${item.lane * 33.33 + 16.66}%`,
                    top: `${item.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  className="absolute z-10 flex flex-col items-center transition-all duration-75"
                >
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-[#38BDF8]/40 bg-[#0B254A] text-white shadow-md">
                    <Building2 className="h-5 w-5 text-[#38BDF8]" />
                  </div>
                  <span className="mt-1 rounded bg-[#0D7CD6] px-1 py-0.2 font-mono text-[9px] font-bold text-white shadow-sm">
                    +${item.value}K
                  </span>
                </div>
              ))}

              {/* Player Commercial Shuttle */}
              <div
                style={{
                  left: `${playerLane * 33.33 + 16.66}%`,
                  bottom: "16px",
                  transform: "translateX(-50%)",
                }}
                className="absolute z-20 flex flex-col items-center transition-all duration-150"
              >
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border-2 border-white bg-[#0D7CD6] text-white shadow-[0_0_20px_#38BDF8]">
                  <Rocket className="h-6 w-6 text-white -rotate-45" />
                </div>
                <div className="h-2 w-4 bg-[#38BDF8] rounded-full blur-[2px] animate-pulse mt-0.5" />
              </div>

              {/* On-screen Mobile / Click Navigation Controls */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-30 pointer-events-auto">
                <button
                  onClick={moveLeft}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#38BDF8]/30 bg-[#0B254A] text-white active:scale-95 backdrop-blur-md cursor-pointer hover:bg-[#0D7CD6] transition-colors shadow-sm"
                  aria-label="Move Left"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <span className="font-mono text-[10px] text-[#BAE6FD] hidden sm:inline">
                  USE [ ← ] [ → ] KEYS OR BUTTONS TO STEER
                </span>
                <button
                  onClick={moveRight}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#38BDF8]/30 bg-[#0B254A] text-white active:scale-95 backdrop-blur-md cursor-pointer hover:bg-[#0D7CD6] transition-colors shadow-sm"
                  aria-label="Move Right"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              SCREEN 3: VICTORY / COMPLETION STATE WITH CALL TO ACTION
             ======================================================== */}
          {gameState === "won" && (
            <div className="py-10 sm:py-12 flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white bg-[#0D7CD6] text-white shadow-[0_0_30px_#38BDF8]">
                <Trophy className="h-8 w-8 text-[#FFD700]" />
              </div>
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#38BDF8]/40 bg-[#0B254A] px-3 py-1 font-mono text-[10px] font-bold text-white shadow-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-[#38BDF8]" />
                <span>FRANCHISE ACCREDITATION UNLOCKED</span>
              </div>
              <h3 className="mt-3 text-2xl sm:text-3xl font-serif font-black text-white">
                CONGRATULATIONS, CAPTAIN
              </h3>
              <p className="mt-2 max-w-md text-xs sm:text-sm text-[#E0F2FE] font-sans leading-relaxed">
                You have demonstrated the strategic acumen to navigate and scale commercial real estate assets. Your territory accreditation is verified.
              </p>

              {/* Action Buttons to Connect to Business Objectives */}
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
                <button
                  onClick={handleScrollToContact}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-[#E0F2FE] text-[#0B254A] py-3.5 font-mono text-xs font-bold uppercase tracking-wider shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <span>Enquire About Joining</span>
                  <ArrowRight className="h-4 w-4 text-[#0D7CD6]" />
                </button>
                <button
                  onClick={handleScrollToPlanets}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0B254A] hover:bg-[#0E3354] text-white py-3.5 font-mono text-xs font-bold uppercase tracking-wider border border-[#38BDF8]/40 transition-colors cursor-pointer"
                >
                  <span>Explore Showcase</span>
                  <Sparkles className="h-4 w-4 text-[#38BDF8]" />
                </button>
              </div>

              <button
                onClick={startGame}
                className="mt-4 flex items-center gap-1.5 font-mono text-[11px] text-[#BAE6FD] hover:text-white transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Replay Simulator Flight</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
