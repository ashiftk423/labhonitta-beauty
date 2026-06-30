"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import type { RootState } from "@react-three/fiber";
import GoldenDust from "./GoldenDust";
import FloatingOrbs from "./FloatingOrbs";

/**
 * Fixed full-screen WebGL backdrop. The canvas is fully transparent so the
 * plum CSS gradient on <body> always shows through — never a white flash.
 *
 * We skip @react-three/postprocessing (crashes) and skip drei's Environment
 * (loads a heavy HDR skybox that can paint the canvas opaque / exhaust GPU
 * contexts). Lights + metallic orbs + particles are enough for the glow.
 */
export default function Scene() {
  const [visible, setVisible] = useState(true);
  const [alive, setAlive] = useState(true);

  useEffect(() => {
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const handleCreated = ({ gl }: RootState) => {
    // Transparent clear — body gradient shows through, never white.
    gl.setClearColor(0x000000, 0);

    const canvas = gl.domElement;
    canvas.style.background = "transparent";

    canvas.addEventListener(
      "webglcontextlost",
      (e) => {
        e.preventDefault();
        setAlive(false);
      },
      false
    );
    canvas.addEventListener("webglcontextrestored", () => setAlive(true), false);
  };

  if (!alive) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 bg-transparent">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        frameloop={visible ? "always" : "never"}
        gl={{
          antialias: true,
          alpha: true,
          premultipliedAlpha: false,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={handleCreated}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 5, 5]} intensity={2} color="#ffe9c7" />
        <pointLight position={[-5, -3, 2]} intensity={28} color="#e8a6b8" />
        <pointLight position={[4, 2, 3]} intensity={18} color="#f6e3b8" />

        <FloatingOrbs />
        <GoldenDust count={900} />
      </Canvas>
    </div>
  );
}
