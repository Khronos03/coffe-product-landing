---
target: home
total_score: 12
max_score: 32
na_heuristics: 7,10
p0_count: 2
p1_count: 2
target_identity: "file:/home/claude/site/src/pages/Home.js"
target_fingerprint: "sha256:af86b079d001fc58016056e51050cb92bec45015fc1361bfa9e6685ae6981e7c"
target_path: /home/claude/site/src/pages/Home.js
timestamp: 2026-10-09T18-25-22Z
slug: src-pages-home-js
---
Method: dual-agent (A: a8b97c25acddb6f2a · B: aa303858c53150d1c)

Target: home (src/pages/Home.js), production build served locally. Persuade mode.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | Variant price is announced with aria-live, but the nav marks "Comprar" as active at the top of the page and there is no size indicator. |
| 2 | Match System / Real World | 2 | Trade vocabulary is right (tostión, proceso), but "Satchets", "Tú Café" and a loose honey description ("Fermentación Natural"). |
| 3 | User Control and Freedom | 1 | The modal opens on every load, Esc doesn't close it, there is no focus trap, and tapping the image opens WhatsApp. |
| 4 | Consistency and Standards | 1 | Different prices for the same SKU; "Comprar Ahora" means both a product and a generic chat; two h1s after an h2. |
| 5 | Error Prevention | 2 | The prefilled message is excellent; the 454 g default is hidden and the modal image opens WhatsApp by accident. |
| 6 | Recognition Rather Than Recall | 1 | Sizes are hidden behind ‹ ›, perfil and notas are hidden (`compact`), and the processes are explained 2–3 screens away from the cards. |
| 7 | Flexibility and Efficiency | n/a | One-page persuade landing with no expert flows. |
| 8 | Aesthetic and Minimalist Design | 1 | Orbs, grid, noise, gradient text on every heading, badge grids repeated in 3 sections, ~9 generic CTAs. |
| 9 | Error Recovery | 2 | No forms; silent failure: 10 MB SVGs show blank cards on 4G and the video has no poster. |
| 10 | Help and Documentation | n/a | The recetario and "consulta personalizada" are enough for this mode. |
| **Total** | | **12/32** | **Poor (37%)** |

## Design Specificity Verdict

LLM: interchangeable with any coffee brand. Only the facts (Mistrató, 1.950 m, +45 años) and the pack renders are Cumbre's. The structure (orbs, glassmorphism, gradient text, emoji pills, stat counters, a badge grid repeated 3 times) is a generic "premium" template. The real differentiator, protocols designed at the farm (Piña-Whisky), is missing from the process section, which calls itself "Tres métodos tradicionales".

Deterministic: CLI exits 0 with 3 bounce-easing advisories (About.js:243, About.js:393, ProcessComparison.js:379). In the browser: 6 anti-patterns per viewport. They are gradient-text on the hero h2/span, low-contrast on "Comprar ahora" (2.5–3.4:1) and on the mobile price, dark-glow on .modal-content, tiny/undersized text (10–11px), overused-font (Inter 98%) and bounce-easing. Both assessments agree on gradient text and on the contrast of the card CTA.

## Priority Issues

1. [P0] The auto-opening promo modal is off-brand and inaccessible. It shows a "CoffeeTime" pack at "$20.000", its alt text names the Cuarterón 5 lb, Esc does not close it, there is no focus trap, and tapping the image opens WhatsApp. It is the LCP element (2.2 MB). Fix: remove the auto-open; if a promo is needed, use an inline banner next to the real card. Command: /impeccable harden
2. [P0] 65 MB on first load. Six *Molido.svg files at 9.4–11.6 MB each embed rasters and a C2PA manifest, plus Premium.png (2.9 MB) and SachetsModal.png (2.2 MB). Fix: WebP/AVIF at 600–800px under 100 KB with srcset, and a poster on the video. Command: /impeccable optimize
3. [P1] The order contradicts "El proceso es el producto". Price comes before meaning, perfil and notas are hidden, Piña-Whisky is missing from the processes, there is no h1 at the start and there are two h1s in the middle, and formats are mixed with processes. Fix: an h1 hero for producer and origin, process folded into each card, Piña-Whisky shown as a farm fermentation, and Cuarterón/Sachets moved to "Formatos". Command: /impeccable layout (after shape)
4. [P1] Unbacked or contradictory claims. "+150 municipios", "100% Sostenible", "Premium", "Café grado AA premium" (not a Colombian grade), and duplicate prices: Sachets x10 at $20k vs $25k, and the 2×250 combo at $48k vs $50k with the same "antes $58k". Fix: remove them, use only the PRODUCT.md evidence, and keep one price per SKU. Command: /impeccable clarify
5. [P2] Variants and CTAs. Sizes are hidden behind arrows with 454 g as the default; the white "Comprar ahora" fails AA (2.5–3.4:1); ~9 generic CTAs dilute the contextual chat; reduced-motion is ignored by the framer-motion loops (11 infinite); 21 tap targets are under 44px on mobile. Fix: visible size chips, dark text or a #a75911 background, one generic CTA → "Ver cafés", and MotionConfig reducedMotion="user". Commands: /impeccable distill + /impeccable adapt

## Persona Red Flags

- Jordan: hit by the modal before seeing the brand; can't tell what "Honey" means when choosing; "Comprar Ahora" opens an empty chat.
- Casey: 11k px page, blank cards on mobile data, clipped logo, ✕ over the photo, "Desliza" without a carousel.
- Riley: Esc doesn't work, Tab escapes the modal, contradictory prices, fragile #section2 by index, two h1s, reduced-motion ignored.
- Aficionado de especialidad: generic badges instead of farm, protocol, varietal and harvest; notes hidden; grind not stated; nothing confirms shipping or payment before WhatsApp.

## Minor Observations

- Mobile announcement bar takes 48px and clips the logo.
- Raspberry #e0356f badges with emoji clash with the palette.
- The "Premium" render uses a different visual language from the other renders.
- Kit Regalo reuses the Cuarterón image.
- Counters are set in Courier.
- Footer has "Desarrollado con ❤️" and no logo.
- Bounce easing on About and ProcessComparison cards.
- Inter at 98% has no typographic character.

## Questions to Consider

- If the farm's protocols are what nobody can copy, why isn't Piña-Whisky the hero?
- What if the WhatsApp message were the main interface: process → size → order?
- Which image could only exist at this farm (drying patio, tanks, the family at 1.950 m)?
