// Faceted-sphere renderer for the Philosophy section: an 80-face icosphere
// whose facets start scattered and lock together as `assembly` goes 0 → 1.

type Vec3 = [number, number, number];
type Mat3 = [number, number, number, number, number, number, number, number, number];

const norm = (v: Vec3): Vec3 => {
  const l = Math.hypot(v[0], v[1], v[2]);
  return [v[0] / l, v[1] / l, v[2] / l];
};

function buildIcosphere() {
  const phi = (1 + Math.sqrt(5)) / 2;
  const verts: Vec3[] = (
    [
      [0, 1, phi], [0, -1, phi], [0, 1, -phi], [0, -1, -phi],
      [1, phi, 0], [-1, phi, 0], [1, -phi, 0], [-1, -phi, 0],
      [phi, 0, 1], [-phi, 0, 1], [phi, 0, -1], [-phi, 0, -1],
    ] as Vec3[]
  ).map(norm);
  const baseFaces = [
    [0, 4, 8], [0, 8, 1], [0, 1, 9], [0, 9, 5], [0, 5, 4],
    [4, 10, 8], [8, 6, 1], [1, 7, 9], [9, 11, 5], [5, 2, 4],
    [8, 10, 6], [1, 6, 7], [9, 7, 11], [5, 11, 2], [4, 2, 10],
    [3, 6, 10], [3, 10, 2], [3, 2, 11], [3, 11, 7], [3, 7, 6],
  ];

  // One subdivision: each triangle → 4, midpoints pushed out to the unit sphere.
  const midCache = new Map<string, number>();
  const mid = (a: number, b: number) => {
    const key = a < b ? `${a}_${b}` : `${b}_${a}`;
    const hit = midCache.get(key);
    if (hit !== undefined) return hit;
    const va = verts[a];
    const vb = verts[b];
    verts.push(norm([(va[0] + vb[0]) / 2, (va[1] + vb[1]) / 2, (va[2] + vb[2]) / 2]));
    midCache.set(key, verts.length - 1);
    return verts.length - 1;
  };
  const faces: [number, number, number][] = [];
  for (const [a, b, c] of baseFaces) {
    const ab = mid(a, b);
    const bc = mid(b, c);
    const ac = mid(a, c);
    faces.push([a, ab, ac], [ab, b, bc], [ac, bc, c], [ab, bc, ac]);
  }
  return { verts, faces };
}

const { verts: VERTS, faces: FACES } = buildIcosphere();

export interface Scatter {
  x: number;
  y: number;
  z: number;
}

/** Random start offsets — each facet arrives from a different direction. */
export function makeScatter(): Scatter[] {
  return FACES.map((_, i) => {
    const a = (i / FACES.length) * Math.PI * 2 + Math.random() * 0.4;
    const d = 0.5 + Math.random() * 0.5;
    return {
      x: Math.cos(a) * d * 380,
      y: (Math.random() - 0.5) * 300,
      z: (Math.random() - 0.5) * 300,
    };
  });
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const mul = (m: Mat3, v: Vec3): Vec3 => [
  m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
  m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
  m[6] * v[0] + m[7] * v[1] + m[8] * v[2],
];
const rotY = (a: number): Mat3 => {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [c, 0, s, 0, 1, 0, -s, 0, c];
};
const rotX = (a: number): Mat3 => {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [1, 0, 0, 0, c, -s, 0, s, c];
};

// Light direction (normalised once).
const LIGHT = norm([0.5, -0.75, 0.4]);

/**
 * Draw one frame.
 * @param elapsed  seconds since start (drives rotation)
 * @param assembly 0 = fully scattered, 1 = assembled sphere
 */
export function drawSphere(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  dpr: number,
  elapsed: number,
  assembly: number,
  scatter: Scatter[],
) {
  ctx.clearRect(0, 0, W, H);

  const size = Math.min(W, H) * 0.36;
  const cx = W * 0.5;
  const cy = H * 0.5;
  const fov = 1100 * dpr;

  const MY = rotY(elapsed * 0.12);
  const MX = rotX(Math.sin(elapsed * 0.09) * 0.14 + 0.1);
  const tverts = VERTS.map((v) => mul(MX, mul(MY, [v[0] * size, v[1] * size, v[2] * size])));

  const project = (v: Vec3): [number, number] => {
    const s = fov / Math.max(v[2] + fov, 0.01);
    return [cx + v[0] * s, cy + v[1] * s];
  };

  const faces = FACES.map((face, fi) => {
    const off = scatter[fi];
    const fv = face.map((vi) => tverts[vi]) as [Vec3, Vec3, Vec3];
    const centY = (fv[0][1] + fv[1][1] + fv[2][1]) / 3;
    const depth = (fv[0][2] + fv[1][2] + fv[2][2]) / 3;

    const proj = fv.map((v) =>
      project([
        lerp(v[0] + off.x * dpr, v[0], assembly),
        lerp(v[1] + off.y * dpr, v[1], assembly),
        lerp(v[2] + off.z * dpr, v[2], assembly),
      ]),
    );

    // Face normal → diffuse lighting
    const e1 = [fv[1][0] - fv[0][0], fv[1][1] - fv[0][1], fv[1][2] - fv[0][2]];
    const e2 = [fv[2][0] - fv[0][0], fv[2][1] - fv[0][1], fv[2][2] - fv[0][2]];
    const n = norm([e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]]);
    const dot = Math.max(0, n[0] * LIGHT[0] + n[1] * LIGHT[1] + n[2] * LIGHT[2]);

    return { proj, depth, dot, centY };
  });

  faces.sort((a, b) => a.depth - b.depth);

  ctx.lineWidth = 1.4 * dpr;
  for (const { proj, dot, centY } of faces) {
    ctx.beginPath();
    ctx.moveTo(proj[0][0], proj[0][1]);
    ctx.lineTo(proj[1][0], proj[1][1]);
    ctx.lineTo(proj[2][0], proj[2][1]);
    ctx.closePath();

    // Electric-blue globe fill with latitude banding
    const b = dot * 0.6 + 0.06;
    const band = Math.sin(centY * 3.2) * 0.5 + 0.5;
    const r = Math.floor(b * 20 + band * 15);
    const g = Math.floor(b * 130 + band * 40);
    const bl = Math.floor(b * 240 + band * 15);
    ctx.fillStyle = `rgba(${r},${g},${bl},0.55)`;
    ctx.fill();

    ctx.strokeStyle = `rgba(40,180,255,${0.18 + dot * 0.72})`;
    ctx.stroke();
  }

  // Centre glow once mostly assembled
  if (assembly > 0.3) {
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.55);
    glow.addColorStop(0, `rgba(40,180,255,${(assembly - 0.3) * 0.15})`);
    glow.addColorStop(1, 'rgba(40,180,255,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);
  }
}
