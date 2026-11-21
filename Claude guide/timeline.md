# Timeline: what Mike has built with Claude

A running log for the guide. Dates are approximate (taken from chat timestamps). Add new entries at the bottom.

## Before November 2026: chat era
- **Workflow:**
  1. Brainstorm a prompt with Gemini.
  2. Paste it into Claude chat.
  3. Copy the HTML.
  4. Upload it by hand on the GitHub website.
- **GitHub:** Gemini helped him set up the account and GitHub Pages (site: luckiphysics.github.io, with Physics, Chemistry, and Biology hubs).
- **Examples in the original "Claude" tab:**
  - Honors Physics toy-car hill simulation (from a quiz question students struggled with)
  - Limiting reactant lab (chemistry)
  - Sliding filament theory (biology)
- **Account:** got verified for Claude for Teachers.

## Nov 2–3: the sick-day lesson (regular Claude chat)
- He was out sick and needed an Honors circuits lesson a non-science sub could run. Claude built a single self-contained HTML lesson on series and parallel circuits.
- He iterated on the wording: "dump" became "deliver," and he wanted volts used more than "joules."
- **Learned along the way:**
  - github.dev for small edits (later marked "not recommended" in the guide)
  - how github.dev differs from GitHub Desktop
  - what "no outside libraries" means
  - how SVG drawings work
- Told Claude that all his students use school iPads, which shaped everything after.
- **The turning point:** asked about partly flipping AP Physics 1. Claude proposed Claude Cowork plus GitHub Desktop, with Claude saving into the cloned repo folder and Mike reviewing, then Commit and Push.
- **Source:** shared chat https://claude.ai/share/3da3a2bb-57f4-4c00-9807-9817e4297ec6

## Nov 9–10: setup
- Asked about privacy (VM vs. a separate account, and what the school's managed Chrome profile can see). Made a separate Windows account, "Teaching," for Cowork, and connected only one folder.
- Installed Claude Desktop and GitHub Desktop, and cloned PhysicsSims into `Documents\Claude Work`.
- Asked how Claude could read his Google Slides directly (through the Google Drive connector).

## Nov 10–12: Momentum unit in Cowork
- **Unit map:** a day-by-day plan built from his slides PDF, calendar, AP CED, binder pages, and Mastering Physics assignments, with openers for each day.
- **ML1 prototype and notes sheet, then CLAUDE.md:** the format rules saved in PhysicsSims so every lesson matches.
- **Site:** reorganized into Simulations, AP Physics 1 Mini-Lessons (by unit), and Honors Physics. Added back links, a teacher view for each lesson (`?teacher`), and an unlisted teacher page.
- **ML2 to ML4:** collisions pre-lab, impulse, force–time graphs. Each has a guided-notes PDF with a QR code, plus an answer key kept in the private teaching-materials repo.
- **Openers deck:** a separate openers and "tonight" closers deck for Google Slides, with a list of where to place each slide and which existing slides to fly through.
- **Combined PDF:** one file with all the notes sheets, for double-sided printing.
- **Honors:** a picture-based "Reading a Multimeter" activity.
- **Sync:** set up the private `teaching-materials` repo; GitHub Desktop syncs home and work.

## Nov 12–13
- **Sub days (Nov 17–18):** a self-checking impulse practice page, a "Making Sense of Lab 4.1" page, a Quiz 4.1 review page, and one-page sub plans.
- **School colors:** samples of maroon-and-gold accents; he picked "Sample C" (a gold card edge and maroon buttons) and it was applied site-wide.
- **Toolkit:** build scripts saved to `teaching-materials/tools`, and a workflow section added to CLAUDE.md, so new tasks stay consistent.
- **ML5:** conservation of momentum, the 5-step method, and the momentum-bars activity.
- **Learned:** Cowork Projects, linking a task to whichever computer he's on, and running two tasks at once.

## Nov 14: kindergarten starter kit
- A general version of the kit for his wife's kindergarten class:
  - an instructions file, an "about my class" interview, and calm touch-friendly smartboard activities
  - three ways to see notes: a pop-up, a presenter view that syncs the laptop and the board, and a printable script card
  - printables and a library page
- Designed around her set curriculum.

## Nov 15–16
- **ML6:** ballistic pendulum pre-lab. It's an open-design lab, so the lesson gives tools, not a procedure.
- **Quiz check:** he uploaded Quiz 4.1. Claude mapped each question to where it was practiced and flagged gaps. He kept some gaps as intentional stretch questions and added one third-law-pair question to the review page.
- **FRQ review:** a simulation and step-by-step derivation for a Unit 3 FRQ (block off a ramp) that went badly. It's unreleased, so it's kept private in `teaching-materials/Energy materials/FRQ review/`.
- **Corrected a preference:** a sub-plan preference had been saved too broadly, and Mike corrected it (bare-minimum sub plans are for Honors only).

## Nov 17–18: the guide update
- Drafted the November update (with 8 screenshots) as a separate Google Doc, then pasted it into a new tab.
- Rewrote the GitHub section from the shared sick-day chat: how Claude walked him through GitHub, plus prompts to try.
- Created this folder.

## Nov 18–20: finishing the Momentum unit
- **ML7–ML9:** elastic vs. inelastic with bar charts (optional, due after Thanksgiving), explosions and three-object systems, and momentum vs. energy as the test review. All nine mini-lessons are built, each with a notes sheet and KEY.
- **A notation rule:** Mike found primes (v′) hard for students to track, so from ML6 on the lessons use i/f subscripts, and points a, b, c, d for multi-stage problems. The rule went into CLAUDE.md so later lessons follow it, and ML6 and ML7 were updated.
- **Catching mistakes:** Mike flagged a ramp diagram in ML9 that showed the wrong moment at "c" and blocks floating off the track. Claude redrew it on the lesson and the notes sheet. Claude also caught an answer choice in ML7 that was physically possible when it was meant to be wrong.
- **Using Claude as a second reader:** checking a colleague's worksheet answers (and finding a problem labeled "elastic" that wasn't), whether a student's work–energy derivation was right when the key expected FΔt (it was), which binder problems students could do after a given lesson, and which slide numbers to tag "covered in mini-lesson."
- **Unit map refreshed** to match what was actually built, with the open items left for Mike.
- **Starter kit moved** into the `projects` repo so it syncs between computers.

## Other projects (separate tasks; see their own folders in this repo)
- `sub-tracker/`: department sub-coverage tracker (Google Sheet + Apps Script) for the school's new planned-absence policy.
- `homework-checker/`: previews students' OnCampus homework downloads and builds a scores column for the gradebook.
- **Honors Circuits:** a current-lab pre-lab, a lab help page, and shareable copies for colleagues (in PhysicsSims).
