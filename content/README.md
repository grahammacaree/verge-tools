# Content

Editable copy for the app UI. Change these files and rebuild — no TSX edits needed for wording.

| File | Used for |
|------|----------|
| `home.md` | Home title + intro paragraphs |
| `tools.md` | Left-nav / home grid labels + tool header descriptions |
| `release-notes.md` | Release notes panel |
| `tips/<tool-id>.md` | Per-tool tips, step labels, helper notes, small UI strings |

## Conventions

- **home.md** — first `#` is the page title; following paragraphs (including `_italic_`) are the intro.
- **tools.md** — each `## Label` is a tool; first body line must be `id: tool-id` (must match `ToolId` in code); remaining paragraph(s) are the description.
- **release-notes.md** — `##` title, `###` version / Known Issues (date as following `_italic_` paragraph), `#####` section labels, lists, `` `code` ``.
- **tips/<tool-id>.md** — each `## key` is a string looked up with `tip('tool-id', 'key')` for in-tool UI (placeholders, actions). Header blurbs come from `tools.md` only — live does not show tip paragraphs in the tool header.

Deprecated tools (Image Mosaic, Command Line) may still have tips files on disk; they are not loaded until those tools are re-wired into the nav.

Tool **behavior** and routing still live in `src/`; this folder is copy only.

## How to ship a copy change

1. Edit the markdown under `content/` (or add a new `## key` in a tips file).
2. If you add a **new tool id**, also extend `ToolId` / wire the component in `src/` and import the tips file in `src/lib/content.ts`.
3. Run locally: `pnpm run dev` — hard-refresh if Vite is sticky.
4. Spot-check Home, the tool header, and any tips/notes you touched.
5. Commit the `content/` (and `src/lib/content.ts` if you registered a new tips file).
6. Merge to `main` — GitHub Actions rebuilds Pages; wait for the deploy, then verify live.

Wording-only PRs should only touch `content/` plus release notes if you want the change logged.
