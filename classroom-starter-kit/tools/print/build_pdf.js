// Turn printable HTML pages into PDFs and report the page count.
// Usage: node build_pdf.js page.html [more.html ...]   ->  page.pdf next to each file
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  for (const f of process.argv.slice(2)) {
    const src = path.resolve(f), out = src.replace(/\.html?$/i, '.pdf');
    await p.goto('file://' + src); await p.pdf({ path: out, format: 'Letter', preferCSSPageSize: true, printBackground: true });
    const pages = (fs.readFileSync(out, 'latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
    console.log(out, pages + (pages === 1 ? ' page' : ' pages'));
  }
  await b.close();
})();
