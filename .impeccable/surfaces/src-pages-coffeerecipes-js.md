---
version: 1
slug: "src-pages-coffeerecipes-js"
primary_target: "src/pages/CoffeeRecipes.js"
related_targets: []
---

# Recetario (src/pages/CoffeeRecipes.js)

Mode: Read. Surface inside the established "Billete de serie" world (DESIGN.md); no new identity.

Audience: home brewers and Cumbre customers who want a recipe to prepare now. Job: find a recipe (by temperature or index) and follow ingredients and steps.
Content: 54 recipes from src/data/coffeeRecipes.js (36 calientes, 14 frías, 4 ambas), each with photo, ingredients and steps. No product pairing per recipe (user declined); one store link per sheet to /#serie.
Constraints: data file untouched; photos served as WebP 480/960 from public/recetario/web.

## Direction contract

THESIS: The recipe book is a talonario: one numbered sheet per recipe, paged like a ticket booklet; refuses the card grid with accordions.
OWN-WORLD: Inherits billete.css. Temperature picks the ink (caliente honey, fría natural, ambas lavado); sheets on tinted stock with microtext, second-ink issuer rule, giant serial, double-ruled photo frame, perforated counterfoil linking to the store.
STORY: The visitor filters by temperature or opens the index, reads one sheet at a time, pages with arrows or keyboard, and can jump to buy coffee.
FIRST VIEWPORT: Title "Recetario" with lede; left a sticky index (temperature filters with counts, grouped list); right the current sheet: issuer "Hoja NN de 54", serial and name, photo, ingredients and steps; pager below. Mobile: filters and an index toggle above the sheet, sticky pager at the thumb.
FORM: Talonario (booklet), structure 5 of 7, surface seed key 284ee2e8 (degraded roll).
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
