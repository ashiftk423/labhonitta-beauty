"use client";

import dynamic from "next/dynamic";

/**
 * Loads the heavy WebGL scene only on the client, after hydration, so the
 * first paint stays instant and SSR never touches three.js.
 */
const Scene = dynamic(() => import("./three/Scene"), { ssr: false });

export default function BackgroundCanvas() {
  return <Scene />;
}
