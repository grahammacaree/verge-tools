# History: why pre-2.0 commits look bizarre

If you open the early history of this GitHub Pages site and see a tree that looks like a **published build** — minified HTML/JS/CSS, no real source layout, odd commit shapes — that is intentional context, not a mysterious bad habit.

## Constraints at the time

When these tools were first written, editorial engineers **did not have access to Duet internals**. The practical escape hatch was:

1. Author tooling as a **Chorus/Duet story** (the environment we *could* use).
2. **Publish** that story so the platform would emit a built artefact.
3. That artefact was **minified, condensed HTML / JS / CSS** — a shippable page, not a maintainable app repo.

We did **not** want a public Verge story titled something like “Verge tooling.” So the build output was treated as the thing of record: copied into what became this **GitHub repo** and served via **GitHub Pages**.

In other words: the “repo” for a long time *was* the build artefact. Commits look like product dumps because they *were* product dumps.

## Why it stays separate from Duet

Even with Duet access today, these tools remain their own app so Art tooling can ship on a short loop (GitHub Pages / a future Verge tools host) without Duet release cadence. The site platform and this editorial toolbox are different products.

## What 2.0 changes

The TypeScript / React rebuild in this tree is the first time the tools are a normal source project (Vite, readable modules, `content/` copy, docs). Deploy is still static Pages, but the git history from here forward should look like ordinary application development.

`legacy/` in the working tree (Sass, `image_mosaic.js`, etc.) is reference material recovered for parity work — not the live publish pipeline. Image Mosaic and Command Line are **deprecated** in 2.0 (unused); `legacy/` can go once you no longer need it for any remaining published-tool comparisons.

## Reading old history

- Do not expect clean PR-sized diffs or component boundaries before 2.0.
- Prefer `src/`, `content/`, and `docs/` as the source of truth going forward.
- Behavioral questions about Mosaic / scrapers can still be answered by comparing to `legacy/` or the previously published Pages build, with the above caveats.
