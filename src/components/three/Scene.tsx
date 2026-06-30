"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import GoldenDust from "./GoldenDust";
import FloatingOrbs from "./FloatingOrbs";

/**
 * Fixed full-screen WebGL backdrop. Lives behind all content (z-0) and is
 * pointer-events-none so the page stays fully interactive.
 */
export default function Scene() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={2.2} color="#ffe9c7" />
        <pointLight position={[-5, -3, 2]} intensity={30} color="#e8a6b8" />

        <FloatingOrbs />
        <GoldenDust />

        <Environment preset="sunset" />

        <EffectComposer>
          <Bloom
            intensity={0.9}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.25} darkness={0.85} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
