# Roadmap

Ordered plan for taking the 2.0 rebuild from “usable locally” to staff-ready tooling. Do not skip phases that later ones depend on (especially **2 before 3**).

## 1. Bring published tools to parity with live

Goal: Graham (and Art) can use the Pages app as a drop-in replacement for [live](https://grahammacaree.github.io/verge-tools/) for tools that still ship.

**In scope for 2.0 publish:** Article Scraper, Decoder, Installer, Verge Filter, AI Label.

**Deprecated (unused; not parity blockers):** Image Mosaic, Command Line. Source and tips remain under `src/tools/` and `content/tips/` for a later revive; they are not in the nav. Shared pipeline fixes (ingest, capture, chrome) still apply if they help those folders compile or if Art asks for them back.

- Side-by-side pass per **published** tool: layout, chrome, empty states, drop/paste/upload, adjust, download output.
- Fix remaining CSS / interaction gaps vs live for the in-scope set.
- Capture: confirm 2× JPEG (quality 0.9) is acceptable for CMS/social. Adjust only if Art rejects it.
- Intentionally **not** parity: Polygon Scraper (dropped); Mosaic + Command Line (deprecated); soft gate stays until phase 2.

**Done when:** every published Verge tool on the rebuild matches live for day-to-day editorial use.

## 2. Improve login security (more friction for bad actors)

Goal: raise the bar without pretending the public Pages bundle can hold real secrets.

Preferred first step (discussed):

- Tiny **edge/API** (Worker / Lambda / similar) with a server-side secret.
- Session cookie after successful unlock; gate UI calls the API instead of (or in addition to) the client hash.
- Soft client gate can remain as a first door; the API is the real friction.

Later upgrade path (same shape): Verge/GitHub SSO or privilege-session validation when the app sits on a Verge domain.

**Done when:** unlocking requires a server check; casual cloning of the static hash no longer unlocks privileged paths.

## 3. Integrate with S3 (write-only, scoped)

Goal: staff tools can publish assets to Vox S3 without exposing write credentials in the browser.

- API (from phase 2) holds IAM; browser gets **short-lived presigned PUTs** only.
- **Write to a specific prefix/folder only** — never list-delete or overwrite policy unless Art explicitly asks.
- **No delete** from this tooling (IAM omit `s3:DeleteObject`).
- Public/CDN read path documented for HTML blocks that reference uploaded objects.

Depends on phase 2: outsiders must not be able to call `/presign`.

**Done when:** authenticated session can upload to the agreed prefix; unauthenticated requests fail; nothing in this app can delete S3 objects.

## 4. Add new tooling

Goal: ship workflows that need the above (auth + S3), e.g.:

- Ambient lede / video: upload → compress → poster extract → S3 → copyable HTML block.
- Other Art requests as they land.
- Optionally revive Mosaic / Command Line if Art asks (re-wire `content/tools.md` + `App.tsx` + styles).

Each new tool: `content/tools.md` + `content/tips/` + `src/tools/…` + `docs/tools/…` (see [content/README.md](../content/README.md)).

**Done when:** first S3-backed tool is usable by Art on the published app.

## 5. Update release notes and publish

Goal: staff know what changed and the live site is the rebuild.

- Update [`content/release-notes.md`](../content/release-notes.md) (parity fixes, auth/S3, new tools).
- Merge to `main` → GitHub Actions → Pages.
- Smoke live gate + one image tool + (when ready) one S3 upload path.
- Optional: announce in Art channel; retire reliance on the legacy monolith once Art signs off.

**Done when:** live Pages is the rebuild, release notes reflect the ship, Art is pointed at the new URL/behavior.

---

## Out of scope (for now)

- Making the GitHub repo private solely for “security”
- Client-side AWS SSO / embedding Vox credentials in the SPA
- Reading Verge privilege cookies from `github.io` (cross-site; needs Verge hosting later)
- Image Mosaic / Command Line parity (deprecated until revived)
