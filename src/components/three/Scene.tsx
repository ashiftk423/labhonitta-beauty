"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import type { RootState } from "@react-three/fiber";
import { useTheme } from "@/lib/theme";
import GoldenDust from "./GoldenDust";
import FloatingOrbs from "./FloatingOrbs";

/**
 * Fixed full-screen WebGL backdrop. Transparent clear so body gradient shows.
 * Orbs stay visible; page copy sits above via main z-10.
 */
export default function Scene() {
  const { theme } = useTheme();
  const light = theme === "light";
  const [visible, setVisible] = useState(true);
  const [alive, setAlive] = useState(true);

  useEffect(() => {
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const handleCreated = ({ gl }: RootState) => {
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
        <ambientLight intensity={light ? 1.35 : 0.7} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={light ? 3.2 : 2.2}
          color="#fff6ec"
        />
        <directionalLight
          position={[-4, 2, 4]}
          intensity={light ? 1.4 : 0}
          color="#f7e2e0"
        />
        <pointLight
          position={[-5, -3, 2]}
          intensity={light ? 48 : 30}
          color={light ? "#e8c3c8" : "#c4707f"}
        />
        <pointLight
          position={[4, 2, 3]}
          intensity={light ? 44 : 24}
          color={light ? "#f0d3b4" : "#dfc9ae"}
        />

        <FloatingOrbs />
        <GoldenDust count={900} />
      </Canvas>
    </div>
  );
}
