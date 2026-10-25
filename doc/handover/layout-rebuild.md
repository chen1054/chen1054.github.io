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
- Body copy is Medium (500) where the designs render it heavier (Home project copy, Scotties body): the user,
  2026-10-25, "the design doesn't match the client's intentions. That needed to be medium."
  The design PDFs use outlined Type3 fonts, so they carry no weight to measure.
- Navigation and footer text are Playfair Regular in #685587 on every page (client round 2026-10-18).
- Safari is the reference browser; Chromium never blocks.
- The 414 to 639 hybrid phone range stays as the user chose it.
- Ignore WeChat's own text enlargement.
- Main stays working; this branch merges only when every page works.

## Model

Written into the stylesheet header as it is built.

## Progress

One entry per page.
