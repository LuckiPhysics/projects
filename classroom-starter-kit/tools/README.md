# Tools (for Claude)

Claude runs these in its own workspace, then saves the finished files into the teacher's folder. They need Python 3, Node with Playwright, `qpdf`, and `pdfinfo`, which Claude's workspace has. The teacher never runs them.

| Folder | What it does | How |
|---|---|---|
| `screen/` | Teacher-led smartboard activities. `screen.css` holds the look, including a calm style and school-color tokens `--brand` and `--accent2`. `screen.js` holds the behavior: touch, keyboard and clicker, full screen, theme, `.reveal` builds, `[data-count]` tap-to-count, and `.choices`. Notes from `.notes` appear as the 📝 pop-up (N key), in presenter view (`?presenter`, which syncs with the board window by postMessage and works from a plain file), on the script card (`?script`), and in preview (`?teacher`). | Write a body file of `<section class="slide">` blocks, then run `python build.py body.html out.html "Title" --calm --brand "#hex" --accent "#hex"`. |
| `print/` | Printables. `print.css` holds the look. `make_printable.py` is a worked example that writes a student copy and a KEY copy from one template. `build_pdf.js` turns HTML into letter PDFs and prints the page count. | Copy `make_printable.py` for each new printable and edit its CONTENT section, then run `node build_pdf.js file.html file-KEY.html`. |
| `library/` | Writes `index.html` for a materials folder from its `library.json`. | `python gen_library.py my-materials` |
| `combine/` | Combines PDFs into one print file. | `python combine_pdfs.py week.pdf a.pdf b.pdf [--double-sided]` |
| `test/smoke.js` | Checks a screen activity at projector, laptop, and iPad sizes, in light and dark, in the board, teacher, presenter, and script-card views. Steps through every slide and reports errors, sideways scroll, and anything hidden under the buttons. | `node smoke.js page.html` |
| `sub-plan/sub-plan.html` | A short one-page sub plan. | Fill in the `{{ }}` parts, then build the PDF with `print/build_pdf.js`. |

The examples in `../examples/` show the finished style. `count-apples-body.html` is the source for `count-apples.html`.
