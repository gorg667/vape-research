# TO·Vape Guide — Best Disposable Vapes in Toronto (2026)

Independent, research-based buyer's guide to legal disposable (and pod-hybrid) nicotine vapes available in Toronto, Ontario, for adults 19+.

**Live site:** https://gorg667.github.io/vape-research/

## What's in it
- **20 devices** compared by e-liquid volume, $/mL, battery, coil, modes, and a documented 0–10 score
- Sortable / filterable comparison table; full pros/cons/verdict review per device
- Plain-English summary of federal + Ontario law (20 mg/mL cap, excise duty math, flavour rules, Bill 125 status)
- Toronto-specific buying guide: 7-point counter checklist, confirmed shop addresses, delivery services, what to avoid
- Cost & nicotine calculator (per day/month/year, cigarette-equivalent, hybrid savings)
- Health / harm-reduction summary from Health Canada, UC Davis, Cochrane
- Disposal rules for Toronto (Household Hazardous Waste)
- Methodology and full source list

## Stack
Plain HTML/CSS/JS, no build step. `data/products.json` drives the table, review cards, picks and calculator. Works on GitHub Pages at a subpath (relative paths; `.nojekyll` present).

## Repo layout
```
index.html          single-page site
css/style.css
js/app.js           render + sort/filter + calculator
data/products.json  device database (edit here to update prices/specs)
research/           raw research notes with source URLs (01 legal, 02 market, 03 specs, 04 retail, 05 health)
PROGRESS.md         handoff / reasoning log
```

## Updating
Edit `data/products.json` (prices are Ontario-stamped, pre-HST). Bump `"updated"`. Commit to `main`; Pages redeploys automatically.

## Disclaimer
No affiliate links, no retailer relationships, no devices physically tested — this is a synthesis of published specs, retailer data, regulatory sources and community reports. Not medical or legal advice. Nicotine is addictive. 19+ in Ontario.
