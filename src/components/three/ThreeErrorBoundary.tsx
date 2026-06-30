"use client";

import { Component, type ReactNode } from "react";

/**
 * If the WebGL scene throws (lost context, exhausted GPU contexts, driver
 * issues, etc.) we render nothing instead of crashing the whole page. The
 * body's CSS gradient backdrop keeps the design intact.
 */
export default class ThreeErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    // Swallow — the CSS backdrop is a graceful fallback.
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}
