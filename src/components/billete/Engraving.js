// Viñetas grabadas generadas en SVG: paisajes a línea, como los grabados de
// los billetes. Son ilustraciones provisionales mientras llegan las fotos
// reales de la finca y la familia; el pie de cada una lo dice.

import { memo, useId } from "react";

const r2 = (n) => Math.round(n * 10) / 10;

function ridge(x, seed, base, amp) {
  return (
    base -
    amp *
      (0.55 * Math.sin(x * 0.011 + seed) +
        0.3 * Math.sin(x * 0.027 + seed * 2.1) +
        0.15 * Math.sin(x * 0.061 + seed * 3.7))
  );
}

function buildScene(kind) {
  const W = 400;
  const H = 260;
  const layers = [];
  const configs =
    kind === "montana"
      ? [
          { seed: 1.2, base: 120, amp: 52, gap: 3 },
          { seed: 2.6, base: 165, amp: 34, gap: 4 },
          { seed: 4.1, base: 210, amp: 22, gap: 5 },
        ]
      : kind === "cafetal"
      ? [
          { seed: 0.4, base: 95, amp: 30, gap: 4 },
          { seed: 3.3, base: 150, amp: 20, gap: 5 },
        ]
      : [
          { seed: 5.1, base: 110, amp: 40, gap: 3.5 },
          { seed: 1.9, base: 175, amp: 26, gap: 4.5 },
        ];

  configs.forEach((c) => {
    let outline = "";
    for (let x = 0; x <= W; x += 5) {
      outline += (x === 0 ? "M" : "L") + x + " " + r2(ridge(x, c.seed, c.base, c.amp));
    }
    // Rayado horizontal bajo la cresta (clip por el contorno).
    const hatch = [];
    const top = c.base - c.amp - 4;
    for (let y = top; y < H; y += c.gap) hatch.push(`M0 ${r2(y)}H${W}`);
    layers.push({ outline, fill: outline + `L${W} ${H}L0 ${H}Z`, hatch: hatch.join("") });
  });

  // Hileras de cafetos en ladera para la escena "cafetal".
  const bushes = [];
  if (kind === "cafetal") {
    for (let row = 0; row < 6; row++) {
      const y0 = 175 + row * 15;
      for (let x = (row % 2) * 14; x < W; x += 28) {
        const y = y0 + 6 * Math.sin(x * 0.02 + row);
        bushes.push(`M${x} ${r2(y)}q7 -12 14 0`);
        bushes.push(`M${x + 3} ${r2(y - 3)}q4 -6 8 0`);
      }
    }
  }

  // Sol grabado con rayos finos.
  const rays = [];
  const sx = kind === "montana" ? 300 : 90;
  const sy = 62;
  for (let a = 0; a < 360; a += 6) {
    const rad = (a * Math.PI) / 180;
    rays.push(
      `M${r2(sx + Math.cos(rad) * 22)} ${r2(sy + Math.sin(rad) * 22)}L${r2(sx + Math.cos(rad) * 40)} ${r2(
        sy + Math.sin(rad) * 40
      )}`
    );
  }
  return { W, H, layers, bushes: bushes.join(""), rays: rays.join(""), sun: { sx, sy } };
}

const SCENES = {
  cafetal: buildScene("cafetal"),
  montana: buildScene("montana"),
  familia: buildScene("familia"),
};

export const Engraving = memo(function Engraving({ kind = "montana", className = "" }) {
  const id = useId().replace(/:/g, "");
  const s = SCENES[kind];
  return (
    <svg className={className} viewBox={`0 0 ${s.W} ${s.H}`} aria-hidden="true" focusable="false">
      <defs>
        {s.layers.map((l, i) => (
          <clipPath id={`eg-${id}-${i}`} key={i}>
            <path d={l.fill} />
          </clipPath>
        ))}
      </defs>
      <g fill="none" stroke="currentColor" strokeWidth="0.7">
        <circle cx={s.sun.sx} cy={s.sun.sy} r="17" strokeWidth="1" />
        <path d={s.rays} strokeWidth="0.5" />
        {s.layers.map((l, i) => (
          <g key={i}>
            <rect
              x="0"
              y="0"
              width={s.W}
              height={s.H}
              fill="var(--engrave-ground, transparent)"
              clipPath={`url(#eg-${id}-${i})`}
              stroke="none"
            />
            <path d={l.hatch} clipPath={`url(#eg-${id}-${i})`} strokeWidth={0.45 + i * 0.25} />
            <path d={l.outline} strokeWidth="1.2" />
          </g>
        ))}
        {s.bushes && <path d={s.bushes} strokeWidth="1" />}
      </g>
    </svg>
  );
});
