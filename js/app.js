/* Toronto Disposable Vape Guide — app.js
   Loads data/products.json, renders: top picks, comparison table (sort/filter), review cards, calculator.
   Pure vanilla JS, relative paths (works on GitHub Pages subpath). */
(function () {
  'use strict';

  // ---------- Age gate ----------
  const gate = document.getElementById('agegate');
  if (gate) {
    if (localStorage.getItem('tdv_age_ok') === '1') gate.remove();
    document.getElementById('age-yes')?.addEventListener('click', () => {
      localStorage.setItem('tdv_age_ok', '1'); gate.remove();
    });
    document.getElementById('age-no')?.addEventListener('click', () => {
      location.href = 'https://www.canada.ca/en/health-canada/services/smoking-tobacco/vaping.html';
    });
  }

  // ---------- Excise duty (Ontario) ----------
  // Federal $1.12 per 2 mL (first 10 mL) + $1.12 per 10 mL after; Ontario additional duty = same again.
  function dutyON(ml) {
    const rate = 1.12 * 2; // fed + ON
    const first = Math.min(ml, 10);
    const rest = Math.max(ml - 10, 0);
    return Math.ceil(first / 2) * rate + Math.ceil(rest / 10) * rate;
  }

  const fmt = n => '$' + n.toFixed(2);
  const TIER_LABEL = { ultra: 'Ultra (25–40 mL)', mid: 'Mid (18–20 mL)', hybrid: 'Pod-hybrid (reusable battery)', compact: 'Compact (≤15 mL)' };
  const TIER_ORDER = ['ultra', 'hybrid', 'mid', 'compact'];

  let DATA = null;
  let sortKey = 'score', sortDir = -1;
  let tierFilter = 'all';
  let query = '';

  fetch('data/products.json').then(r => r.json()).then(d => {
    DATA = d;
    d.products.forEach(p => {
      p.priceMid = (p.priceLow + p.priceHigh) / 2;
      p.perMl = p.priceMid / p.ml;
      p.perMlLow = p.priceLow / p.ml;
      p.duty = dutyON(p.ml);
      p.nicTotal = p.ml * p.nic;
    });
    document.querySelectorAll('[data-updated]').forEach(e => e.textContent = d.updated);
    renderPicks(); renderTable(); renderReviews(); populateCalc(); calc();
  }).catch(e => {
    document.getElementById('table-body').innerHTML = '<tr><td colspan="9">Could not load data/products.json — ' + e + '</td></tr>';
  });

  // ---------- Top picks ----------
  function renderPicks() {
    const picks = [
      ['stlth-geekbar-80k', 'Best overall'],
      ['stlth-titan-max', 'Best value from a trusted brand'],
      ['stlth-loop-max', 'Best long-run value (hybrid)'],
      ['fb-alpha-80k', 'Best flavour & features'],
      ['oxbar-g100k', 'Best value all-in-one'],
      ['geek-bar-pulse-x', 'Best mid-size / pocketable'],
      ['elfbar-bc-pro-80k', 'Best budget big device'],
      ['infinity-lean-20k', 'Cheapest legit device'],
      ['oxbar-g42k', 'Best for cutting nicotine'],
    ];
    const el = document.getElementById('picks');
    el.innerHTML = picks.map(([id, award]) => {
      const p = DATA.products.find(x => x.id === id); if (!p) return '';
      return `<a class="card pick" href="#rev-${p.id}" style="text-decoration:none;color:inherit">
        <div class="award">${award}</div>
        <h3>${p.name}</h3>
        <div><span class="price">${fmt(p.priceLow)}–${fmt(p.priceHigh)}</span> <span class="muted small">· ${p.ml} mL · ${fmt(p.perMl)}/mL</span></div>
        <p class="why">${p.verdict.split('. ')[0]}.</p>
        <span class="tag accent">Score ${p.score}/10</span></a>`;
    }).join('');
  }

  // ---------- Table ----------
  const COLS = [
    ['name', 'Device', false],
    ['tier', 'Tier', false],
    ['ml', 'mL', true],
    ['puffs', 'Rated puffs', true],
    ['priceLow', 'Price (ON)', true],
    ['perMl', '$/mL', true],
    ['batteryMah', 'Battery', true],
    ['coil', 'Coil / modes', false],
    ['score', 'Score', true],
  ];
  function renderTable() {
    const head = document.getElementById('table-head');
    head.innerHTML = '<tr>' + COLS.map(([k, label]) =>
      `<th data-k="${k}" class="${k === sortKey ? 'sorted' : ''}">${label}<span class="dir">${k === sortKey ? (sortDir > 0 ? '▲' : '▼') : ''}</span></th>`).join('') + '</tr>';
    head.querySelectorAll('th').forEach(th => th.onclick = () => {
      const k = th.dataset.k;
      if (sortKey === k) sortDir *= -1; else { sortKey = k; sortDir = COLS.find(c => c[0] === k)[2] ? -1 : 1; if (k === 'perMl' || k === 'priceLow') sortDir = 1; }
      renderTable();
    });

    let rows = DATA.products.filter(p => tierFilter === 'all' || p.tier === tierFilter)
      .filter(p => !query || (p.name + ' ' + p.brand + ' ' + p.flavourExamples).toLowerCase().includes(query));
    rows.sort((a, b) => {
      let va = a[sortKey], vb = b[sortKey];
      if (va == null) va = sortDir > 0 ? Infinity : -Infinity;
      if (vb == null) vb = sortDir > 0 ? Infinity : -Infinity;
      if (typeof va === 'string') return va.localeCompare(vb) * sortDir;
      return (va - vb) * sortDir;
    });
    const maxMl = 40;
    document.getElementById('table-body').innerHTML = rows.map(p => `<tr>
      <td><a class="name" href="#rev-${p.id}" style="text-decoration:none">${p.name}</a><div class="sub">${p.brand}${p.award ? ' · <span class="tag accent">' + p.award + '</span>' : ''}</div></td>
      <td><span class="tag">${p.tier}</span>${p.format === 'pod system' ? '<div class="sub">pod system</div>' : ''}</td>
      <td class="num"><b>${p.ml}</b><div class="bar"><i style="width:${p.ml / maxMl * 100}%"></i></div></td>
      <td class="num">${p.puffs.toLocaleString()}<div class="sub">${p.puffsNote || ''}</div></td>
      <td class="num">${fmt(p.priceLow)}${p.priceHigh > p.priceLow ? '–' + fmt(p.priceHigh) : ''}${p.priceNote ? '<div class="sub">' + p.priceNote + '</div>' : ''}</td>
      <td class="num"><b>${fmt(p.perMl)}</b><div class="sub">duty ${fmt(p.duty)}</div></td>
      <td class="num">${p.batteryMah ? p.batteryMah + ' mAh' : '<span class="muted">n/a</span>'}<div class="sub">${p.rechargeable ? 'USB-C' : 'non-rechargeable'}</div></td>
      <td>${p.coil}<div class="sub">${p.modes}</div></td>
      <td class="num"><span class="score ${p.score >= 8.5 ? 'hi' : p.score >= 7.5 ? 'mid' : 'lo'}">${p.score}</span></td>
    </tr>`).join('') || '<tr><td colspan="9" class="muted">No devices match.</td></tr>';
    document.getElementById('table-count').textContent = rows.length + ' of ' + DATA.products.length + ' devices';
  }
  document.querySelectorAll('#tier-chips .chip').forEach(c => c.onclick = () => {
    document.querySelectorAll('#tier-chips .chip').forEach(x => x.classList.remove('active'));
    c.classList.add('active'); tierFilter = c.dataset.tier; renderTable();
  });
  document.getElementById('table-search').oninput = e => { query = e.target.value.trim().toLowerCase(); renderTable(); };

  // ---------- Review cards ----------
  function renderReviews() {
    const el = document.getElementById('reviews');
    let html = '';
    TIER_ORDER.forEach(t => {
      const items = DATA.products.filter(p => p.tier === t).sort((a, b) => b.score - a.score);
      if (!items.length) return;
      html += `<div class="tierhead"><h3>${TIER_LABEL[t]}</h3><span class="muted small">${items.length} devices · sorted by score</span></div>`;
      html += items.map(p => `<article class="review" id="rev-${p.id}">
        <header>
          <div><h3>${p.name}</h3><div class="muted small">${p.brand} · ${p.origin} · released ${p.released}</div></div>
          <div style="text-align:right"><span class="score ${p.score >= 8.5 ? 'hi' : p.score >= 7.5 ? 'mid' : 'lo'}" style="font-size:1.2rem">${p.score}</span>${p.award ? '<div><span class="tag accent">' + p.award + '</span></div>' : ''}</div>
        </header>
        <div class="specs">
          <div><b>E-liquid</b>${p.ml} mL${p.nicOptions ? ' · ' + p.nicOptions : ' · 20 mg/mL'}</div>
          <div><b>Rated puffs</b>${p.puffs.toLocaleString()}${p.puffsNote ? ' <span class="muted">(' + p.puffsNote + ')</span>' : ''}</div>
          <div><b>Battery</b>${p.batteryMah ? p.batteryMah + ' mAh' : 'undisclosed'} · ${p.rechargeable ? 'USB-C' : 'not rechargeable'}</div>
          <div><b>Coil</b>${p.coil}</div>
          <div><b>Modes</b>${p.modes}</div>
          <div><b>Airflow</b>${p.airflow}</div>
          <div><b>Screen</b>${p.screen}</div>
          <div><b>Flavours</b>~${p.flavours}</div>
          <div><b>Toronto price</b>${fmt(p.priceLow)}–${fmt(p.priceHigh)}${p.priceNote ? ' <span class="muted">(' + p.priceNote + ')</span>' : ''}</div>
          <div><b>$/mL (mid)</b>${fmt(p.perMl)}</div>
          <div><b>Excise duty inside price</b>${fmt(p.duty)}</div>
          <div><b>Total nicotine</b>${p.nicTotal.toLocaleString()} mg</div>
        </div>
        <div class="small"><b>Flavour examples:</b> <span class="muted">${p.flavourExamples}</span></div>
        <div class="procon">
          <div class="pro"><h4>Pros</h4><ul>${p.pros.map(x => '<li>' + x + '</li>').join('')}</ul></div>
          <div class="con"><h4>Cons</h4><ul>${p.cons.map(x => '<li>' + x + '</li>').join('')}</ul></div>
        </div>
        <div class="verdict"><b>Verdict:</b> ${p.verdict}</div>
        <div class="srcs">Sources: ${p.sources.join(' · ')}</div>
      </article>`).join('');
    });
    el.innerHTML = html;
  }

  // ---------- Calculator ----------
  function populateCalc() {
    const sel = document.getElementById('calc-device');
    sel.innerHTML = DATA.products.slice().sort((a, b) => a.name.localeCompare(b.name))
      .map(p => `<option value="${p.id}">${p.name} — ${p.ml} mL, ${fmt(p.priceMid)}</option>`).join('');
    sel.value = 'stlth-geekbar-80k';
    ['calc-device', 'calc-days', 'calc-price'].forEach(id => document.getElementById(id).addEventListener('input', calc));
    document.getElementById('calc-device').addEventListener('change', () => { document.getElementById('calc-price').value = ''; calc(); });
  }
  function calc() {
    const p = DATA.products.find(x => x.id === document.getElementById('calc-device').value);
    const days = Math.max(parseFloat(document.getElementById('calc-days').value) || 7, 0.5);
    const priceIn = parseFloat(document.getElementById('calc-price').value);
    const price = priceIn > 0 ? priceIn : p.priceMid;
    const priceTax = price * 1.13;
    const mlDay = p.ml / days;
    const nicDay = mlDay * p.nic;              // mg nicotine consumed/day
    const nicAbs = nicDay * 0.4;               // ~40% absorbed (rough midpoint of 30–50%)
    const cigEq = nicAbs / 1.2;                // ~1–1.5 mg absorbed per cigarette
    const perDay = priceTax / days;
    const perMonth = perDay * 30.4, perYear = perDay * 365;
    const devicesYear = 365 / days;
    // hybrid comparison: STLTH Loop Max pods ~ $30.87 mid / 30 mL
    const loop = DATA.products.find(x => x.id === 'stlth-loop-max');
    const loopPerMl = loop.priceMid / loop.ml;
    const loopYear = mlDay * 365 * loopPerMl * 1.13 + 14 * 1.13;
    const rng = cls => `<span class="${cls}">`;
    document.getElementById('calc-out').innerHTML = `
      <div class="big">${fmt(perDay)} / day · ${fmt(perMonth)} / month · ${fmt(perYear)} / year</div>
      <p class="muted small">Includes 13% HST. Assumes ${fmt(price)} per ${p.name} lasting ${days} day${days === 1 ? '' : 's'} → ${mlDay.toFixed(1)} mL/day → about ${devicesYear.toFixed(0)} devices a year${p.format === 'disposable' ? ' (that\'s ' + devicesYear.toFixed(0) + ' lithium batteries)' : ''}.</p>
      <table><tr><th>Metric</th><th>Value</th><th>Context</th></tr>
        <tr><td>Nicotine consumed</td><td class="num">${nicDay.toFixed(0)} mg/day</td><td class="muted">20 mg/mL × ${mlDay.toFixed(1)} mL</td></tr>
        <tr><td>Nicotine absorbed (est.)</td><td class="num">≈ ${nicAbs.toFixed(0)} mg/day</td><td class="muted">~40% of aerosolised nicotine is absorbed; varies widely</td></tr>
        <tr><td>Cigarette equivalent</td><td class="num">≈ ${cigEq.toFixed(0)} cigarettes/day (${(cigEq / 20).toFixed(1)} packs)</td><td class="muted">at ~1.2 mg absorbed per cigarette. ${cigEq > 40 ? rng('tag danger') + 'Very high intake' : cigEq > 20 ? rng('tag warn') + 'Heavy' : rng('tag ok') + 'Moderate'}</span></td></tr>
        <tr><td>Excise duty you pay</td><td class="num">${fmt(p.duty * devicesYear)} / year</td><td class="muted">${fmt(p.duty)} per device (fed + ON)</td></tr>
        <tr><td>Same mL via STLTH Loop Max pods</td><td class="num">${fmt(loopYear)} / year</td><td class="muted">Saves ≈ ${fmt(Math.max(perYear - loopYear, 0))}/yr vs this device${perYear - loopYear < 0 ? ' (this device is already cheaper per mL)' : ''}</td></tr>
      </table>`;
  }
})();
