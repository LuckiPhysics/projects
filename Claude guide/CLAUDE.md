# Instructions for Claude: the "Claude for Teachers" guide

This folder supports a Google Doc that Mike Lucki (AP Physics 1 and Honors Physics teacher) writes for his colleagues. The doc is a starter guide to Claude, and also a log of what he has built with it. Read this file first, then `timeline.md` before writing anything new.

## The doc
- **Doc:** "Claude for Teachers:" in Mike's Google Drive. ID `1CesAOD8j9sCBV3wro2wTdSH-8A8Kr9nXGZlC_oDQ1LQ`.
  - https://docs.google.com/document/d/1CesAOD8j9sCBV3wro2wTdSH-8A8Kr9nXGZlC_oDQ1LQ/edit
- **Tabs (as of Nov 18, 2026):**
  1. **Overview** (tab `t.faayrd3citw2`): a short "Start here" landing page (filled Nov 18). It has a two-sentence intro, a "What's in each tab" list (each tab name links to its tab), and a "Where to start" list that links to specific headings in the other tabs.
     - **Keep it in sync.** When a tab is added, renamed, or split, or a linked heading is renamed or removed, update the Overview in the same task. Heading links point at heading IDs, so a deleted or re-created heading breaks its link. The current heading links: "Don't care about the press release…" (`h.op2l9pny2m3m`), "Ok that's great, but I'm a boomer…" (`h.308z89kkwdrt`), and "Interested, but need an example…" (`h.66ssp4m473hd`) in the Claude tab, plus "How Claude walked me through GitHub…" (`h.5x9922zltho`) in the Nov Update tab.
  2. **Claude** (tab `t.0`): the original guide. It covers getting Claude for Teachers, Claude vs. Gemini vs. ChatGPT, getting started with natural speech, the Gemini → Claude prompt workflow, the chemistry and biology examples, and hosting on GitHub.
  3. **Nov Update: Flipping AP1** (tab `t.4tpsmoj0zg0j`): Cowork, the flipped Momentum unit, screenshots, things he didn't expect it to handle, workflow then and now, how Claude walked him through GitHub (with prompts to try), advice for colleagues, and what's next.
  - Tab IDs matter: every Docs edit needs the `tabId`, or it lands in the first tab.
- He may split the doc into smaller tabs or parts later, to make it easier to digest. See `ideas.md`.
- **Draft doc:** the November update was first drafted in a separate doc, "Claude journey update (Fall 2026)" (ID `16UCHsZtEBpn_08D2hxAREK-GFzWnEtVuYGDJtEH0l04`), then pasted into the tab. The tab is the current version; Mike edited it after pasting.

## Audience
- **Readers:** his colleagues. That's mainly a science department of about 24 at a Jesuit high school in Illinois, plus anyone they pass it to.
- **Their equipment:** most teachers use school Windows 11 laptops, and the school runs on Google Workspace.
- **Their experience:** many are new to AI, and some are intimidated by it. They're teachers, not programmers.

## Voice and style
- **Write as Mike,** in first person. Keep it casual and honest, the way you'd talk to a coworker, with a little humor (see the "Claude" tab).
- **Headings:** the original "Claude" tab uses question-style headings ("Interested, but need an example of how to go about doing it?"). The update tab uses short topic headings, with bullets that start with a bold phrase.
- **Keep it short.** Mike trims what he doesn't need. After pasting the update, he cut the github.dev how-to (and marked it "Not recommended"), the privacy bullet, and the "why" questions. So lead with what colleagues can use, and keep details brief.
- **Concrete over general:** a real example, a screenshot, a prompt they can copy.
- **Plain words:** no jargon without a one-line explanation (repository, push, SVG).
- **Accuracy:**
  - Describe only what actually happened. Check `timeline.md` and the source chats; don't invent steps or results.
  - For claims about Claude products (plans, features, what Claude for Teachers includes), check Anthropic's docs or help center first. Products change.

## Ground rules
- **Never change the existing tabs without asking.** Draft new material in a new doc or a new tab, and let Mike paste or approve it. When he asks for an edit in place, use the Docs connector, change only that part, and say what changed.
- **Privacy:** no student names, faces, or work.
  - Screenshots use "Sample Student."
  - Nothing from unreleased exams beyond what's already described, and no links to private materials.
  - Before showing an answer key, check with him.
- **Links:** only to public pages that are live. Mike pushes with GitHub Desktop, so a new page isn't live until he has pushed it.

## Screenshots
- The images in `screenshots/` are the ones used in the November update. Reuse them, or make new ones the same way:
  - Open the page in Playwright at iPad size (gen 7, 810×1080) or laptop size (1366×860), in light mode.
  - For a part of a lesson, screenshot only the card element, and hide the fixed bottom nav first.
  - Save as JPEG at about 900 px wide, quality ~70, to keep uploads small.
- **Getting images into a Google Doc:** the Docs API can only insert images from a public URL. What worked:
  - Build the section as a .docx (python-docx), with the images embedded and real heading and list styles.
  - Upload it with Drive `create_file` as a Word file. It converts to a Google Doc with the images in place.
  - Keep the file under about 400 KB. A ~575 KB upload failed with a quota error; the same doc at ~330 KB worked.
  - Mike then copies the section into his doc.
- **Source pages for screenshots** live in his repos (in `Claude Work` on his laptop):
  - `PhysicsSims/ap1/momentum/` (lessons) and `PhysicsSims/ap1/momentum/index.html` (unit page)
  - `teaching-materials/Energy materials/FRQ review/` (private)
  - The kindergarten starter kit is in `Claude Work/classroom-starter-kit/` (not in any repo, so it does not sync between computers).

## Reading Mike's other Claude chats
He sometimes shares a claude.ai/share link as a source.
- A plain web fetch returns an empty page.
- What works: open it in the built-in browser pane, with Mike signed in to claude.ai there, then read the page text.

## Files here
- `CLAUDE.md`: this file.
- `timeline.md`: what he built and when, with sources. Add to it after each new project.
- `ideas.md`: ideas for future sections, and for breaking the guide into smaller parts.
- `prompts.md`: prompts colleagues can copy, grouped by goal.
- `screenshots/`: images used in the doc.

This folder is in Mike's `projects` repo. If that repo is public, everything here is public too, so keep it free of private details.
