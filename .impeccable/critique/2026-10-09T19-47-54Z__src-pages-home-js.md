---
target: home
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/home/claude/site/src/pages/Home.js"
target_fingerprint: "sha256:d602e4aa10e966a01cb372d6c61f5b5f10981e2c27a019face4555cf68789af3"
target_path: /home/claude/site/src/pages/Home.js
timestamp: 2026-10-09T19-47-54Z
slug: src-pages-home-js
---
Method: dual-agent (A: ae030de4dc7c54f7a · B: a54a9b1765907dde0)

Target: home (src/pages/Home.js), "Billete de serie" build. Persuade mode.

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of status | 3 | "PEDIDO ENVIADO" stamp claims a send that only opened WhatsApp |
| 2 | Match real world | 2 | Ticket jargon in controls (Fracción, Desprender, Ver billete); "Presentación" means grind in UI, size in message |
| 3 | User control | 3 | Stub disappears 3.2 s after tear |
| 4 | Consistency | 2 | Proceso X vs Piña-Whisky; Regalos vs Serie especial; Whiskey vs Whisky; Kit = Combo at different prices |
| 5 | Error prevention | 3 | Silent "Grano entero" default; contradictory x10 prices |
| 6 | Recognition | 3 | Mobile order bar omits grind |
| 7 | Flexibility | n/a | Persuade landing |
| 8 | Aesthetic/minimal | 3 | Finca section ~1,800 px of placeholder engravings on mobile |
| 9 | Error recovery | 2 | No visible phone number near the CTA for desktop users without WhatsApp |
| 10 | Help | n/a | Footer "¿No sabes cuál elegir?" covers it |
| **Total** | | **21/32** | **Acceptable (66%)** |

Specificity: authored for this brand (process inks repaint the page, origin microtext, perforated WhatsApp stub). Weakness: specificity lives in the print, not the coffee; finca/family still placeholders. Detector: CLI 0; browser 4 desktop / 11 mobile (nested-cards x2 and stripes = intentional world; low-contrast 4.3:1 on .stub-label over stripe lines; 7 undersized 9-10px labels on mobile).

Priority issues
1. [P1] Contradictory prices and unverified "antes" prices (Kit vs Combo, drips x10 $20k vs $25k) -> clarify
2. [P1] "PEDIDO ENVIADO" is false -> clarify/harden
3. [P1] Page opens on the lot it explains least (Piña-Whisky has no steps); mobile hides "Cómo se hace" -> layout/clarify
4. [P2] Visible "Ilustración provisional" captions; three similar engravings -> distill
5. [P2] Ticket wording in controls and mobile 9-10px labels -> clarify/typeset

Personas: Jordan (jargon, no payment info), Casey (order bar Pedir scrolls instead of ordering, 9 px labels), Riley (price contradictions, reduced-motion crossfade ghost, Natural title wrap jumps stub), Aficionado ("infusionado" reads as flavored coffee, no roast/harvest date, message omits process).

Minor: stray underline in active table row; unbacked "más pedidos"/"cantidades pequeñas"; rsms.me Inter request still in index.html; CLS 0.02 from font swap.

Questions: Would removing ticket words from the copy lose any order? Why open on the least-explained lot? Once a real family photo exists, does it replace the engravings?
