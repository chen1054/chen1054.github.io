# Layout rebuild handover

Branch `layout-rebuild` (worktree `/home/user/temp/agent/wt-layout-rebuild`), started 2026-10-25 from `main` at
`1a6e26f`. Why and the rules: `doc/handover/phone-intro.md`, section "Pivot: layout rebuild, 2026-10-25". GitHub
Pages serves `main` at `/`; this branch never goes live. Merge only when every page works.

## Invariants

The rebuild keeps these exactly; everything else follows the designs' hierarchy and proportions, not their
measurements.

### The client's explicit asks

- Nav: logo and links stick to the left edge with padding, "clamped by the leftmost side of the river" (35 to 70 px
  from the window's edge, in line with the river's left end once the river centres); desktop nav text 22 px
  (CF109; the designs drew 25); the top-right stone always sticks to the right edge of the screen (CF111, CF112).
- River and footer patterns grow to at least cover 1080p (1920), then centre.
- Phone Home: hero and river higher, so the river shows without scrolling.
- Home intro: each step 1 s after the previous; the flower 0.3 s after the river finishes (CF90).
- The purple About pill hovers to the name's gold. Back-to-top sits in each footer, centred above the thank-you;
  its arrow turns the ring's gold on hover (CF113).
- Prototype pills: Tales hover purple background with yellow text (CF101); Scotties pills swap text and background
  colours on hover (CF105, CF106).
- Contact: captcha in English (`data-lang="en"`), centred over Send with Send's nudge; fields stay 15 px (no
  `maximum-scale`); the intro offers no phone.
- Sitemaps: text the same size as body text (CF93; desktop labels 13 px by the user); phone trees centred as a
  whole (CF86, CF125); the Scotties chevron pattern directly under the sitemap, centred (CF77).
- MenuMe: the bulb centred with its squiggle (CF87); the bubbles one shape each (CF1001, CF1002); the client's own
  bubble files (yellow fill under a purple outline); buttons centred under their own device at every width; the
  dashed box around the buttons as the client redrew it (CF115); no squiggle drawn twice or missing its arrow
  (CF102, CF103, CF116); no arrow root piercing a box (CF116, CF123); no extra arrow (CF124).
- Scotties: cloud copy inside the cloud (CF74); brand box spaced from the headings above and below as designed
  (CF75); hi-fi box gaps larger (CF78); learning cards with a left margin (CF85); wireframe connectors stop at
  their callout's border (CF107, CF108); listing arrow a little higher (CF118); hi-fi arrow aimed at the green
  dashed box (CF119); no arrowhead through a dashed box line (CF121); core-value chevrons close to their text
  (CF114).
- Tales: the client's recording plays under the see-through phone frame; the footnote and the next paragraph
  separated as different parts; the age-tier figure spaced from the paragraphs around it (CF72).
- Case studies: text never outside its box.

### The user's standing rules

- Figma is inspiration, not pixel-perfect. No stranded single word; no copy running into artwork.
- No explicit line breaks (no `<br>`, no per-line spans, no override that imitates a design break).
- No `text-wrap: balance` or `pretty`: the Safari floor is 17.0, which has neither.
- No cascade layers. Full-resolution images, never softened. No stretching. Cream everywhere.
- No CSS grid (the user's ban; README). 26 grid uses crept into the old sheet after the ban; the rebuild removes
  them. The user, 2026-10-25: "I banned grids because I believed this site doesn't need it. If you think this site
  needs it, build a good case for it." No case holds: plain rows and columns are flexbox; a connector is drawn by
  the element it runs beside (its `::before`, `inset-block` stretched by the fixed gaps to its ends), so its
  length follows that element's real height in flow; overlapping layers overlap in flow by negative margins, so
  each keeps its height (never absolute positioning with fixed heights, which lets text out of its box).
  The user then allowed grid where it is still the best choice. Kept: the drawings whose connectors span rows or
  whose layers overlap in one cell (Scotties lo-fi and hi-fi, MenuMe usability flows and dual loop, Tales key
  insights, Scotties pillars), which already work in grid and carry the client's arrow fixes (CF107, CF108, CF116,
  CF118, CF119, CF121, CF123); rebuilding them would change nothing visible and risk those fixes. New drawings use
  the flow techniques. Plain rows and columns (personas, story pillars, sitemap columns, device showcase, problem
  and contribution cards) move to flexbox.
- Body copy is Medium (500) where the designs render it heavier (Home project copy, Scotties body): the user,
  2026-10-25, "the design doesn't match the client's intentions. That needed to be medium."
  The design PDFs use outlined Type3 fonts, so they carry no weight to measure.
- Navigation and footer text are Playfair Regular in #685587 on every page (client round 2026-10-18).
- Safari is the reference browser; Chromium never blocks.
- The 414 to 639 hybrid phone range stays as the user chose it.
- Ignore WeChat's own text enlargement.
- Main stays working; this branch merges only when every page works.

## Services (persistent; survive Claude Code restarts, dropped SSH and reboots)

The user, 2026-10-25: "record in handover to make whatever you run survive! I don't wanna see you spend time
restarting ssh manually over and over again!" Everything long-lived is a unit file in `~/.config/systemd/user/`,
`Restart=always`, enabled at login (`default.target`). Never start these by hand or as `systemd-run` transients
(those had `Restart=no` and died with every SSH drop); check them with
`systemctl --user is-active xinyanchen-tunnel-vm-webdriver xinyanchen-tunnel-m1-site xinyanchen-mux xinyanchen-polypane-branch xinyanchen-preview`.

- `xinyanchen-tunnel-vm-webdriver`: this machine's 127.0.0.1:4454 to m1's 4454, Safari 17.5 WebDriver in the
  Sonoma VM (probe `curl http://127.0.0.1:4454/status`, `ready: true`).
- `xinyanchen-tunnel-m1-site`: m1's localhost:4173 to this machine's 4174, so VM Safari and the iOS 17 Simulator
  load `http://localhost:4173/...` (main) and `http://localhost:4173/@wt-layout-rebuild/...` (this branch).
- `xinyanchen-mux`: 127.0.0.1:4174, `/var/home/user/temp/agent/xinyanchen-build/no-store-server-mux.mjs` (main tree;
  `/@wt-NAME/` serves `/home/user/temp/agent/wt-NAME`), no-store.
- `xinyanchen-polypane-branch`: 127.0.0.1:4210, this worktree, no-store
  (`/home/user/temp/agent/serve/serve-worktree.ts`), for the user to watch the branch live in Polypane. After each
  change, `polypane -g --reload` reloads Polypane's active tab without taking focus (Polypane docs, "Command line
  options").
- `xinyanchen-polypane-branch@4211`, `@4212`, `@4213` (template `xinyanchen-polypane-branch@.service`): the same
  worktree on three more ports, so each Polypane pane can use its own origin and none waits on the browser's
  6-connection limit per origin (the user, 2026-10-25).
- `xinyanchen-preview`: 127.0.0.1:4173 on this machine, `mise run preview` in the main tree.

The units run node from `/home/user/.local/share/mise/installs/node/26.12.0/bin/node`; if mise moves node, edit
the `ExecStart` lines and `systemctl --user daemon-reload`. Replaced on 2026-10-25: the transient `xyc-sonoma-tunnel`,
`xyc-m1-site-tunnel`, `xinyanchen-no-store` and `xyc-preview` (stopped; same commands).

The Simulator (iPhone 15, iOS 17.0.1, `9CA037B0-574E-4662-A3EF-744BFB6E15E7` in `/Volumes/XinyanSimDevices/devices`)
stays booted on m1 between runs; it needs booting again only after an m1 reboot (`simctl --set ... boot`, under
the VM lock). One-off checks (Safari runs, Simulator shots) stay `systemd-run --user --wait --collect` transients
under `/home/user/temp/agent/vm-sonoma.lock`.

## Decisions since 03:10

- Home, copy on the side waves (phones): main has it too (Tales "young", "Storytelling", Matcha "Role:",
  "Project"). Narrowing the copy measure (76 % down to 64 % of the width) never cleared every width and cost the
  310 px measure; rejected. Adopted: below 390 the waves keep their 390 drawing, centred and clipped
  (`overflow-x: clip`), which clears all but Tales; Tales' wave rises 174 of its drawn 249 (clear at every phone
  width; 199 still hits). Probe: `eval-wave-rise.js` (variants through the CSSOM: the page's CSP blocks inline
  `<style>`, which voided the first run; each variant carries a positive control).
- Case-study shell in `site.css`; Scotties' drawings ported unchanged (2,492 lines, variable renames only, by
  `/home/user/temp/agent/f20/port-scotties.py`), Scotties links `site.css`. First comparison against main
  (`scot-cmp/`): drawings intact, connectors still land at 390; shell fixes so far: summary facts as one
  left-aligned block, subtitle cap on phones only, `--preview` page token (Scotties 280). Body is 15 px on phones
  (the earlier triage's decision), so phone pages run longer than main.
- The user, 2026-10-25: may rest; block on them (AskUserQuestion) only after exhausting every option.
- Round three (snapshot `f4341d2`, Safari 17.5 at 390, 744, 1440): About and Contact pixel-identical to main at
  every width (the nav had inherited bold on Contact and Medium on the case studies until `2c03314`). Home's
  flexbox rows are 138 px (744) and 156 px (1440) shorter than the grid version: grid's `1fr` tracks could not
  shrink below the illustrations' natural width and squeezed the copy, so "Skating and Skiing / Shop Redesign"
  and the MenuMe role wrapped one line more than the tablet design; the flexbox halves are equal. At 744 the
  converted Scotties personas and Tales pillars are pixel-identical to their grid versions. The Tales Play
  bubble wraps identically on main and the branch (same width, size, insets; "non-" / "threatening" is the
  hyphen in "non-threatening").
- Client-ask probe (`eval-invariants.js`, snapshot `58adbca`, Safari 17.5 at 390, 1440, 1920, 2400, all six
  pages): identical to main except phone sitemap labels 14.7 px over 15 px body (main 13.72 over 14), which CF93
  asks for. MenuMe findings bubbles 2 and 3 render about three times too tall in the stitched 390 Safari
  captures (`round3`, `mt-branch`) only: Safari measures boxes (264 by 212) and outlines (`::before` 243.6 by
  263.5, same mask and insets) identical to main, the drawing file is the same, and a direct Safari viewport shot
  (`cmp/bshot-branch.png`) and the iOS 17 Simulator (`sim17-bub-00`) show them correct. A capture artefact; when a
  stitched capture disagrees with measurement, take a direct viewport shot before acting on it.
- Found by round three and fixed: Scotties sections ran 1,540 px wide above 1440 (a ported 624 px tablet column
  override had lost its 1086 cap); the Scotties phone column is 20 px from each edge (its pillars are drawn on
  it; a page `--gutter` token now); sitemaps keep the centred one-column tree below 52rem, where the side-by-side
  tree wrapped labels ("Our / Team") and overflowed. The line detector now splits tokens at hyphens and keeps
  no-break spaces, so glued endings that break at a hyphen are no longer flagged (control: main's unglued
  "dietary restrictions." still is).
- `styles.css` removed from the branch (`60227f7`); `site.css` is 7,625 lines (old 8,146): base and shell 910,
  Home 241, page drawings 6,475 (Scotties 2,383, MenuMe 2,429, Tales 1,272, About and Contact 391). The drawings
  are the remaining simplification.
- Checks run against snapshots, never the live branch (the user: "You can use unlimited worktrees"):
  `node /home/user/temp/agent/serve/snapshot.ts [commit]` adds a detached worktree
  `/home/user/temp/agent/wt-snap-<sha>` and prints its origin (`http://localhost:4173/@wt-snap-<sha>`, through the
  mux) for `ORIGIN=`; editing goes on in the branch meanwhile. Remove old snapshots with
  `git -C /home/user/temp/agent/wt-layout-rebuild worktree remove <dir>` once nothing reads them.
- Every page now links `site.css` (commit `1265421`). Scotties, MenuMe, Tales, About and Contact rules are ported
  unchanged with variable renames (`/home/user/temp/agent/serve/port-page.py`), then simplified rule by rule
  against captures of main. Shell gaps found by auditing the old shared section: MenuMe's pill hover (deepens,
  does not swap), its wireframe frame token, the Tales story-pillars row; all restored. Every scripted edit checks
  brace balance and undefined variables before committing (one cut had removed a media query's opening line).

## Next action (as of 2026-10-25 03:10)

1.  Home, copy on the side waves (phones): `eval-wave-overlap.js` (Safari, 320 to 632) finds copy on wave pixels on
    main too (Tales "young" 336 to 488, "Storytelling" 320 to 384; Matcha "Role:" and "Project" 320 to 376) and,
    new on the branch, the "MenuMe" heading on the swirl at 320 to 344 (main's per-project `translate` for under 390
    was dropped). Fix in the shared rule, then rerun the check on both.
2.  The case-study shell in `site.css`, then Scotties onto it (plan: advisor's three buckets; client asks kept,
    asset-intrinsic geometry ported as is, design-derived per-element px dropped).

## Cutover plan

Pushing `main` publishes https://chen1054.github.io (GitHub Pages serves `main` at `/`), the site the client has
on their résumé. The agent cuts over without asking, once it is confident on the evidence (the user, 2026-10-25:
"If you're not confident enough to cutover yourself, that means you haven't done enough work, whether
implementation or verification"; "Cutover doesn't require my approval. I was speaking in a philosophical way.").
The bar is that this evidence holds on one snapshot:

1.  Every page on the branch passes, on one snapshot: the line dump 320 to 1920 (no stranded word, no overflow,
    detector artefacts named), the client-ask probe (`eval-invariants.js`, main against branch at 390, 1440, 1920,
    2400), Safari 17.5 captures at 390, 744, 1440 and 1905 compared with main (About and Contact pixel-identical;
    every other difference named and intended), and the iOS 17 Simulator at the phone width.
2.  Merge `main` into the branch first, so the cutover merge is a fast-forward of reviewed content.
3.  `git -C /var/home/user/xinyanchen-portfolio/portfolio-xinyanchen0124 merge --ff-only layout-rebuild` on main;
    auto-push publishes. Check the live site (all six pages) in Safari once Pages has built
    (`gh api repos/chen1054/chen1054.github.io/pages/builds/latest`).
4.  Rollback: `git revert -m 1` is not available for a fast-forward, so record main's pre-cutover commit and, if
    the live site breaks, `git revert --no-edit <pre-cutover>..HEAD` on main (a new commit; never a force push).
5.  Then re-verify the client reply draft's "checked in Safari 17.5" claims against the live site.

## Cutover, 2026-10-25

Main fast-forwarded from `441ca4a` (the rollback point: `git revert --no-edit 441ca4a..HEAD` on main) to this
branch. Evidence on snapshot `e12e8ec` and round four (`53a9245`, text-only glues since), Safari 17.5 unless noted:
- About and Contact pixel-identical to main at 390, 744, 1100, 1440 and 1905.
- Home, Scotties, MenuMe and Tales compared side by side with main at every one of those widths; differences are
  the intended ones: 15 px phone body, Home's flexbox rows (tablet text no longer squeezed), Home's side waves
  off the copy, the sitemaps kept as the centred one-column tree below 52rem (main wraps "Our / Team" there).
- All-blocks line dump, 320 to 1920 by 16, all six pages (32,077 blocks): no stranded word (main has 6).
- Client-ask probe at 390, 1440, 1920, 2400: identical to main except sitemap labels at body size (CF93).
- Interactions identical to main: phone menu, every client hover (About pill, back-to-top CF113, Tales CF101,
  Scotties CF105 and CF106, MenuMe), each artwork viewer opening and closing on Escape.
- iOS 17.0.1 Simulator (Safari 17.0): Home, each case study's reworked sections, About, Contact.

Pushed `441ca4a..a436a5c`; Pages built `a436a5c`. Live check (https://chen1054.github.io, Safari 17.5 at 390 and
1440, all six pages, against snapshot `e12e8ec`): every page links `site.css` and renders pixel-identical, except
Contact's captcha (hCaptcha's "localhost detected" warning shows only locally) and one Tales laptop frame that the
stitched live capture caught before it loaded (a direct shot of the live page shows it). A fast-forward merge
makes no commit, so auto-push does not publish it: push `main` explicitly.

Next: re-verify the client reply draft's "checked in Safari 17.5" claims against the live site.

## Model

Written into the stylesheet header as it is built (`site.css`).

## Progress

One entry per page.

### Home (2026-10-25)

`index.html` links `site.css`; every other page still links `styles.css`. The Home rules are 229 lines (the old
Home block was 382), with no per-project offsets except each project's two drawn phone distances (`--gap`,
`--rise`, as shares of the width) and its desktop art width (`--art`, a share of its 507 px column).

Checked:
- Safari 17.5 (VM) at 320, 390, 744, 1100, 1440 and 1905, by eye against the phone, tablet and desktop exports.
  Fixed on the way: the gap above the name (10 to 22 px wide), art 7 % small (543 px column assumed; it is 507),
  pills 4 px in from the copy, 5 px gutters at 320, the row gap (0 at 744 to 72 at 1440, as drawn).
- Line dump 320 to 1920 by 8 (`home4-lines.jsonl`): no stranded word or overflow. The one flag, Matcha's
  "experience.", is the detector filing "user-friendly" under its first half's line; Safari breaks it as
  "user-" / "friendly experience.".
- Intro timing (computed styles, 390 and 1440): name 1 s, summary and pill 2 s, purple 3 s, river 4 s for 1.8 s,
  flower 6.1 s.
- iPhone 15 Simulator, iOS 17.0.1, Safari 17.0 (`sim17-homerb-00` to `06`): hero and river on the first screen.
- Copy on the side waves, phones: pending (`eval-wave-overlap.js`, main against the branch, 320 to 632).

Not exercised: the hover colours (rules carried over unchanged).

Captures and probes: `/home/user/temp/agent/f20/artsweep/` (`home2/`, `home4-lines.jsonl`, `timing.log`), served to
the VM at `http://localhost:4173/@wt-layout-rebuild/` (the m1 tunnel to this machine's 4174 mux).
