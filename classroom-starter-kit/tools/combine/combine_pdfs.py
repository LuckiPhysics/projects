"""Combine several PDFs into one file for one-click printing (e.g., a week of printables, or a center packet).
Usage: python combine_pdfs.py out.pdf first.pdf second.pdf ...  [--double-sided]
With --double-sided, any file with an odd page count gets a blank page after it, so each one starts on a fresh sheet."""
import sys, subprocess, re, os
args = sys.argv[1:]; dbl = '--double-sided' in args; args = [a for a in args if a != '--double-sided']
out, files = args[0], args[1:]
here = os.path.dirname(os.path.abspath(__file__)); blank = os.path.join(here, 'blank.pdf')
def pages(f): return int(re.search(r'Pages:\s+(\d+)', subprocess.run(['pdfinfo', f], capture_output=True, text=True).stdout).group(1))
parts = []
for i, f in enumerate(files):
    parts += [f, '1-z']
    if dbl and pages(f) % 2 == 1 and i < len(files) - 1: parts += [blank, '1']
subprocess.run(['qpdf', '--empty', '--pages', *parts, '--', out], check=True)
print(out, pages(out), 'pages')
