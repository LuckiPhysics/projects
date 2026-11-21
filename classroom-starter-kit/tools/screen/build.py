"""Build one self-contained screen activity (no internet needed, opens in any browser).
Usage: python build.py <body.html> <output.html> "<Title>" [--calm] [--brand "#7a1f2e" --accent "#e8bf55"]
--calm: plain background, no animation, quiet buttons (for kids who get overstimulated, or to match simple curriculum slides).
The body file holds only the <section class="slide"> blocks (see examples/count-apples-body.html)."""
import sys, os, html
here = os.path.dirname(os.path.abspath(__file__))
args = sys.argv[1:]
def opt(name, default):
    if name in args: i = args.index(name); v = args[i + 1]; del args[i:i + 2]; return v
    return default
brand, accent = opt('--brand', None), opt('--accent', None)
calm = '--calm' in args
if calm: args.remove('--calm')
body_path, out_path, title = args[0], args[1], args[2]
css = open(os.path.join(here, 'screen.css'), encoding='utf-8').read()
js = open(os.path.join(here, 'screen.js'), encoding='utf-8').read()
if brand: css += f'\n  :root {{ --brand: {brand}; }}'
if accent: css += f'\n  :root {{ --accent2: {accent}; }}'
body = open(body_path, encoding='utf-8').read()
page = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{html.escape(title)}</title>
<style>
{css}
</style>
</head>
<body{' class="calm"' if calm else ''}>
<div class="topbar"><span class="title">{html.escape(title)}</span><span class="tools"><button class="tool" id="notesBtn" aria-label="Show my notes" title="Show my notes (N)">📝 Notes</button><button class="tool" id="presBtn" aria-label="Presenter view" title="Open presenter view on this computer">🖥 Presenter</button><button class="tool" id="fsBtn" aria-label="Full screen">⛶ Full screen</button><button class="tool" id="themeBtn" aria-label="Light or dark">◐ Auto</button></span></div>
<main class="stage">
{body}
</main>
<nav class="bottom"><button class="nav back" id="backBtn" aria-label="Back">◀</button><div class="dots" id="dots"></div><button class="nav next" id="nextBtn" aria-label="Next">▶</button></nav>
<script>
{js}
</script>
</body>
</html>
'''
open(out_path, 'w', encoding='utf-8').write(page)
print('built', out_path)
