// Web Audio API synthesized sound effects
// Lightweight, zero external files, works instantly in modern browsers

class SoundController {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(val) {
    this.muted = val;
  }

  isMuted() {
    return this.muted;
  }

  // Soft click / tap sound
  playClick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {
      // AudioContext policy catch
    }
  }

  // Pleasant rising chime for positive choices (+mood)
  playPositive() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.07;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.26);
      });
    } catch {
      // Ignore
    }
  }

  // Playful disappointed thud for negative choices (-mood)
  playNegative() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [440, 392, 349.23, 293.66]; // A4, G4, F4, D4
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.08;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.9, startTime + 0.12);

        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.16);
      });
    } catch {
      // Ignore
    }
  }

  // Romantic victory melody
  playWin() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [
        { f: 523.25, t: 0.0 }, // C5
        { f: 659.25, t: 0.12 }, // E5
        { f: 783.99, t: 0.24 }, // G5
        { f: 1046.5, t: 0.36 }, // C6
        { f: 880.0, t: 0.55 }, // A5
        { f: 1046.5, t: 0.72 }, // C6
      ];
      const now = this.ctx.currentTime;

      notes.forEach(({ f, t }) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + t;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, startTime);

        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.42);
      });
    } catch {
      // Ignore
    }
  }

  // Comedic sad trombone
  playGameOver() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [
        { f: 311.13, t: 0.0, d: 0.25 }, // Eb4
        { f: 293.66, t: 0.28, d: 0.25 }, // D4
        { f: 277.18, t: 0.56, d: 0.25 }, // C#4
        { f: 261.63, t: 0.84, d: 0.65 }, // C4 (held with slight vibrato)
      ];
      const now = this.ctx.currentTime;

      notes.forEach(({ f, t, d }) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + t;

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f, startTime);
        if (d > 0.4) {
          osc.frequency.linearRampToValueAtTime(f * 0.92, startTime + d);
        }

        gain.gain.setValueAtTime(0.12, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + d + 0.02);
      });
    } catch {
      // Ignore
    }
  }
}

export const soundManager = new SoundController();
