// "Light path" renderer for the Philosophy section: a drifting Milky-Way band
// of glitter receding into the distance, with a light that travels along it as
// the section scrolls. Specks near the light flare up, and soft shafts of light
// pour down onto it from above the frame.

type RGB = [number, number, number];

interface Speck {
  t: number;
  dx: number;
  dy: number;
  dz: number;
  size: number;
  tint: number;
  phase: number;
  twinkle: number;
  drift: number;
  base: number;
  bokeh?: boolean;
}

// Warm film-light tints, plus one cool blue for contrast.
const TINTS: RGB[] = [
  [255, 196, 110],
  [255, 226, 170],
  [255, 244, 225],
  [255, 170, 70],
  [150, 190, 255],
];

function glowSprite([r, g, b]: RGB) {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const x = c.getContext('2d')!;
  const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)');
  gr.addColorStop(0.12, `rgba(${r},${g},${b},0.95)`);
  gr.addColorStop(0.4, `rgba(${r},${g},${b},0.25)`);
  gr.addColorStop(1, `rgba(${r},${g},${b},0)`);
  x.fillStyle = gr;
  x.fillRect(0, 0, 64, 64);
  return c;
}

function bokehSprite([r, g, b]: RGB) {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const x = c.getContext('2d')!;
  const gr = x.createRadialGradient(32, 32, 0, 32, 32, 31);
  gr.addColorStop(0, `rgba(${r},${g},${b},0.35)`);
  gr.addColorStop(0.8, `rgba(${r},${g},${b},0.45)`);
  gr.addColorStop(0.93, `rgba(${r},${g},${b},0.7)`);
  gr.addColorStop(1, `rgba(${r},${g},${b},0)`);
  x.fillStyle = gr;
  x.beginPath();
  x.arc(32, 32, 31, 0, Math.PI * 2);
  x.fill();
  return c;
}

/**
 * Centre line of the band in 3D: near on the left, receding to the right.
 * The far end sweeps wide enough that the tail runs off the right edge.
 */
const path = (t: number): [number, number, number] => [
  -1.55 + 3.4 * t + 2.2 * t * t,
  0.42 - 0.5 * t + 0.11 * Math.sin(t * Math.PI * 2 + 0.6),
  0.15 + 1.5 * t,
];

/** Where the light starts and stops along the path (0–1). */
const LIGHT_FROM = 0.1;
const LIGHT_TO = 0.78;

const gauss = () => {
  let u = 0;
  let v = 0;
  while (!u) u = Math.random();
  while (!v) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

function buildSpecks(small: boolean): Speck[] {
  const specks: Speck[] = [];
  const count = small ? 3500 : 7000;
  for (let i = 0; i < count; i++) {
    const field = Math.random() < 0.12; // loose stars scattered around the band
    const t = Math.random();
    const core = Math.exp(-Math.pow((t - 0.5) / 0.32, 2)); // denser through the middle
    const width = 0.05 + 0.09 * core;
    const roll = Math.random();
    specks.push({
      t,
      dx: field ? gauss() * 0.9 : gauss() * 0.04,
      dy: field ? gauss() * 0.6 : gauss() * width,
      dz: field ? Math.random() * 1.6 - 0.2 : gauss() * 0.22,
      size: Math.pow(Math.random(), 3) * 2.2 + 0.35,
      tint: roll < 0.06 ? 4 : roll < 0.35 ? 0 : roll < 0.7 ? 1 : roll < 0.9 ? 2 : 3,
      phase: Math.random() * Math.PI * 2,
      twinkle: 0.6 + Math.random() * 2.4,
      drift: 0.004 + Math.random() * 0.012,
      base: field ? 0.12 + Math.random() * 0.22 : 0.26 + Math.random() * 0.42,
    });
  }
  // Large, out-of-focus specks close to the lens
  for (let i = 0; i < (small ? 16 : 32); i++) {
    specks.push({
      bokeh: true,
      t: Math.random() * 0.45,
      dx: gauss() * 0.25,
      dy: gauss() * 0.22 + 0.15,
      dz: -0.05 - Math.random() * 0.1,
      size: 10 + Math.random() * 26,
      tint: Math.random() < 0.7 ? 0 : 1,
      phase: Math.random() * Math.PI * 2,
      twinkle: 0.3 + Math.random(),
      drift: 0.002,
      base: 0.05 + Math.random() * 0.08,
    });
  }
  return specks;
}

export interface LightPath {
  /** Scroll progress through the section, 0 → 1. */
  setProgress(p: number): void;
  resize(): void;
  start(): void;
  stop(): void;
}

export function createLightPath(canvas: HTMLCanvasElement): LightPath | null {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sprites = TINTS.map(glowSprite);
  const bokeh = TINTS.map(bokehSprite);
  let specks: Speck[] = [];
  let small: boolean | null = null;

  // Soft god rays: drawn small, blurred, then scaled up so no edge reads hard.
  const rayCanvas = document.createElement('canvas');
  const rctx = rayCanvas.getContext('2d')!;
  const RAY_SCALE = 8;
  const SHAFTS = 16;
  const shafts = Array.from({ length: SHAFTS }, () => ({
    phase: Math.random() * Math.PI * 2,
    speed: 0.15 + Math.random() * 0.3,
    len: 0.85 + Math.random() * 0.4,
  }));

  let dpr = 1;
  let W = 0;
  let H = 0;
  let progress = 0;
  let smooth = 0;
  let startTs: number | null = null;
  let frame = 0;
  let running = false;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.width = Math.round(canvas.offsetWidth * dpr);
    H = canvas.height = Math.round(canvas.offsetHeight * dpr);
    const isSmall = Math.min(canvas.offsetWidth, canvas.offsetHeight) < 600;
    if (isSmall !== small) {
      small = isSmall;
      specks = buildSpecks(isSmall);
    }
  }

  function drawRays(lx: number, ly: number, time: number) {
    const w = Math.max(1, Math.round(W / RAY_SCALE));
    const h = Math.max(1, Math.round(H / RAY_SCALE));
    if (rayCanvas.width !== w || rayCanvas.height !== h) {
      rayCanvas.width = w;
      rayCanvas.height = h;
    }
    rctx.clearRect(0, 0, w, h);
    rctx.globalCompositeOperation = 'lighter';
    rctx.filter = 'blur(3px)';
    // Source well above the frame, a little to the left of the highlight
    const sx = (lx - H * 0.3) / RAY_SCALE;
    const sy = -h * 0.35;
    const tx = lx / RAY_SCALE;
    const ty = ly / RAY_SCALE;
    const baseAng = Math.atan2(ty - sy, tx - sx);
    const dist = Math.hypot(tx - sx, ty - sy);
    const spread = 0.34;
    for (let k = 0; k < SHAFTS; k++) {
      const u = k / (SHAFTS - 1) - 0.5;
      const weight = Math.exp(-Math.pow(u / 0.32, 2));
      const sd = shafts[k];
      const shimmer = 0.55 + 0.45 * Math.sin(time * sd.speed + sd.phase);
      const a = baseAng + u * spread + Math.sin(time * 0.07 + sd.phase) * 0.01;
      const half = (spread / SHAFTS) * 1.6;
      const len = dist * sd.len * 1.15;
      const alpha = 0.1 * weight * shimmer;
      const g = rctx.createLinearGradient(sx, sy, sx + Math.cos(a) * len, sy + Math.sin(a) * len);
      g.addColorStop(0, `rgba(255,238,215,${alpha})`);
      g.addColorStop(0.55, `rgba(255,226,190,${alpha * 0.8})`);
      g.addColorStop(1, 'rgba(255,210,160,0)');
      rctx.fillStyle = g;
      rctx.beginPath();
      rctx.moveTo(sx, sy);
      rctx.lineTo(sx + Math.cos(a - half) * len, sy + Math.sin(a - half) * len);
      rctx.lineTo(sx + Math.cos(a + half) * len, sy + Math.sin(a + half) * len);
      rctx.closePath();
      rctx.fill();
    }
    const top = Math.max(sy, 0);
    const haze = rctx.createRadialGradient(sx, top, 0, sx, top, h * 0.9);
    haze.addColorStop(0, 'rgba(255,236,214,0.10)');
    haze.addColorStop(1, 'rgba(255,236,214,0)');
    rctx.fillStyle = haze;
    rctx.fillRect(0, 0, w, h);
    rctx.filter = 'none';
  }

  function draw(ts: number) {
    startTs ??= ts;
    const time = ((ts - startTs) / 1000) * (reduce ? 0.25 : 1);
    smooth += (progress - smooth) * 0.08; // eased follow so the light glides
    const c = ctx!;
    c.clearRect(0, 0, W, H);

    const cx = W * 0.5;
    const cy = H * 0.52;
    // On tall (phone) screens, cap the zoom so more of the band stays in frame
    const scale = Math.max(W, Math.min(H * 1.6, W * 1.8)) * 0.5;
    // Camera drifts with scroll for parallax
    const yaw = (smooth - 0.5) * 0.35;
    const camY = (smooth - 0.5) * 0.12;
    const cosY = Math.cos(yaw);
    const sinY = Math.sin(yaw);
    const project = (x: number, y: number, z: number): [number, number, number] => {
      const rx = x * cosY - (z - 0.9) * sinY;
      const rz = x * sinY + (z - 0.9) * cosY + 0.9;
      const s = 1 / (1 + Math.max(rz, -0.6));
      return [cx + rx * s * scale, cy + (y - camY) * s * scale, s];
    };

    // The light rides the path with scroll
    const L = path(LIGHT_FROM + smooth * (LIGHT_TO - LIGHT_FROM));
    const [lx, ly, ls] = project(L[0], L[1], L[2]);
    const lightR = scale * 0.42 * (0.55 + ls * 0.6);

    c.globalCompositeOperation = 'lighter';
    drawRays(lx, ly, time);
    c.drawImage(rayCanvas, 0, 0, W, H);

    for (const p of specks) {
      let t = p.t + time * p.drift;
      t -= Math.floor(t);
      const P = path(t);
      const wob = Math.sin(time * 0.5 + p.phase) * 0.012;
      const [x, y, s] = project(P[0] + p.dx, P[1] + p.dy + wob, P[2] + p.dz);
      if (x < -60 || x > W + 60 || y < -60 || y > H + 60) continue;
      const d2 = (x - lx) * (x - lx) + (y - ly) * (y - ly);
      const lit = Math.exp(-d2 / (lightR * lightR));
      const tw = 0.65 + 0.35 * Math.sin(time * p.twinkle + p.phase);
      if (p.bokeh) {
        const size = p.size * dpr * s * 1.8;
        c.globalAlpha = Math.min(1, (p.base + lit * 0.35) * tw);
        c.drawImage(bokeh[p.tint], x - size / 2, y - size / 2, size, size);
        continue;
      }
      const fade = Math.min(1, Math.max(0, (s - 0.12) * 2.5)); // far end fades into haze
      const a = Math.min(1, (p.base * tw + lit * 1.1 * (0.5 + 0.5 * tw)) * fade);
      if (a < 0.02) continue;
      const size = (p.size + lit * 2.4) * dpr * s * 7;
      c.globalAlpha = a;
      c.drawImage(sprites[p.tint], x - size / 2, y - size / 2, size, size);
    }
    c.globalAlpha = 1;

    // The light: wide haze, bright core and an anamorphic lens streak
    const haze = c.createRadialGradient(lx, ly, 0, lx, ly, lightR * 1.6);
    haze.addColorStop(0, 'rgba(255,214,150,0.30)');
    haze.addColorStop(0.35, 'rgba(255,190,110,0.10)');
    haze.addColorStop(1, 'rgba(255,170,80,0)');
    c.fillStyle = haze;
    c.fillRect(0, 0, W, H);
    const core = c.createRadialGradient(lx, ly, 0, lx, ly, lightR * 0.18);
    core.addColorStop(0, 'rgba(255,252,240,0.95)');
    core.addColorStop(0.4, 'rgba(255,225,170,0.45)');
    core.addColorStop(1, 'rgba(255,200,120,0)');
    c.fillStyle = core;
    c.beginPath();
    c.arc(lx, ly, lightR * 0.18, 0, Math.PI * 2);
    c.fill();
    const streakW = W * 0.55;
    const streak = c.createLinearGradient(lx - streakW, ly, lx + streakW, ly);
    streak.addColorStop(0, 'rgba(140,190,255,0)');
    streak.addColorStop(0.5, 'rgba(200,225,255,0.38)');
    streak.addColorStop(1, 'rgba(140,190,255,0)');
    c.fillStyle = streak;
    c.fillRect(lx - streakW, ly - 1.2 * dpr, streakW * 2, 2.4 * dpr);

    // Vignette keeps the edges cinematic
    c.globalCompositeOperation = 'source-over';
    const vig = c.createRadialGradient(cx, cy, Math.min(W, H) * 0.35, cx, cy, Math.max(W, H) * 0.75);
    vig.addColorStop(0, 'rgba(8,9,12,0)');
    vig.addColorStop(1, 'rgba(8,9,12,0.7)');
    c.fillStyle = vig;
    c.fillRect(0, 0, W, H);

    frame = requestAnimationFrame(draw);
  }

  resize();

  return {
    setProgress(p) {
      progress = p;
    },
    resize,
    start() {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(draw);
    },
    stop() {
      running = false;
      cancelAnimationFrame(frame);
    },
  };
}
