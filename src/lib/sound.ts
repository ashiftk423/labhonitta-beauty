"use client";

/**
 * Procedural sound engine built on the Web Audio API — no audio files needed.
 * Only plays short wheel-spin ticks on the makeover dials. No ambient loop.
 *
 * Browsers block autoplay, so audio only starts after the user enables it via
 * the floating SoundToggle. Audio suspends while the tab is hidden/minimized.
 */

type Listener = (state: { enabled: boolean; muted: boolean }) => void;

const STORAGE_KEY = "labhonitta-sound";

class SoundEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private listeners = new Set<Listener>();
  private tabVisible = true;

  enabled = false; // user has switched sound on at least once
  muted = true; // current mute state

  constructor() {
    if (typeof window === "undefined") return;

    const saved = window.localStorage.getItem(STORAGE_KEY);
    // Default to muted; only auto-enable if the user previously turned it on.
    if (saved === "on") this.muted = false;

    this.tabVisible = !document.hidden;
    document.addEventListener("visibilitychange", () => {
      this.tabVisible = !document.hidden;
      if (document.hidden) this.suspend();
      else if (!this.muted) void this.resume();
    });

    window.addEventListener("pagehide", () => this.suspend());
  }

  subscribe(fn: Listener) {
    this.listeners.add(fn);
    fn(this.snapshot());
    return () => {
      this.listeners.delete(fn);
    };
  }

  private snapshot() {
    return { enabled: this.enabled, muted: this.muted };
  }

  private emit() {
    const s = this.snapshot();
    this.listeners.forEach((l) => l(s));
  }

  /** Lazily create the AudioContext (must be triggered by a user gesture). */
  private ensure() {
    if (this.ctx) return this.ctx;
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return null;

    const ctx = new Ctx();
    const master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(ctx.destination);

    this.ctx = ctx;
    this.master = master;
    return ctx;
  }

  private get on() {
    return (
      !this.muted &&
      this.tabVisible &&
      this.ctx !== null &&
      this.master !== null
    );
  }

  private suspend() {
    this.fadeMaster(0.0001, 0.12);
    void this.ctx?.suspend();
  }

  private async resume() {
    const ctx = this.ensure();
    if (!ctx || this.muted || !this.tabVisible) return;
    if (ctx.state === "suspended") await ctx.resume();
    this.fadeMaster(0.9, 0.2);
  }

  /** Toggle sound. First enable creates the audio context. */
  async toggle() {
    if (this.muted) {
      const ctx = this.ensure();
      if (!ctx) return;
      this.enabled = true;
      this.muted = false;
      window.localStorage.setItem(STORAGE_KEY, "on");
      if (this.tabVisible) {
        if (ctx.state === "suspended") await ctx.resume();
        this.fadeMaster(0.9, 0.4);
      }
    } else {
      this.muted = true;
      window.localStorage.setItem(STORAGE_KEY, "off");
      this.suspend();
    }
    this.emit();
  }

  private fadeMaster(to: number, time: number) {
    if (!this.ctx || !this.master) return;
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(Math.max(this.master.gain.value, 0.0001), now);
    this.master.gain.exponentialRampToValueAtTime(Math.max(to, 0.0001), now + time);
  }

  private tone(freq: number, peak: number, attack: number, release: number, type: OscillatorType = "sine", delay = 0) {
    if (!this.ctx || !this.master) return;
    const ctx = this.ctx;
    const start = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(peak, start + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, start + attack + release);
    osc.connect(g);
    g.connect(this.master);
    osc.start(start);
    osc.stop(start + attack + release + 0.05);
  }

  /** Soft tick while spinning the makeover wheel. */
  tick() {
    if (!this.on) return;
    this.tone(660, 0.05, 0.003, 0.05, "sine");
  }
}

export const sound = new SoundEngine();
