// Primitivas de impresión de seguridad: rosetas de guilloche, campos de
// líneas onduladas y bordes de microtexto. Todo es SVG generado una sola vez
// (sin imágenes), así el billete se ve completo aunque la red sea lenta.

import { memo, useId } from "react";

const round = (n) => Math.round(n * 100) / 100;

/** Curva hipotrocoide cerrada, base de una roseta de guilloche. */
function hypotrochoid(R, r, d, cx, cy, steps = 720, turnsHint) {
  const k = (R - r) / r;
  let d0 = "";
  // Se recorre suficientes vueltas para cerrar la figura.
  const turns = turnsHint || r / gcd(R, r);
  const total = Math.PI * 2 * turns;
  for (let i = 0; i <= steps * turns; i++) {
    const t = (i / (steps * turns)) * total;
    const x = cx + (R - r) * Math.cos(t) + d * Math.cos(k * t);
    const y = cy + (R - r) * Math.sin(t) - d * Math.sin(k * t);
    d0 += (i === 0 ? "M" : "L") + round(x) + " " + round(y);
  }
  return d0 + "Z";
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

// Rosetas precalculadas (se generan al cargar el módulo, una sola vez).
// Cada curva se escala para que su radio máximo (R - r + d) quepa dentro
// de la roseta: 104, 90 y 70 unidades sobre un lienzo de 240.
function fitted(R, r, d, target) {
  const k = target / (R - r + d);
  return hypotrochoid(R * k, r * k, d * k, 120, 120, 90, r / gcd(R, r));
}

const ROSETTE_PATHS = [fitted(100, 7, 62, 104), fitted(100, 9, 44, 90), fitted(80, 11, 30, 70)];

export const Rosette = memo(function Rosette({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 240 240" aria-hidden="true" focusable="false">
      {ROSETTE_PATHS.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={i === 1 ? "var(--ink2, currentColor)" : "currentColor"}
          strokeWidth={i === 0 ? 0.45 : 0.35}
          opacity={i === 0 ? 0.9 : 0.6}
        />
      ))}
      <circle cx="120" cy="120" r="112" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="120" cy="120" r="116" fill="none" stroke="currentColor" strokeWidth="0.3" />
    </svg>
  );
});

/** Campo de ondas entrelazadas, como el fondo de un billete. */
function wavePaths(width, height, rows, amp, freq, phaseShift) {
  const out = [];
  for (let r = 0; r < rows; r++) {
    const y0 = (r + 0.5) * (height / rows);
    let d = "";
    for (let x = 0; x <= width; x += 6) {
      const y = y0 + amp * Math.sin((x / width) * Math.PI * 2 * freq + r * phaseShift);
      d += (x === 0 ? "M" : "L") + x + " " + round(y);
    }
    out.push(d);
  }
  return out;
}

const WAVES_A = wavePaths(1200, 400, 34, 9, 5, 0.42);
const WAVES_B = wavePaths(1200, 400, 34, 9, 5, -0.42);

export const WaveField = memo(function WaveField({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 400"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="0.5" vectorEffect="non-scaling-stroke">
        {WAVES_A.map((d, i) => (
          <path key={"a" + i} d={d} />
        ))}
        {WAVES_B.map((d, i) => (
          <path key={"b" + i} d={d} opacity="0.55" />
        ))}
      </g>
    </svg>
  );
});

/**
 * Línea de microtexto: el texto repetido en letra diminuta que bordea los
 * impresos de seguridad. Decorativo para lectores de pantalla.
 */
export function Microtext({ text, className = "" }) {
  const id = useId().replace(/:/g, "");
  const unit = `${text} · `;
  const w = Math.round(unit.length * 4.1);
  return (
    <svg className={className} height="8" width="100%" aria-hidden="true" focusable="false">
      <defs>
        <pattern id={`mt-${id}`} width={w} height="8" patternUnits="userSpaceOnUse">
          <text
            x="0"
            y="6"
            fontSize="5.6"
            textLength={w}
            lengthAdjust="spacingAndGlyphs"
            fill="currentColor"
            className="microtext-glyphs"
          >
            {unit}
          </text>
        </pattern>
      </defs>
      <rect width="100%" height="8" fill={`url(#mt-${id})`} />
    </svg>
  );
}

/** Perforación: línea de troquel con agujeros, la frontera del desprendible. */
export function Perforation({ vertical = false, className = "" }) {
  return <div className={`perforation ${vertical ? "is-vertical" : ""} ${className}`} aria-hidden="true" />;
}
