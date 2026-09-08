# PROGRESS / HANDOFF DOC — read this first after context compaction

## Task
User: adult (19+) in Toronto, Ontario, existing daily nicotine vape user.
Goal: most detailed, comprehensive, in-depth research + best-possible review/guide
to the best disposable vapes to buy in Toronto. Deliverable: GitHub Pages-hostable
static website in this repo (root `index.html`, plain HTML/CSS/JS, no build step).

## Workflow rules (from user)
- Push STRAIGHT TO MAIN after every meaningful step. No branches, no PRs.
- Context compaction may happen at any time -> keep this file + `research/` notes updated.
- Credits may run out mid-turn -> commit early, commit often.

## Repo
- Remote: https://github.com/gorg667/vape-research (origin, main)
- GitHub auth: run `setup_github_environment` tool if push fails.

## Plan / Status
- [x] Repo init + PROGRESS.md
- [x] Research phase DONE (research/01..05). Enough to build; can add more later.
  - [ ] Ontario/Canada legal landscape: Health Canada nicotine cap 20 mg/mL, Ontario
        flavour rules (specialty vape stores only for non-tobacco/mint/menthol flavours),
        federal excise stamp (2022+), Ontario provincial vape tax (2024), age 19+,
        Smoke-Free Ontario Act, where legal sales happen (convenience vs specialty)
  - [ ] Legal Canadian-market disposable brands actually sold in Toronto:
        STLTH (Box/Loop/Titan/Pro), Allo (Ultra/Sync/2500/Nano), Vice (Box/Boost/Mega),
        Flavour Beast (Flow/Level X), Elfbar/ELF BAR BC5000-Canada version, Ghost (Mega/XL),
        Ignite, Drip'n by Envi, Boosted, Vuse Go, Geek Bar (Pulse legality?), Lost Mary,
        Level X, Oxbar, Gcore, Kado Bar, Waka (RELX), Zpod, Podjuice, Bazooka etc.
        For each: puff count, battery, capacity, nic strength (20mg cap), rechargeable?,
        coil type (mesh), airflow, screen, Toronto street price, pros/cons, flavours.
  - [ ] Toronto retail: specialty vape shops (chains + independents), price ranges,
        online CA retailers that ship to Toronto, what to avoid (illicit 50mg imports, fakes)
  - [ ] Health/safety/cessation section + battery/e-waste disposal in Toronto
- [x] Build website — DONE (index.html, css/style.css, js/app.js, data/products.json, .nojekyll, README.md)
  - [x] data/products.json (all devices w/ mL, price lo/hi, battery, coil, modes, tier, verdict, score)
  - [x] index.html single page: hero+age notice, TL;DR picks, legal quick-facts, comparison table (sort/filter, $/mL auto), 
        device cards by tier, "how to buy in Toronto" (checklist, shops, delivery), nicotine calculator, health/harm-reduction, disposal,
        methodology + sources, FAQ
  - [x] css/style.css (dark theme, responsive), js/app.js (render table from JSON, sort, filter, calculator)
  - [x] .nojekyll, README.md
- [x] Tested headless (20 rows, 9 picks, 20 reviews, calc OK, 0 JS errors; desktop+mobile screenshots fine)
- [ ] Enable GitHub Pages — API returned 403 (token lacks pages scope). USER must do: repo Settings → Pages → Source: Deploy from branch → main / (root) → Save. Then URL https://gorg667.github.io/vape-research/
- [ ] Optional future: add device images, per-shop price snapshots, more Reddit sentiment, French toggle

## Research log
- Legal: research/01-legal-landscape.md
- Market + user reports: research/02-market-overview.md
- Device specs + $/mL: research/03-device-specs.md (see CORRECTIONS at bottom — Titan Max is 30 mL quad mesh!)
- Toronto retail + disposal: research/04-toronto-retail.md
- Health + nicotine math: research/05-health-and-usage.md

## VERDICTS decided (use these in the site; reasoning documented)
Scoring weights: value ($/mL) 30%, reliability/brand track record 25%, flavour consensus 20%, features 15%, availability in Toronto 10%.
- BEST OVERALL: **STLTH x Geek Bar 80K** — 30 mL, 820 mAh, dual mesh, Normal/Pulse, screen, Toronto company + Geek Bar hardware, $44–49, 
  every retailer stocks it; most cross-source consensus. Runner-up: **STLTH Titan Max 50K** (same 30 mL, quad mesh, 1000 mAh, often cheaper $35–45 — 
  best "value from a trusted brand").
- BEST FLAVOUR / MOST FEATURES: **Flavour Beast Alpha 80K** — physical coil switching, 4 levels, dot-matrix; priciest ($49–53).
- BEST VALUE (pure $/mL, disposable): **Vice Box 2 70K** $37.99/30 mL = $1.27/mL, but single coil + reliability caveats. 
  **Oxbar G100K** $41–43/30 mL, 1000 mAh, triple mode — better hardware for $3 more → our value pick among all-in-ones.
- BEST LONG-RUN VALUE (hybrid): **STLTH Loop Max** ($14 battery + $26–35 30 mL pods) and **Level X G2 Ultra** ($20–34 20 mL pods). Fresh coil each pod, less e-waste.
- BEST MID-SIZE: **Geek Bar Pulse X 25K** (18 mL, 820 mAh, best-regarded flavour, $30–37); alt **Beast Mode Max 2** (20 mL, 4 modes, Level X compatible).
- BEST BUDGET: **Infinity Lean 20K** $24.99 ON; **Elf Bar BC Pro 80K** $32–39 for 25 mL (transparent tank) — cheapest big device.
- BEST COMPACT / LIGHT USER: **Allo Ultra 2500** (10 mL, 1500 mAh non-rechargeable, draw-activated) — pricey per mL but simplest; **Vuse Go 8000** if you must buy at a convenience store.
- STEP-DOWN: **Oxbar G42K** (adjustable nic level), **Orbito Lumo AI** (10 mg option), or refillable pod w/ lower-mg salts.
- AVOID: unstamped/5% imports; brand-new 100K+ no-name brands until track record; anything you can't test-fire in store.

## Decisions / reasoning notes
- Single-page-app-ish static site with a JSON data file for products so table is
  sortable/filterable client-side. Keep everything relative-path so GH Pages works at
  /vape-research/ subpath.


## Status log
- 2026-09-08: Site complete & pushed. Fixed duplicate-id bug (#picks/#reviews -> #picks-grid/#reviews-list). Remaining: turn on GH Pages.
