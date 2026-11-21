"""Example printable builder: writes a student copy and an answer key from one Python template.
Copy this file for each new printable and change the CONTENT section.
Usage: python make_printable.py <output-folder>   (then: node build_pdf.js <folder>/*.html)"""
import sys, os, html
here = os.path.dirname(os.path.abspath(__file__))
CSS = open(os.path.join(here, 'print.css'), encoding='utf-8').read()
out = sys.argv[1] if len(sys.argv) > 1 else '.'

# ---------- CONTENT ----------
TITLE = 'Count and Circle'
DIRECTIONS = 'Count the pictures. Circle the number.'
def apple(x, y): return f'<circle cx="{x}" cy="{y}" r="22" fill="none" stroke="#111" stroke-width="3"/><path d="M{x} {y-22} q2 -12 10 -16" fill="none" stroke="#111" stroke-width="3"/>'
def star(x, y):
    import math
    pts = ' '.join(f'{x + (22 if i % 2 == 0 else 9) * math.sin(i * math.pi / 5):.1f},{y - (22 if i % 2 == 0 else 9) * math.cos(i * math.pi / 5):.1f}' for i in range(10))
    return f'<polygon points="{pts}" fill="none" stroke="#111" stroke-width="3"/>'
def ball(x, y): return f'<circle cx="{x}" cy="{y}" r="22" fill="none" stroke="#111" stroke-width="3"/><path d="M{x-22} {y} h44 M{x} {y-22} v44" stroke="#111" stroke-width="2"/>'
ROWS = [(apple, 3, [2, 3, 4]), (star, 5, [5, 6, 4]), (ball, 4, [3, 5, 4]), (apple, 6, [6, 7, 5])]
# -----------------------------

def picture(fn, n):
    cols = n if n <= 5 else -(-n // 2); rows = -(-n // cols)
    return f'<svg viewBox="0 0 {cols * 60 + 20} {rows * 58 + 6}" style="height:{(rows * 58 + 6) * 1.35:.0f}px">' + ''.join(fn(40 + (i % cols) * 60, 34 + (i // cols) * 58) for i in range(n)) + '</svg>'
def page(key):
    rows = ''.join(f'<div class="row">{picture(fn, n)}<div class="nums">' + ''.join(f'<div class="num{" ans" if c == n else ""}">{c}</div>' for c in choices) + '</div></div>' for fn, n, choices in ROWS)
    flag = " <span class='keyflag'>· KEY</span>" if key else ''
    return f'''<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>{html.escape(TITLE)}</title><style>{CSS}</style></head>
<body class="{'key' if key else ''}"><div class="brandline"></div>
<div class="hdr"><h1>{html.escape(TITLE)}{flag}</h1><div class="name">Name <span class="line"></span></div></div>
<div class="directions"><svg class="icon" viewBox="0 0 44 44"><circle cx="22" cy="22" r="18" fill="none" stroke="#111" stroke-width="4"/><text x="22" y="30" text-anchor="middle" font-size="22" font-weight="800">1</text></svg>{html.escape(DIRECTIONS)}</div>
{rows}
<div class="trace"><svg viewBox="0 0 700 130"><text x="10" y="112">1 2 3 4 5 6 7</text></svg></div>
<div class="footer"><span>Trace the numbers.</span><span></span></div>
</body></html>'''
slug = TITLE.lower().replace(' ', '-')
for key in (False, True):
    p = os.path.join(out, slug + ('-KEY' if key else '') + '.html'); open(p, 'w', encoding='utf-8').write(page(key)); print('wrote', p)
