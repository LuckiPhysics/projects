"""Builds index.html: one page that lists everything in a materials folder, grouped by topic.
The list lives in library.json in that folder. Usage: python gen_library.py <folder>
library.json: {"title": "Mrs. ___'s Classroom", "items": [{"topic": "Math", "title": "Counting Apples",
  "kind": "screen" | "printable", "file": "count-apples.html", "pdf": "count-and-circle.pdf", "key": "...-KEY.pdf", "about": "one line"}]}"""
import sys, os, json, html
folder = sys.argv[1] if len(sys.argv) > 1 else '.'
data = json.load(open(os.path.join(folder, 'library.json'), encoding='utf-8'))
topics = {}
for it in data['items']: topics.setdefault(it.get('topic', 'Other'), []).append(it)
def card(it):
    links = []
    if it.get('file'): links.append(f'<a class="pri" href="{html.escape(it["file"])}">{"Open on the board" if it.get("kind") == "screen" else "Open"}</a>')
    if it.get('kind') == 'screen' and it.get('file'):
        links.append(f'<a href="{html.escape(it["file"])}?presenter">Presenter view</a>')
        links.append(f'<a href="{html.escape(it["file"])}?script">Script card</a>')
    if it.get('pdf'): links.append(f'<a href="{html.escape(it["pdf"])}">Print (PDF)</a>')
    if it.get('key'): links.append(f'<a href="{html.escape(it["key"])}">Answer key</a>')
    tag = 'On screen' if it.get('kind') == 'screen' else 'Printable'
    return f'<div class="card"><span class="tag">{tag}</span><h3>{html.escape(it["title"])}</h3><p>{html.escape(it.get("about", ""))}</p><div class="links">{"".join(links)}</div></div>'
secs = '<p class="sub">Nothing here yet. Ask Claude to make your first activity, and it will show up here.</p>' if not topics else ''.join(f'<h2>{html.escape(t)}</h2><div class="grid">{"".join(card(i) for i in items)}</div>' for t, items in topics.items())
brand = data.get('brand', '#1d4ed8'); accent = data.get('accent', '#f59e0b')
page = f'''<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(data["title"])}</title><style>
:root{{--bg:#f6f7fa;--card:#fff;--ink:#1b2233;--muted:#5d667a;--line:#dfe3ec;--brand:{brand};--accent:{accent}}}
@media (prefers-color-scheme:dark){{:root{{--bg:#10151f;--card:#1b2333;--ink:#f1f4fa;--muted:#a6afc2;--line:#313b50}}}}
body{{margin:0;background:var(--bg);color:var(--ink);font:17px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif}}
.wrap{{max-width:1000px;margin:0 auto;padding:24px 16px 48px}} h1{{margin:0 0 4px;font-size:30px}} .sub{{color:var(--muted);margin:0 0 18px}}
h2{{font-size:15px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);margin:26px 0 10px}}
h2::before{{content:"";display:inline-block;width:18px;height:3px;background:var(--brand);vertical-align:middle;margin-right:8px}}
.grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px}}
.card{{background:var(--card);border:1px solid var(--line);border-top:5px solid var(--accent);border-radius:14px;padding:16px;display:flex;flex-direction:column}}
.card h3{{margin:6px 0 4px;font-size:20px}} .card p{{margin:0 0 12px;color:var(--muted);font-size:15px;flex:1}}
.tag{{align-self:flex-start;font-size:12px;font-weight:700;border-radius:99px;padding:2px 10px;background:var(--line)}}
.links{{display:flex;flex-wrap:wrap;gap:8px}} .links a{{min-height:44px;display:inline-flex;align-items:center;padding:0 12px;border-radius:10px;border:2px solid var(--line);color:var(--ink);text-decoration:none;font-weight:700;font-size:15px}}
.links a.pri{{background:var(--brand);border-color:var(--brand);color:#fff}}
</style></head><body><div class="wrap"><h1>{html.escape(data["title"])}</h1><p class="sub">Everything Claude has made for my class. Tap to open; PDFs are ready to print.</p>{secs}</div></body></html>'''
open(os.path.join(folder, 'index.html'), 'w', encoding='utf-8').write(page); print('wrote', os.path.join(folder, 'index.html'), sum(len(v) for v in topics.values()), 'items')
