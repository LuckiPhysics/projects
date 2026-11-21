// Check a screen activity or printable before handing it over.
// Usage: node smoke.js page.html
// Screen activities: projector (1920x1080), classroom laptop (1366x768) and iPad sizes, light + dark, teacher view;
// also the presenter view (?presenter) and script card (?script); steps through every slide with the right-arrow key. Reports errors and anything wider than the screen.
const { chromium, devices } = require('playwright'); const path = require('path');
const U = 'file://' + path.resolve(process.argv[2]);
const sizes = [['projector', { viewport: { width: 1920, height: 1080 } }], ['laptop', { viewport: { width: 1366, height: 768 } }], ['iPad', devices['iPad (gen 7)']]];
(async () => {
  const b = await chromium.launch();
  for (const [label, dev] of sizes) for (const scheme of ['light', 'dark']) for (const q of ['', '?teacher', '?presenter', '?script']) {
    const c = await b.newContext({ ...dev, colorScheme: scheme }); const p = await c.newPage(); const errs = [];
    p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await p.goto(U + q);
    const slides = await p.locator('.slide').count(); let wide = 0, tall = [];
    for (let i = 0; i < 60 && slides; i++) {
      wide = Math.max(wide, await p.evaluate(() => document.documentElement.scrollWidth - innerWidth));
      if (!q) { const t = await p.evaluate(() => { const s = document.querySelector('.slide.active'); if (!s) return 0; const nav = document.querySelector('.bottom').getBoundingClientRect().top; let m = 0; s.querySelectorAll('*').forEach(e => { if (getComputedStyle(e).visibility !== 'hidden' && !e.closest('.notes')) m = Math.max(m, e.getBoundingClientRect().bottom); }); return Math.round(m - nav); }); if (t > 0) tall.push(t); }
      await p.keyboard.press('ArrowRight'); await p.waitForTimeout(40);
    }
    wide = Math.max(wide, await p.evaluate(() => document.documentElement.scrollWidth - innerWidth));
    console.log(label.padEnd(9), scheme.padEnd(5), (q || 'class').padEnd(10), 'slides:', slides, 'too wide by:', wide, 'runs under the buttons:', tall.length ? Math.max(...tall) + 'px' : 'no', 'errors:', errs.length ? errs : 'none');
    if (!q && scheme === 'light') { await p.goto(U); await p.screenshot({ path: `check_${label}.png` }); }
    await c.close();
  }
  await b.close();
})();
