"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Spaceship } from "./Spaceship";
import { ControlBridge } from "./ControlBridge";
import { AlienCharacters } from "./AlienCharacters";
import { EnvironmentEffects } from "./EnvironmentEffects";

interface SceneCanvasProps {
  scrollProgress: number; // 0 to 1
  onMainCharacterClick?: () => void;
  onReelsClick?: () => void;
  onPlanetsClick?: () => void;
  onThirdCharacterClick?: () => void;
}

// Camera controller choreographing the flight from deep space into the control bridge
function CameraRig({ progress }: { progress: number }) {
  const targetLook = useRef(new THREE.Vector3(0, 1.2, 0));

  useFrame((state) => {
    let camY: number;
    let camZ: number;
    let lookY: number;
    let lookZ: number;

    const aspect = state.viewport.aspect;

    // Responsive distance and height adjustments
    // On narrow viewports (portrait mobile / tablet), gently pull camera back
    // so all 5 characters are framed safely within screen boundaries with zero clipping
    const distanceBoost = aspect < 1.35 ? (1.35 - aspect) * 2.8 : 0;
    const yBoost = aspect < 1.35 ? (1.35 - aspect) * 0.32 : 0;

    if (progress < 0.35) {
      // Stage 1: Deep space cruise (progress 0 to 0.35)
      const t = progress / 0.35;
      camY = THREE.MathUtils.lerp(3.8, 2.6, t);
      camZ = THREE.MathUtils.lerp(13.5, 8.5, t);
      lookY = THREE.MathUtils.lerp(1.5, 1.2, t);
      lookZ = THREE.MathUtils.lerp(-3.0, 0, t);
    } else if (progress < 0.65) {
      // Stage 2: Approaching and entering cockpit canopy (progress 0.35 to 0.65)
      const t = (progress - 0.35) / 0.3;
      camY = THREE.MathUtils.lerp(2.6, 1.45 + yBoost, t);
      camZ = THREE.MathUtils.lerp(8.5, 4.8 + distanceBoost, t);
      lookY = THREE.MathUtils.lerp(1.2, 0.85, t);
      lookZ = 0;
    } else {
      // Stage 3: Inside Control Bridge command deck (progress 0.65 to 1.0)
      const t = (progress - 0.65) / 0.35;
      camY = THREE.MathUtils.lerp(1.45 + yBoost, 1.00 + yBoost, t);
      camZ = 4.85 + distanceBoost;
      lookY = THREE.MathUtils.lerp(0.85, 0.72, t);
      lookZ = 0.45;
    }

    // Subtle parallax response to pointer, dampened on narrow mobile viewports
    // to prevent edge characters from being pushed outside the screen frame
    const maxParallax = Math.min(0.18, 0.25 * aspect);
    const mouseX = state.pointer.x * maxParallax;
    const mouseY = state.pointer.y * (maxParallax * 0.45);

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouseX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, camY + mouseY, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, camZ, 0.05);

    targetLook.current.x = THREE.MathUtils.lerp(targetLook.current.x, mouseX * 0.15, 0.05);
    targetLook.current.y = THREE.MathUtils.lerp(targetLook.current.y, lookY, 0.05);
    targetLook.current.z = THREE.MathUtils.lerp(targetLook.current.z, lookZ, 0.05);

    state.camera.lookAt(targetLook.current);
  });

  return null;
}

export function SceneCanvas({
  scrollProgress,
  onMainCharacterClick,
  onReelsClick,
  onPlanetsClick,
  onThirdCharacterClick,
}: SceneCanvasProps) {
  return (
    <div className="fixed inset-0 z-0 h-screen w-screen overflow-hidden bg-[#0A1628]">
      <Canvas
        shadows
        dpr={[1, 1.8]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 3.8, 13.5], fov: 46, near: 0.1, far: 450 }}
      >
        {/* FF Cinematic Cerulean Space Background matching poster palette */}
        <color attach="background" args={["#0C2B3E"]} />
        <fog attach="fog" args={["#0C2B3E", 20, 110]} />

        {/* Ambient Cosmic Lighting in Deep FF Cerulean */}
        <ambientLight intensity={0.7} color="#16536C" />

        {/* Key Directional Rim Light in Cool Blue-White */}
        <directionalLight
          position={[12, 16, 9]}
          intensity={2.5}
          color="#C5E4F7"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* Starboard Accent Light in FF Blue */}
        <directionalLight
          position={[-14, 8, -5]}
          intensity={1.6}
          color="#1E6BB8"
        />

        {/* Front Bridge Fill Light in FF White */}
        <directionalLight
          position={[0, 4, 8]}
          intensity={1.1}
          color="#EFF6FF"
        />

        <Suspense fallback={null}>
          <CameraRig progress={scrollProgress} />
          <EnvironmentEffects flightProgress={scrollProgress} />
          <Spaceship progress={scrollProgress} />
          <ControlBridge progress={scrollProgress} />
          <AlienCharacters
            progress={scrollProgress}
            onMainCharacterClick={onMainCharacterClick}
            onReelsClick={onReelsClick}
            onPlanetsClick={onPlanetsClick}
            onThirdCharacterClick={onThirdCharacterClick}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
