// Viñetas a color del viaje del café, las mismas de la etiqueta impresa (reverso 12 × 14 cm):
// contorno grueso en la tinta del lote (currentColor), colores planos, una sombra y un brillo.
// Devuelven el contenido de un <svg viewBox="0 0 40 40">; son constantes, sin datos del usuario.

// Paleta corta, de la bolsa: rojo cereza, verde hoja, miel, madera y crema, con sombra en rojo, verde, madera y crema.
// Los demás tonos de la etiqueta (azules, naranja) se resuelven con estos cinco.
const RED = '#d9483b', RED_D = '#a8332a', GREEN = '#78b85a', GREEN_D = '#4f8a3d', HONEY = '#efb43e',
  WOOD = '#b9824d', WOOD_D = '#7e5130', CREAM = '#fbf1de', CREAM_D = '#e6d2ae';
const IC = { red:RED, redD:RED_D, green:GREEN, greenD:GREEN_D, soil:WOOD_D, bean:CREAM_D, roast:WOOD_D, roastD:'#5b3a22',
  honey:HONEY, flame:RED, flameY:HONEY, blue:CREAM, blueD:CREAM_D, bag:WOOD_D, bagD:'#5b3a22', wood:WOOD, woodD:WOOD_D, cream:CREAM, creamD:CREAM_D, sun:HONEY };
export function viajeIcon(key) {
  const OUT = "currentColor", O = w => `stroke="${OUT}" stroke-width="${w || 1.9}" stroke-linejoin="round" stroke-linecap="round"`;
  const sh = (d, fill, shade, sd) => `<path d="${d}" fill="${fill}"/>` + (shade ? `<path d="${sd}" fill="${shade}"/>` : '') + `<path d="${d}" fill="none" ${O()}/>`;
  const tube = (d, c, w = 1.8) => `<path d="${d}" fill="none" stroke="${OUT}" stroke-width="${w + 2}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  // Sin brillos blancos: en la web el dibujo es plano, como impreso (crítica de noviembre de 2026).
  const hl = () => '';
  const icons = {
    siembra: () => sh('M10 21H30L28.2 35.5Q20 37.5 11.8 35.5Z', IC.bag, IC.bagD, 'M24 21.5H30L28.2 35.5Q26 36.3 23.5 36.6Z')
      + `<ellipse cx="20" cy="21.5" rx="10.5" ry="2.6" fill="${IC.soil}" ${O()}/>`
      + tube('M20 21V13.5', IC.greenD)
      + sh('M19.5 14.5C13 15.5 7.5 11.5 7.5 6.5C14 6 18.5 9.5 19.5 14.5Z', IC.green, IC.greenD, 'M19.5 14.5C15 12 11 9 7.5 6.5C14 6 18.5 9.5 19.5 14.5Z')
      + sh('M20.5 14.5C27 15.5 32.5 11.5 32.5 6.5C26 6 21.5 9.5 20.5 14.5Z', IC.green, IC.greenD, 'M20.5 14.5C25 12 29 9 32.5 6.5C26 6 21.5 9.5 20.5 14.5Z')
      + hl('M11 9.2Q12.8 8.4 14.6 9.2') + hl('M13 25V31.5'),
    cultivo: () => tube('M4 10C14 13 24 20 31 34', IC.wood)
      + sh('M13 11.6C15 5 23 3 28 5C24 9.6 18 12 13 11.6Z', IC.green, IC.greenD, 'M13 11.6C18 9 23 7 28 5C24 9.6 18 12 13 11.6Z')
      + sh('M15.5 16.5C9.5 17 4 23 4.5 30C10.5 28 14.6 23 15.5 16.5Z', IC.green, IC.greenD, 'M15.5 16.5C11 21 7 25.5 4.5 30C10.5 28 14.6 23 15.5 16.5Z')
      + sh('M27 24.5C32.5 21.5 38 25 38 31.5C32.5 31 28.5 28 27 24.5Z', IC.green, IC.greenD, 'M27 24.5C31 27 34.5 29.3 38 31.5C32.5 31 28.5 28 27 24.5Z')
      + [[20.5, 19.5], [25.8, 21.6], [21.8, 25.4]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.4" fill="${IC.red}" ${O()}/>`).join(''),
    despulpado: () => tube('M20 7.4C20 5 21.6 3 24 2.2', IC.greenD, 1.6)
      + sh('M20 7.5A14 14 0 1 1 19.99 7.5Z', IC.red, IC.redD, 'M20 7.5A14 14 0 0 1 20 35.5A10 14 0 0 0 20 7.5Z')
      + `<circle cx="20" cy="21.5" r="10.6" fill="${IC.honey}" ${O(1.4)}/>`
      + `<ellipse cx="15.7" cy="21.5" rx="4.3" ry="7.6" fill="${IC.bean}" ${O(1.6)}/><ellipse cx="24.3" cy="21.5" rx="4.3" ry="7.6" fill="${IC.bean}" ${O(1.6)}/>`
      + `<path d="M15.7 14.6C14 18 17.4 25 15.7 28.4M24.3 14.6C22.6 18 26 25 24.3 28.4" fill="none" ${O(1.2)}/>`
      + hl('M9.5 15.5Q11.5 11.5 15 9.8'),
    secado: () => Array.from({ length: 8 }, (_, k) => { const a = k * Math.PI / 4, c = Math.cos(a), si = Math.sin(a); return tube(`M${(30 + 6.4 * c).toFixed(1)} ${(9 + 6.4 * si).toFixed(1)}L${(30 + 8.6 * c).toFixed(1)} ${(9 + 8.6 * si).toFixed(1)}`, IC.flame, 1.2); }).join('')
      + `<circle cx="30" cy="9" r="4.6" fill="${IC.sun}" ${O()}/>` + hl('M27.6 7.6Q28.4 6.4 29.8 6.1')
      + `<rect x="7" y="24.6" width="3.2" height="11" rx="0.6" fill="${IC.woodD}" ${O()}/><rect x="29.8" y="24.6" width="3.2" height="11" rx="0.6" fill="${IC.woodD}" ${O()}/>`
      + tube('M9 30.6H31', IC.wood, 1.4)
      + [8, 12.5, 17, 21.5, 26].map((x, k) => `<ellipse cx="${x + 2.6}" cy="18.6" rx="2.4" ry="1.7" fill="${k % 2 ? IC.red : IC.honey}" ${O(1.2)}/>`).join('')
      + `<rect x="4" y="20" width="32" height="4.6" rx="0.9" fill="${IC.wood}" ${O()}/>` + hl('M6.4 21.7H15'),
    tostion: () => `<g transform="rotate(-28 20 15)">` + sh('M20 3.2A8.4 11.8 0 1 1 19.99 3.2Z', IC.roast, IC.roastD, 'M20 3.2A8.4 11.8 0 0 1 20 26.8A5 11.8 0 0 0 20 3.2Z')
      + `<path d="M20 4C16.4 9 23.6 21 20 26" fill="none" stroke="${IC.creamD}" stroke-width="1.5" stroke-linecap="round"/>` + hl('M14.4 9.5Q15.3 7 17.4 5.8') + `</g>`
      + sh('M10 38C7 33 10 30 12.5 27C13 30 15 30.5 15.5 28.5C17 31 18.5 29 19 25.5C21.5 29 23.5 30 24.2 27.5C25.4 30 27.5 30.5 28 27C31 30.5 33 34 30 38Z', IC.flame, IC.flameY, 'M13.5 37.8C12.5 35 14 33 15.5 31.5C16.5 33.5 18.5 33.5 19.5 31C21 33.5 23 33.5 24.2 31.5C25.8 33.5 27 35.5 26.5 37.8Z')
      + `<path d="M7 38.4H33" fill="none" ${O()}/>`,
    molienda: () => tube('M20 13.5V5H30.5', IC.blueD, 1.6)
      + `<rect x="29.2" y="1.4" width="4.2" height="7.8" rx="2.1" fill="${IC.red}" ${O()}/>`
      + sh('M10.5 16Q20 7.5 29.5 16Z', IC.blue, IC.blueD, 'M24 16Q27 13.6 29.5 16Z') + hl('M13.6 13.8Q15.6 12 18 11.4')
      + sh('M11.2 16H28.8Q30 16 30 17.2V34.3Q30 35.5 28.8 35.5H11.2Q10 35.5 10 34.3V17.2Q10 16 11.2 16Z', IC.wood, IC.woodD, 'M25 16H28.8Q30 16 30 17.2V34.3Q30 35.5 28.8 35.5H25Z')
      + `<rect x="13" y="27.4" width="14" height="5.2" rx="0.8" fill="${IC.woodD}" ${O(1.4)}/><circle cx="20" cy="30" r="1.2" fill="${IC.honey}" ${O(1)}/>` + hl('M12.6 18.6V24'),
    taza: () => `<path d="M15 11.5C13 9 17 7 15 4M20 11.5C18 9 22 7 20 4M25 11.5C23 9 27 7 25 4" fill="none" ${O(1.5)}/>`
      + `<ellipse cx="20" cy="34.6" rx="15.2" ry="3.3" fill="${IC.blue}" ${O()}/>` + hl('M8.6 34Q11 32.8 14 32.6')
      + tube('M31 18.2C37 18.2 37 26.4 31 26.4', IC.cream, 1.6)
      + sh('M9 15H31V22C31 28.5 26.5 32.5 20 32.5C13.5 32.5 9 28.5 9 22Z', IC.cream, IC.creamD, 'M25 15.5H31V22C31 28.5 26.5 32.5 20 32.5C24 30.5 25.5 26 25 22Z')
      + `<ellipse cx="20" cy="15" rx="11" ry="2.4" fill="${IC.roast}" ${O(1.4)}/>` + hl('M12.6 18.6V25'),
  };
  return icons[key]();
}
