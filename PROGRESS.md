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
- [ ] Research phase (save raw notes into `research/*.md` as we go)
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
- [ ] Build website (index + brand pages or single-page with sections, comparison table,
      filter/sort JS, methodology, sources list)
- [ ] Final polish, README, verify GH Pages renders

## Research log (append as you go — cite URLs)
(empty)

## Decisions / reasoning notes
- Single-page-app-ish static site with a JSON data file for products so table is
  sortable/filterable client-side. Keep everything relative-path so GH Pages works at
  /vape-research/ subpath.
