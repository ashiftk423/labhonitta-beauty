"use client";

/**
 * Procedural sound engine built on the Web Audio API — no audio files needed.
 * Generates an ambient shimmer pad plus UI/effect sounds (sparkle, snip, chime)
 * entirely from oscillators and filtered noise, so it stays tiny and crisp.
 *
 * Browsers block autoplay, so audio only starts after the user enables it via
 * the floating SoundToggle. All methods no-op safely until then.
 */

type Listener = (state: { enabled: boolean; muted: boolean }) => void;

const STORAGE_KEY = "labhonitta-sound";

class SoundEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private ambientNodes: AudioNode[] = [];
  private listeners = new Set<Listener>();

  enabled = false; // user has switched sound on at least once
  muted = true; // current mute state

  constructor() {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      // Default to muted; only auto-enable if the user previously turned it on.
      if (saved === "on") this.muted = false;
    }
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

    // white-noise buffer reused for snip/sparkle textures
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 1, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

    this.ctx = ctx;
    this.master = master;
    this.noiseBuffer = buffer;
    return ctx;
  }

  private get on() {
    return !this.muted && this.ctx !== null && this.master !== null;
  }

  /** Toggle sound. First enable creates the context and starts ambient. */
  async toggle() {
    if (this.muted) {
      const ctx = this.ensure();
      if (!ctx) return;
      if (ctx.state === "suspended") await ctx.resume();
      this.enabled = true;
      this.muted = false;
      window.localStorage.setItem(STORAGE_KEY, "on");
      this.fadeMaster(0.9, 0.6);
      this.startAmbient();
    } else {
      this.muted = true;
      window.localStorage.setItem(STORAGE_KEY, "off");
      this.fadeMaster(0.0001, 0.4);
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

  /** Soft, slowly breathing rose-gold pad. */
  private startAmbient() {
    if (!this.ctx || !this.master || this.ambientNodes.length) return;
    const ctx = this.ctx;

    const ambient = ctx.createGain();
    ambient.gain.value = 0.06;
    ambient.connect(this.master);
    this.ambientGain = ambient;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 700;
    filter.connect(ambient);

    // two detuned sine voices form a warm chord (A2 + E3)
    const freqs = [110, 164.81];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = f;
      osc.detune.value = i === 0 ? -6 : 6;
      osc.connect(filter);
      osc.start();
      this.ambientNodes.push(osc);
    });

    // slow LFO breathes the pad volume
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.08;
    lfoGain.gain.value = 0.03;
    lfo.connect(lfoGain);
    lfoGain.connect(ambient.gain);
    lfo.start();
    this.ambientNodes.push(lfo);
  }

  private env(node: GainNode, peak: number, attack: number, release: number) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    node.gain.setValueAtTime(0.0001, now);
    node.gain.exponentialRampToValueAtTime(peak, now + attack);
    node.gain.exponentialRampToValueAtTime(0.0001, now + attack + release);
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

  /** Bright bell arpeggio — used as the makeup glow reveals. */
  sparkle() {
    if (!this.on) return;
    const notes = [1318.5, 1567.98, 2093.0, 2637.02];
    notes.forEach((n, i) => this.tone(n, 0.12, 0.005, 0.5, "sine", i * 0.06));
  }

  /** Single soft chime — section reveals / accents. */
  chime() {
    if (!this.on) return;
    this.tone(880, 0.1, 0.008, 0.7, "sine");
    this.tone(1320, 0.05, 0.008, 0.6, "sine", 0.02);
  }

  /** Crisp scissor snip — short band-passed noise burst. */
  snip() {
    if (!this.on || !this.ctx || !this.master || !this.noiseBuffer) return;
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 3200;
    bp.Q.value = 6;
    const g = ctx.createGain();
    this.env(g, 0.18, 0.004, 0.05);
    src.connect(bp);
    bp.connect(g);
    g.connect(this.master);
    const now = ctx.currentTime;
    src.start(now);
    src.stop(now + 0.08);
    // tiny metallic ring after the cut
    this.tone(5200, 0.04, 0.002, 0.06, "triangle", 0.01);
  }

  /** Soft UI tick for hovers/clicks. */
  tick() {
    if (!this.on) return;
    this.tone(660, 0.05, 0.003, 0.05, "sine");
  }
}

export const sound = new SoundEngine();
