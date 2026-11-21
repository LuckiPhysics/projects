# Instructions for Claude: classroom starter kit

This folder is a teacher's workspace for classroom materials. The approach was first built for a high school physics class and adapted here for any grade, starting with kindergarten.

**Before making anything, read `about-my-class.md`.** If it still has `{{blanks}}`, interview the teacher first. Ask a few questions at a time, in plain language. Fill in the file with her answers and show her the result. Then follow it, and update it whenever she tells you something new about her class.

Be sure the first interview covers these:
- **Her board setup.** Is the smartboard a **separate screen**, or does it **show the same thing as her laptop**? This decides how she sees her notes (see "Teacher notes" below).
- **Her style.** Should screen activities be **calm** (plain, matching her curriculum's simple slides) or **bright**? Show her both examples in `examples/` if she isn't sure. Default to calm.
- **Her curriculum.** Its name, and where her digital copies (PDFs, PowerPoints) are kept.

## Ground rules
- **Ask before changing anything she already has.** Adding new files is fine. Changing her existing files needs her OK first, except the library list (`my-materials/library.json` and `index.html`), which you keep up to date.
- **Plain language.** She's a teacher, not a programmer. Never ask her to run commands or edit code. You run the tools yourself, in your own workspace, then save the finished files into her folder.
- **Everything is self-contained.** No internet needed: no outside fonts, libraries, or images. Inline all CSS and JS, and draw pictures as simple inline SVG. Files must open by double-clicking, on the classroom computer or a smartboard.
- **Original art only.** Draw your own simple shapes and characters. Never use or imitate characters from books, TV, or brands. Never use photos of real children.
- **Student privacy.** Keep student names, health details, and family information out of materials, unless she asks for something private that stays on her computer (like a class list for her own use).
- **School colors as accents only**, set in `about-my-class.md`: a stripe, a button, a card edge. Never full backgrounds.

## The tools (in `tools/`; see `tools/README.md`)
Use these instead of writing new ones, so everything has the same look and feel.
- **Screen activities** (`tools/screen/`): teacher-led pages for the smartboard or projector. Write only the slides (`<section class="slide">`), then build with `build.py` (add `--calm` for the calm style). You get:
  - touch, keyboard, and presentation-clicker controls, full screen, and light/dark
  - step-by-step reveals, tap-to-count, and whole-class choice buttons
  - teacher notes three ways: a 📝 pop-up, presenter view, and a script card
- **Printables** (`tools/print/`): HTML → letter-size PDF. Each printable gets a student copy and, when it has answers, a KEY copy.
- **Library page** (`tools/library/`): one `index.html` in `my-materials/` that lists everything by topic, with buttons to open, show teacher notes, print, and see the key.
- **Combine PDFs** (`tools/combine/`): one file for printing a week or a center packet. Use `--double-sided` if she prints double-sided.
- **Check** (`tools/test/smoke.js`): run on every screen activity before handing it over.
- **Sub plan** (`tools/sub-plan/`): a one-page template. Keep sub plans as short as she likes them; her preference is in `about-my-class.md`.

## Working from her curriculum
Her school uses a set curriculum, and the plan comes from it. These pages support her lessons; they don't replace or redesign them.
- **Read the source first.** When she asks for help with a lesson, ask her for that lesson's files from her curriculum folder (PDF pages, the PowerPoint, or a photo of a manual page). Read them before building.
- **Keep the lesson's order, words, and simplicity.** Match the curriculum's vocabulary and sequence. Keep slides as plain as its slides are: the visual simplicity is intentional, so kids aren't overstimulated.
- **Add value where her current slides can't:**
  1. **Talking points on every slide**, so she doesn't need the manual open. Condense the manual's script into short "Say:" lines and bullets in your own words, plus a reference (unit, lesson, manual page). Don't copy long passages word for word.
  2. **Touch.** Add a tap interaction only where it fits the lesson (count, choose, reveal, sort), so kids can come up to the board. One or two per lesson is plenty.
- **Keep curriculum-based files private.** Leave them on her computer, never on a public website, and don't share them outside her classroom. Her school's curriculum license is what governs how she can use it.

## Teacher notes (how she sees them while teaching)
Every activity opens three ways from the same file:
- **Normal (the board).** Clean slides for the class. 📝 Notes, or the N key, pops this slide's notes up for a quick peek and hides them again on a tap.
- **Presenter view (`?presenter`, or the 🖥 Presenter button).** For her laptop when the board is a separate screen. It shows the current slide, what's next, big talking points, and a timer. ▶ on either the laptop or the board moves both.
- **Script card (`?script`).** Every slide shown small with its notes beside it. Print it, or keep it open on a tablet.

If her board just mirrors her laptop, recommend the 📝 pop-up or a printed script card. If it's a separate screen, recommend presenter view: open the activity, tap 🖥 Presenter, drag the board window to the smartboard, and press ⛶ Full screen there.

## Screen activities (teacher-led)
- **Built for the board.** Huge text and pictures that read from the back of the room. One idea per slide. Few words, since many kids can't read yet. The teacher talks; the slide shows.
- **Calm by default.** Build with `--calm` unless she chose bright: plain background, no animation, one or two colors, one picture or idea per slide.
- **Touch first.** Everything a kid might tap must be big (at least about 2 inches on the board) and spaced apart. The engine already handles taps, a mouse, the keyboard, and presentation clickers.
- **Teacher notes on every slide** (`.notes`). Start with a `<p class="say-line">Say: "..."</p>`, then a short `<ul>` of what to do or look for and the answer if there is one. End with `<p class="ref">Unit _, Lesson _, manual p. _</p>` when it comes from her curriculum.
- **Use the built-in parts:**
  - `.reveal` for step-by-step builds
  - `[data-count]` for counting together
  - `.choices` for whole-class answers (the right answer gets `data-right`)
- **No names, scores, or log-ins.** These are for the whole class together.
- **Must work at projector (1920×1080), laptop (1366×768), and iPad sizes,** in light and dark, in every view (board, presenter, script card), with no sideways scrolling, nothing hidden under the buttons, and no errors. `smoke.js` checks all of this.

## Printables
- **One page unless she asks for more,** letter size, black-and-white friendly (she may print on a copier).
- **Big and clear:** a name line, picture directions (an icon plus a few words), large fonts, and lots of space for small hands.
- **Answer keys** go next to the student copy with `-KEY` in the name.
- **Look at it before handing off:** render the PDF, look at it, and confirm the page count.

## Her library
Save new materials in `my-materials/` (or the subfolder she prefers, by topic or month). Add each one to `my-materials/library.json` and rebuild `index.html`, so she has one page to open each morning. Tell her the file names and where they are.

## Working style
- **Start with the plan.** For a unit or a week, start with a short plan: what's on each day, and which screen activities and printables go with it. Ask her to look it over before building a lot.
- **One sample first.** Make one sample of anything new and let her react before making a whole set.
- **Keep things findable.** Everything goes in this folder so it moves with her. If she uses more than one computer, she can keep this folder in a synced place (like Google Drive for desktop, OneDrive, or GitHub Desktop).
- **When you finish,** say in a sentence or two what you made and where it is. Offer to print-combine, adjust, or make the next one.
