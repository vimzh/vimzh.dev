"use client";

import { useEffect, useRef, useState } from "react";

// ── Types ──

type Point = { x: number; y: number };

type PathElement = {
  path: string;
  thickness: number;
  growthOrder: number;
  pathLength: number;
  filled?: boolean;
};

type PlantData = {
  elements: PathElement[];
  growthStart: number;
  growthEnd: number;
};

type PlantConfig = {
  y: number;
  seed: number;
  scale?: number;
  side: "left" | "right";
};

type StemSegment = {
  start: Point;
  cp1: Point;
  cp2: Point;
  end: Point;
  path: string;
  len: number;
  angle: number;
};

// ── Seeded PRNG (mulberry32) ──

const mulberry32 = (seed: number) => {
  let s = seed | 0;
  return (): number => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

// ── Math utilities ──

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const dist = (a: Point, b: Point) =>
  Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);

const pointAt = (
  t: number,
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
): Point => {
  const mt = 1 - t;
  return {
    x:
      mt ** 3 * p0.x +
      3 * mt ** 2 * t * p1.x +
      3 * mt * t ** 2 * p2.x +
      t ** 3 * p3.x,
    y:
      mt ** 3 * p0.y +
      3 * mt ** 2 * t * p1.y +
      3 * mt * t ** 2 * p2.y +
      t ** 3 * p3.y,
  };
};

const calcPathLength = (
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
  n = 24,
): number => {
  let len = 0;
  let prev = p0;
  for (let i = 1; i <= n; i++) {
    const pt = pointAt(i / n, p0, p1, p2, p3);
    len += dist(prev, pt);
    prev = pt;
  }
  return len;
};

const f = (n: number) => n.toFixed(2);

// ── Stem segment generator ──

const makeStemSegment = (
  start: Point,
  angle: number,
  length: number,
  rand: () => number,
): StemSegment => {
  const wobble1 = (rand() - 0.5) * length * 0.35;
  const wobble2 = (rand() - 0.5) * length * 0.3;
  const perp = angle + Math.PI / 2;

  const end: Point = {
    x: start.x + Math.cos(angle) * length,
    y: start.y + Math.sin(angle) * length,
  };

  const cp1: Point = {
    x: start.x + Math.cos(angle) * length * 0.33 + Math.cos(perp) * wobble1,
    y: start.y + Math.sin(angle) * length * 0.33 + Math.sin(perp) * wobble1,
  };

  const cp2: Point = {
    x: start.x + Math.cos(angle) * length * 0.66 + Math.cos(perp) * wobble2,
    y: start.y + Math.sin(angle) * length * 0.66 + Math.sin(perp) * wobble2,
  };

  const path = `M ${f(start.x)} ${f(start.y)} C ${f(cp1.x)} ${f(cp1.y)} ${f(cp2.x)} ${f(cp2.y)} ${f(end.x)} ${f(end.y)}`;
  const len = calcPathLength(start, cp1, cp2, end);

  return { start, cp1, cp2, end, path, len, angle };
};

// ── Multi-segment stem ──

const generateStem = (
  origin: Point,
  baseAngle: number,
  numSegments: number,
  rand: () => number,
  scale: number,
): StemSegment[] => {
  const segments: StemSegment[] = [];
  let current = origin;
  let angle = baseAngle;

  for (let i = 0; i < numSegments; i++) {
    const segLen = (80 + rand() * 70) * scale;
    // Gentle angle drift between segments for S-curve
    angle += (rand() - 0.5) * 0.25;
    const seg = makeStemSegment(current, angle, segLen, rand);
    segments.push(seg);
    current = seg.end;
  }

  return segments;
};

// ── Get a point along the full multi-segment stem ──

const pointOnStem = (
  segments: StemSegment[],
  t: number,
): { point: Point; segIndex: number; angle: number } => {
  const totalSegs = segments.length;
  const segFloat = t * totalSegs;
  const segIndex = Math.min(Math.floor(segFloat), totalSegs - 1);
  const localT = segFloat - segIndex;
  const seg = segments[segIndex];
  const point = pointAt(localT, seg.start, seg.cp1, seg.cp2, seg.end);
  return { point, segIndex, angle: seg.angle };
};

// ── Petal generator (with base offset fix) ──

const makePetal = (
  center: Point,
  angle: number,
  petalLen: number,
  width: number,
  rand: () => number,
): PathElement[] => {
  const elements: PathElement[] = [];

  // Offset petal base 2-3px from center to prevent blob
  const offset = 1.5 + rand() * 2;
  const offsetAngle = rand() * Math.PI * 2;
  const base: Point = {
    x: center.x + Math.cos(offsetAngle) * offset,
    y: center.y + Math.sin(offsetAngle) * offset,
  };

  const tip: Point = {
    x: base.x + Math.cos(angle) * petalLen,
    y: base.y + Math.sin(angle) * petalLen,
  };

  const perp = angle + Math.PI / 2;
  const bulge = 0.35 + rand() * 0.1;

  // Petal outline: two bezier curves forming a pointed oval
  const rcp1: Point = {
    x: base.x + Math.cos(angle) * petalLen * bulge + Math.cos(perp) * width,
    y: base.y + Math.sin(angle) * petalLen * bulge + Math.sin(perp) * width,
  };
  const rcp2: Point = {
    x:
      tip.x - Math.cos(angle) * petalLen * 0.15 + Math.cos(perp) * width * 0.25,
    y:
      tip.y - Math.sin(angle) * petalLen * 0.15 + Math.sin(perp) * width * 0.25,
  };
  const lcp1: Point = {
    x:
      tip.x - Math.cos(angle) * petalLen * 0.15 - Math.cos(perp) * width * 0.25,
    y:
      tip.y - Math.sin(angle) * petalLen * 0.15 - Math.sin(perp) * width * 0.25,
  };
  const lcp2: Point = {
    x: base.x + Math.cos(angle) * petalLen * bulge - Math.cos(perp) * width,
    y: base.y + Math.sin(angle) * petalLen * bulge - Math.sin(perp) * width,
  };

  const outline = `M ${f(base.x)} ${f(base.y)} C ${f(rcp1.x)} ${f(rcp1.y)} ${f(rcp2.x)} ${f(rcp2.y)} ${f(tip.x)} ${f(tip.y)} C ${f(lcp1.x)} ${f(lcp1.y)} ${f(lcp2.x)} ${f(lcp2.y)} ${f(base.x)} ${f(base.y)}`;

  elements.push({
    path: outline,
    thickness: 0.5,
    growthOrder: 0, // set by caller
    pathLength: petalLen * 2.5,
  });

  // Center vein
  elements.push({
    path: `M ${f(base.x)} ${f(base.y)} L ${f(tip.x)} ${f(tip.y)}`,
    thickness: 0.2,
    growthOrder: 0,
    pathLength: petalLen,
  });

  // 2 side veins
  for (let v = 0; v < 2; v++) {
    const vt = 0.3 + v * 0.3;
    const veinStart: Point = {
      x: lerp(base.x, tip.x, vt),
      y: lerp(base.y, tip.y, vt),
    };
    const side = v % 2 === 0 ? 1 : -1;
    const veinAngle = angle + side * (0.3 + rand() * 0.4);
    const veinLen = width * (0.5 + rand() * 0.3);
    const veinEnd: Point = {
      x: veinStart.x + Math.cos(veinAngle) * veinLen,
      y: veinStart.y + Math.sin(veinAngle) * veinLen,
    };
    elements.push({
      path: `M ${f(veinStart.x)} ${f(veinStart.y)} L ${f(veinEnd.x)} ${f(veinEnd.y)}`,
      thickness: 0.15,
      growthOrder: 0,
      pathLength: veinLen,
    });
  }

  return elements;
};

// ── Leaf generator (simplified: outline + center vein) ──

const makeLeaf = (
  base: Point,
  angle: number,
  leafLen: number,
  leafWidth: number,
  rand: () => number,
): PathElement[] => {
  const tip: Point = {
    x: base.x + Math.cos(angle) * leafLen,
    y: base.y + Math.sin(angle) * leafLen,
  };

  const perp = angle + Math.PI / 2;
  const bulge = 0.3 + rand() * 0.15;

  const rcp1: Point = {
    x: base.x + Math.cos(angle) * leafLen * bulge + Math.cos(perp) * leafWidth,
    y: base.y + Math.sin(angle) * leafLen * bulge + Math.sin(perp) * leafWidth,
  };
  const rcp2: Point = {
    x:
      tip.x -
      Math.cos(angle) * leafLen * 0.1 +
      Math.cos(perp) * leafWidth * 0.2,
    y:
      tip.y -
      Math.sin(angle) * leafLen * 0.1 +
      Math.sin(perp) * leafWidth * 0.2,
  };
  const lcp1: Point = {
    x:
      tip.x -
      Math.cos(angle) * leafLen * 0.1 -
      Math.cos(perp) * leafWidth * 0.2,
    y:
      tip.y -
      Math.sin(angle) * leafLen * 0.1 -
      Math.sin(perp) * leafWidth * 0.2,
  };
  const lcp2: Point = {
    x: base.x + Math.cos(angle) * leafLen * bulge - Math.cos(perp) * leafWidth,
    y: base.y + Math.sin(angle) * leafLen * bulge - Math.sin(perp) * leafWidth,
  };

  const outline = `M ${f(base.x)} ${f(base.y)} C ${f(rcp1.x)} ${f(rcp1.y)} ${f(rcp2.x)} ${f(rcp2.y)} ${f(tip.x)} ${f(tip.y)} C ${f(lcp1.x)} ${f(lcp1.y)} ${f(lcp2.x)} ${f(lcp2.y)} ${f(base.x)} ${f(base.y)}`;
  const vein = `M ${f(base.x)} ${f(base.y)} L ${f(tip.x)} ${f(tip.y)}`;

  return [
    {
      path: outline,
      thickness: 0.4,
      growthOrder: 0,
      pathLength: leafLen * 2.2,
    },
    { path: vein, thickness: 0.2, growthOrder: 0, pathLength: leafLen },
  ];
};

// ── Bud generator ──

const makeBud = (
  base: Point,
  angle: number,
  size: number,
  rand: () => number,
): PathElement => {
  const tip: Point = {
    x: base.x + Math.cos(angle) * size,
    y: base.y + Math.sin(angle) * size,
  };

  const perp = angle + Math.PI / 2;
  const w = size * (0.3 + rand() * 0.15);

  const cp1: Point = {
    x: base.x + Math.cos(angle) * size * 0.5 + Math.cos(perp) * w,
    y: base.y + Math.sin(angle) * size * 0.5 + Math.sin(perp) * w,
  };
  const cp2: Point = {
    x: base.x + Math.cos(angle) * size * 0.5 - Math.cos(perp) * w,
    y: base.y + Math.sin(angle) * size * 0.5 - Math.sin(perp) * w,
  };

  const path = `M ${f(base.x)} ${f(base.y)} Q ${f(cp1.x)} ${f(cp1.y)} ${f(tip.x)} ${f(tip.y)} Q ${f(cp2.x)} ${f(cp2.y)} ${f(base.x)} ${f(base.y)}`;

  return { path, thickness: 0.4, growthOrder: 0, pathLength: size * 2.2 };
};

// ── Plant generation ──

const generatePlant = (config: PlantConfig): PlantData => {
  const rand = mulberry32(config.seed);
  const scale = config.scale ?? 1;
  const elements: PathElement[] = [];
  let order = 0;

  // ── 1. Multi-segment stem ──
  // Starts off-screen at x=-20, grows upward with slight rightward drift
  const origin: Point = { x: -20, y: config.y };
  const baseAngle = -Math.PI / 2 + 0.1 + rand() * 0.2; // mostly up, slight right
  const numSegments = 3 + Math.floor(rand() * 2); // 3-4 segments
  const stems = generateStem(origin, baseAngle, numSegments, rand, scale);

  // Add stem segments as elements
  for (const seg of stems) {
    elements.push({
      path: seg.path,
      thickness: 1.2 * scale,
      growthOrder: order,
      pathLength: seg.len,
    });
    order++;
  }

  const stemOrder = order; // track for branch ordering

  // ── 2. Branches ──
  const numBranches = 3 + Math.floor(rand() * 3); // 3-5
  const branchData: { tip: Point; angle: number; order: number }[] = [];

  for (let b = 0; b < numBranches; b++) {
    const t = 0.2 + (b / numBranches) * 0.65 + rand() * 0.05;
    const { point: branchBase, angle: stemAngle } = pointOnStem(stems, t);

    // Branch angles away from edge (rightward) with variety
    const branchAngle =
      stemAngle + (0.5 + rand() * 0.7) * (rand() > 0.3 ? 1 : -1);
    const branchLen = (40 + rand() * 40) * scale;
    const branch = makeStemSegment(branchBase, branchAngle, branchLen, rand);

    const branchOrder = stemOrder + b;
    elements.push({
      path: branch.path,
      thickness: 0.7 * scale,
      growthOrder: branchOrder,
      pathLength: branch.len,
    });

    branchData.push({
      tip: branch.end,
      angle: branchAngle,
      order: branchOrder,
    });
    order = Math.max(order, branchOrder + 1);
  }

  // ── 3. Flowers at 2-3 branch tips ──
  const flowerCount = Math.min(branchData.length, 2 + Math.floor(rand() * 2));
  const flowerOrder = order;

  for (let fi = 0; fi < flowerCount; fi++) {
    const bd = branchData[fi];
    const numPetals = 4 + Math.floor(rand() * 2); // 4-5
    const petalLen = (20 + rand() * 12) * scale;
    const petalWidth = petalLen * (0.3 + rand() * 0.12);
    const baseRot = rand() * Math.PI * 2;

    for (let p = 0; p < numPetals; p++) {
      const petalAngle =
        baseRot + (p / numPetals) * Math.PI * 2 + (rand() - 0.5) * 0.2;
      const petals = makePetal(bd.tip, petalAngle, petalLen, petalWidth, rand);

      for (const el of petals) {
        el.growthOrder = flowerOrder;
        el.thickness *= scale;
        elements.push(el);
      }
    }

    // Center dots
    const dotCount = 3 + Math.floor(rand() * 3);
    const dotRadius = (3 + rand() * 2) * scale;
    for (let d = 0; d < dotCount; d++) {
      const dotAngle = (d / dotCount) * Math.PI * 2;
      const dotDist = dotRadius * (0.3 + rand() * 0.5);
      const cx = bd.tip.x + Math.cos(dotAngle) * dotDist;
      const cy = bd.tip.y + Math.sin(dotAngle) * dotDist;
      const r = (0.8 + rand() * 1) * scale;

      elements.push({
        path: `M ${f(cx + r)} ${f(cy)} A ${f(r)} ${f(r)} 0 1 1 ${f(cx - r)} ${f(cy)} A ${f(r)} ${f(r)} 0 1 1 ${f(cx + r)} ${f(cy)}`,
        thickness: 0.3,
        growthOrder: flowerOrder + 1,
        pathLength: Math.PI * 2 * r,
        filled: true,
      });
    }
  }

  // ── 4. Buds at remaining branch tips ──
  for (let bi = flowerCount; bi < branchData.length; bi++) {
    const bd = branchData[bi];
    const budSize = (8 + rand() * 5) * scale;
    const bud = makeBud(bd.tip, bd.angle, budSize, rand);
    bud.growthOrder = flowerOrder;
    elements.push(bud);
  }

  order = flowerOrder + 2;

  // ── 4b. Crown flower at the very top of the stem ──
  const stemTip = stems[stems.length - 1].end;
  const crownPetals = 5 + Math.floor(rand() * 2);
  const crownPetalLen = (20 + rand() * 15) * scale;
  const crownPetalWidth = crownPetalLen * (0.35 + rand() * 0.1);
  const crownBaseRot = rand() * Math.PI * 2;

  for (let p = 0; p < crownPetals; p++) {
    const petalAngle =
      crownBaseRot + (p / crownPetals) * Math.PI * 2 + (rand() - 0.5) * 0.15;
    const petals = makePetal(
      stemTip,
      petalAngle,
      crownPetalLen,
      crownPetalWidth,
      rand,
    );

    for (const el of petals) {
      el.growthOrder = order;
      el.thickness *= scale;
      elements.push(el);
    }
  }

  // Crown center dots
  const crownDots = 4 + Math.floor(rand() * 3);
  const crownDotR = (4 + rand() * 2) * scale;
  for (let d = 0; d < crownDots; d++) {
    const dotAngle = (d / crownDots) * Math.PI * 2;
    const dotDist = crownDotR * (0.3 + rand() * 0.5);
    const cx = stemTip.x + Math.cos(dotAngle) * dotDist;
    const cy = stemTip.y + Math.sin(dotAngle) * dotDist;
    const r = (1 + rand() * 1.2) * scale;

    elements.push({
      path: `M ${f(cx + r)} ${f(cy)} A ${f(r)} ${f(r)} 0 1 1 ${f(cx - r)} ${f(cy)} A ${f(r)} ${f(r)} 0 1 1 ${f(cx + r)} ${f(cy)}`,
      thickness: 0.3,
      growthOrder: order + 1,
      pathLength: Math.PI * 2 * r,
      filled: true,
    });
  }
  order += 2;

  // ── 5. Leaves on main stem ──
  const numLeaves = 4 + Math.floor(rand() * 3); // 4-6
  for (let li = 0; li < numLeaves; li++) {
    const t = 0.15 + (li / numLeaves) * 0.65;
    const { point: leafBase, angle: stemAngle } = pointOnStem(stems, t);

    const side = li % 2 === 0 ? 1 : -1;
    const leafAngle = stemAngle + side * (0.5 + rand() * 0.7);
    const leafLen = (25 + rand() * 15) * scale;
    const leafW = leafLen * (0.25 + rand() * 0.08);

    const leafParts = makeLeaf(leafBase, leafAngle, leafLen, leafW, rand);
    const leafOrder = Math.floor(stemOrder * t) + 1;

    for (const el of leafParts) {
      el.growthOrder = leafOrder;
      elements.push(el);
    }
  }

  return { elements, growthStart: 0, growthEnd: 1 };
};

// ── SVG width constant ──
const SVG_WIDTH = 280;

// ── Plant configs ──

const PLANT_CONFIGS: PlantConfig[] = [
  // y = bottom of plant (stems grow upward from here)
  // Left side
  { y: 600, seed: 42, scale: 1.0, side: "left" },
  { y: 1300, seed: 137, scale: 1.1, side: "left" },
  { y: 2000, seed: 256, scale: 0.95, side: "left" },
  // Right side
  { y: 900, seed: 731, scale: 1.0, side: "right" },
  { y: 1600, seed: 518, scale: 0.95, side: "right" },
  { y: 2300, seed: 943, scale: 1.0, side: "right" },
];

// ── Pre-computed plant data (module-level, runs once) ──

const makePlants = (configs: PlantConfig[]): PlantData[] =>
  configs.map((config, i) => {
    const plant = generatePlant(config);
    plant.growthStart = i * 0.25;
    plant.growthEnd = Math.min(1, i * 0.25 + 0.45);
    return plant;
  });

const getMaxOrders = (plants: PlantData[]) =>
  plants.map((p) => p.elements.reduce((m, e) => Math.max(m, e.growthOrder), 0));

const LEFT_PLANTS = makePlants(PLANT_CONFIGS.filter((c) => c.side === "left"));
const RIGHT_PLANTS = makePlants(
  PLANT_CONFIGS.filter((c) => c.side === "right"),
);
const LEFT_MAX_ORDERS = getMaxOrders(LEFT_PLANTS);
const RIGHT_MAX_ORDERS = getMaxOrders(RIGHT_PLANTS);

// ── Component ──

export const BotanicalVines = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [docHeight, setDocHeight] = useState(4000);
  const rafRef = useRef<number>(0);
  const lastScrollRef = useRef<number>(-1);

  useEffect(() => {
    const update = () => {
      const sy = window.scrollY;
      if (sy === lastScrollRef.current) return;
      lastScrollRef.current = sy;

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(
        maxScroll > 0 ? Math.min(1, Math.max(0, sy / maxScroll)) : 0,
      );
      setDocHeight(document.documentElement.scrollHeight);
    };

    update();

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const svgH = docHeight;

  const renderPlants = (plants: PlantData[], maxOrders: number[]) =>
    plants.map((plant, pi) => {
      const range = plant.growthEnd - plant.growthStart;
      const localGrowth =
        range > 0
          ? Math.min(
              1,
              Math.max(0, (scrollProgress - plant.growthStart) / range),
            )
          : 0;

      const maxOrd = maxOrders[pi];

      return (
        <g key={pi}>
          {plant.elements.map((el, ei) => {
            const elProgress = maxOrd > 0 ? el.growthOrder / maxOrd : 0;
            // Deeper elements need 85% parent completion before starting
            const elGrowth = Math.min(
              1,
              Math.max(0, (localGrowth - elProgress * 0.85) / 0.15),
            );

            if (el.filled) {
              return (
                <path
                  key={ei}
                  d={el.path}
                  fill="currentColor"
                  stroke="none"
                  style={{ opacity: elGrowth }}
                />
              );
            }

            return (
              <path
                key={ei}
                d={el.path}
                stroke="currentColor"
                strokeWidth={el.thickness}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                strokeDasharray={Math.round(el.pathLength * 100) / 100}
                strokeDashoffset={
                  Math.round(el.pathLength * (1 - elGrowth) * 100) / 100
                }
              />
            );
          })}
        </g>
      );
    });

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] hidden opacity-[0.12] dark:opacity-[0.18] md:block">
      {/* Left side */}
      <svg
        className="absolute left-0 top-0 text-foreground-tertiary"
        width={SVG_WIDTH}
        viewBox={`0 0 ${SVG_WIDTH} ${svgH}`}
        style={{ height: svgH }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {renderPlants(LEFT_PLANTS, LEFT_MAX_ORDERS)}
      </svg>

      {/* Right side — mirrored */}
      <svg
        className="absolute right-0 top-0 text-foreground-tertiary"
        width={SVG_WIDTH}
        viewBox={`0 0 ${SVG_WIDTH} ${svgH}`}
        style={{ height: svgH, transform: "scaleX(-1)" }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {renderPlants(RIGHT_PLANTS, RIGHT_MAX_ORDERS)}
      </svg>
    </div>
  );
};
