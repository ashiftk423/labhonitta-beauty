"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ThreeErrorBoundary from "./three/ThreeErrorBoundary";

/**
 * Loads the heavy WebGL scene only on the client, after hydration, so the
 * first paint stays instant and SSR never touches three.js. It also checks
 * that WebGL is actually available (and the tab is visible) before mounting,
 * and wraps everything in an error boundary so a GPU failure can never blank
 * the page — the body's CSS gradient remains as a graceful fallback.
 */
const Scene = dynamic(() => import("./three/Scene"), { ssr: false });

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export default function BackgroundCanvas() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (hasWebGL()) setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <ThreeErrorBoundary>
      <Scene />
    </ThreeErrorBoundary>
  );
}
