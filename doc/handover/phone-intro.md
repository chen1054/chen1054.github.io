# Portfolio implementation handover

## Latest status

As of 2026-10-20 afternoon the client's batch of 2026-10-19 notes is handled (last site commit `a544c71`): see
"Client batch, 2026-10-20" at the end of this file (19 annotated screenshots, a new Figma export, the client
viewport 1920 by 950). The client reply in "Client reply status, 2026-10-20", updated for the batch, waits for the
user. The entries in between are a dated log, oldest first; "Current
state" describes the work as of the landing animation.

Which Safari checks which width (missed on 2026-10-22, when a phone batch was first sent to desktop Safari in a
390 px iframe; the user: "why aren't you using the emulator?"):
- Phone widths: the iOS 17.0.1 iPhone 15 Simulator on `m1` (Safari 17.0, the client's phone engine), device
  `9CA037B0-574E-4662-A3EF-744BFB6E15E7` in the custom set `/Volumes/XinyanSimDevices/devices`; screenshots with
  `/home/user/temp/agent/f20/sim17-shots.mjs` (it opens `http://localhost:4173/...` on `m1`, so serve the build
  there with `Cache-Control: no-store`, see "Client iPhone round, 2026-10-19"). `safaridriver` cannot reach a
  device in a custom set, so measure in Chromium and confirm visually in the Simulator.
- Tablet 744 and desktop widths: Safari 17.5 in the Sonoma VM over WebDriver (`127.0.0.1:4454`, lock
  `/home/user/temp/agent/vm-sonoma.lock`), resizing the window. The client's "tablet" screenshots come from Mac
  Safari 17 with the window resized (the user, 2026-10-22), not an iPad: missed on CF93, when iPad Simulators were
  built and measured instead and the user had to ask "Don't you already know what the client uses?".
- Never stand a desktop browser in for the phone (no iframe or resized-window substitutes).

Standing directives from the user, 2026-10-23:
- "I'm banning cascade layers." The stylesheet must not use `@layer`; removing the existing layers is queued, with
  a before/after pixel comparison of every page and width, since layer order currently decides which rules win.
- The site ignores WeChat's font-size setting site-wide (the user chose this over shapes-only or shapes-follow).
- Verified deviations from the latest design are fixed without asking: asking about them wasted a question (the
  user: "You shouldn't have burnt this question."). The badge numerals need not be vector drawings.
- Subagent briefs: create or change no file outside the subagent's own output directory (a reviewer overwrote
  `f20/stress/crop.py`).
- "Do not use explicit line breaks." New copy wrapping comes from widths and `text-wrap`, not `<br>` (said when
  phone breaks were added to the Scotties brand box; they were removed before commit). The user chose to replace
  all existing ones too (27 `phone-`/`tablet-`/`desktop-break` elements on Scotties, MenuMe and Tales, plus 4 plain
  `<br>` on Tales). The user, on matching the design's lines: "You don't have to keep them EXACTLY the same. Figma
  is an inspiration, not an iron board." So the criterion is: no copy into artwork (pot, pillars, cloud outline),
  no stranded single word, natural wrapping otherwise.
- Do not ask to continue through the queue: a checkpoint question got "You didn't have to burn this question."
  End-of-turn questions are only for decisions the user alone can make.
- Fix order (the user, 2026-10-23): commit verified design fixes first, then rebuild the layer removal on top.

Verified design fixes landed 2026-10-23: `78bfba1` Tales phone story notes; the Scotties phone brand box (commit
after `78bfba1`). Both checked in the iOS 17 Simulator; Chromium diff 0 at 640 and up. Known left on the brand box:
the design's dashes are longer than the browser's `dashed` border (all widths; a reviewer item), and the design
breaks the lead after "Scotties':" which no width reproduces without a forced break. Pitfall: iOS 17.0 Safari has
no `text-wrap: balance`, so a balanced layout checked in Chromium can orphan a word there; check wraps greedily too.
MenuMe numerals (badge "4" item): every design sets both numeral sets (the three finding numbers and the four
contribution badges) in Apple LiGothic Medium 50 px, the digits 30.3 ("1") to 30.9 ("4") px tall at phone, tablet
and desktop alike (`f20/badge/py/measure_digits.py` on the PDF exports, which embed the glyphs as Type 3 outlines).
The site had Abril Fatface at 25.6 to 35.5 px digit height, its "4" a hairline diagonal. Of 1652 local fonts, Inter
Medium matched the digit shapes best at equal weight (`f20/badge/py/compare_png.py`, sheet `f20/badge/sheet-png2.png`);
the site now serves its ten digits (`assets/fonts/Inter-Medium-digits.woff2`, 3.5 KB, OFL with no reserved name,
from the official v4.1 release) at 42 px, 42 card units on phones.
Next: tablet river (Home, Contact), tablet corner art, then the reviewer items in
`/home/user/temp/agent/f20/design-cmp/triage.md`; then rebuild the layer removal on the new HEAD.

Line-break removal, 2026-10-23 (candidate `/home/user/temp/agent/wt-br`): the MenuMe story box's pot gutter at every
width left phones a 150 px column (26 lines at 320, "budget‑friendly" overflowing into the pot). Phones instead keep
a blank inline-block as wide as the pot after the last word, so only the last line leaves the pot's room. An empty
inline with padding does not work: Chromium put its padding on a phantom zero-height line and kept the word under the
pot. Injected `<style>` probes are blocked by the page's policy; edit the snapshot file instead. The 94 non-breaking
spaces and hyphens that keep a heading's last word or "e‑commerce" together stay (they prevent stranded words); only
the story's three-word `budget&#8209;friendly&nbsp;ritual` glue was loosened to a plain hyphen, since it stranded
"effortless," on an inner line at 322 to 337 px.
The page policy is `style-src 'self'` on every page (measured), which is why injected `<style>` does nothing; CSSOM
`element.style` changes still apply.
The stranded-word and cloud-stretch sweeps missed one regression: freed of its breaks, the Scotties "Core Challenge"
copy ran into the scalloped cloud outline at phone, 744, 1100 and 1440 (Safari and Chromium). Seen by eye, then
measured with `f20/badge/cloud-clash.ts` plus `py/cloud_clash.py` (copy ink against the orange outline). Fix: two
`shape-outside` floats (`p::before` and an empty `.scotties-challenge-edge` span), each half the cloud wide and 262/350
of it tall; a negative top margin starts them at the cloud's top, so one pair serves every width and each range only
sets `--cloud-copy-top` (40/350, 80/433, 117/550) and `--cloud-copy-inset`.
The first polygons (`py/shapes.py`, from the 390 render, 8 px samples joined by straight lines) still let phone copy
touch the bottom-left curl's tip at 320 to 639 (sweep `f20/badge/clash2`, 40 of 201 widths; the control, one float
hidden, flagged 21 of 21). The tip sits between two samples. Now traced from the artwork alone
(`cloud-art-4x.png`, which overlays the rendered cloud with 0 px offset at every width checked) as a staircase of 4 px
bands, each as far in as the outline reaches within it (`py/staircase.py`).
That alone changed nothing (sweep `clash3`: the same 40 phone widths). The cause was the shared speech-bubble rule's
`justify-content: center`: on phones the flex column centred the copy, so the floats inside it started 18.3 px low at
600 and the whole shape slid past the curl's tip. Tablet and desktop already set `start`; the cloud's base rule now
does, for every range.
Landed in `cbd6b9b`: copy at least 6.2 px from the cloud outline at 201 widths from 320 to 1920 (sweep `clash4`),
0 new stranded words on Scotties in balanced and greedy wrapping from 320 to 1920, Safari 17.5 at 744, 1100 and 1440,
and iOS 17.0.1 Simulator frames of the Scotties cloud and pillars, the MenuMe story and the Tales heading
(`f20/oneshape/sim/shot-br-*.png`). The Simulator's inject server finds text only at the start of an element's own
text node: name a block by its first words.
Safari 17.5 from the repo after the commit: MenuMe story at 744 and 1440, Tales "Core Product" heading at 744
(`f20/badge/safari-br-*.png`). The Safari cloud frames at 744, 1100 and 1440 predate the `justify-content` edit,
which changed no computed value at 640 and up (those ranges already set `start`).
The sweeps ran on `wt-br`, which lacks the Inter numerals commit (badge discs only); snapshot HEAD afresh before the
next sweep or the layer removal's style diffs.
Free wrapping also filled the whole cloud width on tablet and desktop (5 long lines in the cloud's top half at 1100
and 1440, against the design's 7 centred lines): the copy keeps the design's side insets (34/433, 65/550) and a line
length cap from the designs (26 em tablet, 24.5 em desktop), with the floats reaching back out past the insets.
Hyphenated compounds in that paragraph are non-breaking (they split as "Out- / of-town", "street- / culture").
The phone design's own copy is just as ragged (nine lines, "identity." alone).
Scotties pillars: the phone board moved 10 units down (55 not 45); clearance under 6 px went from 50 of 320 widths
to 0 (least 12.5 px at 404, `f20/eye/deco-clash/pillars-nobr2-analysis.txt`).

Layer removal status, 2026-10-23: unwrapped copy of `c2ae82c` (`/home/user/temp/agent/wt-nolayer`, script
`f20/nolayer/unwrap.ts`) against `wt-nlbase`: Chromium computed styles at 29 widths (320 to 2560, every breakpoint
edge), plain, menu open and every hover/focus state on (`:hover`/`:focus`/`:focus-visible` rewritten to classes on
both sides), and Safari 17.5 at 11 widths with real hover and focus probes: 0 differences so far; positive controls
(a 1 px gap and a hover-only colour) are reported. Logs `f20/nolayer/{plain,states,safari}.log`.

## Current state

The client requested a landing introduction animation;
the user clarified that the layout must not change.
The user also requested the client's logo as the favicon and supplied the Evil Martians favicon guide.
Reuse the original navigation floral logo in a square SVG viewport,
with a local 32-pixel ICO and a 180-pixel Apple touch PNG using the page's white background.
Connect the three icons on every page, without a package dependency or site-layout change.
The animation and favicon are separate completed items.
All six pages' icon links decoded successfully in the headed browser,
and native canvas checks found the colored logo artwork in every icon.
The ICO is 32 pixels square, the Apple icon is 180 pixels square,
and the SVG has a square viewport preserving the original supplied logo.
Interpretation: sequential fades for greeting, name, summary and About link together,
then the purple river accent; reveal the gold band, gray ribbon, and three gray lines
together from left to right; fade the river's flower last.
The existing top-corner decoration and navigation remain static.
CSS animates opacity/visibility and a fixed gradient mask on the existing separate layers,
with no translation, sizing, spacing, asset, script, dependency, or viewport-breakpoint change.
The six stages start at 0, 450, 900, 1350, 1800, and 3600 milliseconds;
the river reveal lasts 1800 milliseconds and each other fade lasts 450 milliseconds.
The sequence runs once on page load and completes at 4050 milliseconds.
Reduced-motion visitors receive the complete static introduction immediately.
Initial stage probes at 390, 744, and 1440 pixels confirmed the requested order
and unchanged bounds for every animated element at ten timeline positions.
An intentional position change proved the bounds probe detects movement.
The initial hard wipe measured a half-width reveal at 2250 milliseconds.
The user then clarified that river pixels must fade gradually instead of appearing at a hard edge.
The user explicitly rejected the attempted moving feathered edge.
The user confirmed the artwork must stay at its final position throughout the entrance.
The user provided opacity examples, authorized a provisional implementation to inspect in motion,
then explicitly accepted it: “Okay this is perfect.”
Treat the numbers as percentages: progress zero has left 1% and right 0.5%;
progress one has left 4%, middle 2%, and right 1%;
progress two has left 16%, first third 8%, second third 4%, and right 2%.
One registered numeric CSS property interpolates progress from zero to eight across 1800 milliseconds.
A stationary mask uses five gradient stops whose alpha follows those exponential examples,
clamped at full opacity by the browser.
There is no traveling mask edge, translation, or new JavaScript.
Keep this accepted fixed-position opacity progression.
The first browser probe found that defining the gradient in keyframes froze its alpha values
even though the registered progress value advanced.
The dependent gradient now belongs to the picture rule so it recalculates with animated progress.
Default progress eight leaves the final mask fully opaque;
visibility keeps the river hidden during its initial delay.
The first finished-frame comparison retained animation fill styles and differed from static captures.
Use `backwards` fill instead: it holds the starting state during delays,
then releases animation styles at completion so the original rendering takes over.
Before the spatial-opacity implementation, finished screenshots compared byte-for-byte equal
to the static reduced-motion baseline at 390, 744, and 1440 pixels.
The accepted implementation retains a fully opaque mask after completion;
its final captures differ from the unmasked reduced-motion captures,
so do not claim byte or pixel identity for this version.
Headed-browser probes at those same widths verified every animated element's unchanged bounds
at fourteen timeline positions, with an intentional translation proving the geometry probe detects movement.
The mask's computed alpha stops match the user's percentage examples,
and all stops reach full opacity at completion.
No horizontal overflow was found.
Reduced-motion emulation produced no animations and no hidden introduction elements at all three widths.
Home loaded no third-party resources or browser errors in the final dark-system-mode check.
Its keyboard-focused About link retained focus visibility, responded to hover,
and opened the local About page with Enter.
No animation or favicon implementation work remains queued.

The user requested connecting all available destinations.
All implemented pages are already connected through navigation and Home's implemented-project links.
The supplied local Matcha Delight and Echoes of Tradition PDFs are now connected from Home.
`pdfinfo -url` inspected every Phone, Tablet, Desktop, and root project PDF;
only Contact and the resume contained email links, with no prototype or demo destinations.
The first destination question incorrectly bundled separate questions into one field;
the user rejected that format.
Ask each missing destination separately.
The user supplied `https://chen1054.myportfolio.com/session-3` for Youth in Limbo;
Home's button now uses that exact URL.
Its native Home click reached `Xinyan Chen - Youth in Limbo` at the supplied address.
The user also supplied MenuMe's mobile Figma prototype URL,
with file key `Oh9hv42a7JEVUvOaI8bIx5` and starting node `1168:21146`.
Both mobile prototype buttons now use that exact URL, with HTML-escaped query separators.
MenuMe's mobile URL passed exact DOM comparisons on both buttons and a native navigation.
The user supplied its tablet URL with starting node `393:4957` and page `393:4524`;
both tablet buttons now use that exact address too.
MenuMe's tablet buttons passed exact DOM comparisons and native navigation.
The user supplied Scotties' desktop Figma URL,
with file key `8uo5VBV3BsWXgYe647JxmM`, starting node `2124:352`, and page `3:5`.
Both desktop prototype buttons now use it with escaped query separators.
Scotties' desktop buttons passed exact DOM comparisons and native navigation.
The user supplied its mobile URL with starting node `3:2` and page `0:1`;
both mobile buttons now use that exact address with escaped query separators.
Scotties' mobile buttons passed exact DOM comparisons and native navigation.
The user supplied `https://capable-fudge-8eb7a9.netlify.app/` for Tales' Launch Doodle Demo;
the button now uses that exact address.
Every requested destination has been supplied and connected.
The Doodle Demo native click reached the supplied URL with title `Doodle Widget`.
The final headed-browser audit covered all 64 anchors across the six HTML pages.
It found no placeholder URL, missing local page, or missing fragment target.
Injected nonexistent page and fragment URLs were detected by the audit's positive controls.
All eight Figma prototype anchors matched the supplied URLs exactly;
native clicks exercised each distinct prototype destination.
`rg` also found no `example.com` URL in production HTML.
Browser page errors were empty on the local pages.
These changes only replace destinations; no CSS, JavaScript, dependency, or external embed was added.
The destination work is complete, with nothing queued.
Both new Home PDF links passed native clicks in headed `agent-browser`;
their final local URLs and `application/pdf` document types were confirmed.
`36e44c9` connects the PDFs and updates the README.
`ca09c8d` connects Youth in Limbo;
`1a0e06e` and `d17e942` connect MenuMe's prototypes;
`19f4ae0` and `9e1eb30` connect Scotties' prototypes;
`a4e465d` connects Tales' Doodle Demo.
Proposed clarification of the existing question-batching guidance in `AGENTS.md`:
put independently answerable questions in separate question items, never one combined answer field.

Contact and the Home button-alignment correction are implemented and verified.
The user additionally requested fixing text centering in Home's buttons.
Headed-browser font-ink measurements against the SVG's actual painted bounds
found the Desktop intro label 1.9 pixels low and project labels 3.52 to 3.76 pixels low.
Phone labels were within 1 pixel vertically; Tablet project labels were within 0.44 pixels.
The SVG's fill occupies 34 of its 42 vertical units, with shadow in the remaining frame.
The wide line height previously grew by the entire background-height increase.
Home now derives its text-line growth from the filled fraction,
with a font-descender correction for the case-study label.
Other pages retain their existing line-height growth through the shared fallback.
This changes only CSS; no asset, markup, script, or breakpoint is needed.
`e70f2cd` commits the Home correction.
After it, vertical ink-center offsets stay within 1 pixel at 320, 390, 624, 625,
744, 900, 1024, 1200, 1440, 1920, and 2560 pixel content widths.
No horizontal overflow was found.
At Desktop, the intro offset is now -0.10 pixels and project offsets are -0.48 to -0.24 pixels.
The matching before/after Desktop project-button screenshots were inspected.
Contact's native Home, About, and Work links and Escape dismissal passed;
Work reaches the first Home project, and back-to-top returns to zero scroll and hides itself.
The Contact email link uses the confirmed three-`c` address.
Light and dark preferences preserve readable original form colors.
`40e1c98` adds hCaptcha and the local validation module;
`aadb9eb` records the user's completed manual test send.
Contact and the Home button-centering correction have no remaining implementation items.
Keep the Python preview available at `http://localhost:4173/`;
use `http://portfolio.localhost:4173/contact.html` for the captcha preview.
Proposed verification guidance for `AGENTS.md`:
for SVG-backed buttons, compare label ink centers against the painted fill,
not the export frame that includes shadow.
Use Phone/Contactphone, Tablet/Contracttablet, and Desktop/Contactdesktop PNG/PDF designs.
The user supplied the Tablet files during implementation; the `Contracttablet` spelling is intentional here.
The user approved `contact.html`, shared form CSS, separate original wave components,
and connecting Contact in every existing navigation menu.
Use a native POST to `https://api.web3forms.com/submit` with the supplied access key.
The form is the permitted third-party exception.
The initial native-only integration was rejected because this key requires hCaptcha.
The user approved adding hCaptcha and allowing the provider's vendor `.js` scripts,
explicitly overriding the module/`.mjs` rule for those external scripts.
The user also supplied the matching Web3Forms native HTML/hCaptcha documentation.
Our validation remains in the local module `contact-form-captcha-validation.mjs`.
Contact's CSP permits the provider script and hCaptcha script/frame/style/connection origins;
other pages retain their local-only policy.
Required fields are Name, Email, and Message; Phone is optional.
Both PDFs have a conflicting email target with two `c` characters.
The user confirmed three: display and link `rainbowchen.ccc@gmail.com`.
They also authorized one clearly marked real test submission.
Do not repeat it if a response is uncertain without first checking whether it was accepted.
`ea19d10` implements Contact and connects every existing menu.
The original divider has separate Phone and wide SVG components;
the wide artwork also matches the supplied Tablet divider's scale.
The approved shared footer reuses About's original three wave assets.
`f8092b6` gives its wide picture sources explicit dimensions,
preserving the correct aspect ratio even though those SVGs use `preserveAspectRatio="none"`.
The form reuses the existing gold button artwork and sRGB-safe hover behavior.
The initial implementation added no script;
hCaptcha now requires the approved provider scripts and a local validation module.
No npm dependency or breakpoint was added.
Before adding hCaptcha, Phone and Tablet page heights measured 1467 and 1056 pixels;
Desktop measures 2118 pixels against a 2114-pixel reference.
Local validation passed: empty submission focuses Name;
invalid email focuses Email and prevents navigation; blank Phone is valid.
The Send button has a visible 2-pixel keyboard focus outline and its approved gold hover state.
All five existing phone menus opened the new Contact page through native clicks.
Before hCaptcha, the form fit tested 320 to 2560 pixel widths, with decoded images,
no horizontal overflow, 48-pixel minimum form targets, and no third-party requests.
Phone fields remain stacked through the existing navigation breakpoint;
wide flexbox columns appear when the supplied field widths fit.
Both color preferences preserve the original light design and readable field colors.
Browser error and console collections were empty before provider scripts were added.
Matched-scale reference comparisons are private `contact-{phone,tablet,desktop}-comparison.svg/png`
files in `${HOME}/temp/agent/portfolio-intro/`.
Those reference comparisons predate the approved captcha addition.
Live test status: the native Send click reached Web3Forms,
which returned HTTP 400 and `hCaptcha Token is mandatory for this form`.
No successful delivery is claimed.
The subject is `[TEST] Portfolio contact form verification`,
the email is `rainbowchen.ccc@gmail.com`, and Phone is empty to exercise its optional status.
The compact hCaptcha widget now renders at 158 by 138 pixels.
The plain `localhost` preview displays the provider's invalid-host warning;
`http://portfolio.localhost:4173/contact.html` loads without that warning
and opens a real challenge when its checkbox is selected.
The user was asked to send the authorized test there and replied `Sent`.
Treat that send as completed; do not send another test.
The agent did not inspect the user's confirmation page or inbox.
After hCaptcha, checks at 320, 390, 414, 624, 625, 640, 744,
1024, 1440, 1920, and 2560 pixel content widths found no horizontal overflow,
undecoded images, or form controls smaller than 48 pixels.
Post-widget heights are 1647, 1218, and 2336 pixels at 390, 744, and 1440 pixels.
The widget adds form content absent from the supplied references.
The local validation module blocked an empty captcha response.
A disposable form fixture exercised both empty and nonempty response branches,
with a final submit-event sink preventing every fixture submission.
No synthetic token was submitted to Web3Forms.
The live form was untouched by that fixture.
Browser errors remained empty; the provider logged `recaptchacompat disabled` informational messages.
See `doc/troubleshooting/web3forms-hcaptcha.md` for the rejection and local-host evidence.

The user reported text crossing the Trust speech bubble's inner edge on Desktop.
The previous rectangular overflow checks missed text crossing a painted curved boundary.
A headed-browser reproduction found the first letters of `educational` outside the yellow fill.
Narrower-width checks also exposed text crossing the Play bubble's edge.
Both bubbles now use shape-specific proportional text insets,
balanced wrapping, and typography scaled to their own inline-size containers.
Their original SVG geometry and aspect ratios are preserved.
This correction adds no script, markup, assets, dependencies, or breakpoints.
`a2f653c` commits the correction.
The committed CSS passed painted-fill checks in 54 viewport configurations,
including 320, 390, 744, 1440, 1920, and 2560 pixel content widths.
The browser rasterized each original SVG with its centered, aspect-preserving fit
and sampled positions across each non-whitespace character's rectangle against the yellow fill.
Removing the Trust text insets made this check fail;
restoring the committed CSS made it pass.
Matched-scale Desktop before/after captures and Phone/Tablet viewport captures were also inspected.
The browser's error and console collections were empty after reloading the committed CSS.
Private evidence is in `${HOME}/temp/agent/portfolio-intro/`:
`tales-trust-text-before-fix.png`, `tales-trust-text-after-fix.png`,
`tales-phone-bubbles-before-fix.png`, and `tales-{390,744}-bubbles-after-fix.png`.
Proposed `AGENTS.md` verification tightening:
when text overlays artwork, check glyph bounds against the painted interior at supported widths;
rectangular element overflow checks do not establish that the text fits the artwork.

The user requested Tales for Safer Trails, MenuMe, and Scotties case-study pages.
They approved three new HTML pages, shared case-study CSS, local asset extraction,
and replacing their Home placeholder links with the implemented pages.
The pages reuse the shared navigation breakpoint, navigation, footer, and back-to-top control.
All case-study pictures and graphs must be zoomable.
The user chose an in-page viewer and corrected the claim that it needs JavaScript.
Use native popover buttons and shared CSS; add no zoom JavaScript.
A headed-browser fixture confirmed that an image viewer can be opened by its invoker
and closed by a popover button targeting itself.
Check native HTML behavior before proposing script for such interactions.
All prototype and Tales demo buttons may temporarily open `https://example.com`.
The user specifically noted that some artwork is only recolored;
reuse original geometry and apply page colors instead of duplicating it.
All nine supplied Phone, Tablet, and Desktop PNGs were inspected;
their PDFs were extracted into private SVG and text working files.
The original Figma archive also provides intact text and font metadata.
Private `read-figma-text-records` recovers these without approximating broken PDF words.
Tales and MenuMe body text uses Playfair Display Medium; Scotties uses the supplied Bold weight.
its original static font is present in the supplied archive and has been extracted locally.
`1b696ff` adds the original artwork and shared recolorable masks.
`14fed4c` adds all three pages, shared styles, and their Home links.
Initial Desktop checks measured no horizontal overflow at 1440 pixels;
all image elements decoded and each page uses only the existing navigation module.
`d09a601` corrects the original artwork, trims blank SVG paint margins,
and restores the supplied prototype colors with saturation-only hover states.
The PDF-derived Scotties SVG contains an undecodable embedded homepage PNG.
The original 1272 by 4096 screenshot was recovered directly from the Figma archive;
the final asset is that original PNG, without page annotations or a screenshot crop.
Native alpha-bound measurements trim clipped export margins on content SVGs.
The corner masks and decorative divider frames retain their supplied positioning frames.
Visual catalogs also exposed swapped MenuMe flow diagrams;
their assets now match the preferences, weekly-specials, and fridge-inventory sections.
Illustration filenames describe their actual content, including the concern figure and skateboard.
The original artwork and all content pictures were inspected in headed-browser catalogs.
Responsive checks passed across 320, 390, 414, 600, 624, 625, 639, 640,
744, 1024, 1440, 1920, and 2560 pixel content widths on all case-study pages.
They found no horizontal overflow, image controls smaller than 48 pixels,
or requests to other origins.
All 49 viewers passed opening, enlargement, loaded-image, dismissal,
and focus checks at 390 and 1440 pixels, for 98 checks.
Escape and clicking the viewer restore focus to its invoker.
Outside-click dismissal and Enter activation also passed.
The Scotties tall screenshot scrolls with Page Down and the browser's element-scroll command.
The nine prototype/demo links retain their text colors, lightness, and hue on hover.
Their safe chroma limits are 0.185372 for Tales yellow, 0.123646 for MenuMe cyan,
0.168313 for MenuMe orange, and 0.079444 for Scotties beige.
Increasing each limit by 0.000001 produced a measured sRGB channel outside zero to one.
Long full-page PNG captures repeated page-top pixels near their bottom;
a native crop of the captured PNG confirmed those pixels are in the capture itself.
A real scrolled Tales footer viewport renders correctly.
Use viewport captures and artwork catalogs for verification;
the troubleshooting document records this capture issue and browser input quirks.
The Tablet source places hero artwork over its text;
the final flex basis is 400 pixels, preventing premature columns at 744 pixels.
An 18-pixel starting gap places the Tablet MenuMe title box at y356,
close to the supplied title glyph at y361.
Hero subtitles use a 260-pixel starting width that grows to 540 pixels on Desktop.
A case-study-only 64rem container query preserves centered Phone/Tablet headings
and left-aligned Desktop headings.
This is an additional alignment condition; Home and About retain their original 40rem breakpoint.
The column layout itself still wraps with flexbox rather than another layout breakpoint.
The hero artwork and text align at their outer top edges on Desktop.
After the final hero corrections, 45 checks across the previous widths plus 1023 and 1025 pixels
found no horizontal overflow or third-party requests.
All three heroes stack with centered headings at 390 and 744 pixels,
and form columns with left-aligned headings at 1440 pixels.
`446ba33` records the corrected flow diagrams, descriptive illustration names,
and the native-viewer verification.
`5cb520f` restores the supplied stacked Tablet hero arrangement;
`61db98b` aligns Desktop hero artwork and text at their outer top edges.
The corrected diagrams and renamed illustration viewers passed ten additional open/dismiss checks.
All sixteen section-navigation links scroll their target section to within one pixel of the viewport top.
Home's three case-study links open their local pages;
Work from each phone menu returns to the first Home project.
Back-to-top behavior passed on Home, About, and all case studies at 390, 744, and 1440 pixels.
Every control measures 48 pixels square and sits 16 pixels from the content viewport's right and bottom edges.
It appears after scrolling and hides after returning to the top.
All images decoded on those fifteen page/width combinations, with no horizontal overflow.
Browser error and console collections were empty after those checks.
Both color preferences preserve the supplied light portfolio artwork and readable text colors.
Final hero viewport captures for all nine case-study/reference-width combinations are in
`${HOME}/temp/agent/portfolio-intro/`, named `<page>-<width>-hero-final.png`.
The approved case-study scope is implemented;
the interaction checks passed, but the bubble text fit needed the correction recorded in this handover.
README, handover, and troubleshooting documentation were rendered with Pandoc and checked in the headed browser.
The remaining Home placeholders and Contact are outside this completed request.

Home and About now include a shared back-to-top link.
It is 3rem square, fixed 1rem from the bottom and right viewport edges,
and hidden at the page top.
The original SVG now has a transparent circular background, a gold ring, and a purple upward arrow.
The user requested transparency after the first filled version.
The arrow changed from white to purple to remain visible on the white page.
Hover saturates only the arrow using the existing purple sRGB-safe chroma limit;
keyboard focus reuses the shared outline.
`portfolio-navigation.mjs` now owns both menu dismissal and scroll visibility,
renamed from `phone-navigation-menu.mjs` on 2026-10-15.
Native `href="#"` handles returning to the top without a click handler.
`a4cbf6f` implements the shared control without another breakpoint or JavaScript request.
Headed-browser checks passed on both pages at 390, 744, and 1440 pixel content widths.
The target measured 48 by 48 pixels with 16-pixel bottom and right offsets in every case.
It is hidden and removed from layout at the top, appears after one pixel of scrolling,
and hides again after native pointer or keyboard activation returns to the top.
Keyboard focus shows the shared 2-pixel outline.
The module rename preserved phone menu opening and Escape dismissal.
Hover selects the saturated purple SVG fragment; both color preferences retain the supplied page styling.
Browser error and console collections were empty after interaction checks.
The [phone capture](../review/phone-about-back-to-top.png) records the initial filled control beside the About footer.
It predates the user's transparent-background correction.
`2819683` implements the transparent background and purple arrow.
Native SVG raster probes confirmed background alpha 0 in both normal and hover states,
with an opaque-paint positive control proving the alpha probe detects filled pixels.
The hovered arrow changes color while remaining opaque.
The actual link selects the updated hover fragment and still returns to the top and hides.
Browser errors remained empty.

The user approved the completed responsive Home and its Desktop works width cap.
The responsive About page is now implemented at `about.html`.
Phone, Tablet, and Desktop About PNG/PDF references are present.
The user approved implementing About across Phone, Tablet, and Desktop with shared code and original assets.
The Phone reference omits the main portrait visible in the other references.
The user confirmed showing the same supplied portrait on phone and described the omission as a probable Figma bug.
All About photographs are PNG files.
Gallery corners and gold shadows use one shared CSS rule with `border-radius` and `box-shadow`.
The user explicitly rejected SVG photographs and SVG gold-shadow assets.

The full phone Home page is implemented,
including all six projects and the footer.
The user waived further Home section reviews.
The user accepted the sRGB-safe hover state and requested the phone menu.
The user accepted the phone menu: “Okay, it works great.”
Home now adapts to the supplied Tablet and Desktop designs
with one 40rem breakpoint and shared fluid sizing.
The responsive implementation passed its initial headed-browser checks.
The user subsequently reported misaligned illustration and text edges at Desktop width.
They prefer aligning outside edges with outside edges.
An attempted correction used per-image CSS offsets and right-aligned the right-column text.
The user rejected that approach: “That's the wrong way to do it...”
Those changes have been backed out.
The user approved trimming the SVG export margins,
aligning the actual artwork boxes to the outer column edges,
and retaining left-aligned text.
The user also banned CSS grids and requested flexbox where it reduces code.
All grid use has been replaced: flexbox for projects and buttons,
positioned layers for decorative waves.
Wide illustrations select named SVG views with blank export margins removed.
Their boxes align to the outer column edges while text remains left-aligned.
The original phone viewBoxes remain intact;
explicit phone aspect ratios preserve the original image frames after wide-to-phone resizing.
“More About Me” is a link styled as a button and now opens `about.html`.
Its approved temporary `https://example.com` destination was replaced when About was implemented.
All seven links now use the maximum sRGB-safe OKLCH chroma at six decimal places:
`0.259833` for purple and `0.146646` for gold.
Original lightness and hue are retained.
This supersedes both the initial 10% increase and the out-of-gamut 100% preview.

Python serves the preview at `http://localhost:4173/`.
The user opens it themselves.
The [full reference comparison](../review/phone-home-reference-comparison.svg)
records the supplied design and implementation at matching 390-pixel widths.

## Agreed scope

- The first step implemented the intro from `../Phone/Home.png`,
  through “More About Me” and the first decorative wave.
  The user accepted the artwork correction and then authorized the Tales section.
- The user accepted Tales and authorized the complete Home page.
  Implement the remaining project sections and footer without section review checkpoints.
  The menu subsequently passed its separate user review.
- All six case-study links temporarily open `https://example.com`,
  explicitly confirmed by the user for the remaining five buttons.
- The initial hamburger preview has been replaced with the requested functional menu.
  The user accepted that menu implementation.
- The About link opens the implemented local `about.html` page.
  It previously used the explicitly approved `https://example.com` placeholder.
- The initial hover request increased OKLCH chroma by 10%.
  The user subsequently requested maximum hover chroma.
  After asking whether other components changed,
  the user requested the maximum chroma safe for sRGB.
  Retain the original lightness and hue and keep all sRGB channels in range.
- The user says image inspection is unnecessary for deterministic changes such as this color adjustment.
  Verify the color conversion and rendered state numerically without viewing screenshots.
- The menu's Contact link temporarily opens `https://example.com`, explicitly confirmed by the user.
  About opens the implemented local About page.
  Home is a regular homepage link.
  Work jumps to the first Home project, explicitly confirmed by the user.
  The user explicitly approved the short local script for closing the menu after navigation.
- The user will supply more material as work proceeds.
  Ask for missing material instead of approximating it.
- Minimum code is the highest priority for this portfolio.
  Ask before introducing a substantial amount of code.
- The next priority is the minimum number of responsive breakpoints.
  Aim for zero if possible, but do not add more code merely to eliminate a breakpoint.
  Adapt Home to the original Tablet and Desktop references while preserving the accepted phone version.
- Keep this handover updated in the portfolio repository.
- Use `agent-browser` in headed mode for this project for the rest of this session.
- Command invocations no longer need `TOKIO_WORKER_THREADS`.
  Prefer non-login shells for agent commands.
- The finished site must make no third-party requests, except for the future form.
  The user explicitly permits locally hosted original fonts and artwork.
- All pages share a separate `styles.css`.
- All scripts use the `.mjs` extension and are loaded with `type="module"`.
- Names must identify the page, content, and role.
  Use descriptive class names, IDs, color tokens, and artwork filenames;
  clarity takes priority over brevity.
  Shared project styles name their shared role;
  project-specific assets name the full project.
- Each wave component must be a separate HTML element with its own SVG asset.
  Keep original positions and layer order;
  do not bundle the whole composition into a single SVG image.
- About photographs must be PNG files; gallery gold shadows must use CSS `box-shadow`.
- No npm dependencies are approved.
  Skip linting and formatting for this project;
  follow conventions specified by the user manually.
- Use aggressive source line breaks manually:
  each CSS declaration gets its own line;
  split HTML attributes across lines for longer tags.
  Minimum code means avoiding unnecessary implementation,
  not compressing source formatting.
- Write fractional rem values as pixel-based calculations:
  `calc(10rem / 16)`, never `.625rem`.
  Keep whole rem values as integers.
  A surrounding calculation may contain the division directly,
  such as `calc(100% - 40rem / 16)`.
- Use native CSS nesting for child selectors and pseudo-classes.
  Write selectors without spaces, including `&>img` and `&:focus-visible`.
- CSS grids are prohibited.
  Prefer flexbox when it reduces implementation code.
- Explain whitespace entities such as `&#32;` in an HTML comment
  at their first use within each parent block.
- The user identified the exported leading and trailing spaces as probable Figma artifacts.
  Remove those spaces rather than preserving them as content.
  There are now no whitespace entities or space-preservation styles in the page.
- Use a simple static file server for this project.
  Python currently serves `http://localhost:4173/`.
  The user opens that URL themselves.
  They could not see the agent's nested headed browser window.

## Source evidence

- `../Phone/Home.png` and `../Phone/Home.pdf` measure 390 by 5077.
- `../Tablet/Home.png` measures 744 by 3302 pixels.
  `../Desktop/Home.png` measures 1440 by 5660 pixels.
  Both have matching supplied PDFs.
- The PDF preserves exact artwork and measurable text positions.
- `../Website (Copy).fig` identifies Abril Fatface Regular for intro headings
  and Playfair Display Bold for the paragraph.
- The user subsequently supplied `../Phone/Abril_Fatface,Playfair_Display.zip`.
  Its font files differ from the initial Google Fonts downloads.
  The supplied Abril Regular and static Playfair Bold now replace those downloads,
  along with their supplied licenses; unused weights are omitted.
- Initial Git state was clean; the repository had a README and supplied PDFs,
  with no website code or build tasks.

## Implementation

- `1e6a161` records the agreed scope.
- `389e10b` adds artwork extracted directly from the PDF and locally hosted fonts.
- `6b3f4ea` implements the intro with HTML and CSS.
- `f87e7c3` replaces downloaded fonts with the supplied ZIP contents.
- `index.html` contains the full Home markup;
  `styles.css` holds shared page styles.
  The original Home implementation needed no JavaScript.
  The menu now uses an approved local ES module; there is no npm dependency.
- `mise run preview` serves the static files at `http://localhost:4173`.
- The supplied white design is retained in either system color preference.
  No alternate theme has been supplied or invented.
- Initial headed-browser inspection confirms live text, loaded assets,
  and disabled preview controls.
  Image dimensions now scale proportionally at narrower widths.
- Headed verification caught horizontal overflow from the greeting's one-pixel offset.
  Padding now provides the same text alignment within the layout box.
- PDF text extraction found leading and trailing spaces on wrapped paragraph lines.
  They were initially preserved for centering.
  The user subsequently identified them as probable export artifacts,
  so the implementation now uses normal centered text without those spaces.

## Work remaining

Updated 2026-10-18 during the client comparison round; the round's own log is the section
"Client comparison round, 2026-10-18" and the client folder's `README.md`.
Minimum code remains the first priority and minimum breakpoints the second.
Ask for missing original materials instead of inventing replacements.

Done this round and pushed: copy fixes, painted containers, hamburger, button pills and hover,
vector artwork replacing every soft mask, live HTML sitemaps, WOFF2 fonts, the About portrait re-cut,
image weight, and the decorative vocabulary on all three case studies
(each verified in Chromium, in real macOS Safari 27 at 1920 wide 1x, and in iPhone 15 Simulator Safari).

Session goal, set by the user on 2026-10-18: fix the site to the point where we can defensibly show the client
"we fixed everything you asked, and everything we inferred you would almost certainly ask".
Figma references are design intent, not pixel specs (the user, citing Erik Kennedy of learnui.design).

Queue, in order (updated 2026-10-18 23:00):

Working rules the user set this evening: Safari is the reference browser ("golden child") and Chromium results never
block; computed-style diffs never block a commit (commit, then fix what the diff finds in its own commit); delegate
non-client-blocking work (tooling, diffs, infrastructure) to Sonnet subagents and keep the lead on client-visible work.

1. Done and pushed since the round began (details in the dated sections of "Client comparison round"):
   card alignment `4426c36`, Tales proportions `813e155`, band headings at 1440 measure and Contact wave edge
   `f2e1d3f`, fluid type to Figma sizes `5a4ba66` (Home, About, Contact) and `0986f1e` (case studies), the client's
   Contact asks (captcha in English over Send, back-to-top above the footer) `745a5e4`, and the client's design round
   (nav and footer in Playfair Regular, 1 s animation steps, Home's wide footer like About's, About footer gap, phone
   hamburger and Home hero) `b85e0e0`, scope confirmed by the user. Each checked in Chromium, real Safari at 1920,
   and the iPhone 15 Simulator.
2. Done: the 414 to 639 phone range, option 3 (hybrid) of four the `gaps` agent prototyped, chosen by the user:
   `568c81b`. Lengths that hold art against art grow with `--phone-art-growth` (0 at 390), and project illustrations
   stop growing at 440 wide. Home at 639 is 5782 px tall (was 7183); 390 and 640 up unchanged; case studies pinned and
   unchanged. Accepted costs: wave tops rise into the illustration area at 639, and iPhone 15 (393) shifts by up to
   3 px. Evidence: `/home/user/temp/agent/xinyanchen-build/gaps-work/` (contact sheets at 639; columns current, 1, 2,
   2b, 3). Still to do: look at it in Safari (VM at 744 is the nearest Safari can go; Simulator at 393).
3. Done: the nesting refactor. User preference (2026-10-18): use CSS nesting wherever it helps (the user's example was
   `.case-study { & .subheading { ... } }`; native nesting cannot splice `&-subheading`, so HTML class names got
   shorter). The user rejected ordering by selector weight ("there are better ways than artificially fighting
   specificity; I already approved huge refactors"), so precedence comes from cascade layers.
   - Stage 1, case-study classes under `.case-study`: `e9f6250` (Chromium computed-style diff 0 against its parent).
   - Layers and the rest: `c7bda33`. `@layer base, components, pages;` element defaults and one focus ring
     (`:where(a, button, input, textarea):focus-visible`, matching every reachable control the old 14-selector list
     did) in `base`; `.corner-decorations`, `.menu-toggle`, the navigation, `.pill`, `.wave-composition`,
     `.site-footer` (`.credits`, `.back-to-top`) in `components`; body classes `.home`, `.about`, `.contact`,
     `.case-study` in `pages`. Pages set pill inputs (`--pill-color`, `--pill-hover-color`, `--pill-phone-inline-size`,
     `--pill-wide-inline-growth`, `--pill-wide-block-growth`) and `.pill` computes the size. The single wide `@media`
     block is gone: wide values sit in the rule they adjust, phone-only variants in `@media(width<40rem)`.
   - Done: the Safari computed-style gate, clean for `c7bda33` (see the Safari gate note under item 1).
   - Done: the Chromium `margin: auto` flake. Blink reports stored fragment margins; about 11% of loads read `0px`
     when two or more lazy images sit far below the viewport. Report `/home/user/temp/agent/chromium-flake/report.md`;
     the tools read Typed OM plus geometry instead.
   - Chromium diff tool: `/home/user/temp/agent/fig-parse/style-diff.mjs`; Safari tool `safari-style-diff.mjs` beside
     it; runbook in Monochromatic `doc/runbook/css-refactor-computed-style-regression.md`.
4. Done: a second Safari WebDriver. Safari Technology Preview 27.0 in the VM guest on guest port 4448, m1 4449,
   Linux 4450 (unit `xinyanchen-vm-webdriver-stp`), lock `flock /home/user/temp/agent/vm-stp.lock`; regular Safari
   stays on 4446 with `flock /home/user/temp/agent/vm-safari.lock`.
   `agent-browser` "Resource temporarily unavailable": the user slice's task ceiling (12288 then, 32768 since
   22:59), plus a separate 30 s read timeout; Monochromatic `doc/troubleshooting/agent-browser-eagain.md`
   (`a6c28f3746`). Sessions started before 23:07 keep a 12288 nproc limit; close browser sessions promptly.
   Serving: the Linux 4174 server is now `/var/home/user/temp/agent/xinyanchen-build/no-store-server-mux.mjs` (unit
   `xinyanchen-no-store`): `/` is the main repo as before, `/@wt-<name>/` serves `/home/user/temp/agent/wt-<name>`,
   so the guest's single forwarded origin `localhost:4173` reaches every build.
5. Apple gate (task 8): all six pages in iPhone 15 Simulator Safari and macOS Safari at 1920 wide 1x and 2x, now on
   `c7bda33`. Real touch on the Simulator works through `idb` (Monochromatic
   `doc/runbook/m1-apple-browser-rig-rebuild.md`); the menu's open and closed states passed on 2026-10-18.
   Client instruction relayed by the user (2026-10-18): the six Home project descriptions and their Project Type and
   Role lines are Medium, 500 (first relayed as Regular in `ee17eea`, corrected to Medium by the user). `Website (Copy).fig` says SemiBold and Bold; treat that copy as possibly
   missing client instructions, and the client's word as the spec.
   Also landed 2026-10-18 late: wide navigation on the centred 1440 column, artwork still full-bleed (`2c49ce9`,
   the reasonable default the user asked for without waiting for a client pick; capping the corner art at 1440 cut
   it with a hard edge); Tales curriculum citations corrected to verbatim official expectations (see the checklist's
   "Open items" section; source PDF and extraction in `/home/user/temp/agent/curriculum-check/`).
   Figma findings: `IMG_0804 1` has no image fill in either Figma copy we hold (only a teal stroke), so the blank
   PDF is the file's own state; the MenuMe chip rows are cut inside the app-screen exports
   (`Phone_1Meal_1Weekly_1Groceries 1` and `2`), so re-exports must come from the MenuMe app design file. The
   second copy `Website (Copy) 202610182243.fig` adds only the Home Medium and footer Regular edits (both built).
   The repo's `@monochromatic-dev/figma-kiwi` rejects both copies (header magic `fig-kiwij`; it knows only
   `fig-kiwie`); the scratch decoders in `/home/user/temp/agent/fig-parse/` (`node-names.mjs`, `node-detail.mjs`,
   `image-fills.mjs`, `dump-text-full.mjs`) read both.
   OPH quotations on Tales: left as written by the user's word that the client worked with OPH directly (likely
   internal OPH material); public-site check found no exact matches and one tension (vaping "long-term health
   consequences" against OPH's public "long-term health effects are unknown"), recorded in the checklist only.
   `MenuMe.fig` (app source, 3367 nodes, `fig-kiwij`): hi-fi chip row is `Tab` instance `3069:5758` (372 wide,
   clips, horizontal scroll) of component `3069:5733` (five 72-wide chips, gap 20, 440 wide); wireframe screen is
   not in this file. Safari Technology Preview driver enabled 2026-10-18 and proven on Linux port 4450 alongside a
   busy 4446.
   Decision (user, 2026-10-18): both MenuMe chip-row screens stay as designed; `MenuMe.fig` is client-owned and will
   not change. The checklist explains the cut last chip as the sideways-scroll cue, without attributing the cut or
   the wireframe's "Diary" to anyone. No re-export is pending.
   Safari Technology Preview 27.0 at a 1920 window (2026-10-18): nav left 302 on all six pages, no sideways
   scroll; the VM shows classic scrollbars (client width 1903), and 70 + (1903 - 1440) / 2 = 301.5, so the nav
   holds the centred column in Safari too (Chromium's 310 is the same formula without a scrollbar). Script:
   `/home/user/temp/agent/stp-nav/nav-1920.mjs`, screenshot `index-1920.png` beside it.
   Monochromatic `5e28ff4756` makes `@monochromatic-dev/figma-kiwi` read the 8-byte prelude plus a uint32
   format version (`j` was version 106); `Website (Copy).fig` parses to 5624 nodes, 207 images in 403 s. The
   2026-10-18 22:43 copy was still parsing at hand-back; its line lands in
   `/home/user/temp/agent/figma-kiwi-fix/b.out` (expect 5702 nodes).
   Client reply `05-client-reply-draft.md` rewritten 2026-10-18 late from the checklist: one WeChat message in
   Chinese plus an English reference; the wide window, portrait and Contact asks are reported as built; it asks
   only for the original `IMG_0804` photo and the two removed curriculum citations (and whether Grade 1 D1.2 is
   the intended one). The OPH vaping note and the screen-share proposal stay out (user, 2026-10-18).
   Send hold unchanged; still to produce: after captures paired with `evidence/before-d5e6250/` in macOS Safari at
   1920 and the iPhone 15 Simulator, citation and Contact before/after, an `IMG_0804 1` frame crop; also wait for
   the Safari style check of the refactor. Parser fix proven on both copies: 5624 and 5702 nodes (`61c8e2370e`).
   Safari gate (2026-10-18): refactor `c7bda33` against `568c81b` gives 0 computed-style differences on all six
   pages at 390, 744, 1440 and 1920, states included (`/home/user/temp/agent/fig-parse/gate-c7bda33-b.log`);
   `main` against `568c81b` differs only by `16881e4` (Home Medium) and `2c49ce9` (wide nav). The tool now parks
   the pointer before probes and retries focus; runbook in Monochromatic `bea49e5715`. Worktree and unit cleanup
   waits until the after-capture job finishes.
   After-captures status 2026-10-18 23:35: iPhone 15 pair and the 10 extra pairs (citations, Contact) done in
   `evidence/after-13f7d95/`; the 54 desktop shots (unit `xyc-after-desktop`, script
   `/home/user/temp/agent/xyc-after/desktop.mjs`) were blocked from 23:26 to 23:33 because Safari Technology Preview
   stayed paired to a session my `nav-1920.mjs` rerun never deleted (`| head -2` killed it before its `finally`).
   With the user's authorization the STP driver launch agent was restarted (`launchctl kickstart -k
   gui/<uid>/dev.monochromatic.safaridriver-stp`, new driver pid 3372) and the stale automation Safari (pid 2836)
   ended; the job resumed at 23:33:17 (20 shots by 23:33:38). Never pipe a WebDriver script into `head`; redirect
   to a file instead (Monochromatic runbook `79ba2916b3`).
   Queue as of 2026-10-18 23:45: (a) done, after-captures: 54 desktop pairs (Safari Technology Preview at 1920 by
   950), 2 iPhone 15 Simulator pairs, 10 Chromium extra pairs in the client folder's `evidence/pairs-13f7d95/` with
   `index.md`; lead checked shots 12, 25 and the Contact captcha pair; the magenta Tales citation lines match Figma
   (`#994198` on every Tales frame). (b) running, report-only audit of GPT-built anti-patterns to
   `/home/user/temp/agent/gpt-audit/report.md`; fixes each in their own commit with a Safari style diff, and the
   pairs re-shot if a fix changes a captured region. (c) done: worktrees `wt-base`, `wt-nest`, `wt-layer`,
   `wt-hybrid` removed after proving their work is on `main` (`wt-nest` equals `e9f6250`, `wt-hybrid` equals
   `c7bda33`, `wt-layer` is `c7bda33` minus the hybrid phone fix); copies `wt-refactor`, `wt-gaps` deleted; units
   `xinyanchen-nest`, `xinyanchen-layer`, `xinyanchen-hybrid` stopped. `wt-harness` stays (Safari style-diff page).
   (d) the client reply has every attachment and goes out only when the user says so; the user chose a short
   set: 11 numbered key pairs with bilingual captions in the client folder's `evidence/send-13f7d95/`, in the
   message's order (Scotties phone, decorations, copy, sitemap, cards, wide nav, Contact, citations); the draft
   now says the main items, not every item, have images.
   Audit (2026-10-19), report `/home/user/temp/agent/gpt-audit/report.md`, findings F1 to F20. F1: Pages
   (Jekyll 3.10 legacy build from `main`) published `doc/`, `README.md`, `mise.toml` and the unlinked source portrait;
   the user chose site exclusion only, so `_config.yml` (`2d08763`) excludes them while the repo stays public with
   them; verified live after build `7d4f201`: those paths 404, pages, CSS, scripts, assets and PDFs 200. A Jekyll
   `exclude` list replaces the defaults, and a trailing slash excludes a directory (Jekyll v3.10.0
   `lib/jekyll/configuration.rb`, `lib/jekyll/entry_filter.rb`). In progress (one agent, one commit each, Chromium
   and Safari style diffs): F4 faux-bold Abril on Scotties prototype links, F3 About portrait `sizes`, F17 apostrophes
   and Hi-fi/Lo-fi spelling, F20 README drift, F7 inert CSS. Later: F2 favicon rebuilt from the vector logo, F5 zoom
   viewer accessible names, F6 hidden 745 px switch, F9 to F16, F18, F19 (maintenance).
   Reboot recovery (2026-10-19 00:26, the user's REISUB): `2baa185` had been pushed but the local branch update was
   lost; its content sat staged, byte-identical to the pushed blob, so local `main` was fast-forwarded. All
   `xinyanchen-*` units were re-run from Monochromatic `doc/runbook/m1-apple-browser-rig-rebuild.md` (corrected in
   `88dbdac5e8` to start `no-store-server-mux.mjs`); 4174, m1's 4173, Safari 4446 and STP 4450 all answered. The
   cut-off fix agent left no edits; its half-created `wt-pre` matched `7d4f201` and was removed. The audit fixes
   (F4, F3, F17, F20, F7) were restarted from scratch.
   Audit fixes landed 2026-10-19, each with Chromium and Safari computed-style diffs: F4 `3b8f44f` (Abril links at
   400; Safari's faux-bold advance gone, links about 10 px narrower), F3 `81f65e0` (`sizes` with `clamp()` matching
   the CSS; 744 at 2x loads 760w), F17 `c8a97e4` (curly apostrophes, Hi-fi/Lo-fi; Figma itself is mixed), F20
   `fc46cd2` (README), F7 `f2a656d` (inert CSS removed; 0 differences in both browsers). Next: F2 favicon, F5 zoom
   viewer names. Client images at `13f7d95` stay valid (only apostrophe shapes differ in them).
   F2 `106f1cf`: `icon.svg` 168,825 to 1,891 bytes, the logo's vector paths in the same square frame (renders compared
   at 16, 32, 180, 512 px in `/home/user/temp/agent/audit-fix-2/`); `favicon.ico` already matches; `apple-touch-icon.png`
   is opaque on white, so iOS shows it correctly, and stays. F5 `3489fae`: all 47 viewers named after their image's alt,
   close buttons "Close enlarged image: <alt>"; all 47 opened and closed by button and Escape; 0 style differences.
   Next (maintenance, gated on 0 computed-style differences unless intended): F6, F9, F11 to F14, F18, F19.
   User direction (2026-10-19): the maintenance agent's approach looked questionable to the user; it runs to the end
   untouched, and its commits get a lead review before anything builds on them. From the next work item, work that
   cannot run in parallel is done by the lead directly in this session, not delegated.
   Shutdown pause (2026-10-19): the user powered the PC off for a few hours to isolate a room issue. The lead stopped
   the maintenance agent first. It had committed nothing past `c9c12c4`; its uncommitted F11 work-in-progress is still
   in the main worktree's `styles.css` (45 lines in, 42 out). A copy is saved as
   `/home/user/temp/agent/maint-wip/styles-wip-on-c9c12c4.patch`. The WIP adds `--content-column-max-inline-size` for
   the six `calc(1086rem / 16)` literals. It merges `--color-contact-required-marker` and `--color-back-to-top-ring`
   with the About gallery shadow literal into one `--color-accent-gold: #d9a150`, keeping river gold `#d8a150`
   separate. It also inlines `--tales-growth` as `--home-wide-reference-growth`. The patch has no style diff and no
   review; its last message said "Shell quoting is fighting me". Its worktree `/var/mnt/encrypted/temp/agent/wt-a3` is
   clean at `c9c12c4`. On resume:
   1. Re-run the `xinyanchen-*` units from Monochromatic `doc/runbook/m1-apple-browser-rig-rebuild.md` and check that
      4174, m1's 4173, Safari 4446 and STP 4450 answer.
   2. The lead reviews the WIP line by line against F11. Merging two named tokens into one is a judgement call, not a
      required cleanup.
   3. Keep or trim the WIP, then run the normalized Chromium and Safari style diffs with a positive control, and
      commit only at 0 differences.
   4. Then the lead does the rest of the maintenance work directly, one commit each: F6, F9, F12, F13, F14, F19 (a
      visible message in place of `alert()`, tried at 390 and 1440), and F18 if kept. Remove `wt-a3` when done.
   The client reply still waits only for the user's go.
   Resumed 2026-10-19 afternoon. All four units were re-run and answered. WIP review:
   - The content-column variable and the inlined aliases became `7a3ea5b`, with no intended computed-style change.
   - The gold merge was rejected as written. Its comment claimed `#d8a150` and `#d9a150` differ in the client's
     designs. Both Figma files hold only `#d8a150`: 20 fills, 96 strokes, 9 text overrides (the Contact required
     markers) and 9 drop shadows (`/home/user/temp/agent/fig-parse/gold-uses.mjs`, whose pattern also matches
     `#d9a150`).
   - So `6ec4bb3` gives one `--color-river-gold: #d8a150` to the river, the About hover, the required markers, the
     back-to-top ring and the About shadows. That is an intended red-channel change from 217 to 216 on those three
     items.
   F19 `1a361d5`:
   - A refused send inserts a `role="alert"` paragraph above the captcha. It is centred on phones and end-aligned at
     40rem and up.
   - Chromium at 390 and 1440 shows one reminder after two refused sends, no navigation and no console errors.
     Screenshots are in `/home/user/temp/agent/f19/`. Safari check passed later the same day.
   - Known and accepted: the reminder stays after the visitor solves the captcha until Send is pressed again, which
     then sends the form. Clearing it earlier needs an hCaptcha `data-callback` global, which is more code than F19
     asked for.
   - Web3Forms' `script.js` does not block an unsolved submit, so the module stays. No null guard was added: the module
     loads only on Contact.
   Style-diff pitfall: `style-diff-norm.mjs` appends `/<page>.html`, so a base URL ending in `/` gives `//styles.css`.
   The server answers that with HTML, and the page renders unstyled. Pass URLs without a trailing slash.
   Worktree URLs survived the doubled slash, but the server root did not.
   After the reboot, Safari 4446 was still paired with the killed agent's session. The lock was free, so the guest's
   `dev.monochromatic.safaridriver` agent was restarted (`launchctl kickstart -k`).
   Diff results so far, outputs in `/home/user/temp/agent/audit-fix/{diff,sdiff}-*.txt`:
   - `7a3ea5b`: 0 differences in Chromium and Safari.
   - Gold `6ec4bb3` in Chromium: 132 differences, every one the 217 to 216 red-channel change. That also serves as the
     positive control for the refactor's zero.
   Rest of the maintenance round, lead-done:
   - F13 rejected after measurement. Deleting the 20 `aria-hidden` attributes on decorative wrappers added 23 empty
     `generic` nodes to Chromium's accessibility tree (`/home/user/temp/agent/f13/`), so the attribute stays. The
     `for` attributes on wrapping labels also stay. The W3C WAI forms tutorial
     (https://www.w3.org/WAI/tutorials/forms/labels/, fetched 2026-10-19) says "Generally, explicit labels are better
     supported by assistive technology."
   - F14 `bab3183`: a whitespace-only reindent, by `/home/user/temp/agent/f14/reindent.mjs`, which leaves Home and
     About byte-identical.
   - F14 `96f3a45`: drops the `loading="eager"` and `defer` attributes.
   - F6 `3d75dad`: `@container(width>744px)` replaces the million-times clamp. Band crops at 390, 744, 745, 800 and
     1440 are pixel-identical, with an odd-against-even control. The Chromium differences are exactly the vanished
     zero-width pseudos and simplified `max-inline-size` values.
   - F9 `4127219`: ten `#section` hooks become `:where()`. The Scotties card-row arm matched nothing, so it is gone.
     The Tales pill exception and the local `span` undo stay, because inverting them adds code.
   - F12 `105abe0`: gold is the pill default, with Home's About link the one purple override, and one shared rule for
     the Home and About wide footer. The two `.case-study` blocks stay split by concern.
   - F18 declined: it changes DOM structure that the CSS selects on, for no visible gain.
   - `07` gained a line for the later fixes. `05` gained the on-page captcha reminder in both languages.
   Every check came back as expected (2026-10-19):
   - Chromium: the HTML commits, F9 and F12 each show 0 differences.
   - Safari gold: 132 differences, all the intended gold step.
   - Safari cumulative `wt-gold` against `wt-f12`: 16 differences, all on the two even Scotties band pseudos that F6
     changes, matching Chromium.
   - Safari F19 at 390 and 1440: one `role="alert"` reminder after two refused sends, centred and end-aligned, no
     navigation. Screenshots are in `/home/user/temp/agent/f19/safari/`.
   All temporary worktrees were removed; `wt-f19` matched `1a361d5` first. The live site serves the new script and
   styles, and `doc/` still answers 404.
   Audit status: F1 to F7, F9, F11, F12, F14, F17, F19 and F20 are fixed; F13 and F18 are declined with reasons. F10 is
   the README breakpoint list, now current.
   The user then chose to do F15 and F16 before the reply (2026-10-19):
   - F15 `31cc272`: `loading="lazy"` on the navigation logo and the case-study phone corner art, both `display: none` at
     one end. In Chromium (six pages) and Safari (MenuMe iframes) each width now fetches only the image it shows.
     About's phone wave layers once looked fetched at 1440, but that was carried over from a 390 visit in the same
     session; a fresh session fetches only the wide files.
   - F16 `2bc1e65`: per-page `rel="preload"` with `crossorigin` for the 3 or 4 faces each first screen uses. Chromium
     layout shift went from nonzero in 17 of 24 loads (largest 0.0093) to 0 in all 24. Each font is fetched once in
     Chromium and Safari, with no unused-preload warning.
   Probes: `/home/user/temp/agent/f15/`, `/home/user/temp/agent/f16/`. Every audit item is now fixed or declined.
   At the user's choice, the reply draft's "faster pages" line in both languages now also mentions F15 and F16.
   The user then chose to check everything on the live site before the reply goes out. The guide is
   `../Client comparison screenshots 2026OCT170133/08-self-check-guide.md`, which says not to solve the captcha and
   press Send, because that emails the client. Next: fix what the user reports, one commit each with a Safari check;
   the reply still waits for the user's go.
6. Client-facing checklist: `../Client comparison screenshots 2026OCT170133/07-what-we-fixed.md` maps every client
   request, design note and inferred ask to commits; keep it current as items land.
7. Open for the user or client: MenuMe contributions 2x2 (as designed) or 4 across (built); uncropped exports for the
   MenuMe chip rows (shots 33, 34); text contrast; the wide-window option A, B or C; a re-send of the blank
   `IMG_0804 1.pdf`; whether the Page 161 quote is complete. Kept as designed unless told otherwise: the faded first
   timeline node, the staggered Key Insights bubbles and Scotties reflection cards. Not applied: lossy WebP and the
   unified About skating crop (files in `/home/user/temp/agent/xinyanchen-build/images-work/`).
8. Then rewrite `05-client-reply-draft.md` around the built artifacts.

Tools from this round: `/home/user/temp/agent/fig-parse/` holds the Figma decoder (`dump-text.mjs`, Figma text data
`texts.json`, runbook in Monochromatic `doc/runbook/figma-file-text-extraction.md`), per-role and per-element size
probes (`roles.mjs`, `type-sizes.mjs`), and a PyMuPDF venv (`pdfenv`); the client's PDFs have outlined text, so
design values come from the PNGs. The device server `no-store-server.mjs` is copied per worktree as
`server-<port>.mjs` with its root and port replaced.

Visual capture on Apple browsers no longer depends on `m1` staying unlocked:
iPhone Simulator screenshots work while locked (`/home/user/temp/agent/xinyanchen-build/sim-shots.mjs`;
text fragments such as `#:~:text=Potential%20for%20Impact` reach any element),
and macOS Safari runs in the user's UTM macOS VM
(`/home/user/temp/agent/xinyanchen-build/vm-safari-shot.mjs out-dir 1920x1080@1 page.html@scrollY`).
Setup, tunnels and pitfalls: `doc/runbook/macos-safari-capture-while-host-locked.md` in the Monochromatic repo.
Step scroll offsets by the 1028-pixel viewport height, or stitched frames repeat content.

## Artwork review correction

The user supplied `Screenshot_20261015_191521.png` showing artwork ending inside a 414-pixel phone view.
Headed-browser measurement reproduced artwork fixed at 390 pixels.
The cause was `main`'s `max-inline-size: 24.375rem` in `styles.css`.
That cap is removed so artwork fills the phone viewport.

The PDF contains clipping rectangles at its exported phone frame,
but the extracted vector paths retain coordinates outside those rectangles.
For example, the gold wave path extends from x -381.464844 to 491.886719.
No replacement or invented artwork is needed for the viewport-width correction.
Cropping at the outer frame remains part of the supplied composition.

Future phone checks must compare artwork bounds with viewport bounds,
including a phone wider than the 390-pixel reference.

## Earlier intro verification

- `db85d14` removes the 390-pixel width cap.
  The user confirmed that correction works in their preview.
- The Python server returned HTTP 200 after the interrupted tooling session.
- A subsequent automated headed-browser check did not complete:
  `agent-browser` reported `CDP command timed out: Runtime.evaluate`.
  Do not describe that attempted check as passing.
- `agent-browser close` completed successfully after that timeout.
- The manual formatting change expanded CSS declarations and HTML attributes.
  It adds no dependency or page behavior.
- `a5532b0` records expanded source line breaks.
- `d8ea7fc` converts fractional rem values to the user's explicit division convention.
  An arithmetic comparison against `db85d14` confirms equal CSS values;
  normalized HTML comparison confirms only whitespace changes.
  No decimal rem literals remain in `styles.css`.
- `c26d01f` records the incomplete automated checks in
  [the browser troubleshooting note](../troubleshooting/agent-browser-preview.md).

## Tales implementation and verification

- `7a848bb` extracts original campaign artwork and button graphics.
- `760f6df` adds the project text and the temporary `https://example.com` destination.
- `ca0148d` replaces vague names with explicit page, content, and role names.
- `3e795de` removes exported leading and trailing text spaces.
- `f8c454c` separates the intro wave into 7 HTML images
  and the project waves into 2 HTML images.
  Their original SVG paths and raster accent remain unchanged.
- `24d4e0d` nests child selectors and `:focus-visible`,
  with no spaces inside selector text.
- Headed Chromium verified content widths of 320, 390, and 414 pixels.
  Artwork loaded at the full content width without horizontal overflow.
  These are measured CSS content widths, not physical iPhone tests.
- At 390 pixels, the intro wave occupies y 608 through 844;
  the project waves occupy y 1247 through 1584.
  The case-study link starts at y 1448 and has a 162 by 48 pixel hit area.
- Tab focuses the case-study link with a visible 2-pixel purple outline.
  Hover and hit testing confirmed the wave layers do not intercept the link.
  Enter and pointer click both navigated to `https://example.com/`.
- The initial portfolio document loaded only same-origin resources.
  Browser error and console-message collections were empty.
- Light and dark preferences were exercised.
  Both retain the supplied white design, as agreed.
- `c536af9` refreshes the implementation capture after the component and nesting changes.
  The reference comparison uses matching 390-pixel content widths.
  The untouched reference still contains its exported spacing artifacts.
- The final comparison was opened in headed Chromium and visually inspected
  after the last source and asset changes.
  The extracted artwork keeps its original positions and alignment.
  [Compare the supplied reference and implementation](../review/home-introduction-and-tales-for-safer-trails-reference-comparison.svg).
  The user accepted this checkpoint and authorized the complete Home page.

## Shell-noise stopgap

Starship 1.26.0 repeatedly printed a `TERM=dumb` error in login-shell commands.
`STARSHIP_LOG=off` did not silence the installed binary.
At the user's request, the local Bash integration temporarily discards Starship stderr.
A fresh login-shell command was quiet after that change.
The durable replacement is tracked in
[Monochromatic issue #994](https://github.com/Aquaticats/Monochromatic/issues/994).
Do not resume shell investigation as part of the portfolio work.

## Full Home implementation and verification

- `5428c4b` records the full Home authorization and placeholder destinations.
- `1b5b03e` extracts the remaining original project illustrations,
  each separate wave component,
  and the standard-width case-study button background.
- `3a379cf` completes MenuMe, Scotties, Matcha Delight,
  Echoes of Tradition, Faces of the Future,
  Youth in Limbo, and the footer.
  It adds 341 HTML and CSS lines using the existing shared section pattern.
  There is no JavaScript, new font, dependency, or component framework.
- Source wording remains intact,
  including `DesignSurrealist Poster Design`,
  `Ontario,where`, and `Wireframing,Prototyping,`.
  Leading and trailing export spaces are omitted.
- The footer preserves the supplied 2026 copyright.
  CSS spacing separates the creation-tool and copyright text;
  no whitespace entities are needed.
- At a measured 390-pixel content width,
  the page is exactly 5077 pixels tall.
  Case-study link top positions are 1448, 2071, 2729, 3397, 4128, and 4800 pixels,
  matching the original PDF.
- Headed Chromium verified 320, 390, and 414-pixel content widths.
  All 26 HTML images loaded and filled the content width.
  The page had no horizontal overflow at those widths.
- All six links have distinct accessible names,
  a 48-pixel minimum height,
  and at least a 144-pixel width.
  Tab visited every link in document order with a visible 2-pixel outline.
  Hit testing confirmed decorative layers do not intercept the links.
- Hover and pointer activation were exercised for every case-study link.
  Every activation navigated to `https://example.com/`.
  Enter also activated the final link successfully.
- Both light and dark preferences retained the supplied white design.
  The initial Home document recorded 32 same-origin resource loads
  and no external resource loads.
  Both supplied local font faces loaded.
  Browser page-error and console-message collections were empty.
- `5da1d6e` commits the full capture,
  an unchanged copy of the supplied Home PNG,
  and their comparison.
  The project artwork, spacing, and footer were inspected in the running comparison
  at matching scale.
- Linting and formatting tools were not run,
  as the user instructed.
  Source line breaks, fractional rem calculations,
  descriptive names, and selector nesting were followed manually.

## Initial 10% link hover implementation and verification

- `5af8104` changes the About control to an anchor with the confirmed temporary destination
  and adds hover fills to the original button artwork.
- `666dcfe` gives the changed SVG backgrounds fresh asset URLs
  after the browser reused older decoded SVG documents.
  See [the cache observation](../troubleshooting/agent-browser-preview.md#svg-background-cache-observation).
- `d16c1a4` shares background-image selection across all project links.
  Each variant supplies normal and hover image variables;
  nested hover styling selects the active image without a competing variant declaration.
- Shared `styles.css` selects the SVG fragment `#button-background` on hover.
  An asset-local `:target` rule paints only that original fill path with
  `oklch(from currentColor l calc(c * 1.1) h)`.
  The extracted paths and shadows are retained.
  There is no JavaScript, dependency, generated artwork, or external resource request.
- Headed Chromium computed the purple fill as
  `oklch(0.489316 0.0810174 300.955)` normally and
  `oklch(0.489316 0.0891192 300.955)` on hover.
  Both gold widths changed from `oklch(0.652854 0.120467 64.8586)` to
  `oklch(0.652854 0.132514 64.8586)`.
  Lightness and hue stayed equal; chroma increased by the requested factor.
- Raster samples from the final production asset URLs changed from RGB `104,85,135`
  to `105,84,139` for purple and from `194,127,54` to `198,125,38` for gold.
  A pixel comparison of the shadow-only rows found no changed channels
  in any of the three background variants.
- Native pointer hover selected the correct fragment on all seven links.
  Moving away restored every normal background.
  White text and 48-pixel hit-area heights were retained.
- Tab visited all seven anchors with their visible 2-pixel focus outline.
  Both Enter and pointer click on “More About Me” reached `https://example.com/`.
- Content widths of 320, 390, and 414 pixels were rechecked without horizontal overflow.
  Light and dark preferences retained the white design and hover background.
  Page-error and console collections were empty;
  Home recorded no external resource loads.
- Hover captures show the [About link](../review/home-about-link-oklch-hover.png),
  [Tales link](../review/home-tales-case-study-oklch-hover.png),
  and [standard-width case-study link](../review/home-standard-case-study-oklch-hover.png).
  These record the verified interaction states;
  no additional Home review is required.

## Maximum-chroma hover preview

- The user could not see the initial effect and requested maximum chroma on hover.
  `a5fbdd8` sets each SVG target fill to `oklch(from currentColor l 100% h)`.
  This changes the existing rule rather than adding another implementation.
- Maximum is interpreted as CSS chroma 100%, equivalent to `C = 0.4`.
  Chroma has no mathematical upper bound;
  see [MDN's OKLCH channel definitions](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/oklch#values).
  This value exceeds the display gamut for these fills.
  The declared lightness and hue components remain the original values,
  but display clipping changes their rendered appearance.
- Headed Chromium computed `oklch(0.489316 0.4 300.955)` for purple
  and `oklch(0.652854 0.4 64.8586)` for gold.
  Actual raster samples changed from RGB `104,85,135` to `146,0,255` for purple
  and from `194,127,54` to `255,0,0` for both gold variants.
  The case-study hover therefore renders red in this browser.
  Shadow-only pixel rows stayed identical for all three variants.
- The changed SVG filenames now end in `background-and-shadow-maximum-chroma-hover.svg`.
  Shared CSS references these fresh URLs so older decoded SVGs cannot hide the change.
- Native hover selected the new fragment on every link;
  moving away restored all normal backgrounds.
  Tab still visited all seven anchors with visible 2-pixel focus rings.
  Light and dark preferences retained the supplied white layout.
  Browser error and console collections were empty, with no external Home resource loads.
- The 100% preview captures show the [About hover](../review/home-about-link-maximum-chroma-hover.png),
  [Tales hover](../review/home-tales-case-study-maximum-chroma-hover.png),
  and [standard-width hover](../review/home-standard-case-study-maximum-chroma-hover.png).
  The initial 10% captures remain historical evidence.

## Maximum sRGB-safe hover chroma

- The user requested the maximum chroma safe for sRGB,
  then explicitly waived image inspection for this deterministic adjustment.
  No screenshots were captured or viewed for this change.
- `b4f45ef` replaces the 100% setting with measured chroma limits.
  `39949d8` corrects the gold limit using the actual SVG `currentColor` conversion.
  The final fill rules are `oklch(from currentColor l 0.259833 h)` for purple
  and `oklch(from currentColor l 0.146646 h)` for both gold widths.
  There is no runtime calculation, JavaScript, or added dependency.
- Measurement used a 64-step binary search between chroma 0 and 0.4,
  converting through native CSS into sRGB and requiring all channels to stay between 0 and 1.
  Values are rounded down to six decimal places.
  Increasing either final value by `0.000001` produces a negative RGB channel.
  This establishes the maximum at the chosen precision in the verified browser.
  See [CSS Color's sRGB definition](https://www.w3.org/TR/css-color-4/#predefined-sRGB).
- Verification used the actual SVG stylesheet fill and original `color` attribute,
  preserving the `currentColor` conversion rather than reconstructing rounded CSSOM output.
  Purple computed as `oklch(0.489316 0.259833 300.955)` and converted to
  sRGB `0.493081, 0.00000373013, 0.844494`.
  Gold computed as `oklch(0.652854 0.146646 64.8586)` and converted to
  sRGB `0.799143, 0.477302, 0.00000784531`.
  Both retain the original computed lightness and hue; opacity remains 1.
- Decoded fill samples changed from RGB `104,85,135` to `126,0,215` for purple
  and from `194,127,54` to `204,122,0` for both gold variants.
  Shadow-only rows had zero changed channels in all three variants.
- Native pointer hover exercised every link with the new production asset URLs,
  which end in `background-and-shadow-srgb-gamut-boundary-hover.svg`.
  Moving away restored all normal fills.
  The About link retained its visible keyboard focus ring.
  Light and dark preferences were exercised; browser error and console collections were empty,
  and Home loaded no external resources.

## Phone menu implementation and verification

- The supplied `../Phone/Side menu.png` is 101 by 887 pixels.
  Its PDF page is 101 by 887 points, with an original white panel spanning x 0 through 97.
  Original text starts at x 20; baselines are 158, 209, 260, and 311.
  Text size is 15; the supplied glyph outlines match the existing Abril Fatface lettering.
- Preserve the white 97-pixel panel, original hamburger paths, link order,
  typography, and vertical spacing.
  Use a native popover without introducing a dependency.
- The user questioned why plain navigation links would need a script.
  The initial implementation had used same-document fragment links for Home and Work.
  A headed-browser click on Work reached the Tales fragment while leaving the popover open.
  That was the reason for proposing a close-on-navigation handler,
  rather than a requirement for regular page links.
  The user subsequently approved writing the JavaScript.
- Home now links normally to `./`.
  Work jumps to projects within Home, as explicitly selected by the user.
  The approved `phone-navigation-menu.mjs` closes the popover when a menu link is chosen;
  it was renamed to `portfolio-navigation.mjs` on 2026-10-15 when shared back-to-top behavior was added.
  the browser still handles navigation normally.
  It was initially named `phone-navigation-menu.js`,
  then renamed on 2026-10-15 to follow the user's `.mjs` and `type="module"` convention.
  Native opening, Escape dismissal, and outside-click dismissal need no script.
- `43b73aa` extracts the original icon paths and copies the supplied reference.
  `f568070` implements the popover in HTML and shared CSS.
  `aa56403` uses a regular homepage link.
  `5d62b48` adds the approved close-on-selection handler;
  `741f3db` loads it as a local `.mjs` module.
  CSP permits same-origin scripts without enabling inline scripts or third-party resources.
- `c3899ca` aligns the live text's baselines with the PDF using 128-pixel top padding.
  The panel is 97 pixels wide and fills the viewport height.
  Menu links have 97 by 48 pixel targets;
  the close and open controls have 48 by 48 pixel targets.
- Headed Chromium verified opening, the close button, Escape with focus restoration,
  and outside-click dismissal.
  Work scrolled to the Tales project and closed the menu through the module.
  Keyboard activation of Home returned to the homepage top with the menu closed.
  About and Contact both navigated to `https://example.com/`.
  Link hover underlining and visible keyboard focus rings were exercised.
- Content widths of 320, 390, and 414 pixels had no horizontal overflow.
  Both color preferences retained the supplied white panel.
  Browser page-error and console collections were empty;
  Home loaded no external resources.
- The [menu comparison](../review/phone-navigation-menu-reference-comparison.svg)
  pairs the supplied image with the captured 97-pixel panel at matching scale.
  The [full viewport capture](../review/phone-navigation-menu-implementation.png)
  shows how the white panel overlays Home.
- The comparison crops the supplied image's 97-pixel white panel from its full 101-pixel export;
  it does not resize the reference into a narrower image box.
- `3d308f0` records the review artifacts and browser verification.
  `e564216` corrects the comparison crop without scaling the source.
  The user accepted the menu and authorized Tablet and Desktop adaptation.

## Tablet and Desktop adaptation and verification

- Both supplied PNGs have been opened and inspected.
  Both PDFs have been converted to SVG and positional text in the existing private scratch directory,
  `~/temp/agent/portfolio-intro/`.
  Its `inspect-wide-home-designs` task reproduces that extraction.
- The wider references use inline navigation and alternating image/text project columns.
  Their intro and footer wave compositions differ from Phone.
  Tablet and Desktop share the overall layout pattern but differ in sizes and spacing.
- Before adaptation, the page had phone-specific forced text lines,
  full-width artwork frames, project-side waves, and per-project vertical offsets.
  Inspect which assets and markup can be reused before adding responsive rules or extracting replacements.
- The user explicitly approved the shared implementation scope:
  wrap each project's description for alternating columns,
  add one shared responsive CSS block,
  extract the original wide decorations as separate SVG components,
  and reuse the existing content, navigation, and project illustrations.
  Use one phone-to-wide breakpoint and fluid sizing for Tablet and Desktop.
- A headed-browser probe confirmed that the existing popover navigation can become visible inline
  through wide-screen CSS while retaining its native phone behavior.
  Calling `hidePopover()` when it is already closed is harmless in the verified browser.
  No extra navigation markup or responsive script is needed.
- The proposed shared wide layout starts at 40rem.
  Sizes and spacing interpolate between the 744-pixel and 1440-pixel references.
  Use the original Desktop wide decoration paths as the shared wide artwork,
  preserving separate elements for wave components.
- Extracted the original Desktop corner art, floral logo,
  introduction wave components, and footer wave components into separate `assets/home-wide-*.svg` files.
  Original paths, embedded images, masks, and clipping definitions are retained.
- Wrapped each existing project description once for the shared column layout.
  Picture sources select the original phone or wide wave components at the same 40rem boundary.
  The shared navigation now uses the descriptive `portfolio-primary-navigation` ID.
  The existing phone close handler targets the renamed element.
  Phone layout rules still apply.
- The responsive CSS uses one 40rem breakpoint,
  inline navigation, alternating project columns, and fluid typography and spacing.
  A body inline-size container supplies the actual content width for interpolation,
  avoiding the scrollbar width included in viewport units.
  The initial adaptation retained the complete project SVG frames.
  The later outside-alignment correction selects trimmed wide views from the same SVG files.
- Measured the accepted phone layout at 390 pixels after the markup changes:
  page height remains 5077 pixels.
  Measured the shared Tablet layout at 744 pixels after spacing calibration:
  page height is 3302 pixels, matching the supplied reference height.
  The completed Desktop layout measures 5685 pixels tall at 1440 pixels wide.
  Its live text wraps naturally, so it is 25 pixels taller than the supplied 5660-pixel reference.
- The initial 640-pixel viewport capture exposed Scotties and Matcha artwork overlapping text.
  Capped illustration frames according to their measured internal margins and the fluid column gap.
  This keeps original artwork inside the available image area without another breakpoint.
- Completed headed-browser checks at content widths of
  320, 390, 414, 600, 624, 625, 640, 744, 1024, 1440, and 1920 pixels.
  No horizontal overflow, failed image decodes, or visible targets smaller than 48 pixels were found.
  The overflow probe passed its positive control at every width.
  The 639-pixel outer viewport retained the phone layout;
  the 640-pixel outer viewport selected the wide layout.
- Before the outside-alignment correction, project artwork clearance was measured from the original SVG paint bounds
  at outer widths of 640, 759, 1039, 1455, and 1935 pixels.
  Every illustration remained clear of the adjacent description.
  The smallest measured clearance was approximately 2.76 pixels at the breakpoint.
- Verified phone opening, autofocus, close button, Escape, outside-click dismissal,
  Work closing and scrolling to the first project,
  and resizing an open menu to wide navigation and back.
  Wide navigation remained visible after Escape closed the native popover state.
  Keyboard Tab showed the Home focus outline;
  keyboard Enter activated Work;
  Home performed regular navigation back to the page top.
- Actually opened every outgoing link:
  About CTA, all six case-study links, and navigation About and Contact.
  Each reached the approved `https://example.com/` placeholder.
  Every CTA selected its existing maximum-sRGB-chroma SVG fragment on hover.
- Both light and dark preferences retained the accepted white reference presentation.
  The Home resource list contained no third-party requests.
  Browser errors and console messages were empty after the interaction checks.
- Saved fresh Phone, Tablet, and Desktop captures in `doc/review/responsive-*-home-implementation.png`.
  The original wide PNG references are preserved in `doc/reference/`.
  The Tablet and Desktop responsive comparison SVGs show reference and implementation at matching scale.
  Full-page browser captures already omit the scrollbar:
  their native dimensions are 744 by 3302 and 1440 by 5685 pixels.
  An initial comparison incorrectly declared the outer viewport widths;
  the corrected image dimensions preserve the native capture scale.
  Reference is on the left; implementation is on the right.
- Compared the fresh Phone capture with the historical accepted capture over 1980030 pixels.
  There were 499 changed pixels, all within the header floral artwork
  at x 171 to 210 and y 55 to 108.
  Every other compared pixel was identical.
  The cause of that localized raster difference was not investigated;
  the source phone SVG and its dimensions remain unchanged.
- Implementation commits include `f881ac5` for original wide artwork,
  `2a1da60` for shared markup,
  `fdfe88f` for the responsive layout,
  `ad6351b` for narrow-wide artwork clearance,
  and `0272584` for the matching-scale captures.
- The Home responsive scope is implemented and verified.
  No additional Home review is required by the user's instruction.
  Future page work still needs its supplied materials and destinations.
- The outside-alignment correction passed the final width and interaction checks.
  Matching-scale comparison captures are refreshed.
  Documentation was rendered and checked in headed Chromium.
- The private agent-browser connection, owned Chromium, and nested compositor are closed.
  The Python preview remains the site server at `http://localhost:4173/`.

## Outside alignment and flexbox correction

- `2b1d1c2` backs out the rejected per-image translations and right-aligned text.
- `d2a0eff` adds a descriptive named view to each original project SVG.
  The wide view removes blank export margins with one source pixel of antialiasing clearance.
  Root phone viewBoxes, original paths, and embedded images remain unchanged.
  No duplicate project assets are needed.
- `f5fa91e` replaces every CSS grid with flexbox or positioned wave layers.
  Project rows alternate direction using the existing section order.
  Space between the artwork and description aligns each outer box with its column edge.
  Text remains left-aligned on wide screens.
- `d18dbaa` removes redundant source dimension attributes.
  `5f0b2cd` explicitly retains each original phone frame aspect ratio.
  During verification, the browser kept the wide layout ratio after switching back to phone;
  waiting for image decoding and network idle did not restore the frame.
  Explicit phone ratios fixed the measured layout without responsive JavaScript.
  Wide images use the selected SVG view's natural ratio.
- Measured repeated 390 to 1920 to 390 to 744 to 390-pixel content-width switches.
  The phone page returned to 5077 pixels tall after every switch.
  At 744 and 1920 pixels, every artwork and description outside box aligned exactly
  with its section's outer edge.
  All wide descriptions computed to `text-align: start`.
  Tablet remained 3302 pixels tall and Desktop remained 5685 pixels tall.
- Queries and additional original-frame SVG views were tried locally while diagnosing resize behavior.
  Neither resolved the issue and neither is present in production.
  No new JavaScript, breakpoint, dependency, or third-party resource was added.
- Rechecked content widths of 320, 390, 414, 600, 624, 625, 640, 744, 1024, 1440, and 1920 pixels.
  Every overflow positive control succeeded, and the page itself had no horizontal overflow.
  All images decoded, visible targets met the 48-pixel minimum, and Home loaded no external resources.
  Every wide artwork and description outside edge aligned at the measured breakpoint,
  Tablet, intermediate, Desktop, and 1920-pixel widths.
- Rechecked keyboard opening, the close button's autofocus, Escape with opener focus restoration,
  and Work closing the phone popover and scrolling to the project.
  All seven CTA hover backgrounds selected the existing sRGB-safe fragment.
  Both color preferences retained the white design.
  Browser page-error and console collections were empty after these checks.
- `7cd03c5` refreshes the Phone, Tablet, and Desktop implementation PNGs.
  Their native sizes remain 390 by 5200, 744 by 3302, and 1440 by 5685.
  Existing comparison SVG dimensions remain valid.
  The final Desktop and Phone captures were visually inspected.
- The new Phone capture differs from the historical accepted capture in 5776 of 1980030 pixels,
  within the header, first wave, Tales illustration, and Tales button regions.
  No differences occurred after y 1489.
  These are raster comparisons, not a claim of a diagnosed rendering cause.
  Phone section positions and original artwork frame dimensions remain intact.
- The Tablet and Desktop comparisons were reopened in headed Chromium.
  Their declared image sizes match the actual PNG dimensions without scaling the captures.
  Rendered README, handover, and browser notes contained the grid prohibition,
  the final verification results, and no exposed Markdown emphasis delimiters.
- Home's current scope is complete.
  Further About, Contact, or case-study work needs the user's next supplied materials and destinations.

## Desktop works width cap

The user requested that works stop growing at the supplied Desktop layout width.
The Desktop reference is 1440 pixels wide with 177-pixel project gutters,
so the shared project rows now have `max-inline-size: calc(1086rem / 16)`.
Automatic inline margins center each row beyond that size.
The existing fluid inline size preserves the Tablet and narrower wide-screen gutters.
This adds no wrapper, breakpoint, grid, or JavaScript.
`a8259be` implements the cap with shared CSS only.
Headed Chromium verified content widths of 320, 390, 625, 744, 1024, 1440, 1920, and 2560 pixels.
All six rows measured 1086 pixels at Desktop and wider sizes,
with equal inline margins of 177, 417, and 737 pixels respectively.
Phone and Tablet dimensions remained unchanged, with no horizontal overflow or undersized visible targets.
Images decoded successfully; browser page-error and console collections were empty.

## About page preparation

- The user approved Home and requested About.
- Supplied references are `../Phone/About.png` and `About.pdf`,
  `../Tablet/About.png` and `About.pdf`,
  and `../Desktop/About.png` and `About.pdf`.
  PDF page sizes are 390 by 3601, 744 by 2774, and 1440 by 3254 points respectively.
  All three PNGs have been visually inspected.
- Original text positions and SVG artwork were extracted into the existing private scratch directory
  with its `inspect-about-designs` task.
- The page contains an introduction, biography, View My CV link,
  skating/beach/reading photographs with captions, and the existing footer pattern.
  The local `resume_Xinyan Chen.pdf` is available for the CV link.
- Proposed scope: one About HTML page, shared CSS additions,
  original photo and separate decorative wave assets,
  reuse of navigation, footer, local fonts, hover behavior, and the current breakpoint,
  plus wiring Home's About links and About's CV link.
  The user approved this larger code addition.
- The user confirmed including the original garden portrait on phone as well as wider screens.
  Its absence in the phone export is not an instruction to omit it.
- Original portrait, gallery frames, separate wave components, and wide CV button artwork
  are extracted from the supplied PDFs with the private `extract-about-artwork` task.
  SVG paths, image masks, embedded photographs, and shadows are retained.
  The existing sRGB-safe gold hover limit is reused for the new CV background.
- `46fbe14` records the approved scope and initial extracted artwork.
  `d5e8f79` implements `about.html`, shares header/footer styling,
  and wires Home's About links to the new page.
  About's Work link returns to the Home projects; its CV link opens the existing local résumé.
  Contact retains its approved temporary destination.
- The supplied font archive contains the biography's semibold and extra-bold weights.
  Native font measurement matched the PDF's regular biography word widths to weight 600;
  emphasized Phone and Tablet phrases use weight 800.
  Those original static font files are now hosted locally alongside the existing fonts and license.
- `1f4338a` replaces the isolated gallery SVGs with exact reference PNG crops.
  The isolated SVG exports did not retain the visible skating and beach gold shadows in Chromium.
  Original pixels preserve each photograph, frame, and shadow without recreating the effect.
  Phone and Desktop use their respective supplied crops.
  The raw reference PNGs are retained in `doc/reference/`.
- Initial measurements match the Phone biography paragraph positions and gallery rhythm,
  with the confirmed portrait added in the empty exported region.
  Phone and Tablet page heights measure 3601 and 2774 pixels respectively.
  The shared wide layout uses the existing 40rem breakpoint;
  the interests gallery wraps naturally where a single row does not fit.
  No new JavaScript, npm dependency, grid, or third-party request is introduced.
- The user clarified that all About photographs must be PNG files,
  and gallery gold shadows must use CSS `box-shadow`.
  This supersedes the intermediate SVG-photo and shared-shadow-SVG proposals.
  Photo-only PNGs now come from the original PDF image groups without gold shadows.
  The shared gallery rule supplies the original gold tone, rounded corners, and `box-shadow`.
  The garden portrait is also PNG, retaining its supplied gray frame.
  The private `rasterize-about-photographs` task reproduces these PNGs from source-only SVG intermediates.
- The completed width matrix covered 320, 390, 414, 600, 624, 625, 640, 744, 1024, 1440, 1920, and 2560 pixels.
  Before the CSS-shadow correction, no overflow, image decode failure, external resource, or undersized target occurred.
  The overflow probe passed its injected-overflow positive control.
  Phone, Tablet, and Desktop heights were 3601, 2774, and 3254 pixels.
  Home also passed the 390, 744, 1440, and 1920 pixel regression checks.
- `0e3ebc6` replaces all About photograph SVGs and baked-shadow crops with photo-only PNG files,
  using shared CSS for gallery corners and the gold shadow.
  The corrected page passed 390, 640, 744, and 1440 pixel checks,
  including wide-to-phone resizing, image decoding, target sizes, external resources, and overflow positive control.
  Original reference page heights remain 3601, 2774, and 3254 pixels.
  Computed gallery shadows are `rgb(217, 161, 80) 0px 6px 5px 0px` with 50-pixel corner radii.
- Actual pointer and keyboard checks exercised the menu opener, close button, Escape, outside dismissal,
  Home, About, Work, Contact, Home's About CTA, and the local CV PDF.
  Work reaches the first Home project at viewport top on both phone and wide navigation.
  Keyboard focus returns to the opener on Escape; the CV link shows a 2-pixel focus outline.
  Contact reaches the approved `https://example.com/` placeholder.
- CV hover selects the proper phone and wide SVG fragments.
  Native wide-button rasterization changes fill RGB from `194,127,54` to `204,122,0`;
  shadow rows remain identical.
  Both system color preferences retain the supplied white design.
  Browser error and console collections were empty after the final checks.
- Matching-scale reference comparisons and current full-page captures are retained for
  [Phone](../review/phone-about-responsive-reference-comparison.svg),
  [Tablet](../review/tablet-about-responsive-reference-comparison.svg),
  and [Desktop](../review/desktop-about-responsive-reference-comparison.svg).
  The Phone implementation includes the explicitly requested portrait absent from its export.
- `46518f9` records the final browser evidence and matching-scale About comparisons.
  Updated README, handover, and troubleshooting documentation passed a rendered browser check.
  The owned headed browser was closed with `agent-browser close`;
  its Chromium process and nested compositor then exited successfully.
  The Python preview remains available at `http://localhost:4173/about.html`.
- About is ready for the user's review.
  Contact and case-study pages await later instructions and supplied materials.

## Client comparison round, 2026-10-18

The client reviewed the three case studies at about 1920 pixels on a Mac and on an iPhone 15
and reported many differences from the designs.
The analysis, measurements, decisions, and fix queue live outside this repository in
`../Client comparison screenshots 2026OCT170133/`; read its `README.md` first.
The user treats every earlier implementation choice as suspect,
asks for defects to be fixed before the client finds them,
and has fixes pushed to `main` as each one lands, which updates the live site.
Final acceptance runs in iPhone 15 Simulator Safari and macOS Safari on the `m1` host.

Copy corrections, all approved by the user:
`meals.We` became `meals. We` and `Timeline : 11 Weeks` became `Timeline: 11 Weeks` in MenuMe;
Tales uses Mia for the girl everywhere, replacing two Mila mentions,
and "curiosity leads them" replaces "curiosity lead them";
two invisible zero-width spaces copied from the PDF text layer are removed.
The Tales character artwork now labels its cards Ages 4–5, 6–8, and 9–12,
matching the page's timeline tiers; its alt text matches.
The new labels are Playfair Display Bold outlines generated with `hb-view`,
with scale, baseline, and tracking calibrated so a regenerated "Ages 4–5"
overlays the original path without visible fringes.
The Scotties sitemap PNG now reads "Apparel & Accessories";
the space was inserted by moving the glyph pixels, without redrawing text.
Figma's exports carry these strings, but Figma may have mangled or exported stale text,
so never attribute them to the client.

Buttons and chevrons, iPhone black edges:
the client saw black borders and shadows on iPhone 15 Safari.
35 SVG assets are PDF soft-mask conversions: an opaque colour PNG cut out by a luminance-mask PNG
through `feColorMatrix` filters, and WebKit lets the colour layer's black show along mask edges.
The four button SVGs are gone; one shared `::before` rule in `styles.css` draws each pill and its
`0 4px 4px` 25% black shadow from per-button view-box custom properties,
fitted like the old SVG background, and hover keeps the accepted maximum sRGB-safe chroma.
This supersedes the `#button-background` and `:target` hover mechanism recorded earlier.
Pills match the old rendering in Chromium except anti-aliased edge pixels, page heights are unchanged,
and the WebKit shadow box edge is gone.
The Scotties chevrons are three vector polygons measured from the old mask;
iPhone 15 Simulator Safari renders them crisp with no dark edges.
Test Simulator Safari through a server that sends `Cache-Control: no-store`;
Python's preview server sends no cache headers and Safari kept the replaced SVG.

Button text and hover, the client's request of 2026-10-18:
"按钮的文字需要上下居中，按钮的变色变为下面那条河流的黄色。网站其他的黄色的按钮变色就变成这个网站用的紫色。"
The purple About button now hovers to the river gold `#d8a150` (`--color-home-river-gold`, the gold band's fill);
gold buttons hover to the site purple, replacing the earlier maximum-chroma hover for these buttons.
Each button's content box is now exactly its pill, and `text-box: trim-both cap alphabetic` centers the cap height;
block padding keeps the 48-pixel target and every page height unchanged at 390, 744, 1440, and 1920.
The GPT line-height adjustments around the old 34-of-42 SVG geometry are removed.
Label ink sits within half a CSS pixel of the pill center in Chromium, and Simulator Safari shows it centered.

Contact layout shift: the empty hCaptcha container had no reserved size, so Send jumped 147 pixels
when the third-party frame arrived after first paint, and the inline frame added a 9 to 12 pixel baseline gap.
The container now reserves the compact frame's 138 pixels and the frame is a block;
emptying the container in the loaded page moves Send by 0 pixels at 390, 744, and 1440.

Copy pass, 2026-10-18: 39 unambiguous fixes on five pages (spacing around punctuation, articles,
plural agreement, unclosed quotes, fake-bullet spacing, `behavior` matching the pages' American spelling,
"Tales for Safer Trails" capitalized as on its own page), and story headings use a colon
(`Main Characters: Milo & Mia`, `Ages 6-8: Mighty Brains`).
Every change and every deliberately unchanged candidate is listed in
`/home/user/temp/agent/xinyanchen-build/copy-report.md`; open owner questions are in the client folder's `README.md`.

Jagged artwork: the client reported jagged edges, for example the "Bridging the Gap via Play" bubbles.
Both Tales insight bubbles were low-resolution rotated rasters behind soft masks.
They are now true vectors: each colour layer was separated from a 4x render, the yellow plate closed under the stroke,
lightly smoothed, and traced with `potrace` (script: `/home/user/temp/agent/xinyanchen-build/bubbles/trace.mjs`),
filled with `#f3e499` and `#994198`; 0.2 percent of pixels differ from the old render, all on edges.

Hamburger, the client's request of 2026-10-18 ("如果必须有外框，这个外框需要有点圆角。还有，这个导航汉堡包比点击前的小一样，能做成一样大吗？"):
the visible bars were painted into the corner artwork while the real button was an empty overlay at fixed pixels,
so above about 440 pixels tapping the bars missed it, and the open-state icon was a separate, differently sized image.
Both the open and close buttons now draw the same three CSS bars (35 by 2 pixels, matching `Home.png` exactly at 390)
inside one 48-pixel button with rounded corners, so the focus frame is rounded and both states are identical.
The bar paths are removed from both corner SVGs and the separate hamburger icon file is deleted.
This supersedes the earlier instruction to preserve the original hamburger paths.
Verified in Chromium on all six pages at 320 to 639 pixels (hit testing, open and close paths, focus outline)
and visually in iPhone 15 Simulator Safari; the open state on a real tap is part of the Apple gate.

Non-breaking hyphens: Scotties wrote "E-Commerce" and "e-commerce" with ordinary hyphens,
so phones broke the hero subtitle as "E-" over "Commerce".
All six uses are `E&#8209;Commerce` or `e&#8209;commerce`; every one is set in Playfair Display,
whose fonts map U+2011 to their own hyphen glyph (Abril Fatface lacks it, so do not use it there).
Simulator Safari now breaks the subtitle as "Digital Rebranding &" over "E‑Commerce UX Redesign".

Painted containers (audit Fix 1): the Tales notepad, the Scotties challenge cloud and the positioning note
now keep their copy inside the art at 320 to 1920 (worst intrusion 0 pixels, measured per text line against the
art's rendered interior). The notepad and cloud join Play and Trust in one container-query rule
(copy sized in `cqi` against the 322-pixel phone layout); the cloud SVG stretches (`preserveAspectRatio="none"`)
so its box can grow with the text, with 21 percent inline and 20 percent block margins.
The positioning note is now a CSS box (5-pixel dashed olive border, 50-pixel radius, beige fill) and its SVG is deleted.
Trade-off left open: cloud copy is 12 pixels at 390 (14 in the design); 14 fits only with the cloud stretched about 1.58 times.

Sitemaps: the Scotties and MenuMe sitemap PNGs (201 KB together, unreadable thumbnails on phones) are now nested
`<ul>` trees inside `<figure class="case-study-sitemap">`, labelled by their subheadings, drawn by one CSS block
with per-page color tokens. Below 40rem each is an indented tree with left connectors and arrowheads, labels at
least 14 pixels; from 40rem the root sits centered over a row of level-1 boxes on a connector bus.
MenuMe's side-by-side level-2 boxes stack under their parent. Node lists were checked against the original PNGs.

The Scotties challenge cloud and the Tales spiral notepad are traced vectors too (same method, generalized script
`/home/user/temp/agent/xinyanchen-build/vec/trace-layers.mjs`, rendering on a magenta page so white fills separate):
the cloud is a white silhouette (shrunk under a pixel so it never peeks past the outline) under a `#ff8655` outline
and keeps `preserveAspectRatio="none"`; the notepad is one `#994198` path. macOS Safari showed a grey rim around the
old cloud (the soft-mask fringe the client called black borders); the vector cloud has none. Copy intrusion stays 0.

Fonts: the five TTFs (833 KB) are now lossless WOFF2 (284 KB), converted with `fonttools ttLib.woff2 compress`
(no subsetting, so every glyph, including U+2011, is kept). All 12 full-page captures (six pages at 390 and 1440)
are pixel-identical to the TTF captures, apart from Tales at 1440, whose run-to-run noise is the same amount;
macOS Safari reports all five faces loaded from the WOFF2 files.

Soft-mask removal, vector batch: 23 more PDF-export SVGs whose masked rasters were flat one- or two-colour shapes
(floral accents, sprout logos, Scotties wordmark, Tales illustrations and diagrams, composite logo layers) are now
potrace vectors or clip paths, with no `<mask>`, filter, or embedded raster left in them. Checked old against new
at 3x in Chromium (edge-only differences) and on the Tales page in macOS Safari.
Held back: the six SVGs that embed photographs or screenshots. A WebP rebake made them visibly softer (Youth in
Limbo and Matcha lost 12 to 15 percent of their Laplacian sharpness at display size), and the client's goal is that
every photo looks crisp, so they are being redone at native resolution before landing.

About portrait, the client's commit `d5e6250` ("Please update this portraits on about page.", adding
`about me portrait.png`): the file is the same Desktop About composition at exactly 4x (normalized cross-correlation
0.998 at scale 4.000, the old 656 by 502 asset at offset 744, 304), so the request is a sharper source, not a new crop;
the user confirmed the intent is only that every photo be crisp. The asset is re-cut from that region, keeping the
file's own alpha edges inside a slightly dilated copy of the old silhouette so the waves baked into the export drop out
(the page keeps its own vector waves), then served as `-760w` (3x phones to 414 pixels wide) and `-1312w` (2x desktop)
PNGs via `srcset` with `sizes="(width >= 40rem) 656px, 61vw"`. Page heights are unchanged at 390 to 1920;
Laplacian sharpness at 2x desktop rises from 62 to 210 and at 3x phone from 150 to 204; 1x is unchanged.
The client's raw 6.1 MB file stays at the repository root where they committed it.

Soft-mask removal, photo batch: the six SVGs embedding photographs or screenshots (Echoes, Matcha, MenuMe preview,
Scotties preview, Tales logo, Youth in Limbo) keep every raster at native resolution, cropped to the visible clip.
Opaque photos keep their original embedded JPEG bytes (cropped losslessly with `jpegtran`), so their pixels are the
old ones; rasters with real alpha are lossless WebP with the mask baked in. Sharpness at each largest display size
is the old value or higher (popover images rise, since the fringe and soft layers are gone), the six files are about
1.4 MB smaller in total, page heights are unchanged, and macOS Safari shows no fringe. A lossless re-encode would have
grown them to 9.9 MB for the same sharpness and was rejected. No `<mask>` or `feColorMatrix` remains in `assets/`.

Baked-in typo: the Tales campaign metrics diagram read "Brower Editor Duration≥ 5 mins". The label path is replaced
by HarfBuzz outlines of "Browser Editor Duration ≥ 5 mins" in Playfair Display Bold, the weight whose fitted
outline matched the original ink best, with scale and tracking calibrated on the original label
(script: `/home/user/temp/agent/xinyanchen-build/brower/relabel.mjs`); it keeps the left edge and baseline and
ends about 20 pixels short of the pie outline.

Zoom viewer: `.case-study-enlarged-artwork>img` had `min-inline-size: 100%`, so bitmaps were stretched to the viewer
(a 490-pixel persona photo opened at 1376 pixels, blurred). PNGs now open at their natural size (centered when
smaller than the viewer, scrolling when larger, as on phones); SVGs keep filling the viewer. Measured on all 47
viewers of the three case studies at 1440 and 390: every PNG shows at exactly its natural width.

Button sizes: the pills emulated an SVG view box fitted into an artwork box, which squashed the CV pill to 141 by
26.6 and the Tales link to 136 by 30.2 at 744, and drew desktop pills smaller than the Desktop designs
(for example "View case study" 230 by 57.5 instead of 256 by 63). The supplied designs measure 136 by 34 for every
pill on phones and tablets (Tales 153 by 34 on phones) and, at 1440, 222 by 54 (More About Me), 256 by 63 (every
View case study), 333 by 63 (CV), and 210 by 63 (Send). The existing growth constants are exactly those deltas,
so the pill is now sized directly (136 by 34 plus delta times growth) inside a box 8 pixels larger for the shadow.
Measured: every pill matches its design at 390, 744 and 1440, labels center within 0.5 pixel, page heights unchanged.

Copy decisions by the user, 2026-10-18: the Home Echoes card heading is "Surrealist Poster Design" (was
"DesignSurrealist Poster Design"); Scotties is written without an apostrophe where it is the shop's name (four uses
fixed, the five true possessives keep "Scotties'"); the Contact intro no longer offers a phone, since none is listed.
Kept as written: "Jake Alice" is a first and last name like "Gwen Parker"; the Scotties copy's #FC702F and #515839 are
the brand colors of the client's Scotties design project and need not match this portfolio page's own accents.

Preview caching: `mise run preview` still serves on `http://localhost:4173/` with Python, but now sends
`Cache-Control: no-store`. The plain `http.server` sent no cache header, so Safari (macOS and the iPhone Simulator)
cached files heuristically and kept showing old artwork after it changed on disk.

Back-to-top: the ring is now a CSS border (`--color-back-to-top-ring`, #d9a150) and the arrow a vector mask painted
in the portfolio purple, so hover is a background-color change (`oklch(from purple l 0.259833 h)`), replacing the
`url(arrow.svg#id)` plus in-SVG `:target` trick. Chromium renders rest and hover identically to before (19 differing
antialiasing pixels of 10,816); macOS Safari 27 resolves the hover color to the same value. Also checked in Safari 27:
`body { container-type: inline-size }` does not re-anchor the fixed link (it stays 16 pixels from the viewport corner
at scroll 3000), so audit finding 5.5 does not reproduce there.

Image weight: About's beach and reading photographs are one 516-pixel PNG each (3.1 device pixels per CSS pixel on
phones, 2.0 on desktop, the most a 2x screen shows), replacing separate phone and desktop files; the skating photo
keeps its two files because the phone crop differs, with the desktop one resized to 516. Twenty other PNGs are
losslessly recompressed (each verified pixel-identical to the original, alpha included), including the 6.3 MB Scotties
homepage screenshot, now 4.1 MB; it is not resized, since the zoom viewer already shows it below 2x. Below-the-fold
images on Home, About and Contact are lazy with async decoding; nothing in the first screen at 390 or 1440 is lazy.
About now downloads 2.8 MB at 1440 (was 6.1 MB); the case studies drop 1.8 to 3.3 MB each. Proposals not applied:
lossy WebP (the Scotties screenshot would be 0.64 MB at quality 90, 40 dB PSNR).

Tales decorative vocabulary: the hero strip and the five section bands draw their gold capsule dashes from one SVG
tile (`assets/tales-section-band-gold-dash-row.svg`) that scales with the wide-layout growth factor; the old dashed
borders stay as transparent borders so no box height changes. Subheadings carry the Desktop design's two-leaf, single
leaf or sprout glyph (three plain-path SVGs, chosen per heading with `data-glyph`), sized to the line height so they add
no height. The notepad gains its offset yellow backing, persona names take the accent color, the curriculum notes get
their square outline and yellow ground, and Potential for Impact gets numbered rings, stems and arrow tabs (two across
on phones, as designed). Page height grows 145 px at 1440, all of it the impact strip. Known differences from the
design: the Challenge heading uses the two-leaf glyph rather than the lighter outline, the impact tabs do not
interlock as chevrons, and the 744 layout shows them 2x2 instead of four across.

MenuMe decorative vocabulary: one seamless gold squiggle period (`assets/menume-gold-squiggle-one-period.svg`) tiles
the hero divider and every section band, sized by the wide-layout growth factor, so the loops no longer jump at the
tile seams (they jumped 8.5 to 18 px before). Subheadings carry the orange steaming-bowl glyph from the Desktop design,
the two key-learning headings their lightbulb and network icons, and the notes, quote, focus bubbles, persona names,
usability callouts and contribution cards their honey drips, outlines, brush plates, arrows, highlight rectangles,
numbered badges and tape, all as plain-path SVGs or CSS (drips and bubble tails are CSS `mask-image` on a solid color).
Page height grows 371 px at 1440, all in decorated elements the design also gives space. Verified in Chromium and in
real Safari 27 at 1920 wide, 1x (the client's 1080p screen). `assets/menume-section-culinary-wave-divider.svg` is now
overridden everywhere and can be deleted together with its two `url()` declarations.

Scotties decorative vocabulary: the hero divider is an olive chevron tile, section bands carry their pale chevron runs
(right side on phones and tablets, mirrored to the left on wide layouts through the growth factor, no new breakpoint),
subheadings the skateboard glyph, and the cloud, positioning note, personas, core values, typography plate, sitemap,
lo-fi and hi-fi notes and key learnings their dotted arrow, bolt, ice skate, skater, starburst (traced to vector),
orange lead-ins, color plates, name spans, chevron columns, dashed highlight rectangles and badge icons. The
positioning tagline keeps the user's copy ruling ("Scotties: Ride Local, Dream Big."). Page height grows 392 px at
1440. Verified in Chromium and in real Safari 27 at 1920 wide, 1x. Not built: the lo-fi and hi-fi connector arrows
(their targets move with flex wrapping) and a separate orange note for the lo-fi product listing page.

Zoom viewer keys: each viewer was a `<button popover autofocus>`, so opening it focused a button and Space, the usual
scroll key, closed it. All 47 viewers are now `<div popover role="dialog" aria-label="Enlarged image" tabindex="-1"
autofocus>` holding one close button that wraps the image (it carries the × and "Close enlarged image"). Opening
focuses the dialog's scroll area, so Space scrolls (754 px measured on the Scotties homepage screenshot); Tab reaches
the close button; clicking the image and Escape still close it. Page heights are unchanged. The duplicate `<img>`
(thumbnail and viewer) is kept on purpose: both share one URL, so the image downloads once, and removing the copy
without script would mean moving the thumbnail itself into the top layer, which shifts the page.
Browsers give every `[popover]` a solid canvas-text border; the old button viewer hid it through the global button
reset, so the dialog version sets `border-width: 0` (Safari showed a dark frame around the open viewer until then).
Safari still draws its thin blue focus ring around the autofocused dialog, the browser's standard indicator.

Template cleanup (audit 6.2): the case-study pages lose 16 empty `class=""` attributes and 75 trailing spaces inside
`class` values, the `<h1>` and `<h2>` drop `case-study-subheading` (its rules only match `h3` and `h4`), and the two
identical focus-ring rules are one. Regression against the previous commit, every viewport frame of all three pages at
390, 744 and 1440: identical heights and no differing pixels beyond two sub-pixel frames at 744.

Safari risks from the audit's section 7, checked in real Safari 27 (UTM VM, 1920 wide at 1x): Home's SVG named-view
`srcset` candidates and the river animation's `pow()` mask render correctly; the `:target` hover technique is gone
(buttons are CSS); `body` container-type does not re-anchor the fixed back-to-top link (checked earlier this round).

Heading levels (audit 6.3): Scotties' Key Learnings jumped from `h2` to `h4`; its two card titles are now
`<h3 class="case-study-card-title">`, a class that repeats the `h4` card-title look (the `h3` subheading rules would
centre them and add the skateboard glyph). MenuMe's focus-group cards used `<h4>1</h4>` to `<h4>3</h4>` as headings;
they are `<span class="menume-finding-number">`, styled by their existing disc rule. Regression: identical frames.

iPhone Simulator taps: `safaridriver` (`platformName: iOS`, `safari:useSimulator`) answered "Could not find any
session hosts that match the requested capabilities" because it only searches the default CoreSimulator device set,
and the iPhone 15 lives in the custom set on `/Volumes/XinyanSimDevices` (kept off `m1`'s internal SSD). Linking the
device into the default set did not register it; the link is removed and the simulator is booted in its own set again.
The real-tap check of the phone menu's open state is still open.

MenuMe and Scotties alignment (action plan Fix 3 and Fix 4): card rows used `align-items: center`, so unequal cards
staggered. Rows of notes now stretch to equal height and rows of text columns align their tops (MenuMe overview columns,
focus-group findings, usability pairs, contributions; Scotties personas and core values); rows with a wireframe stay
centred as designed, and Scotties' reflection cards keep the design's deliberate stagger. Page heights unchanged.
The persona names lost a stray trailing comma. Not changeable on our side: the clipped chip rows in client shots 33 and
34 are cropped in the supplied artwork itself (the PDF and `.fig` rasters are identical and no wider export exists),
and the white fragment in shot 51 is not in the site (it is most likely the macOS screenshot thumbnail).
Open for the user: the design shows MenuMe's contributions 2x2 at Desktop and Tablet; the site shows them 4 across.

Tales proportion and alignment (action plan Fix 4): the spiral notepad is capped at 322 px up to 744 and 486 px at
1440 and wider (it had grown to 814 px with large empty regions), its copy starts at the left with a line pitch that
grows toward the design's double spacing, and it still stays inside the art at every width from 320 to 1920. The
persona pair and the three story pillars share heading tops (pillar icon boxes share one aspect ratio); on phones
the impact columns keep paragraph tops level when a tab wraps. The performance chart's labels sit beside their
quadrants. Jump To Section is a centred bold list at the design's size, and the "How might we" quote wraps to the
design's two large lines on wide screens. Page height: about +80 px on phones, -100 px at 1440. Left as designed: the
first timeline node is faded and uncaptioned in all three designs; the Key Insights bubbles keep their stagger.
Verified in Chromium and real Safari at 1920 wide, 1x.

Inferred asks, part one: case-study section bands keep spanning the window above 1440 while their headings keep the
1440 measure (padding grows by `max(0rem, (100% - 1440rem / 16) / 2)`), so the "How might we" heading no longer
collapses to one long line at 1920; Tales is the same height at 1440 and 1920. On wide Contact layouts the email wave
now ends on the form's edge (it ran 13 px past it at 1440), as the Tablet and Desktop designs draw it. The audit's
uncapped-text finding found no other stretched text above 1440 on any page.
Decided by the user (2026-10-18), replacing the uniform phone scaling, which was not shipped: type follows Figma's
own sizes at 390, 744 and 1440 and interpolates linearly between them, Utopia-style (utopia.fyi's clamp method, with
Figma's per-role sizes as anchors instead of a ratio scale). A sibling of `--home-wide-reference-growth` covers 390 to
744, so each size reads `calc(P + (T - P) * phone growth + (D - T) * wide growth)` and nothing jumps at 640.
Figma's sizes come from decoding `Website (Copy).fig` (Monochromatic `doc/runbook/figma-file-text-extraction.md`).
Findings: Home, About and Contact already match Figma at the three widths; only the 640 jump is wrong there.
The case studies differ systematically (subsection headings 16/16/18 against Figma 18/18/22, Tales and Scotties
body 14 at 390 against 15, among others); these fall under the client's "type size and wrapping" class and get
Figma's sizes too, Home/About/Contact first. Fluid type does not fill the 414 to 639 voids or move the rem-margined
waves (238 px drift at 639): open, to be decided with the user after the type change lands.

Fluid type, Home, About and Contact: `--phone-tablet-reference-growth` (0 at 390, one reference pixel at 744, on `vw`
because nothing below 40rem is a size container) joins `--home-wide-reference-growth`, and the six roles whose
Figma sizes differ between the phone and tablet frames (Home greeting, name and summary; About heading and
subheading; Contact heading) carry one formula each with their line heights, replacing their wide overrides.
Every text size on all six pages is unchanged at 390, 744, 1440 and 1920; nothing on these pages steps by more
than 1 px between 639 and 640 (the greeting was 24 then 28). Heights: +1 px at 393, up to +14 px at 639.
The nav keeps 15 (overlay menu) and 14 (bar): different components, both as Figma draws them.

Case-study type to Figma (sizes read from `Website (Copy).fig` per frame; 390 / 744 / 1440):
section subheadings 18 / 18 / 22 (were 16 / 16 / 18); the jump list is Playfair Bold 16 / 16 / 22 and centred on
all three pages, as all three designs draw it (it was Tales only); prototype links 14 / 14 / 16 (Tales' 18 at 1440);
closing reflections 16 / 16 / 18; Tales pillar titles 15 / 14 / 16; MenuMe persona names 18 / 18 / 24 and subtitles
16 / 16 / 18; Tales body 15 / 14 / 16. MenuMe and Scotties body stay 14 on phones: Figma draws MenuMe at 14 (52 of
70 phone body nodes) and Scotties split 13 to 12. Text in painted containers sizes to its artwork and is unchanged.
Figma inconsistency kept consistent on purpose: five MenuMe subsection headings ("Weekly Specials to Doorstep",
"What's in My Fridge", the two usability flows, "Key Learnings & Takeaways") are 16 in Figma while their siblings
are 18; the site uses 18 for all. Heights: 744 unchanged, 1440 +35 to +42 on MenuMe and Scotties, Tales +420 at 393
(15 px body adds lines), no horizontal overflow at 320 to 1920.

Client asks of 2026-10-18 (Contact screenshots, asks in the file names): the captcha is forced to English with
`data-lang="en"` (Web3Forms' `client/script.js` turns it into hCaptcha's `hl=en`; it had followed the browser
language) and sits centred over Send: centred with Send's 6.5 px nudge on phones, as wide as the Send button and
end-aligned on wide layouts (at 744 the 158 px frame is wider than the 136 px pill and stops at the form edge, 7 px off
centre). The back-to-top link moved from a fixed bottom-right button into each footer, centred above the thank-you
line, so it appears only with the footer; the scroll script that toggled `hidden` is gone. Pages grow by the link
(48 px plus a 16 to 32 px gap).

Client design round, 2026-10-18 21:13 to 21:19 (`Desktop/Home/`, `Desktop/About/`, `Phone/Home/`, each with a dated
`.txt` of notes; the PDFs are outlined, so values were measured from the PNGs):
navigation in Playfair Display Regular (new `PlayfairDisplay-Regular.woff2` from the client's font zip, compressed
like the others) at its old 25 px in #685587, hover #463267 with underline; footer text Regular #685587 on every page
(the client's reason, that the font renders heavier than in Figma, applies site-wide, though only Desktop Home was
redrawn); Home's wide footer uses About's waves and geometry (the case studies keep theirs, which match the old Home
footer); About's thank-you line at 1440 sits at the design's y 3063 (+28 px; the back-to-top link already added 80);
intro animation steps 1 s apart (name 1 s, summary and button 2 s, purple accent 3 s, river from 4 s for 1.8 s, flower
6.8 s, one second after the river finishes); phones: hamburger 56 px higher on every page, Home hero 28 px higher with
the summary 29 px and the button 30 px closer, so the river shows on the first screen (Home 87 px shorter).
"Hello, I'm" was already #685587.
Confirmed by the user (2026-10-18), against the literal per-file reading: the Regular Playfair nav, the Regular
footer text and the higher phone hamburger apply on every page (Desktop About and the other phone files still draw
the old versions), and the flower appears 1 s after the river finishes (6.8 s).

## Client iPhone round, 2026-10-19

The client sent 11 iPhone screenshots of the live site opened from WeChat (11:27 to 11:30), saved by the user in
`../Client screenshots 2026OCT191142/` (`542.jpeg` to `552.jpeg`, 1179 by 2556, no annotations). The client said
the phone runs iOS 17.0.2 (21A350), which ships Safari 17.0.
Visible in them: both sitemaps (MenuMe `544`, Scotties `549`) render as plain bulleted lists instead of the boxed
tree, and on Scotties the chevron art covers "Favorites" and "Cart" (`549`); MenuMe's gold squiggle crosses
Alicia's text (`543`).
Cause found so far: caniuse's `css-nesting` data marks Safari and iOS 16.5 to 17.1 partial, note "Does not allow
nesting of type (element) selectors without starting with a symbol, like the `&` nesting selector". The scan
`/home/user/temp/agent/f20/bare-nested.mjs` (postcss) finds three such rules in `styles.css`, all in the sitemap
block: `ul`, `span`, `ul ul` (lines 1459, 1466, 1484 at `8ab35c3`).
Why last round missed it: every Safari check ran on current engines (macOS Safari 27, Technology Preview, iOS 27.0
Simulator, the only runtime installed on `m1`); no oldest supported Safari was set or tested.
In progress: render every page at 393 in Playwright WebKit 17.0 (image `playwright:v1.38.0-jammy`) and WebKit 18.2
(`v1.49.1-noble`) with `/home/user/temp/agent/f20/webkit-boxes.mjs` and diff element boxes, to find everything
else that differs on the client's engine before fixing. The reply to the client stays on hold.
Rejected, the Playwright detour: Playwright's "WebKit 17.0" (v1.38 image) draws the sitemap tree correctly, so it
already accepts the nesting iOS 17.0 rejects (Playwright builds WebKit from newer trunk than Apple's release); it
cannot stand in for the client's engine. The user: "Why are we doing Playwright at all? The golden child is Safari,
and now we know the version for phone." Use real Safari of the client's version only.
Authorized by the user: the iOS 17.0.1 Simulator runtime (closest Apple offers to 17.0.2; same Safari 17.0) on `m1`,
archive in `/Volumes/MacData/sim-runtimes/`, installed with `xcodes runtimes install 'iOS 17.0.1'` (unit
`xinyanchen-ios17-install`). Xcode 27 boots it: device "iPhone 15 iOS 17.0.1"
(`9CA037B0-574E-4662-A3EF-744BFB6E15E7`) in the custom set `/Volumes/XinyanSimDevices/devices`; the iOS 27 iPhone 15
is shut down meanwhile. Screenshots: `/home/user/temp/agent/f20/sim17-shots.mjs` (copy of `sim-shots.mjs`).
Fix committed: `8fd50ea` prefixes the three sitemap rules with `&`; Chromium computed-style diff against `d758477`
on MenuMe and Scotties at all four widths: 0 differences.
Retracted: a first pass listed iOS 17.0 gaps from memory (the user: "recalling instead of checking what iOS 17
supports is laughable"). Replaced by a mechanical check against MDN browser-compat-data 8.1.6 (2026-10-15):
`/home/user/temp/agent/f20/bcd-css.mjs` walks every property, keyword, function, unit, selector, at-rule and media
feature in `styles.css` (267 features); `bcd-html.mjs` every element, attribute and enumerated value in the six pages
(125 uses); the two scripts' APIs were looked up one by one (`hidePopover` 17, the rest older). Positive control:
BCD's `css.selectors.nesting` carries the type-selector gap for 16.5 to 17.1. Not supported or partial on iOS 17.0:
- nesting, nested rules starting with a type selector: fixed by `8fd50ea`.
- relative colour syntax, partial: `rgb(from ...)` "channel value calculations do not work correctly, requiring
  values to be specified as percentages" (WebKit bug 267647), used with a calculated alpha in Home's river fade mask
  (line 456); `oklch(from ...)` "calculations with `h` channel values do not work correctly", used for hovers and
  the enlarged-image backdrop (lines 371, 1640, 1662), none of which calculate `h`.
- `text-box` (added 18.2): the pill label trim, line 281, which centres button labels.
- `text-wrap: balance` (17.5) and `pretty` (26): heading and paragraph wrapping, lines 1342, 1364, 1400.
- `overscroll-behavior` partial (no effect without scrollable overflow); cursor and `resize` keywords have no iOS
  support, which does not matter on a phone; `<link rel="icon">` is unsupported on iOS, the Apple touch icon covers it.
Next: in iOS 17.0.1 Simulator Safari at 393, compare the base
copy (`/@wt-base/`, `d758477`) with `8fd50ea` on every page, and look for the client's other shots (543 squiggle
over Alicia's text, 549 chevrons over the sitemap, 551 and 552 boxes touching) before and after.
Client question, 2026-10-19, relayed by the user: "你是不是做了 phone 版本才做 tablet 和 desktop" (did you build
the phone version first, then tablet and desktop). Facts: Home was built phone first (`6b3f4ea` and following,
2026-10-15), then adapted to tablet and desktop (`fdfe88f`); the stylesheet is phone-first (wide values under
`@media(width>=40rem)`). The case-study pages were built for all widths at once (`14fed4c`, 2026-10-15).
Client's Mac, relayed by the user 2026-10-19: "Client's Mac Safari ver: 14.5 (23F79)". 23F79 is macOS 14.5, not a
Safari version: ipsw.me lists `Mac14,2` firmware 14.5 build 23F79 released 2024-05-13, the date BCD gives for
Safari 17.5 (Apple: "Safari 17.5 is available for ... macOS Sonoma"). Safari updates apart from macOS, so the Safari
version is unconfirmed until the client reads Safari > About Safari. BCD check at desktop Safari 17.5: nesting and
`text-wrap: balance` fine; still missing `text-box` (18.2: the pill label trim, so the button-centring the client
asked for depends on it) and partial relative colours (Home river mask), `text-wrap: pretty` (26).
iOS 17.0.1 Simulator results (`/home/user/temp/agent/f20/sheets/pos-NN.png`: client shot, base `d758477`, fix):
the base reproduces the client's plain-bullet sitemaps; with `8fd50ea` both draw the boxed tree and the Scotties
chevrons sit beside "Cart" instead of over it. The other client shots render the same before and after and are not
engine issues; they are phone-layout misses against `../Phone/MenuMe.png` and `../Phone/Scotties.png` (390 wide):
- MenuMe personas (`543`): the design draws each photo about half the column wide, alternating left and right, with
  the text beside the scribble's path and the scribble running down the open side to the next photo; ours draws
  full-width photos and the scribble (`.alternating-personas>.flex-row::after`, 88% down the row) crosses the text.
- Scotties hi-fi callouts (`551`, `552`): the design draws about 60%-wide cards alternating left and right with gaps
  and connector lines; ours are full width and touch. The design puts "View Mobile Hi-fi Prototype" first, then
  Desktop, with the chevrons on their own line; ours has Desktop first with the chevrons inline, pushing it off centre.
- Kept as decided earlier: the phone sitemap is the indented tree, since the design's phone tree has labels about
  5 px tall.
A guess, not the client's words: the question may come from the client's phone designs not being followed on the phone pages, which look like the
wide layout stacked. Queue: compare every case-study section at 393 against the phone designs (MenuMe `545` and
`546` usability callouts not yet compared), fix each miss in its own commit, check in iOS 17.0.1 Simulator Safari.
Deploy lag, 2026-10-19 16:14: `8fd50ea` is on `origin/main`, but the live `styles.css` still has the bare `ul {`;
`gh run list` shows every "pages build and deployment" run since 15:55 still queued on GitHub's side. Re-check
the live file before telling anyone the fix is live.
Decided by the user, 2026-10-19: walk all three case studies (Tales, MenuMe, Scotties) section by section at 393
against `../Phone/*.png` and fix each miss, one commit each, checked in iOS 17.0.1 Simulator Safari (over the narrower
"only the photographed parts" and "wait for the client"). The user is asking the client for Safari > About Safari.
Pill labels without `text-box` (iOS 17.0.1 Simulator, Home "More About Me", `sim17-pill-01.png`): the label ink
centre sits 0.5 device px (0.17 CSS px) above the pill centre (`/home/user/temp/agent/f20/pill-ink.mjs`); a positive
control with the ink copied 12 device px lower reads 5. Centred without the trim, so no `@supports` fallback.
Walk reports (Sonnet agents, read-only, unverified until I check each pair image): Tales
`/home/user/temp/agent/f20/walk-tales/report.md` (15 misses with pairs `miss-NN.png`; high: age-stage trail drawn as
the shrunk desktop wave instead of the design's vertical zigzag, the three character cards in one row instead of
stacked, OPH laptop and phone side by side instead of stacked, the ecosystem map as the shrunk two-chain diagram
instead of a vertical flow, the social ads side by side instead of stacked). MenuMe and Scotties reports pending.
In progress: MenuMe personas from the phone PDF's own vectors (`/home/user/temp/agent/f20/scribble/piece-1..4.svg`,
exported with PyMuPDF; frames 190 by 242 at x 35, 169, 34; text blocks about 217 to 229 wide, Daniel's end-aligned).
Scotties walk report: `/home/user/temp/agent/f20/walk-scotties/report.md` (11 misses, pairs `miss-NN.png`). Not
misses, the client's own asks: the hamburger 55 px higher (the client's 2026-10-18 phone design round) and the
back-to-top circle in the footer (the client's Contact ask). Reported high: personas (design about 58% wide, centred,
centred text), core value pillars (design order Excitement, Confidence, Belonging in a loop around the skateboard
with chevron trails), lo-fi homepage and product listing callouts (narrower cards above or below the screenshot
with connector arrows; ours merges two callouts into one card), hi-fi callouts (known), prototype links (known).
Medium or low: top blob colour, info labels bold, "Overview & Strategic Context" heading running into the chevron
notch, Core Challenge chevron run.
MenuMe walk report: `/home/user/temp/agent/f20/walk-menume/report.md` (12 misses, pairs `miss-NN.png`). High:
personas (known), usability flows 1 and 2 (design: finding box about 47% wide beside the lo-fi screen, big orange
squiggle to the hi-fi screens, yellow elbow arrow into an offset iteration box last, bold labels, about 25 px
padding; ours: full-width boxes with oversized padding before all screens, thin squiggles). Medium: Inspiration
callout, Problem & Solution items centred with smaller icons, Dual-Loop boxes narrower with headings above,
contributions alternating sides, device screens stacked each with its own button, Key Learnings headings centred,
hero blob grey `#D8D8D7` (ours `#EBE4D9`, reported by both MenuMe and Scotties walks) and bold info labels.
Low: focus-group bubbles, list markers. Order of work: high misses first, page by page, each verified against its
pair image before changing anything.
Phone-layout fixes landed (each checked at 390 in Chromium against the phone design crop; wide unchanged):
`8214ca7` MenuMe personas (Chromium style diff: 744, 1440, 1920 differ only by content-less `::before` boxes that
draw nothing; iOS 17.0.1 Simulator renders it as designed), `e098f71` Scotties closing links Mobile over Desktop on
all widths (all three designs), `1e1bceb` Scotties phone hi-fi callouts and connectors (grid plus subgrid; geometry
from `Phone/Scotties.pdf` via PyMuPDF `get_drawings`). Wide layouts still lack the hi-fi and lo-fi connectors.
Found while doing it: Figma sets the Scotties hi-fi note text Bold 16 on Desktop but Medium 14 on Tablet and Phone,
and ours is bold everywhere. A weight audit of every Figma text node per frame against our computed weight is
running (Sonnet agent, output `/home/user/temp/agent/f20/weights/report.md`).
Weight audit (Sonnet agent, `/home/user/temp/agent/f20/weights/report.md`, raw `all.json`; Figma data is
`texts.json`, dumped 2026-10-18 20:46 from `Website (Copy).fig` of 2026-10-15, before the 22:43 copy arrived;
re-check each finding in `fig-parse/texts-new-full.json`, the newer copy, and the client's later instructions win):
unverified until checked. Likeliest real: Scotties body text Medium 14 to 16 in the Phone and Tablet frames (Bold on Desktop) while
ours is 700 everywhere (about 28 nodes per frame); Tales "Poster" and "Social Media Ads" subheadings Medium 14 on
Tablet and Desktop (ours 700 18); About biography weights. Suspect, verify first: pills reported as Playfair 700
although `.pill` sets Abril Fatface; MenuMe finding numbers in "Apple LiGothic" (a Figma font artifact).
MenuMe usability flows (`fcdaa9e` flow 1 phone grid, `86c78b1` bold labels, `4157a03` flow 2): flow 2's two
combined screen images are cut without resampling into one PNG per screen with its own viewer and alt text, and
its highlight rectangles into one overlay per screen; wide layouts pair each note with its row of screens (as
`Desktop/MenuMe.pdf`); phones follow `Phone/MenuMe.pdf` (finding beside the first screen, squiggle, hi-fi screens in
two rows, yellow elbows into the iteration). Checked at 390 and 1440 against the design crops in Chromium; iOS
17.0.1 Simulator shows flow 1 with its elbow and the start and end of flow 2 (text fragments inside the regrouped
rows do not scroll there, headings do; the middle of flow 2 is not yet seen on iOS). BCD: no new flags. Residual:
the tablet design puts the iteration full width under its screens, ours beside them.
Sitemap fix live: `https://chen1054.github.io/styles.css` serves `& ul {` (checked 2026-10-19 after the 16:43
`pages-build-deployment` run succeeded).
Scotties type and phone layout (`dd1a12c`, `eee3c7f`, `b726c52`): body copy Medium below 68.25rem (1092 px, where the
interpolated size passes 15; the designs give Desktop Bold 16, Tablet Medium 14, Phone Medium 15, and the weight
files are static; my choice of switch point, open to veto); positioning and pillar notes Medium on every width with
the lead phrase Bold 15 / 16 / 18; "Typography & Color Palette" and "Brand Identity: Logo Concept" in Abril
Fatface (all frames of the newer copy, confirmed on `Phone/Scotties.png`); the phone text column 20 px from each edge
(the Scotties phone design's; MenuMe and Tales use 34, measured with `f20/text-edges.mjs`), hi-fi callout offsets
moved by 14 to stay put; phone personas centred (222 px photo, plate offset 14, text centred, 285 px measure).
Scotties weight re-audit (`f20/weights/rerun/`, newer copy): phone mismatches 30 to 6, tablet 34 to 10. Left:
persona heading runs (Figma mixed-style mapping unclear), the Tablet "Home" breadcrumb in Abril.
Scotties pillars and lo-fi (`dea6862`, `0fd637a`) and case-study tracking (`ad9e5aa`): phone value pillars loop
around the skateboard (Excitement first, chevron trails exported from `Phone/Scotties.pdf` as one SVG); the lo-fi
product listing's merged dark card is split into the designs' dark and orange cards, phone callouts get the
design's 3 px arrows, tablet (744 to 1092) stacks the callouts beside the screen, desktop stacks the two filter
cards left of the screen. Found while matching wraps: every case-study text node in all frames tracks at -1.9%
(only nav, prototype links and footer are 0), the site tracked at 0; now -0.019em on the case-study content.
Still open on Scotties: wide connectors (lo-fi and hi-fi), tablet note padding (ours 32, design about 20), blob
colour, info labels bold, "Overview & Strategic Context" banner into the chevron notch, Core Challenge chevrons,
persona heading weight runs, the Tablet breadcrumb.
Correction to the `1e1bceb` entry: its phone grid also matched the closing prototype-link row (the hi-fi subsection's
second `.flex-row`), so on phones that row was 880 px tall with a stray connector above the buttons from `1e1bceb`
until `c96e808` scoped the grid to the row with the callouts. Found by rendering the link row on its own at 390.
Also in `c96e808`: summary labels bold (Tales ExtraBold, own line on phones) without gaps between entries; prototype
buttons shadowed on all widths and 31 px on phones with a 48 px hit area. `94c5fb3`: phone banner text box 225 px.
Decided by the user, 2026-10-19: the MenuMe and Scotties corner blob stays cream `#EBE4D9` at every width (the
Tablet and Phone designs' `#D8D8D7` is not followed). Weight switch question raised by the user ("another Figma
issue where a shared text box is displayed as using the first char's font weight?"): checked; the Scotties body
nodes carry no style-override table in any frame (one weight per box), and `Desktop/Scotties.png` renders
"Initially, our priority..." Bold where `Phone/Scotties.png` renders it Medium, so the frames really differ there.
The dump (`fig-parse/dump-text-full.mjs`) does not record `characterStyleIDs`, so mixed boxes can't be mapped to
runs from data alone; their bold runs (pillar names, summary labels) were confirmed on the design images.
Decided by the user, 2026-10-19: Scotties body copy Medium at every width (Desktop's Bold treated as the outlier),
`0f6dfb8`; the 68.25rem breakpoint now serves only the lo-fi tablet/desktop layout switch. Supersedes the
weight-switch note on `dd1a12c`.
Client, 2026-10-19 (relayed by the user): "Scotties' desktop body font uses medium weights. Client made an error in
Figma." Confirms `0f6dfb8` (Medium at every width); the Bold in `Desktop/Scotties.png` body copy is a Figma slip.
User report, 2026-10-19 (screenshot, "Bro..."): the Tales insight bubbles' white highlight crossed the purple outline
at both tails. Cause: the `01f763f` potrace trace drew the page-coloured gap between the design's two offset layers
(yellow fill, purple outline; `Desktop/Tales for Safer Trails.pdf` rasters 316 px wide) as a white stroke. The
user asked for a hand drawing with as few characters as possible: `a5102be`, one path per bubble in `<defs>`, drawn
twice with `<use>` (292 and 270 bytes). Audit of the other 11 potrace assets (`scale(0.100000,-0.100000)`
signature): rendered large, none shows a stray gap or crossing; the only other layered one, the Scotties Core
Challenge cloud, matches the design raster (its bump spikes are in the client's artwork).
Open: iOS 17.0.1 Simulator shows a hairline light seam inside the MenuMe Dual-Loop drip (`sim17-late-02.png`,
about two thirds across); Chromium does not. Likely the drip mask tile seam (`repeat-x` at a fractional tile width).
MenuMe `a87462f` (Problem & Solution centred, smaller icons, teal titles) and `62a59a7` (phone Dual-Loop headings
above 225 px boxes) checked in Chromium at 390 and 1440 and in the iOS 17.0.1 Simulator.
Client device, 2026-10-19 (relayed by the user): "Client is on a MacBook Air M2." Apple's spec pages list two M2
models: 13.6-inch, 2560 x 1664 native (support.apple.com/en-us/111867), and 15.3-inch, 2880 x 1864 native
(support.apple.com/en-us/111346); neither page states the default scaled resolution, so the client's Safari
viewport width is unknown. Open, for the client: screen size and System Settings > Displays resolution (and
Safari > About Safari, still asked). Until then, test wide layouts across laptop widths (1280 to 1710).
(Corrected 2026-10-20: the viewport was already known, 1920 by 950; see "Client batch, 2026-10-20".)
MenuMe walk, 2026-10-19, landed: `644c792` contribution cards alternate on phone (miss-08); `4149e88` showcase
split into phone and tablet images, each button under its device on phone (miss-09); `440d50d` Key Learnings
staggered on wide layouts, headings centred on phone (miss-10); `a626330` Inspiration callout at all three
widths (miss-04), with the squiggle and brush stroke exported as vectors from `Phone/MenuMe.pdf` (exporter:
`/home/user/temp/agent/f20/export-shape.py`). Each checked in Chromium at 390, 744 and 1440 against the design
PNGs. Not yet checked in the iOS 17.0.1 Simulator. MenuMe left: miss-07 bubbles (low), miss-12 list markers and
bold labels (low), tablet flow-2 residual. Note: the design copy reads "meals.We" (no space); the site keeps the
space, so the story box wraps one word differently from the tablet design.
iOS 17.0.1 Simulator, 2026-10-19: the four MenuMe walk fixes render as in Chromium (`sim17-mm2-0[0-3].png`).
Risk from the client's device, 2026-10-19: EveryMac lists the 13-inch M2 MacBook Air (2022) as shipping with
macOS Monterey 12.4, whose Safari is 15.5. `bcd-css.mjs styles.css safari <v>` (BCD 8.1.6): Safari 15.5 and 16.4
lack CSS nesting (added 16.5, partial to 17.1), media range syntax (`width<40rem`, 16.4) and, on 15.5, container
queries (16.0); the stylesheet relies on all three, so on Safari before 16.5 most rules would not apply. Monterey
can take Safari updates up to 17.6, and the client's iPhone runs iOS 17.0.2, so the Mac's Safari version is
unknown. The client's Safari version (Safari > About Safari) is the deciding fact; the question is with the user.
Decision, 2026-10-19 (the user): "just set floor to 17, I know Client's Safari on all devices is at least 17."
The support floor is Safari 17.0 on macOS and iOS. `bcd-css.mjs styles.css safari 17.0` flags the same 29 lines
as the `safari_ios 17.0` baseline, and `bare-nested.mjs` already guards the 17.0 to 17.1 nesting gap; the iOS
17.0.1 Simulator (Safari 17.0) remains the test engine for both. No flattened build.
MenuMe walk, rest landed 2026-10-19: `ba596be` focus-group bubbles (miss-07) from the design's exported outline and
tail, one over two on tablets; `9cbd3d8` token and delivery lists (miss-12), restoring the numbered heading
"End-to-End User Experience Delivery" that both designs repeat; `5b2fbab` tablet flow 2 grid (the
residual). All checked in Chromium at 390, 744, 1000 or 1092, and 1440. Not yet in the iOS 17.0.1 Simulator.
Known, not changed: the designs set the finding numbers in Apple LiGothic Medium 50 px, a macOS system font the site
does not ship (licence not checked); it keeps Abril Fatface numerals at 40 px (45 desktop), matching the glyph height.
MenuMe walk misses: all addressed.
Drip seam closed, 2026-10-19 (`40b0c43`): the open hairline in the MenuMe Dual-Loop drip (iOS 17.0.1) and a 3 px
left-edge notch came from the potrace drip tile, not the box (a temporary red, unmasked drip box in the Simulator
was full width; probe reverted, never committed). Every MenuMe design stretches one 266-segment drip path; the
site now does the same with that path (`assets/menume-honey-drip.svg`, `preserveAspectRatio="none"`), and the
box overlaps the drip's solid top quarter. Checked in Chromium at 390 and 1440 and in the Simulator. Lesson for
the other traced assets: WebKit can leave a traced shape's edge columns partly empty, which only shows when the
asset is tiled or butted against another edge.
Simulator note: `sim17-shots.mjs` sometimes lands at the page top (the fragment did not scroll within its 7 s);
rerun before reading anything into a page-top shot.
Scotties, 2026-10-19: `b8705dc` Core Challenge chevrons 41.4 px on phone (59 tablet, 63 desktop kept), phone
cloud, skate and following heading placed as `Phone/Scotties.pdf`. `68e9c60` and `be68d51`: wide hi-fi homepage as
Tablet and Desktop/Scotties.pdf (callouts spaced beside the screen, 3 px connectors with arrowheads, desktop intro
and third callout on the screen's left, links under the screen); each callout's minimum height is the design
box's, scaled, so arrows land on the design's spots: tablet within 0.003 of the screen height from 900 to 1279,
desktop within 0.002 from 1440 (Chromium; Safari Technology Preview the same at 1440). New breakpoint for this
subsection only: the desktop composition starts at 80rem (1280 px), measured (from 1092 its arrows ran off the
screen). Known: at 744 the last arrow lands on the screen footer (site tablet column 594 against the design's 620).
Container-unit pitfall found and fixed (`900b874`): `--home-wide-reference-growth` is written in `cqw`, so a size
container inside the page made the growth measure the container (MenuMe tablet flow heading 18 px instead of 18.9
at 900). Every container added for a layout unit now redefines the growth from `100vw`; a computed-style diff
against the uncontained page is empty. The older containers (Tales notepad and bubbles, Scotties cloud) show no
difference.
Scotties left: wide lo-fi connectors, persona heading runs, the Tablet "Home" breadcrumb.
Scotties, later 2026-10-19: `eb3c495` wide lo-fi pages as Tablet and Desktop/Scotties.pdf (callouts at the design
boxes' widths and minimum heights, Figma text widths inside the 4 px border, 3 px connectors as masks, the two
elbows included; callouts above the screen since the desktop filters elbow crosses it). `fa0ffb3` Scotties sections
624 px at 744 as Tablet/Scotties.pdf (61 to 685), still 1086 at 1440; the other studies keep 594 (MenuMe's tablet
design is about 599, Tales about 619, not changed). With it, at 744 the hi-fi last arrow lands at 0.877 of the
screen (design 0.878) and the lo-fi filters arrow at 0.346 (box 0.23 to 0.34); below 744 (no design) they drift.
Queued, found while checking `fa0ffb3` against Tablet/Scotties.png (the earlier walk covered the phone only):
the tablet design sets the personas 1 then 2 (ours 2 then 1), the value pillars around the board (ours a 2 + 1
grid), a vertical sitemap tree (ours the wide tree), a smaller logo, and Key Learnings as two staggered cards one
above the other (ours side by side). A tablet walk of Scotties is the next item after the phone leftovers; Tales
and MenuMe tablet walks after that.
Scotties phone walk done (all 11 misses landed or matching on the 2026-10-19 render at 390): `adb936f` logo 291 /
450 / 645 px as the three designs; persona headings need no change (Bold 16 / 16 / 18 on the design images, the
Figma style runs notwithstanding, and ours computes the same). Safari 17.0 BCD check: 24 flags, the same as before
today's work; Safari Technology Preview renders the wide connectors at 1440. Order from here: the Tales phone walk
(`/home/user/temp/agent/f20/walk-tales/report.md`, the user's request), then the queued tablet walks (Scotties,
then Tales and MenuMe).
Tales phone walk, 2026-10-19 (re-checked against a fresh 390 render; report `f20/walk-tales/report.md`, current
pairs `f20/walk-tales/now/`): already fixed before today, miss 02 (labels). Client asks, not misses: 14 (hamburger),
15 (back-to-top). `449e8af` misses 12 and 13 (bulleted lists, bold channel labels). `44ed623` miss 01 (The
Challenge: figure, heading, pad, within 1 px of all three designs) and the subheading alignment (wide designs start
prose-led subheadings at the text edge; phone only Dual-Persona). Open: 03 pillar icons and body alignment, 04 age
trail, 05 character cards, 06 Patchy, 07 OPH mockups, 08 ecosystem map, 09 ad mockups, 10 metric labels, 11 impact
chevrons. For the client note: the phone design's character cards read "Ages 9-10" and "Ages 11-12" against the
page's tiers 6-8 and 9-12 (ours keep the tiers). Tales' tablet column is about 619 in Tablet/Tales.pdf against our
594 (for the tablet walk).
Tales walk, continued: `b16f937` miss 03 (pillar icons at the designs' 0.73 and 1.0 scales, copy left, phone gaps)
plus the Tales body at line height 2 (phones 30 px, as every Tales frame; tablet and desktop unchanged).
`99fc8bf` miss 06 (Patchy 249 to 376 px of canvas). `5826b5c` misses 07 and 09 (each composite cut into one PNG per
device, stacked on phones, side by side wider). Queued with the tablet walks (found while doing these): all three
desktop designs start body text at 230 px (text blocks 230 to about 1210, a 980 px measure) while wide art spans
about 174 to 1266; our one column is 1086 (177 to 1263), so desktop paragraphs wrap wider than drawn on every
study. Tablet text starts: Tales 64, MenuMe 70, Scotties 61 to 66 (ours 75, 75, 60). Decide one text measure per
study and width before touching it; it changes every paragraph's wrap.
Tales phone walk done (all 15 items landed, matching, or client asks): `e2a8d7e` miss 11 (impact chevrons as one
overlapping strip); `07d8448` miss 04 (vertical age trail on phones, from the Phone Tales vectors with the trail
redrawn as a dashed cosine, 1.6% RMSE against the design; the footnote kept as phone text); `28c5b51` miss 08
(ecosystem map's School chain stacked under the first); `ef9edbc` miss 10 (metrics chart at the phone scale with
two-line 15 px labels, "Browser" spelled right); `6bdb445` miss 05 (character cards stacked and staggered, the
page's tiers kept). Each phone version swaps in below 640 px through `picture` (the viewer opens the same one) and
grows past 390 like the other phone art. Phone artwork the design drew as soft-masked rasters (ecosystem, metrics
outline) is rebuilt from our desktop vectors (`/home/user/temp/agent/f20/restack-eco.py`, `build-metrics-phone.py`,
`restack-cards.py`). Verified: Chromium at 390, 639, 640, 1440 (phone source to 639, desktop from 640, no
horizontal scroll, viewers open); Safari Technology Preview at 390 and 744 (same sources and boxes); iOS 17.0.1
Simulator Safari renders the age trail, ecosystem and metrics phone versions in the page and the cards SVG on its
own (text fragments between "Main Characters" and "Guardian: Patchy" do not scroll on iOS 17, and `idb ui swipe`
did not scroll it, so the cards were not seen in place there). Safari 17.0 BCD check unchanged (24 flags), no bare
nested selectors. Residual: the ecosystem icons come out about 20% smaller than the phone design's. Next: the
Scotties tablet walk, then Tales and MenuMe tablet walks, then the desktop text measure decision.
Tablet walks started 2026-10-19: full-page Chromium renders at 744 in `/home/user/temp/agent/f20/full744/`
(`fullpage-width.mjs <base> <out> <width> [page...]`), one Sonnet walker per study writing
`/home/user/temp/agent/f20/walk-{scotties,tales,menume}-744/report.md`. Every reported miss gets verified on a
full-resolution crop before fixing (one commit each), Scotties first. Seen while setting up, to confirm in the
reports: at 744 the Scotties design sets the subtitle on one line and the metadata smaller and narrower than ours,
the hero art larger, and the nav links darker. `c06f78b` made the phone ecosystem `<source height>` an integer;
Safari reserves all four phone art boxes at full size before loading (no layout shift; BCD: `source` width and
height since Safari 15).
Tablet walk reports in (2026-10-19): `/home/user/temp/agent/f20/walk-{scotties,menume}-744/report.md`; Tales' report
came back as text only (its pairs and `ours.png` are in `walk-tales-744/`). `agent-browser screenshot --full` at 744
produced bad frames (the footer swirl cut to 418 px, the phone age trail below y 3800): verify every claim on the
live page or a viewport screenshot. Not misses: the nav and footer text (Playfair Regular, site purple, per the
client's revised designs, `b85e0e0`; the tablet MenuMe and Tales frames simply omit the nav), the back-to-top
button (client ask), the cream corner blob, design typos, the footer wave (artifact). Landed: `f7489b1` hero
subtitle and summary boxes and prototype pills (all studies), `0268e65` Jump list pitch, `1f3bbbe` section bands.
Queue, shared first: (a) subheading to text gap about 25 px over the designs (Scotties 10, Tales 15 and 20) and the
Scotties subheading glyph 31 against 25 px; (b) Scotties: personas Jake alone then Gwen and Jonathan, cards 237 x 293,
text centred (15 to 17); Core Value pillars around the board as on phone, board 134 px (18, 19); Core Challenge
cloud 430 x 350 under the arrows, text at pitch 28, bolt 107 px, skate at the cloud's bottom right (11 to 13); Brand
Message box 397 x 251 with the skater and splat as drawn (14); Key Learnings stacked and staggered (29); hero art
278 px (02); typography panel text size (20); gaps 21, 24 to 26; hi-fi buttons beside the last callout (28);
sitemap node size (23). (c) MenuMe: dual-loop three-part layout with small cards (10 to 12); persona photos 187 x
240, text alignment, squiggles (15 to 17); sitemap tree shape (18); flow headings numbered (19, 21); Personalized
Menu Flow cards, screens and connectors (22 to 24); contribution cards and badge numerals (26, 27, 32); Key
Learnings indent (28); Problem intro size and alignment (08, 09); delivery buttons gap (30). Flow image order (20)
needs the client: the design's diagrams sit under the wrong headings, ours match the headings. (d) Tales: Key
Insights bubbles staggered and larger, text left at 14/28 (11 to 13); Story World one then two (14); wordmark 465
px centred (19); curriculum boxes padding and gaps (22); ecosystem 517 px, poster 338 px, metrics labels 14 px on
tablet (27 to 29); timeline labels 30% small (16); Core Product gaps (20); Challenge note pitch 28 (09); persona
gaps (10). Curriculum page numbers differ between the design and ours (23): ours were checked against the
official PDF earlier; leave them.
Tablet walk progress: `920e462` subheading to text gap (30, 21, 44 px ink, the Scotties hi-fi note excluded);
`12d0cfc` Scotties skateboard glyph; `1c05d1a` Scotties personas (one then two on tablet, three in a row from
1024); `175c537` core value pillars around the board (tablet and desktop geometry, trails exported by colour with
`f20/export-region-color.py`, `ONLY_COLOR=#rrggbb`); `e139782` key learnings stacked on tablet; `496d922` core
challenge cloud and positioning callout (640 to 1279). Pattern for tablet compositions: make the subsection an
inline-size container, restate `--home-wide-reference-growth` in `vw`, `--u: calc(100cqw / 624)`; put the block
after the shared rules it overrides (same specificity, source order decides). Scotties left: hero art 278 px (02),
typography panel text (20), gaps (21, 24 to 26), hi-fi buttons beside the last callout (28), sitemap nodes (23),
divider 16 px (06).
Scotties tablet walk done: `680e9bb` hero art 280 px, `7db58e8` tablet typography panel (Tablet/Scotties.pdf
vectors, its raster cones replaced by our vector desktop cones, `f20/scot-ty-add-cones.py`), `9332e29` gaps under
the type panel and wireframe headings, `2b041e5` hi-fi chevron above the pills below 1280, `06968d5` sitemap
chevron cluster. Safari Technology Preview at 744 (727 layout px) places the container-unit compositions at the
same column proportions. Residuals kept: sitemap labels 14 px (the tablet design's sitemap is a shrunk raster,
about 9 px), hero divider 20 against 16 px. Noted for the desktop walk: Scotties' desktop hero art is about 518
px with a 25 px gap to the text and the desktop summary is bulleted. Next: MenuMe and Tales tablet queues.
Tales tablet walk: `b462b2b` Key Insights bubbles staggered (640 up, desktop too), `30d3691` Challenge notepad
copy (line height 2, drawn breaks, top-aligned), `1ac63c1` personas and their heading (640 up, desktop too).
Section pairing tool: `f20/pair-sections.py` (design PDF text lines matched to our headings). Remaining Tales
tablet queue: Story World one then two (14), timeline labels (16), wordmark 465 px (19), Core Product gaps (20),
curriculum box padding (22), ecosystem 517, poster 338, metrics labels (27 to 29). Then the MenuMe tablet queue.
Tales tablet, continued: `c9ff8f5` Story World pillars one over two, `35f89bb` tablet age trail
(`f20/tales-art/build-age-tablet.py`; footnote text now shown up to 1279), `205c9c6` wordmark 466 to 657 px,
`09bf691` Tales tablet column 614 px (64 to 678 in Tablet/Tales.pdf; 1086 at 1440 unchanged). Correction: the
"11 px overhang" in `1ac63c1`, `c9ff8f5` and `35f89bb` was a symptom of the 594 px column, not design intent;
`09bf691` removed those compensations and every Tales paragraph re-wraps at tablet widths, by intent. Safari
Technology Preview on m1 shows classic scrollbars (727 layout px at 744), so its column is 597 there. MenuMe's
tablet column is still the shared 594: measure it from drawn full-width boxes first in the MenuMe walk.
Remaining Tales tablet queue: curriculum box padding and rhythm (22), ecosystem 517, poster 338, metrics labels
(27 to 29).
Tales tablet walk done: `5b50b5a` curriculum note rhythm, `fd9f77f` tablet ecosystem map
(`f20/tales-art/build-eco-tablet.py`), `859d9aa` poster 321/338/397 px, `25c9424` tablet metrics chart
(`f20/tales-art/build-metrics-tablet.py`), `83dff19` impact card wrapping (balanced titles need Safari 17.5;
earlier versions keep the old breaks). Kept by decision: our verified curriculum references, so the second note
is 419 px against the drawn 493. Full-page renders drift after lazy images load: pair sections with viewport
shots or element boxes. Next: MenuMe tablet walk, column first.
MenuMe tablet walk: `41cea31` shared tablet column 614 px (Tales and MenuMe; Scotties 624; hero introduction
594), `fbbb8e7` dual loop three across, `fe848c7` Problem intro 16 px and its two items, `edd265c` personas
(tablet scribbles exported by colour from Tablet/MenuMe.pdf). Pairing tool: `f20/pair-viewport.py` (viewport
captures per section). Gotchas: a global `:is(h1, h2, p)>span { display: block }`; `justify-content: start`
ignores `row-reverse` (use `flex-start`); flex-row gaps add to margins that encode drawn gaps. Desktop misses
seen on the way (dual loop three across, personas, problem items layout) wait on the desktop measure decision.
Remaining MenuMe tablet queue: sitemap tree (18), flow headings numbered (19, 21), Personalized Menu Flow (22 to
24), contributions and numerals (26, 27, 32), Key Learnings indent (28), delivery buttons gap (30).

MenuMe tablet walk, continued: `636fee9` sitemap pages side by side from 1024 px (narrower they stack: at 744 the
row needs 696 px of 614; the tablet design's sitemap is a screenshot with about 8 px labels), `8a0c564` task
flow headings numbered and centred (gaps from Tablet/MenuMe.png ink), `a0aa8d5` tablet Personalized Menu flow
(cards, squiggles and an elbow hung from the screens row so it survives taller cards at 640), `6fafd1b`
usability headings numbered at 16/18 px (its message wrongly cites miss 26; corrected by a commit comment),
`e45b584` Weekly Specials screens replaced by the designs' own 780 px embeds (identical bytes in all three
PDFs) with 1 px frames and highlight overlays rebuilt from the design vectors, and the phone and tablet weekly
flows re-set (phone figures had a stray 32 px bottom margin; both flows' card padding had been measured from
outside the 4 px border). Gotchas: `cqw` in a container's own margin resolves against the next container out
(use a percentage of the column); a `container-type` subsection does not collapse its last child's margin with
the next sibling's.

Flagged for the user (not done; an inferred ask, not a walk miss): the designs embed 2x artwork where the site
serves about 1x. MenuMe, measured from Tablet/MenuMe.pdf: personas 1200 x 1799, 1200 x 1530 and 1150 x 1725
uncropped originals (ours 586 x 748, the design clips them to its frames, so each needs re-cropping); the
personalization wireframe 780 x 1688 (ours 424 x 914, near drop-in, ours has the frame baked in); the
personalization hi-fi as two 780 x 1688 screens of 601 and 782 KB (ours one combined 878 x 914, so a markup
change); the device showcase as one 3840 x 2160 (ours two images); the flow diagrams 4096 px wide (ours 1960,
and their order is the open client question, miss 20). Tales and Scotties not yet measured. The client is on a
MacBook Air M2 (Retina). Byte cost per page not yet measured beyond the Weekly swap (+360 KB for six screens).

MenuMe tablet walk done: `cc5d01a` subheading-to-text 42 px as Tablet/MenuMe.pdf (MenuMe only: Tales' design uses
30 to 31, Scotties' 33 to 41; Scotties' Core Value and Tactile headings are 7 px short of their design's 41, not
yet fixed), `22ca034` design-system section gaps and prototype buttons 16 apart (miss 30), `01e6487` contribution
cards as the phone card two across with 50 px numerals (26, 27, 32) and Key Learnings notes (28). Every MenuMe
tablet miss is landed or recorded: miss 20 (flow diagram order) waits on the client; the sitemap at 640 to 1023
keeps stacking (18, residual); the footer keeps the client's back-to-top above the credits, so the page end runs
longer than the tablet design. Safari Technology Preview on m1 matches Chromium at its 727 px viewport (classic
scrollbars there); the client's MacBook Air M2 uses overlay scrollbars by default.
Next: the desktop walk (Tales, MenuMe, Scotties at 1440 against Desktop/*.png), which starts with the desktop
measure decision (designs set text 980 px wide, ours 1086); then the client note with the tablet fixes.

Desktop walk, under way (1440 against Desktop/*.pdf and .png). Tools: `f20/desk/ours-lines.js` (every rendered
line of our page with top, left, right, size) and `f20/desk/line-diff.py <design.pdf> <ours.json> [y0 y1]`
(matches each design line to ours and prints the vertical and start offsets and differing breaks);
`f20/pair-viewport.py` now strips the "1. " flow numbers and creates its output folder. Landed: `c1914eb` body
text on the designs' measure (from 1280 px, 976 px from x 230 at 1440; Tales' title story keeps 954 and Scotties'
About runs to the column's end; every checked body line matches: MenuMe 18, Tales 8, Scotties 10); `7d80240` the
heroes as drawn (art per page 438 from 52 / 422 / 551 px of the 1086 column, summary at 555, subtitle 49 px under
the title with 33 px lines, MenuMe and Scotties bulleted, Scotties' desktop-only breaks as `br.desktop-break`,
Tales' "Hi-fi" non-breaking; every hero line within 4 px); `758f085` prototype pills at least 250 px at 1440 (all
pills, label-sized at tablet) and the hero pills' per-page gap (MenuMe 46, Scotties 70 px). Phone and tablet heroes
are unchanged against live. Residuals: the designs' pill x offsets disagree (MenuMe +10, Scotties -15), ours keep
the text's start; Scotties' hi-fi pills are drawn 286 x 47 (ours 250 x 42), for that section; the MenuMe subtitle
fits one line only from about 1435 px, so Safari with classic scrollbars (1425 layout) wraps it as before. Safari
Technology Preview at 1440 reproduces Chromium's hero boxes and line counts; its screenshots on m1 came back black
this time (display awake), so that check was geometric.
MenuMe desktop, Jump To Section to the Information Architecture band, landed: `1744ed3` per-page divider and
section-list gaps (tokens `--hero-divider-gap-desktop`, `--divider-navigation-gap-desktop`; MenuMe's desktop list
omits Design System, which its phone and tablet lists and the page have, so ours keeps six entries), `52d897c`
inspiration quote and story card gaps, `47f83e8` dual loop three across (the tablet rule now runs on at desktop),
`4ae27f9` the bulb's base bars (missing at every width; the label gap gives back the 26/216 of width they add),
`29b12d8` problem items, `0792148` personas (desktop scribbles exported to
`assets/menume-desktop-persona-scribble-*.svg`, container 1086 wide at desktop), `d24b164` findings-to-personas
gap (its message also claims the band gap, which landed in `0792148`; corrected by commit comment). At 1440 every
line from the hero to the IA band sits within 4 px of Desktop/MenuMe.pdf. Residuals: the designs centre some
icon headings on their text and others on icon plus text (Inspiration and Personas sit 24 to 26 px off ours);
the third finding's text is set 12 px lower in an identical bubble; MenuMe's Overview subsection heading is 12 px
lower than the Research one in its band-to-heading gap; Tales' divider is 36 px tall against the design's 32 and
its section list runs 8 px low (for the Tales walk).
`c442089` IA spacing (band to sitemap heading, copy to sitemap, flow headings and diagrams, last diagram to band).
Queued (not started): the desktop sitemap as the design's top-down tree. Desktop/MenuMe.pdf's sitemap is a raster
(4096 x 2278 at 132 to 1273, 6285 to 6919) whose ink spans 230 to 1206 x 6390 to 6778 (976 x 388): every child
straight under its parent on a vertical line (Recipes plan and Delivery too, where ours indents them with
elbows), levels about 70 px apart, wider padded boxes, Profile and Settings to the right under Profile & Settings.
Ours at 1440 is 860 x 274, so the page below runs 114 px early. The CSS is shared with Scotties' sitemap; check
Desktop/Scotties.pdf's sitemap before restructuring. Labels stay ours (the raster's are FigJam's small sans).
MenuMe desktop, Usability to the end, landed: `a16d9ff` usability flows (the design's six connectors exported
to `assets/menume-usability-desktop-*.svg`; every note line breaks as drawn), `c26a8eb` usability introduction
gaps, `77bcfa3` lists on the full 980 px (all pages; MenuMe's Loch Blue line), `96b0e8d` design-system section
gaps, `f28d90b` contribution cards two by two (`<wbr>` after "Onboarding/"), `d344c9e` key learnings and the
closing quote. At 1440 every MenuMe line from the hero to the quote now breaks as drawn except the End-to-End list
(the design hangs it about 55 px left of the text column, 1008 px wide; ours stays on the column) and sits on the
design's spacing; below the sitemap the page runs 114 to 142 px early (the sitemap's missing height). The footer
runs 138 px longer (the client's back-to-top). Safari Technology Preview at 1423 layout px reproduces the new
layouts in proportion. Tools: `f20/desk/sweep.js` finds the text widths where an element's lines start as drawn.
Next: Tales desktop walk, then Scotties, with `line-diff.py` per section; then the sitemap tree; then the client
note.

Tales desktop landed: `d233840` introduction, how-might-we measure, story pillars on the design's own columns,
age trail size; `462bd5c` characters and stories spacing; `fd2a2b0` Digital Touchpoint and Campaign intros,
channel lists at line height 1.5, hung heading icons; `009087f` campaign figures at their drawn sizes (map 766,
chart 949); `d111f25` impact chevrons (per-chevron overlaps, rings, copy measures) and closing quote; `5eae6cc`
Key Insights bubbles; `ea5f3b8` last impact title on one line (correction comment on `d111f25`); `b9a410f`
notepad and bubbles wrap plainly instead of `text-wrap: pretty` (correction comment: phone widths unchanged);
`78e3504` desktop lists 1004 px so Safari keeps MenuMe's Loch Blue line. At 1440 every Tales line breaks as drawn
in Chromium and Safari Technology Preview and sits within 3 px of the design, except:
- "developmental stages." (the copy pass's grammar fix of the designs' "stage.");
- the Mighty Brains and Don't-be-fooled headings +64 and -36 px: our notes quote the curriculum word for word
  (`ea79666`, chosen by the user), so their heights differ from the drawn citations;
- the demo link label and band headings about 5 px high (the shared link is 42 px tall, drawn 48; band headings
  sit 5 px higher in their bands);
- the footer 139 px lower (the client's back-to-top), as on MenuMe.
Tool caveats: `agent-browser screenshot --full` renders `<picture>` with the phone source and stretches the page
below it, so pair with tall viewport shots instead; `f20/desk/sweep.js` now matches 24-character line starts;
`f20/desk/breaks-dump.js` dumps every text block's breaks for a Chromium-against-Safari comparison (Safari returns
CRC16 hashes, compared in `br-safari.json`).
Safari parity finding: Safari breaks 23 blocks differently from Chromium at 393, 3 at 744 and 3 at 1440 (the two
at 1440 left are Scotties blocks 18 and 70). Queued as its own task: sweep both browsers per block, pick measures
inside both windows; include the phone trust bubble, whose base `balance` breaks line 1 unlike Phone Tales.
Next: Scotties desktop walk, then the Safari parity pass at 393 and 744, the sitemap tree, the client note.

Scotties desktop landed: `a358d40` core challenge cloud (six `<br class="desktop-break">` in the challenge copy,
shown from 1280 px only) and the positioning note; `31cf81c` personas and core value pillars; `998cc9e` visual
strategy artwork (wordmark 635 px); `f65ab44` the sitemap at the design's scale (47 px boxes, 17 px labels, the
four sections at their drawn columns, the shared tree CSS untouched below 1280 and on MenuMe); `1e019fe`
wireframe pages' spacing and the gap down to the Key Learnings band; `fe4bf4c` wireframe note measures; `918b5be`
key learnings boxes at their drawn sizes and places; `0748ad6` closing quote. At 1440 every Scotties copy line
breaks as drawn and sits within 6 px of Desktop/Scotties.pdf in Chromium; Safari Technology Preview breaks all 74
text blocks as Chromium does (blocks 18 and 70 from the parity finding are fixed). Residuals:
- the footer 136 px lower (the client's back-to-top), as on MenuMe and Tales;
- the type specimens' labels are live type in the design, inside the image in ours;
- the drawing places each sitemap section's incoming arrow 31 to 50 px in, ours uses the 32 px trunk for all four;
- the hi-fi "Opens with high-energy action" callout breaks as drawn only from 255.4 to 255.65 px in both browsers
  (ours 255.53): a font or engine change could tip its last line.
Tool caveats: `f20/desk/sweep.js` sets the element's content box, so an element with a border (the hi-fi intro's
4 px dashed one) needs its border subtracted when comparing; `pm.samples` in PyMuPDF copies the whole raster on
each access, so bind it once (`f20/desk/scan-lines.py`).
Next: the MenuMe sitemap as the design's top-down tree, then the Safari parity pass at 393 and 744, then the
client note.

MenuMe desktop sitemap landed: `c6e0cb2` draws it as Desktop/MenuMe.pdf's centred top-down tree from 1280 px (the
1024 px row layout now stops at 1279). Every box lands within 2 px of the raster's in Chromium and Safari
Technology Preview, and the page below moved down 111 px, so Core Task Flows now lands exactly on the design.
Decision taken under "Figma is design intent", open to the user's veto: the desktop sitemap labels drop from 16 to
13 px, where our Playfair matches the drawn labels' 8 to 9 px cap height and fits the drawn boxes; only "Select
from fridge" needs 131 px where the drawing has 114. Below the tree, MenuMe's flows run as before against the
design: the second and third flow headings are drawn 12 and 61 px lower because every MenuMe design pairs the
headings with the diagrams in a different order (miss 20, waiting on the client; ours pairs each heading with its
own flow, `446ba33`), so the drawn diagram heights differ from ours under each heading.
Next: the Safari parity pass at 393 and 744 (task #31), then the client note.

Safari parity pass at 393 and 744 (task #31): the earlier finding (23 blocks at 393, 3 at 744) was mostly a harness
artifact. Safari Technology Preview on m1 draws classic scrollbars inside an iframe too, so an iframe `w + 17` wide
lays out at `w` but resolves `100vw` (and every `vw`-based growth token) at `w + 17`; even `overflow: hidden`,
`scrollbar-width: none` and `::-webkit-scrollbar` left the 17 px. An iPhone has overlay scrollbars. Use a page-tall
iframe instead (`width: w; height: 25000px`): nothing scrolls, so `clientWidth`, `100vw` and `(width: wpx)` all
equal `w`; `vh` units grow, which leaves text widths alone. The tablet checks recorded at "727 layout px" and the
1280 sitemap check carried the same bias; 1440 checks did not, since the growth tokens saturate there.
With that harness, 5 blocks at 393 and 3 at 744 break differently between the browsers:
- fixed, `f49b655`: the Scotties phone hi-fi "Transitions gracefully" callout, at the edge of the window where both
  break it as drawn; now 199.5 px, inside it;
- Safari matches the design where Chromium does not (left as is): MenuMe's overview note at 393 and 744 (Safari
  lays it out 1 px narrower), Tales' logo paragraph at 393 (the design's first four breaks);
- neither matches the design (left as is): the Scotties Visual Strategy paragraph at 393 (Chromium matches its own
  breaks only from exactly 353 px, the full column; Safari's 13 lines are the stable result), the Scotties
  challenge cloud copy at 393 and 744 (balanced wrapping breaks differently in each engine, with the same line count);
- Tales' "Empowering pre-teens" item at 744: Chromium matches the drawn lone "on" only from exactly 574 px, the full
  width; Safari carries "focusing on" down, also two lines.
Tool: `f20/desk/par-sweep.js` (per block, the widths where its lines start with given words; compares by prefix, as
short words broke the 5-character comparison) and `f20/desk/design-starts.py` (a block's drawn line starts from a
design PDF).
Next: the client note (task #30).

The user's decisions, 2026-10-19: keep the MenuMe desktop sitemap labels at 13 px; swap in the designs' 2x artwork
now (the Retina refresh flagged earlier: MenuMe personas re-cropped from the uncropped originals, the
personalization wireframe and hi-fi screens, the device showcase, the flow diagrams; then measure Tales and
Scotties the same way); then draft the client reply from `07-what-we-fixed.md` for the user's review (the user
sends it). Client note updated 2026-10-19 with the tablet and desktop walks, the parity pass and the flow-order
question (local file, not in the repo).
Next: the 2x artwork refresh, then the reply draft.

2x artwork. Rule: the enlarged view (a lazy `<img>` in a closed popover, fetched only on open; checked by
resource timing in Safari Technology Preview and Chromium) always gets a 2x lossless WebP; the inline `<img>` moves
to it too only when the WebP is no heavier than the old PNG, since inline the old files already give about one file
pixel per device pixel on every target screen (a MenuMe persona shows at 191.5 CSS px on a 3x iPhone, 575 device
px, from a 586 px file). Lossless because lossy WebP subsamples chroma, which softens photographs. Each WebP
`<img>` has `srcset="<file> <px>w"` plus `sizes="<old CSS width>px"`, so its natural size stays the old one on every
screen (a `2x` descriptor alone lets `src` act as the 1x candidate on 1x screens), and the enlarged view's
natural-size rule covers `.webp`. Verified per commit: page heights, inline boxes and enlarged sizes at 393, 744
and 1440 against live in Chromium (the check fires on a pattern only local files match), plus natural sizes and
`currentSrc` in the Safari page-tall iframe.
Landed, both views (WebP no heavier): `cb2c319` Scotties lo-fi wireframes (1440 px sources in the 1 pt frame),
`c77779f` Tales poster (from the 3072 px design poster).
Landed, enlarged view only: `70ba00c` + `f08dac8`, then `08b132b` restoring their inline PNGs byte for byte (MenuMe
personas and personalization screens); `022b877` MenuMe moodboard (3840 px source); `bd800fa` Scotties moodboard
(design box with its frame); `4203646` MenuMe tablet showcase; `f63ce31` Tales hub laptop and phone, browser editor
tablet, Instagram phone.
How: `region-match.py` finds the design box whose render matches an asset; `fit.py` renders a padded box,
locates the asset in it (`locate.py`) and renders the exact box at 2x; `render-region.py` removes the page's
white fill from a scratch copy and sets `/Interpolate` on images and soft masks (low-resolution frames otherwise
upscale stair-stepped); `swap.py` applies the rule; `verify.py` runs the Chromium check. All in
`/home/user/temp/agent/f20/hidpi/`. Registration against the old files is within a pixel or two.
No gain, left as is: Scotties personas and Tales personas (design sources no larger), MenuMe mobile showcase
(sources 1.80 and 2.22 px per point against 1.94), Tales parent stories (2.26 against 2.0), Tales Facebook ad
(1.17x), MenuMe weekly specials screens and the Scotties hi-fi homepage (already the full source).
Landed last: `5cf1620` MenuMe task flows, both views (crops of the 4096 px design diagrams, refined to the pixel
with `refine.py`; lighter than the PNGs). The old preferences crop sat about 9 px off the design image in one box
(commit comment corrects the message's 5 px). 2x refresh done; client note `07-what-we-fixed.md` has the item.
Trade-off left as is: the task flows serve their 3920 px files inline too (fewer bytes than the PNGs, but four
times the decoded pixels, about 6 megapixels each). Enlarged views checked on iOS 17.0.1 Safari 17.0 at 3x in the
Simulator: the MenuMe persona and Scotties wireframe WebPs decode at their old natural sizes, 586 x 748 and 574 x 906,
like an unchanged PNG control.

## Client reply status, 2026-10-20

The reply is drafted and waits for the user, who sends it; nothing has gone to the client.

### Files (local, outside the repo)

All in `/var/home/user/xinyanchen-portfolio/Client comparison screenshots 2026OCT170133/`:
- `05-client-reply-draft.md`: the WeChat message in Simplified Chinese plus an English reference copy; bracketed
  placeholders for the client's name and the signature. Backup of the 2026-10-18 draft:
  `/home/user/temp/agent/f20/05-client-reply-draft.before-2026-10-19.md`.
- `07-what-we-fixed.md`: the evidence behind every sentence, with commits; it gained the 2x artwork item (scoped to
  the three case studies, the only pages with enlarged views) and the measured contrast figures.
- `evidence/send-5cf1620/`: the 16 numbered before and after pairs to send (8.4 MB), captions in `captions.md`.
- `evidence/pairs-5cf1620/`: the full set of 77 pairs (54 desktop at the client's shot positions, 2 WeChat, the
  client's 11 iPhone shots of 2026-10-19, 10 extras), index in `index.md`, whose per-shot notes predate the walks.
- `evidence/after-5cf1620/`: the raw after frames. `send-13f7d95/` and `pairs-13f7d95/` predate the phone, tablet
  and desktop walks and must not be sent.

### What the message says

New since the 2026-10-18 draft: the client's iPhone shots (sitemaps fixed for iOS 17.0, phone layouts walked against
the phone designs), the tablet and desktop walks (desktop lines break as drawn within a few pixels, except the
footer, about 140 px lower because of the back-to-top button, and around the MenuMe flows), and the sharper
enlarged images on the three project pages.
Questions to the client, each answerable alone, none blocking built work:
- the original `IMG_0804` photo (the Figma frame holds only a stroke);
- replacements for the two removed curriculum citations, and whether Grade 1 D1.2 is the intended one;
- the MenuMe task-flow order: every design places each diagram under another heading, the site pairs each heading
  with its own diagram (`446ba33`); if the client picks the designs' order, swap the three diagrams' headings;
- the Tales phone design's character-card labels "Ages 9-10" and "Ages 11-12" against the tiers 6-8 and 9-12 that
  the rest of the page and the other designs use (the phone page keeps 6-8 and 9-12);
- FYI only: MenuMe's orange headings `#F89E3F` measure 2.11:1 and its teal headings `#60B5BF` 2.37:1 on white,
  against WCAG 2.2 AA's 3:1 for large text (success criterion 1.4.3), measured 2026-10-20 in Chromium at 1440 on
  `5cf1620`; a palette decision for the client.

### The user's decisions, 2026-10-20

- Mention the contrast finding as an FYI (the user chose this over the recommended leave-it-out).
- Drop the FYI on the vaping wording (the Tales note's "long-term health consequences" against OPH's public page,
  "the long-term health effects are unknown"); it stays recorded in `07-what-we-fixed.md`.
- Send all 16 attachments (the 11 picks of 2026-10-18 recaptured, plus 5 of the client's iPhone shots: 544, 549,
  543, 551, 552).

### How the attachments were made

- Desktop after frames: `/home/user/temp/agent/xyc-after/desktop.mjs`, Safari Technology Preview over WebDriver
  (unit `xinyanchen-vm-webdriver-stp`, local port 4450) at 1920 by 950 at 1x, anchored to each before frame's heading.
- Extras: `xyc-after/extras-after.mjs` (the after half of `extras.mjs`), Chromium.
- Phone frames: the iOS 17.0.1 iPhone 15 Simulator on m1 (the client runs iOS 17.0.2), with
  `/home/user/temp/agent/f20/sim17-match.mjs` and `sim17-frame.mjs`. `simctl openurl` ignores text fragments
  (`#:~:text=`), so `f20/inject/server.mjs` (unit `xinyanchen-inject-server`, port 4175, reverse-tunnelled to m1 by
  unit `xinyanchen-m1-inject-tunnel`) serves the working tree plus `/__frame.js`, which scrolls `?text=` to `?y=`
  (a file, as the pages' CSP blocks inline scripts) and with `&popover=<id>` opens an enlarged view and reports its
  size through an image beacon to `inject/reports.log` (the CSP sets `connect-src 'none'`). Framings for iPhone
  shots 545, 546, 548 and 550 to 552 were set by eye after band matches failed on moved content. Both units are
  stopped; restart them with `systemd-run --user --unit=<name> --collect --property=MemoryMax=<cap>` around
  `node /home/user/temp/agent/f20/inject/server.mjs <repo> 4175` and
  `ssh -N -o BatchMode=yes -o ExitOnForwardFailure=yes -R 127.0.0.1:4175:127.0.0.1:4175 m1`.
- Pairs: `xyc-after/make-pairs-5cf1620.mjs` (adds the iOS 17 labels and the client's iPhone shots).

### Corrections on record

- `5cf1620`'s message says the old preferences flow crop sat "about 5 px" off the design; it was about 9 px. Corrected
  in a [commit comment][5cf1620-correction].
- The untracked `wsf-390.png` in the repo root is not ours to touch.

### Next

The user reviews `05-client-reply-draft.md` and the send set, fills the placeholders and sends the message. When the
client answers, act on each question as listed in "What the message says" and record the answer in
`07-what-we-fixed.md`.

## Client batch, 2026-10-20

The user, 2026-10-20 about 14:25, sent two paths: `../Website (Copy) 2026OCT191300.fig` (exported 2026-10-20 18:20
UTC, 321 MB; the two earlier `Website (Copy)` files are no longer in the folder) and
`../Client screenshots 2026OCT191300/`, 19 screenshots taken 14:12 to 14:20, each named with the client's
instruction. The user then said: "Make your assumptions and work autonomously. I need to go to get an injury checked
out." The reply drafted in "Client reply status, 2026-10-20" does not cover this batch and should wait for it.

### Client viewport (correction)

The user, 2026-10-20: "you know the exact client viewport. The client has a M2 macbook air and a 4k 27in ext
screen." It was already recorded in `../Client comparison screenshots 2026OCT170133/README.md` (stated 2026-10-18):
a 1080p screen at 1x and a 4K screen at 2x, both a 1920 by 1080 CSS screen, 1920 by 950 in Safari. The batch's
full-width shots are 1920 wide with classic scrollbars. The "Client device, 2026-10-19" entry calling the width
unknown was wrong. Check this batch at 1920 by 950 in the VM's Safari Technology Preview (port 4450, lock
`flock /home/user/temp/agent/vm-stp.lock`), at 1x and 2x, against the Desktop design PNGs.

### The client's instructions, as written (file name, then translation)

Tales:
- `左边的人位置高一点，参考原设计。.png`: "Put the person on the left a bit higher; refer to the original design."
  (The Challenge.)
- `文字的两边与图片对齐.png`: "Align both sides of the text with the images." (Personas Sarah and Emma.)
- `黄色卡片的两边与上面图画对齐.png`: "Align both sides of the yellow card with the drawing above." (Comic and
  citation card.)

MenuMe:
- `排版参考原设计.png`: "Layout: refer to the original design." (The Inspiration.)
- `问号被部分遮住了.png`: "The question mark is partly covered." (Inspiration callout.)
- `对话气泡的框有点不一样,不应该形状不一样.png`: "The speech bubbles' frames are a bit different; they should not
  differ in shape." (Focus Group Key Findings.)
- `图片的两边与文字对齐.png`: "Align both sides of the image with the text." (Moodboard.)
- `手机和平板的button分别中间对齐吧.png`: "Centre the phone and the tablet buttons, each [under its device]."
- `灯泡的下方没显示出来。另外的排版参考原设计。.png`: "The bottom of the light bulb doesn't show. For the rest of
  the layout, refer to the original design." (Dual-Loop Culinary Framework.)
- `参考原设计.png`: "Refer to the original design." (Weekly Specials Flow, full width.)
- `排版参考原设计 2.png`: "Layout: refer to the original design." (Personalized Menu Flow, full width.)
- `排版参考原设计 3.png`: "Layout: refer to the original design." (Key Learnings & Takeaways.)

Scotties:
- `左右两边的位置和卡片大小与原来设计有差别。另外最后一段话与卡片的间距太近。.png`: "The left and right positions
  and the card sizes differ from the original design. Also the last paragraph is too close to the cards."
  (Reflection cards and closing quote.)
- `排版参考原设计 4.png`: "Layout: refer to the original design." (Skateboard and the three emotions.)
- `排版参考原设计 5.png`: "Layout: refer to the original design." (Sitemap.)
- `排版参考原设计，这里的箭头消失了。.png` and its `2`, `3`, `4`: "Layout: refer to the original design; the arrows
  here have disappeared." (Lo-fi Homepage, Lo-fi Product Listing Page, Hi-fi Homepage top and bottom.)

### Done in this batch

- `8e51b4f`, from the user's own question before the batch arrived ("Why are these not aligned?", a screenshot of
  the Tales Key Insights bubbles): the fill-to-outline offset is the design's, but the Trust fill was cut flat at
  its bottom and both offsets were about half the design's. The user chose to match the design and fix the cut.
  Fills refitted to the Desktop and Phone PNGs, drawn from a `::before` reaching past the box, so no text or band
  moved (rects identical at six widths in Chromium, and at 390, 744 and 1440 in Safari Technology Preview against
  live). Correction comment on `a5102be`: [a5102be-correction]. The Safari MCP's screenshots come back black; take
  Safari frames over WebDriver on port 4450 (the VM) instead.

### What the new Figma file holds

Diffed against the 2026-10-18 22:43 copy (text dumps `/home/user/temp/agent/f20/fig-191300/texts.json` and
`/home/user/temp/agent/fig-parse/texts-new-full.json`; canvas listing by
`/home/user/temp/agent/fig-parse/canvas-children.mjs`):
- Design changes: Desktop Scotties body copy Bold to Medium (22 nodes), already built (`0f6dfb8`); a duplicate Phone
  MenuMe frame removed. No other text, size or font change in any frame.
- New on the Desktop canvas, left of the frames: the heading "10月19日修改意见：" ("Revision notes, 19 October:")
  above the client's screenshots, named "Screenshot 2026-10-19 at 11.00.20 AM" to "1.49.54 PM" (Retina, 2x), plus
  two 1920-wide groups. These are the folder's 19 files, so the batch shows the site as of the morning of
  2026-10-19, before that day's phone, tablet and desktop walks; each item must be checked against the current
  site before any fix. One shot is on the canvas but not in the folder: 11.00.20, the Tales Key Insights bubbles
  before `a5102be` (white highlight crossing the outline), already fixed.
- New on the Phone canvas: the same heading above the 11 iPhone shots of 2026-10-19 (the
  `../Client screenshots 2026OCT191142/` set) and one more, `WechatIMG110` (13:51), MenuMe Focus Group Key Findings
  on the phone: the bubble tails differ in shape. It belongs with the bubble-frame item. Extracted to
  `/home/user/temp/agent/f20/fig-191300/img/`.

### Triage at 1920 by 950, 2026-10-20

Captured in the VM's Safari Technology Preview at a 1920 by 950 viewport (classic scrollbars, 1903 layout px) on
`5be6c75`, one frame per item, beside the client's shot and the Desktop PNG at the same anchor (1440 column centred).
Script `/home/user/temp/agent/f20/triage/triage.mjs` (items in `items.mjs`, sheets by `sheets.py`, frames in `now/`,
sheets `sheet-<id>.png`).
Already matching the design, nothing to do: Tales challenge figure (t1), persona text under the photos (t2),
citation card on the comic's edges (t3); MenuMe Inspiration with the question mark whole (m1), moodboard on the text
column (m3), Dual-Loop with the bulb's base showing (m5), both flows (m6, m7), Key Learnings (m8); Scotties cards
(s1; the quote's box 118 px under the lower card, the design's 118 from its nodes, 12630 to 12748, and our boxes
within 3 px of those; card edge to first ink 130 px now, 81 in the client's shot),
emotional pillars (s2), sitemap (s3), lo-fi and hi-fi sections with their arrows (s4 to s7).
Open:
- m4, MenuMe showcase buttons. The Desktop and Tablet designs pair both buttons in the middle; the Phone design
  stacks each under its device (built, `4149e88`). Assumption (the user said to make assumptions and work
  autonomously): the client wrote "分别" ("each") and, unlike nine other items, not "参考原设计", so each button is
  centred under its own device on the wide layouts. Easy to revert.
- m2, focus-group bubbles: identical on desktop now; the client's `WechatIMG110` shows the phone tails differing.
  Check on the phone.
- Residuals noticed, not asked: the Tales Challenge notepad draws about 8% narrower than the design at 1920; Scotties'
  "Lo-fi Product Listing Page" heading carries the skateboard glyph, the design's does not.

### Results, 2026-10-20

- m4: `579dabf`, each prototype button centred under its device at every width (centres equal at 744, 1440, 1920
  in Chromium; checked in Safari at 1920 by 950). A first try with `min-inline-size: max-content` overrode the
  desktop's 250 px pill minimum (`.prototype-link` base rule); `white-space: nowrap` keeps one line instead.
- m4 in Safari at a 744 layout width (`/home/user/temp/agent/f20/triage/m4-stp.mjs`, window widened by the 17 px
  classic scrollbar): centres equal, both labels on one line; the 209 px phone button overhangs its 152 px column,
  its left edge 28 px into the page gutter and 37 px from the window edge.
- m2: already fixed on the phone too (`ba596be`); the three bubbles share one shape and match `Phone/MenuMe.png`.
  Confirmed in the iOS 17.0.1 Simulator's Safari (`/home/user/temp/agent/f20/sim17/batch-m2-a.png`, `-b.png`; inject
  server and tunnel units started for it and stopped after).
- Notepad residual: `a544c71`, the pad 506 px at full growth (from 482), copy margins and top offset adjusted so its
  left edge, 353 px measure, breaks and first line stay; a negative block-end margin keeps everything after it in
  place. Drawn outline and sheet within 3 px of the design; Safari at 1920 checked. The whole Challenge group still
  sits about 6 to 8 px lower than the design (older, not touched).
- Glyph residual: left as is. Tablet and Phone draw the glyph on "Lo-fi Product Listing Page"; only Desktop omits
  it, likely a slip in the file.
- Client files updated (local): `05-client-reply-draft.md` gained a section on these notes in both languages (no
  attachments) and now names the 1920-wide screen instead of the MacBook Air for desktop; `07-what-we-fixed.md`
  gained the batch's evidence and the same correction. Backup of the evidence file:
  `/home/user/temp/agent/f20/07-what-we-fixed.before-2026-10-20-batch.md`. No pre-batch copy of the draft exists;
  the batch added only the new section, the note at its top and the two viewport phrases.

### Next

The batch is done. The user chose, 2026-10-20, "I'll review and send": the user reviews the updated
`05-client-reply-draft.md`, fills the placeholders and sends it with the 16 images (today's three fixes go without
images). Nothing has gone to the client from this session.

### Readiness assessment, 2026-10-20

The user asked how we feel, since "Ready" was called at least three times and the client found more each time.
Why each call failed, from this file: 2026-10-18, our checks ran at 1440, the client's at 1920; 2026-10-19, every
Safari check ran on current engines, the client's iOS 17.0 dropped the sitemap nesting; 2026-10-20, 16 of 19 notes
predated the 2026-10-19 walks, one (m4) was new, and the notepad miss (about 5%) had passed the desktop walk.
Common cause: "ready" rested on checks that did not match the client's conditions (viewport, engine) or method (the
client compares whole pages to Figma by eye; we checked listed items and walked sections).
Gaps still open:
- The desktop walk compared text lines mechanically at 1440 (`line-diff.py`), but non-text geometry (art, cards,
  shapes) only by eye, and nothing checked how each element grows from 1440 to 1920: the notepad was right at 1440
  and under-grew.
- Desktop has never rendered on a Safari 17 engine (client Mac: macOS 14.5; its Safari version is unconfirmed, the
  question to the client has no recorded answer; 14.5 shipped 17.5, a Sonoma update would give 17.6); only
  Safari Technology Preview and a BCD static check. The iOS 17.0.1 Simulator covers the phone only.
- Known deviations the client may raise: the Challenge group 6 to 8 px low, the footer about 140 px lower (back-to-top
  button), the m4 assumption. (Corrected the same day: an earlier line here also listed MenuMe's contributions as
  4 across; `f28d90b` already set them two by two as designed.)

Decided by the user, 2026-10-20 (supersedes "I'll review and send" in "Next"):
- Hold the reply until a full-page check: every page captured in Safari at 1920 by 950, compared pixel by pixel
  against the Desktop PNGs, every region off by more than a few px fixed or listed.
- Cover desktop Safari 17 with a macOS Sonoma VM on m1 (image on `/Volumes/MacData`; probe m1's memory and the
  existing VM first).

Method (no 1920 design exists; the Desktop PNGs are 1440 wide and the site grows past 1440):
- Layer 1, at 1440 in Safari: every element's box against the Desktop PDF, sections placed by text-line anchors,
  then non-text boxes and a pixel overlay per section.
- Layer 2, at 1920 by 950 in Safari: each element's size at 1920 over its size at 1440, flagged against the page's
  dominant growth; outliers are what the client's eye catches at 1920.
- Positive control: layer 2 run on `5be6c75` (before the notepad fix) must flag the notepad, else fix the method.
- Then 2x, then the same sweep in the Sonoma VM's Safari.

Sonoma VM facts (m1, 2026-10-20): host macOS 27.0, 16 GiB, 64% free; `/Volumes/MacData` 237 GB free; UTM's
existing `macOS.utm` guest (macOS 27, 8192 MB) carries the Safari and STP WebDriver. UTM creation and the guest's
Setup Assistant are GUI steps (`utmctl` fails over SSH), and the guest password is never stored or asked for, so
either a scripted route (being researched) or the user at m1 is needed.

Progress, 2026-10-20 (tools in `/home/user/temp/agent/f20/sweep/`):
- 1440 against 1920 (`collect.mjs`, `growth.py`, Safari Technology Preview): the growth tokens clamp at 1440
  (`744 + 696`), so at 1920 every element is the 1440 layout moved 231.5 px right, or a full-width band. Layer 2 is
  therefore a 1440 check plus a look at the full-width bands. Exceptions: Home's illustration (`picture.illustration`,
  409 by 323 at 1440, 409 by 221 at 1920), Contact's column (1084 at 1440, 1086 at 1920) and its footer picture
  scaling with the width, and MenuMe's personas block.
- Found: MenuMe `.alternating-personas` `margin-block-end: calc(10 * var(--u))` with `--u: calc(100cqw / 1086)` on the
  same element, whose `cqw` resolves against no ancestor container (the viewport): 13.25 px at 1440, 17.5 px at 1920,
  against the 10 px meant; everything after it on MenuMe sits 4 px lower at 1920 than at 1440. Not fixed yet.
- Box matching against Figma nodes (`design-nodes.py`, `anchors.py`, `design-diff.py`) failed the positive control:
  Figma draws the notepad as two nodes, our one box matched the pad alone. Text anchors also carry font-metric
  offsets of up to 10 px (glyph centres used; line heights differ, Figma 2 against ours 1 on "Jump To Section").
- Pixel comparison (`shoot.mjs`, `stitch.py`, `pixdiff.py`, `run-pix.py`): full-page Safari captures at 1440 against
  `Desktop/*.png`, blocks aligned near the text-anchor offset. Positive control passed: before `a544c71` the notepad
  block shows a 504 by 363 differing region, after it only a 13 px strip at its foot. Captures and stitched pages for
  all six pages are in `shots/`; only Tales has been compared so far.
- Design source: the Figma frames of 2026-10-19; `Desktop/About.png` predates them (footer 92 px higher, captions
  missing), so About's pixel result needs a fresh export or stays geometric.
- Blocked, 2026-10-20: the auto-mode permission check denied installing Tart on m1 (release tarball by `curl`,
  checksum-checked) and then the `uv run --with numpy --with scipy` comparison run, which had run three times
  before. Asked the user. Research for the VM: `/home/user/temp/agent/f20/sonoma-research.md` (prebuilt
  `ghcr.io/cirruslabs/macos-sonoma-vanilla:14.5`, Safari 17.5 inferred; host keychain needs the GUI session; m1
  swap 5.9 of 7 GB used with the podman machine at 14 GiB and the UTM guest at 8 GiB configured).
- Decided by the user, 2026-10-20: allow the `uv` packages for the comparison; allow the Tart 2.41.1 download
  (checksum-checked) to `/Volumes/MacData/tart` and the 14.5 image pull; pause `podman-machine-default` while the
  Sonoma VM runs, and restart it after.
- Tart 2.41.1 installed at `/Volumes/MacData/tart/bin/tart.app` (checksum and notarization checked); the image pull
  runs in Linux unit `xyc-tart-pull` with `TART_HOME=/Volumes/MacData/tart/home`, log `/Volumes/MacData/tart/pull.log`
  on m1.
- `1b85496`: Home's wide project pictures used `#project-artwork-without-blank-export-margins` view fragments in
  `srcset`; Safari (27 and Technology Preview) draws the whole canvas instead, so every Home picture from 640 px up
  was small inside its box. The wrong claim at "Safari risks from the audit's section 7" (named-view candidates
  "render correctly") is superseded. Case-study heroes use the fragment in a plain `src`, which Safari draws
  correctly (MenuMe pair checked); left as is.
- Home findings still open: picture positions differ from the design by up to 66 px (ours align each picture to
  the column's outer edge, `f5fa91e`; the design starts right-hand pictures near x 756 and left-hand ones near 205).
- Retracted: Youth in Limbo's empty frame is not the `IMG_0804` question. Safari against Chromium at 1440
  (`chromium-shoot.mjs`, `run-engine.py`, `pixdiff.py` with `-` anchors; control: the pre-`1b85496` build flags
  all six Home pictures) showed Chromium drawing the photo and Safari not. Safari drops the photo once the picture
  has been scrolled past and back (blank 20 s later), and keeps it without the clip path on the photo's group; a
  smaller re-encode (so no ICC profile either) and a nested `<svg>` viewport both still failed. The user suggested
  vectors: `bda96e8` draws the frame's strips and holes as flat shapes over the unclipped photo (texture gone).
- Safari against Chromium at 1440: About, Contact, Tales, MenuMe and Scotties show no differing region; Home's
  remaining one is the hero river (Safari draws the gold band solid where Chromium fades it), not yet checked
  against the design or against animation timing.
- Tales findings: the stories' note cards are 393, 329 and 457 tall against the design's 327, 430 and 419, from the
  citation edits (content-driven, expected); the bubbles and hero art sit within a few px.
- `f87a7b6` MenuMe personas margin (band gap 129.9 at 1440 and 1920, design 130); `047126f` Scotties tablet
  note margin (same self-container mistake; band 177 px below the box at 744, design 177.6). Scanner for the
  mistake: `/home/user/temp/agent/f20/sweep/self-cq.py` (control: flags both on the stylesheet before `f87a7b6`).
- m1, 2026-10-20: `podman-machine-default` stopped for the Sonoma VM (user-approved). It was running container
  `snowflake-proxy` (up 47 hours). Restore after the Sonoma runs: `podman machine start`, then
  `podman start snowflake-proxy` if it is not up.
- Sonoma VM, 2026-10-20: image pulled; `tart clone ... sonoma-14.5`, `tart set --memory 4096 --cpu 2`; a plain
  `tart run --no-graphics` from SSH started it (no keychain error), guest IP 192.168.64.9. Installing m1's VM key
  with the image's documented default login was refused by the permission check (security weakening); asked
  the user. The VM is stopped and podman is restored (a first `podman machine start` printed `Error: EOF` and
  left the socket refusing; a stop and start fixed it; `snowflake-proxy` came back up by itself).
- Decided by the user, 2026-10-20: allow installing m1's VM key into the Sonoma guest with the image's documented
  default login (then turn password login off in the guest). Home picture positions: "Do whatever looks the best."
- Sonoma rig working, 2026-10-20: guest macOS 14.5, Safari 17.5 (read from the app bundle), screen 1024 by 768 at
  2x, classic scrollbars 15 px (1905 layout px in a 1920 window). Login: user `admin` with m1's
  `~/.ssh/id_ed25519_vm` key; the documented default password worked only with `PreferredAuthentications=password`
  (keyboard-interactive was rejected), and password and keyboard-interactive login are now off
  (`/etc/ssh/sshd_config.d/100-key-only.conf`). Updates, sleep and screensaver off; `sudo safaridriver --enable`
  done; guest LaunchAgent `dev.monochromatic.safaridriver` runs `safaridriver -p 4444` in `gui/501`.
  Tunnels: on m1, `ssh -N -L 127.0.0.1:4454:127.0.0.1:4444 -R 127.0.0.1:4173:127.0.0.1:4173 admin@192.168.64.9`
  (nohup, log `/Volumes/MacData/tart/tunnel.log`); on Linux, unit `xyc-sonoma-tunnel` forwards 4454. Drive with
  `DRIVER=http://127.0.0.1:4454 BROWSER=safari`, lock `/home/user/temp/agent/vm-sonoma.lock`. Start the VM with
  `TART_HOME=/Volumes/MacData/tart/home tart run --no-graphics sonoma-14.5` (works from SSH), only with podman
  stopped.
- Safari 17.5 results, 2026-10-20 (on `047126f`): at 1440 (2x screen, captures `s17/`) every page matches
  Chromium (`eng17-*`); the only flagged area, Home's hero river, is its reveal animation caught mid-way (seam
  at the frame join at y 900); single frames 10 s after scrolling show the designed river and flower in both
  Safari 17.5 and Technology Preview (`view/river-frames.png`). At 1920 by 950 (1905 layout) every element is
  the 1440 layout moved or a full-width band, as in Technology Preview.
- Design findings reviewed (1440, `diff-now-*`): MenuMe flows (order question with the client), Contact's
  verification above Send (the client's ask), Tales citations (content), MenuMe device showcase within 4 to 15 px
  of the design (phone 15 px high; residual).
- `8110aeb` Home layout as the Desktop design (the user: "Do whatever looks the best"; judged the design's
  pairing of picture and text across the gutter better than ours): pictures and headings within 1 px at 1440 in
  Safari; 390 and 744 unchanged in Chromium; picture-to-text gaps 28 px or more from 744 to 1920
  (`sweep/gap-probe.mjs`).
- Youth in Limbo, reopened: after `bda96e8` the photo still went missing in one of two Technology Preview
  full-page passes (`shots-fix3` blank, `shots-fix3b` drawn); Safari 27 drew it in one pass, Safari 17.5 in its
  pass. The clip path was not the whole cause. Running `sweep/youth-trials.mjs` (four trials per browser, vector
  against clipped) to measure the rate before choosing a fix; a likely robust fix moves the photo out of the SVG.
- Youth trials, measured: scroll-away-and-back (`youth-trials.mjs`, 3 s after return): clipped (old) lost the
  photo in 3 of 4 Technology Preview trials, 0 of 4 in Safari 27 and 0 of 4 in Safari 17.5; vector (`bda96e8`)
  showed it 4 of 4 in each. Full-page passes (`youth-fullpage-trials.mjs`): vector drew it 3 of 3 in each of the
  three. So 21 of 22 vector trials drew it; the one miss was the single `shots-fix3` preview pass. In our
  measurements the bug is Technology Preview's; the client's Safari 17 drew the photo with either build. No
  further change; corrective comment on `bda96e8` ([bda96e8-correction], its message said Safari generally).
- Footer weight: Figma uses SemiBold in 17 of 18 frames (Desktop Home Regular); ours is Regular by the client's
  2026-10-18 instruction applied site-wide (`b85e0e0`). Not a miss.
- Full-width bands at 1920 (`view/bands1920-*.png`): heroes, Tales band headings and footers run edge to edge
  without stretching or seams.
- `411935c` About portrait: wide windows choose by density (Safari 17.5 measured not to choose a srcset file again
  after a resize). The rigs report `devicePixelRatio` 1 (all three Safaris, screen 1920 by 1200), so Safari's image
  choice at 2x was never exercised; Sonoma VM display set to `1920x1200pt` to test HiDPI (Safari 27's VM switches with
  `displayplacer` mode 34, see `/home/user/temp/agent/xinyanchen-build/vm-safari-shot.mjs`).
- The user, 2026-10-20 (overrides the image-weight decisions: "Image weight", the 2x artwork rule "inline moves to it
  only when the WebP is no heavier", the About 516 px photos and the portrait's 760 and 1312 cuts): "Let's always
  serve the full res images. This overrides the earlier decision of image optimization. But it removes an entire
  failure class." Doing now: every raster, inline and enlarged, uses the largest file we have (the zoom WebP, the
  largest version in git history, the client's 4x portrait); no srcset choosing between files. To measure and
  propose: re-extracting design sources whose native resolution exceeds 2x.
- Full-res, phase 1 landed: `e3b5706` About (photos as lossless `jpegtran` crops of the originals in
  `Desktop/About.pdf`, 1975 to 3072 px; portrait the client's 4x file, 2624 px lossless WebP; `411935c`'s density
  choice reverted, no srcset left choosing between files); `715b2e1` twelve case-study pictures show their 2x WebP
  inline too. Boxes and heights unchanged (Chromium 390, 744, 1440 via `sweep/box-probe.mjs` with
  `AGENT_BROWSER_SESSION=fullres` against worktree `wt-fr`; Safari 17.5 1440 and 1920). Work dir
  `/home/user/temp/agent/f20/fullres/`.
- Full-res, phase 2 (running): pictures whose design source is denser than our file. `fullres/gain-now.py` counts
  only images covering a quarter of the box (a first version counted edge neighbours and misread the Facebook ad
  as 3.98x; it is 1.17x). Candidates: hub laptop 1.46x, hub phone 1.27x, Facebook ad 1.17x, mobile showcase 1.14x,
  three parent stories 1.13x, Instagram 1.11x, tablet showcase 1.04x; `hidpi/fit-full.py` renders each located box
  at its source density (unit `xyc-fullres-fit`, log `fullres/fit-log.txt`). Unit `xyc-fullres-match` re-matches
  the MenuMe personas, Scotties wireframes and personas and the Tales poster (`fullres/matches2.txt`); the old
  Scotties persona rows matched MenuMe's PDF and are not trusted.
- Full-res, phase 2 landed: `d7fbea3`, eleven pictures re-rendered at their source density with the old files'
  exact ratios (`fullres/rerender.py`; boxes unchanged to 0.002 px), Jonathan from his 866 px original; the viewer
  sizes bitmaps by their `width` attribute, so no bitmap `srcset` remains (only the skating photo's art-directed
  `<source>`). Not changed, with reasons: Instagram phone (no design box matches), Gwen and Jake (sources smaller
  than ours: 361 and 415 px for our 490), MenuMe personas (equal density). Not re-measured: Home's SVG-embedded
  photos (recorded as native when the soft masks were removed). Verified: page boxes and heights in Chromium at 390,
  744, 1440; all 54 viewers' opened sizes at 390 and 1440 (positive control: old viewer CSS moves 9); Safari 17.5
  viewers at their width attributes. Every referenced image file per page against `59323f0`: About 4.5 to 7.0 MB,
  Home 3.9 unchanged, MenuMe 13.9 to 10.1, Scotties 10.9 to 9.3, Tales 11.1 to 10.9 (pairs became one file; the
  case studies used to download only the 1x PNGs until a viewer opened).
- Sonoma VM display set to `1920x1200pt`, but with `--no-graphics` the guest still reports `devicePixelRatio` 1.
  With one file per picture, image choice no longer depends on the ratio, so the 2x question left is rendering only,
  already covered by the 2x backing captures.
- agent-browser docs landed in the Monochromatic repo (`96b7259c06`, `1702fc8247`): close race (upstream #2134,
  fix PR #2138), relative screenshot path (#137), full-page capture missing lazy previews (cause open).
- Reply draft and evidence updated 2026-10-20 evening: `05-client-reply-draft.md` gains the full-page-check
  section (both languages) and drops the "larger files only on enlarge" and "About 6.1 to 2.8 MB" lines;
  `07-what-we-fixed.md` gains "Full-page check" and "Full-resolution images". New send set
  `evidence/send-d7fbea3/` (54 desktop after frames re-captured at `d7fbea3`, pairs by
  `xyc-after/make-pairs-d7fbea3.mjs`, phone and extra frames still the `5cf1620` captures and labelled so); the
  seven desktop pairs in it checked by eye. Do not send `send-5cf1620/`.
- Rig state at the end of 2026-10-20: Sonoma VM stopped (display left at `1920x1200pt`), its tunnels and unit
  `xyc-sonoma-tunnel` stopped; podman on m1 running with `snowflake-proxy` up (it ran beside the VM for about an
  hour without trouble).
- Home's SVG-embedded rasters, measured 2026-10-20 against `Phone/Home.pdf` (the SVGs use Phone-frame points): all
  13 embedded images have a same-size image in the PDF at the same density (Echoes 1246, Matcha 1350, 123 and 115,
  MenuMe 2266, 376, 390, Scotties 1230, 1272, 376, 406, Tales 1376, Youth 2048 px); the PDF's 3000 by 2000 image
  over Youth is the old film-frame texture. So every raster on all six pages is at its source's resolution or is a
  recorded exception (Instagram phone; Gwen and Jake, whose sources are smaller).
- 2x, closed with evidence: no `resolution`, `dppx`, `image-set` or `device-pixel-ratio` anywhere in `styles.css`, the
  pages or the SVGs (one base64 false positive), and no bitmap `srcset`; image choice cannot depend on the screen's
  ratio, and rendering at 2x is covered by the Safari 17.5 2x-backing captures (`s17/`).
- Reply range corrected: About photos 3.8 to 6 times as many pixels across (beach 1975/516 to skating 3072/516).
- Safari troubleshooting docs (the `#view` fragment in `srcset`, the Technology Preview clipped raster): a background
  agent is writing them in the Monochromatic repo.
- Viewer change on iOS 17.0 (Simulator iPhone 15, Safari 17.0, 3x, via `inject/server.mjs` `&popover=`): the Tales
  comic, poster, MenuMe tablet showcase and Jonathan open at their width attributes (1960 by 1202, 794 by 1058, 1183
  by 804, 492 by 616) from the full-resolution files. Inject units stopped again.
- Youth in Limbo texture: the user, on dropping it: "Bro you can draw file grain texture directly yourself in svg",
  then "You don't need to keep it procedural, hard-baking it would be fine", then "Be very careful about automated
  tracing. Drawing yourself is better whenever it makes sense. Last time automated tracing screwed up and only the
  client found it." A potrace trace of the design texture (`fullres/grain-trace.py`) was rejected on inspection
  (a square notch in one hole, slashes the design lacks, jagged hole edges). Landed `79365fc`: shapes drawn by
  `fullres/grain/draw-grain.py` (fixed seed; stains clamped to the bar edges, hole washes cut to the holes by a
  vector-only clip path; a clamped version left straight inset edges in the holes and an unclipped one made rings
  and letter-like shapes, both rejected). Bar and hole mean colours within 2 levels of the design
  texture at its own scale; at 1x the bar matches (52 against 53) and the holes were lighter (172 against 162),
  darkened by `e91e568` to 166 against 162 (texture scale 162 against 165); they stay less varied at 1x (standard
  deviation 21 against 26) (`fullres/grain/render-check.py`); photo shown in 4 of 4 scroll trials in Technology Preview, Safari 27 and
  Safari 17.5; Home boxes unchanged. The reply now says the texture was redrawn instead of offering it back.
  Sonoma VM stopped again afterwards.
- Safari docs landed in the Monochromatic repo (`ec70f3e194`, `aef49a90d7`):
  `doc/troubleshooting/safari-svg-view-fragment-lazy-image-aspect-ratio.md` and
  `safari-technology-preview-svg-image-clipped-raster-missing.md`. Retraction: `1b85496`'s cause ("Safari ignores a
  #view fragment in the srcset") is wrong; measured in Technology Preview 252, `<picture>` makes no difference and a
  lazy fragment image takes its box ratio from the whole canvas, letterboxing the view (eager images with a CSS
  aspect-ratio are unaffected). Corrective comment [1b85496-correction]. The finding exposed the same bug in the
  case-study hero viewers (lazy, fragment): Safari Technology Preview and 27 opened them at 2.179, 1.789 and 1.848
  against the art's 1.5, 1.541 and 1.265. Fixed `6e97123` (trimmed files; no fragment reference left), measured in
  Technology Preview, Safari 27 and Safari 17.5, Chromium unchanged; reply and `07-what-we-fixed.md` updated.
- Retraction, 2026-10-20 late: `sweep/stp-eval.mjs` hard-coded Technology Preview (port 4450) and ignored `DRIVER`
  and `BROWSER` (the env-aware copy was `safari-eval.mjs`), so every "Safari 17.5" or "Safari 27" result run through
  it came from Technology Preview: the portrait srcset re-selection (`411935c`), "rigs report devicePixelRatio 1"
  for 17.5, "Sonoma guest still reports devicePixelRatio 1", the 17.5 bitmap viewers (`d7fbea3`) and the hero
  viewer numbers (`6e97123`). `collect.mjs`, `stp-card.mjs` and `shoot.mjs` honored the variables, so the 17.5 box
  comparisons, captures and Youth trials stand. Fixed: `stp-eval.mjs` honors both and prints the answering browser
  and version first. Re-run in the real browsers: Safari 17.5 reports devicePixelRatio 2 and matches
  `(resolution >= 2dppx)` (Safari 27 and Technology Preview 1); the hero viewers gave identical numbers in Safari 27
  and 17.5 before and after `6e97123`; every bitmap viewer (of 54 viewers) opens at its width attribute in both; the raster
  probe flags no on-page image short of the device pixels on any page in either (positive control: at 4 times the
  ratio it flags the portrait and beach photo). At 17.5's ratio 2, 17 viewer images have fewer pixels than the
  screen (MenuMe weekly-specials screens 780 for 1560, mobile showcase 486 for 810; Scotties Gwen and Jake 490 for
  980, Jonathan 615 for 984, homepage 1272 for 2544; Tales Sarah 845 and Emma 841 for about 1690, parent stories
  2240 to 2578 for 3920, Facebook ad 1284 for 1712); each is at its design source's resolution per the full-res
  records, so not a miss. Capture of the open MenuMe hero viewer before `6e97123` (`sweep/shots-hero/grid.png`):
  in both Safaris the art filled about two thirds of the viewer, blank to its right and below; the reply says that.
  Corrective comments [411935c-correction], [d7fbea3-correction], [6e97123-correction]. Sonoma VM stopped again.
- Queue: the user re-reads the reply's new hero-viewer bullet and softer-originals note, then sends it (their
  answers, 2026-10-20: "I'll review and send"; texture: "Looks right, keep it"; after the late changes: "Re-read
  those lines, send"; on the tool flaw: "No, that covers it"). Nothing else queued for the agent; was: merge `sweep/reply-section-draft.md` into `05-client-reply-draft.md` and
  `07-what-we-fixed.md` (its "About 6.1 MB to 2.8 MB" and "larger files only on enlarge" lines change); 2x check;
  agent-browser troubleshooting doc (background agent writing it in the Monochromatic repo).
- 2026-10-22: merged the client's `42fdeba` and `c99cb9f` (fast-forward): `desktop_demo.gif` (21.8 MB),
  `phone_demo.gif` (10.8 MB), `purple bubble-1.svg`, `-2.svg`, `yellow bubble-1.svg`, `-2.svg` and the two
  `* bubble-from ppt .svg`, all in the repo root.
- CF111, the client: "The top right stone on every page should always stick to the right edge of the screen." The
  user (with a client capture of a case-study page at a wide window) then: "No stretching." Landed `4ccc9d7`: the
  three wide corner SVGs anchor top-right at their own shape (`preserveAspectRatio="xMaxYMin meet"`). Before, the
  case-study masks centred the art (at 1920 the stone ended at x 1679, at 744 at 700) and Home, About and Contact
  stretched it (`none`). Band ratio measured against the art's 4.898: Home 4.156 at 640 to 4.889 at 1280 (taller,
  hence the top anchor), About and case studies 4.776 at 640, 5.552 at 744, 6.531 at 1920. Chromium (`f20/stone/`,
  `edge.py`): 1440 pixel-identical on all six pages; at 744 and 1920 the stone reaches the last column on all six,
  top row 0. Safari 17.5 (Sonoma VM, live site, `f20/stone/safari-top.mjs`, `edge-one.py`): on all six pages at
  1920 (1905 layout), 1440 and 744 the stone paints up to 2 px from the layout edge across 56 to 140 CSS rows.
  Positive control in the same Safari: the old geometry recreated in-page (case-study masks 1440 wide and centred,
  Home's image 1440 wide) ends at 1672.5 and 1440 with no rows painted at the edge. A first probe counted Safari's
  top border line and scrollbar edge as paint; a first control (old SVGs from jsDelivr as mask images) drew no
  stone at all; both replaced.
- m1 rig, 2026-10-22: `tart` is not on the SSH PATH; run `/Volumes/MacData/tart/bin/tart.app/Contents/MacOS/tart`.
  The launch agent `cat.aquati.podman-keepalive` (every 300 s) restarted podman after `podman machine stop`; the
  user then: "You may disable podman's keepalive." Disabled (`launchctl bootout` and `launchctl disable`
  `gui/501/cat.aquati.podman-keepalive`) and podman stopped while the Sonoma VM runs; re-enable it and start podman
  when the VM stops. Guest tunnel on m1 (nohup) and Linux unit `xyc-sonoma-tunnel` up.
- Bubbles, the user: "Client said the bubbles we drew were still bad, so I got client to upload these to github.
  Feel free to organize them." Landed `4a1471a`: the client's files renamed into `assets/`
  (`tales-{play,trust}-insight-speech-bubble-{outline,fill}.svg`; the "from ppt" pair kept unused as
  `tales-insight-speech-bubble-{outline,fill}-powerpoint-original.svg`); ours removed. Fill in `::before`, outline in
  `::after`, placed in the unchanged bubble boxes where Desktop Tales draws them (`f20/bubbles/align.py` slid each
  file over the design PDF at 4x: overlap fills 0.92, outlines 0.85 and 0.75; page 10.5 px below the design at
  1440). Chromium: boxes identical at 390, 744, 1440, no sideways scroll; art within 2 px of the design except where
  the client's files differ (trust tail tips shorter by 8.5 and 19 px, play fill's feathered edge 4.5 px). Safari
  17.5 at 1440 and 744 (live) draws the same. The Phone design uses the same shapes and offsets.
- OPH demo GIFs, the client via the user: "phone demo and desktop demo of a page of OPH's site should both be GIF".
  Measured: `desktop_demo.gif` (2876 by 1918, 145 frames, 80 ms) has the laptop mockup's screen ratio exactly
  (screen 355 to 3314 by 68 to about 2041 in `tales-oph-resource-hub-laptop.webp`: 1.4995 both); `phone_demo.gif`
  (710 by 1580, 265 frames, 70 ms) has its own rounded screen and camera dot, ratio 0.4499 against the phone
  mockup's screen at about 0.472. Asked the user (sheet `f20/gif/gif-options.png`): A, desktop GIF on the laptop
  screen and phone GIF as supplied (recommended); B, both as supplied. The user chose A. Landed `c2bc8f1`: GIFs
  renamed to `assets/tales-oph-resource-hub-{desktop,phone}-demo.gif`; the laptop mockup keeps its box and the
  recording (`.device-with-screen-recording>img.screen-recording`) covers its screen (2960 by 1974 from 355, 68,
  measured pixel by pixel); the phone recording replaces the phone mockup (file removed) at the width and place
  the mockup gave its screen (1058 of 1158 from 49); viewers open them as bitmaps (`.gif` added), laptop 1223,
  phone 353 (about 2x). Reduced motion: the laptop recording is hidden (still screen shows) and the phone shows
  `tales-oph-resource-hub-phone-demo-first-frame.png` (ffmpeg frame 0). Chromium (`f20/gif/probe-demo.mjs`): the
  recording lands on the screen rectangle at 390, 744, 1440; the pair grows by the recording's taller shape (3.9
  px at 1440, 3.1 at 390, 0 at 744 where the laptop is taller); no sideways scroll, no console errors; a first
  phone-width rule (`button:not([popover]) img`) also caught the viewer's button (opened 1257 wide) and was
  narrowed to `>button img` before the commit. The recordings' see-through sticky header is in the client's
  files. Safari 17.5 at 1920 (live, `f20/gif/safari-demo.mjs`): identical boxes to Chromium, both viewers at
  1223 and 353, both GIFs decoded at full size, 91278 device pixels changed between screenshots 1.5 s apart
  (animating). Single GIF frames from ImageMagick are deltas (blank); use ffmpeg.
- New client batch, 2026-10-22, folder `Client screenshots 2026OCT220120/` (the user pointed at its
  `first seen on desktop`, then at `first seen on phone` and `first seen on tablet`; all three are this batch),
  each item a screenshot named with the client's words:
  - Desktop: CF101 "button的变色(的时候）为背景是紫色，文字是黄色。" (Tales Launch Doodle Demo hover: purple
    background, yellow text); CF102 and CF103 "虚线出现了两次，箭头不见了" (MenuMe orange squiggles: the line
    appears twice, the arrow is missing); CF105 and CF106 "两个button变色（的时候）：文字与背景的颜色调换" (Scotties
    prototype buttons hover: swap text and background colours); CF107 and CF108 "线框的箭头超出了范围" (Scotties
    wireframe annotation arrows go out of range); CF109 "Change the font size of nav to 22 for desktops"; CF110
    "这个button变色的颜色改为与上面Xinyan Chen一样的黄色。" (Home More About Me hover: the Xinyan Chen yellow).
  - Phone: CF72 (Health / To paragraphs need more gap, phone and tablet), CF74 (text outside its box), CF75 (box
    too close to the headings; follow the design), CF77 (graphic directly under the sitemap, centred), CF78
    (gap to increase), CF82 (an extra green arrow), CF85 (left margin for the box), CF86 (centre it all), CF87
    (centre the light bulb), CF90 (the flower appears at 0.3 s). Tablet: CF93 (sitemap text the size of body text).
  - Queue: the desktop items first (CF109, the hover colours, CF102/103, CF107/108), then phone and tablet.
  - Done in Chromium: `a591445` CF109 (nav links 22 px from 1440 up, 14 at 744; nav height and every page
    heading unmoved at 744, 1440, 1920, `f20/nav/probe-nav.mjs`); `6787623` CF110 (More About Me hovers to
    #c27f36, the name's gold); `c9d2e3c` CF101, CF105, CF106 (Tales and Scotties prototype pills swap text and
    background on hover, all six pills checked; MenuMe's hover unchanged), `f20/hover/probe-hover.mjs`.
    agent-browser `hover .about-link` lands on `main`, not the pill (a tool miss: `elementFromPoint` at the pill
    centre is the pill, and `mouse move` there hovers it). Safari 17.5 (live, `f20/hover/safari-hover.mjs`, real
    pointer moves): nav 22 px at 1920 (21.8 at 1440, the scrollbar narrows the page), every pill hovers as in
    Chromium.
  - CF102/103 had two causes. `331f121`: the hi-fi preference screens' picture (re-rendered from the design in
    `f08dac8`) already carries the dashed highlights, and the page drew its own on top, so each dashed line showed
    twice; that overlay and its SVG are gone (all widths). `f66c0ee`: the design draws each desktop squiggle as a
    body plus a separate chevron; the four desktop SVGs are re-exported with both (`f20/export-region.py`), boxes
    grown by the added margin so the bodies stay put. Tablet and phone squiggles already had their arrowheads.
    Chromium 1440 matches the design for both flows; Safari 17.5 at 1920 has the same boxes and render.
  - CF107/108, `06d9798`: every Scotties wireframe connector ran 5 to 9 px past its callout's border into the box
    (offsets are from the padding edge, inside the 3 or 4 px border); the design stops each at the border. Now
    zero connector-coloured pixels inside all 8 callouts at 390, 744, 1440, 1920 in Chromium and at 1920, 1440,
    744 in Safari 17.5; arrowhead tips unmoved. Probe: `f20/scot-arrows/probe-inside.mjs` + `count-inside.py`.
  - Phone and tablet items, each measured against the phone design (`Phone/*.pdf`, 390 wide) in Chromium at
    360, 390, 430 and 744 (tablet unchanged unless named); scripts in `f20/batch-phone/`:
    - `c73088d` CF72: the age-tier figure's foot margin 56 px below desktop (gap +24 at 390, 744, 1100).
    - `723811a` CF74: the cloud copy at 14 px on 22 in the 346.8 px cloud, scaled with it, broken into the
      design's nine lines by phone-only `<br class="phone-break">`; all lines inside the cloud at 360 to 430.
    - `40f5203` CF75: brand message box 75 px under the heading text and 130 over the band (design 74.5, 130;
      was 34, 64). The box's top margin collapses with the heading's 32, so it carries all 72.5.
    - `4016ffd` CF77: the sitemap chevrons follow the phone tree, 32 px under it, centred (the phone design
      draws none; the client's words decide).
    - `08e9b1e` CF78: hi-fi intro box 64 px under its heading text and 39 over the first callout (design 64.5,
      39; was 34, 16).
    - `c3a91dd` CF85: both learning cards from 34 px with their backing 14 left and 11 up (design), so the
      backing starts 20 px in instead of at the screen edge.
    - `c775170` CF86: the MenuMe phone tree takes its own width and centres (62.6 px each side at 390).
    - `5ba23e6` CF87: the dual-loop drawing moves 62 of its 216 units so the bulb's middle meets the column's.
    - `50c5b39` CF90: read as the gap after the river (the client set 1 s on 2026-10-18): the flower now starts
      at 6.1 s, river 4 to 5.8 s; measured opacity 0 at 6.09 s, 1 by 6.59 s. Reading flagged to the user.
    - CF82 (found, not landed): `d7fbea3` re-rendered both Scotties lo-fi wireframes from Desktop/Scotties.pdf
      with the design's overlay vectors, so the listing picture carries the design's dashed boxes and a sage
      arrow from another layout, and the homepage picture an orange dashed nav box, under the page's own SVG
      highlights (dashes twice, the stray arrow). Clean rebuilds at the same pixel sizes (sage frame plus the
      embedded raster, crop fitted to the current files: listing 576.5, 9824.5, 286 by 405 pt at 6x; homepage
      576.25, 9287.75, 288.25 by 454.97 at 5.974x) are `f20/batch-phone/scotties-low-fidelity-*.webp`
      (`py/cf82fit.py`, `py/cf82fit2.py`). Copying them over the tracked assets was refused by the permission
      check, then landed as `aba53f4` once the user allowed the copy (one set of dashes, no stray arrow at 390 and 1440).
    - CF93 (no change yet): sitemap labels and body copy compute the same size at 744 to 1180 (14 to 15.25 px),
      and in the client's own screenshot the cap heights match (about 12.7 and 13 px). Asked the user what the
      client wants changed. The user: "What? Can you really not see the difference?" Missed: the labels are bold
      (700) Playfair against the paragraph's 500, so they draw much wider (the "M" 15 px against 13 in the
      client's screenshot, lowercase 11 against 10) and look bigger; equal computed sizes hid what anyone sees.
      Compare by eye before numbers. The tablet design (`Tablet/MenuMe.pdf`, a picture there) draws regular-weight
      sans labels, smaller than the paragraph. Option renders at 834: `f20/batch-phone/cf93-options-stack.png`
      (current bold, paragraph weight 500, bold at 0.9 em).
      The user then asked for each letter measured to 2 decimals, with deterministic pixel tools (not eyeballed
      zooms or ad hoc splitting; my first "25% wider" was such an error). `f20/batch-phone/py/cf93-components.py`
      (ink coverage, 8-connected components at 0.5, coverage-weighted edges) on the client's screenshot: lowercase
      10.26 to 10.48 px in the paragraph against 11.15 to 11.23 in the labels (+8%); P 14.20 against 14.37; l 15.36
      against 16.11; "Menu" 47.27 against 49.09 wide, "Planner" 64.10 against 68.14. The site's font files
      (`py/cf93-font-letters.py`, outline bounds) give Bold and Medium the same lowercase height at one size (7.43
      against 7.42 at 14 px) and Bold 2.4% wider.
      Retracted: "matching weight to the body is likely the real fix" (the user: "that's not the fix") and the
      guess that the gap is per-file rounding. The client asked for size ("CF93 sitemap的字尺寸保持与正文文字一样大吧",
      keep the sitemap text the same size as the body text). The user also: "Computed sizes don't work for such a
      issue": a browser can enlarge text when drawing while `getComputedStyle` still reports the CSS size, so
      decide from screenshot pixels only. One measurer for every image: `f20/batch-phone/py/cf93-measure.py`
      (label/paragraph ratios of lowercase height, tallest letter, ink width of "Menu Planner").
      - Client screenshot: lowercase 1.085, tallest 1.049, width 1.043.
      - Chromium 834 at 2x (`probe-cf93-variants.mjs`): 1.000, 1.004, 1.023. Weight 500 for the labels gives
        1.001, 1.003, 0.996; bold at 0.92 em gives 0.927, 0.950, 0.937. The width sweep 640 to 1200 computes equal
        sizes (1280 up: labels 13 px).
      - iPad (10th generation) iOS 17.0.1 Simulator, 820 px at 2x, same line breaks and tree as the client's:
        1.003, 0.998, 1.014. Downscaled to the client's scale (best pixel fit 0.676, `py/cf93-rescale.py`):
        1.024, 1.022, 1.053, and its word widths match the client's within a pixel, but the client's label
        lowercase is 1 px taller (11.21 against 10.21). So iOS 17 Safari does not reproduce the client's bigger
        labels; the client's device does something more. `html { text-size-adjust: 100% }` (server port 4176)
        looked unchanged on iOS 17 by eye; not measured there (the second capture opened in a new tab, shifting the
        page 66 px), and on iOS 17 there was nothing to undo.
      - iPad (A16) iOS 27 Simulator (`EEF5F6E4-C2A4-4013-932C-54335C837479`), measured with windows from each
        page's reported viewport (`py/cf93-sim-measure.py`): 1.003, 0.998, 1.014, the same with and without
        `text-size-adjust: 100%`, so autosizing is not involved.
      - Chromium 820 at 1.35x (the client's image scale, as a low-density screen would draw it): 1.008, 1.001,
        1.013; bold at 0.92 em there: 0.908, 0.867, 0.932.
      - The client's browser is Mac Safari 17 with the window resized (the user). Safari 17.5 in the Sonoma VM at
        820 px, 2x (`f20/batch-phone/safari-cf93.mjs`, live site): 1.000, 1.000, 1.013; labels at weight 500:
        0.999, 1.003, 0.986; bold at 0.92 em: 0.920, 0.920, 0.930.
      - Retracted: "the taller lowercase in their screenshot comes from the image's resizing". The user: "do not
        assume the client is an idiot". The client's screenshot is the record of what they see; a run that does not
        reproduce it has not matched their conditions (window, zoom, display), and proves nothing about their view.
        Their image is about 1.37 device px per CSS px (line pitch 38.8 px against 28.4 CSS px).
      - Client setup (the user): Mac Safari 17, window made narrower, normal zoom. The user then supplied the
        client's Figma export of the same view (752 by 786, "Screenshot 2026-10-20 at 8.20.40 PM 1.png", copied to
        `f20/client-figma/figma-export.png`): paragraph line pitch 28 px, so about 1 px per CSS px. Plain
        whole-pixel count (`py/cf93-evidence.py`, sheet `cf93-evidence-figma.png`): paragraph and label "Menu
        Planner" both lowercase 8 px, capitals 10, "l" 11; label word 87 px wide against the paragraph's about 85.
        A first crop cut the paragraph's "M" and read 75 px; widen crops past the word's neighbours.
      - Brute force (the user: "there's no time constraints. Brute force it."): Safari 17.5 width sweep 640 to 1279
        (`safari-cf93-sweep.mjs`, `py/cf93-widths.py`): the client's paragraph and label line breaks occur at 790 to
        838 only. No sitemap or body type rule changed between 2026-10-19 21:46 and 2026-10-22 01:50 (`git log`).
        Captures at each matching width (`safari-cf93-captures.mjs`) against the export with `py/cf93-match.py`
        (scale grid times nearest, bilinear, bicubic, area and Lanczos resampling, OpenCV template match): 2x best
        790 at 0.4925, mean difference 4.99 grey levels; 1x (VM display switched with `sonoma-display.mjs px`,
        `devicePixelRatio` 1) best 790 at 0.9875 bicubic, 3.93. So the client's screen draws at 1x. Aligned
        (`py/cf93-align.py`, `cf93-side-by-side.png`): letters match in shape, size and place; ours a shade darker.
        In that reproduction, as in the export: label and body letters the same height (8, 10, 11 px), label word
        87 px against about 85 (bold).
      - Decided by the user, 2026-10-22: "Bold, equal word width": keep bold, shrink the tablet and phone labels
        until a label word measures the body's width by pixel count on the 1x reproduction (desktop 13 and 17 px
        stay; both are set on `.sitemap` inside 1280 px queries).
      - Size brute force, 1x Safari at 790, 814, 838 (`safari-cf93-scale.mjs`, `py/cf93-scale.py`, words "Menu
        Planner" and "Settings"): today label minus body is +1, -1, +2, 0, +1, +1 px; every factor 0.980 to 0.995
        em gives squared error 6 (today 8), so 1x pixels cannot choose among them. Tie broken at 2x (VM restored
        to `1920x1200pt` by `sonoma-display.mjs pt`, the rig's normal state): squared error today 43, 0.995 33,
        0.990 18, 0.985 15, 0.980 8, 0.975 17.
      - Fixed in `891312c`: `.sitemap { font-size: 0.98em }` in the shared rule. Live in Safari 17.5 at 2x:
        "Menu Planner" label 174, 174, 175 px against body 174, 174, 175 at 790, 814, 838; "Settings" -2, -2, 0
        (before: +3, 0, +4, 0, +3, +3). Chromium (`probe-cf93-layout.mjs`, base 4175 against 4173): desktop
        unchanged (MenuMe 13 px, Scotties 17 px, same heights at 1280, 1440, 1920); tablet and phone labels 14 to
        13.72 px. Side effect: some labels stop wrapping: MenuMe 834 (Select from fridge, Recipes & Videos share,
        Profile & Settings; height same), MenuMe 1024 (Recipes plan; tree 296 to 284), Scotties 640 (Event &
        Community Hub 3 lines to 2), Scotties 790 (Apparel & Accessories, Our Team, Community Highlights; 384 to
        364). Before/after: `f20/batch-phone/cf93-wraps-before-after.png`. Decided by the user, 2026-10-22:
        keep the new breaks. CF93 done; the CF72 to CF93 batch is complete.
      - Left behind: iPad Simulators `DF24B12C-...` (iOS 17) and `EEF5F6E4-...` (iOS 27) in the custom set, shut
        down; the iPhone 15 iOS 17 Simulator is shut down too (boot it again for phone checks).
      - The user also: "Pixel measurements are invalid unless we use a dumb deterministic analyzer vs a hardbaked
        screenshot." Name the analyzer and the saved file with every number: `py/cf93-evidence.py` (fixed
        half-way threshold, whole-pixel boxes of touching ink pixels, an 8x enlarged pixel grid to count by hand).
        Tools: `f20/sim17-ipad-cf93.mjs <udid> <prefix>`; servers
        `xinyanchen-inject-server` (4177, as is) and `xinyanchen-inject-server-tsa` (4176, `EXTRA_CSS`), tunnel
        `xinyanchen-m1-inject-tunnel`; the page reports boxes to `f20/inject/reports.log` (`&measure=`).
      Scope chosen by the user: MenuMe and Scotties (one rule draws both trees); desktop keeps its 13 px labels.
    - Placeholder fix `72a2e77` verified complete (task closed): 0 pictures change size while their files load on
      all six pages at 390, 744, 1440 and 1920 (positive control: the base build moves 6 on Home); loaded layout
      against the base differs only in the intended `aspect-ratio` hints and two About images' heights by under
      0.05 px (`f20/batch-phone/srcdims-check.txt`).
    - CF90 confirmed by the user, 2026-10-22: keep "0.3 s after the river" (flower from 6.1 s, `50c5b39`).
  - Found while measuring (not from the client), `4c3660c`: at 360 Scotties, MenuMe and Tales were 374, 362 and
    370 px wide, at 375 (iPhone SE, mini) Scotties 382 and MenuMe 376 (also at `c99cb9f`). Causes: phone art in
    drawn pixels stopped shrinking at 390 (`--phone-art-growth` clamped at 0; now down to 320, same value from
    390 up, type unchanged); the brand message starburst (capped to end at the screen edge); the MenuMe story box
    (now stops at the column's end). Every page now measures its viewport at 360 and 375 in Chromium.
    `f20/batch-phone/probe-overflow-hunt.mjs` finds pseudo-element culprits by hiding subtrees.
  - iOS 17.0.1 Simulator Safari on the live site (`f20/batch-phone/sim17-live.mjs`; text fragments do scroll, but
    the first URL of a run lands at the top, so open a warm-up URL first): CF74, CF75, CF78, CF85, CF86, CF87 as in
    Chromium. CF77 was not: Safari 17.0 ignores an `@media` nested inside `::after`, so the chevrons stayed by
    Cart. `fc4f178` wraps `::after` in the query instead, there and for the Core Challenge skate (its phone place
    had never applied on iOS 17). `f20/batch-phone/scan-pseudo-media.mjs styles.css` lists any query nested in a
    pseudo-element; now none (the previous HEAD: those two). Never nest a query inside a pseudo-element rule.
  - The user, 2026-10-22: "for the GIF, we still need the phone frame too." `a926b8e`: the Tales OPH phone
    recording plays inside the designs' phone mockup again. The frame
    (`assets/tales-oph-resource-hub-phone-frame.webp`, 1158 by 2421) is the old mockup with its screen cut out,
    lengthened 90 px between the side buttons (rows 1330 to 1930 resampled vertically to 690 rows; repeating rows
    left a step in the rim's light gradient), because the recording (710 by 1580) is taller than the mockup's
    screen. Built by `f20/phone-frame/build-frame.py`; the recording sits under it, clipped to the screen's 132 px
    corners. Chromium at 390, 744, 1440: recording on the opening within 0.01 px, reduced motion shows the first
    frame. The commit message understates the height change (correction comment on the commit: about +8.9 px at
    390, +6.8 at 744, +11.1 at 1440).
  - Found while diffing styles (not from the client), in progress: every `<source media="(width>=40rem)">` on all
    six pages (45 of them; tablet and phone sources on Tales and Scotties already had sizes) lacks `width` and
    `height`, so at 744 and wider the browser reserves 0 px for those pictures until each file arrives (Home's
    project pictures measured 0 px tall before load, 289 to 353 px after), and the page jumps as they load. The
    user asked: "are we not doing placeholders correctly?" (I had first called it "a timing issue rather than CSS";
    it was a real layout shift.)
    - Two causes. The 45 wide `<source>`s had no size, and an `<img>`'s own `width`/`height` do not apply when a
      `<source>` without them is chosen. And Home's `.project>.illustration>img` set `aspect-ratio: auto` from 40rem
      up: a plain `auto` uses only the loaded file's ratio and drops the attribute hint, so even sized sources kept
      0 px. Sizing the sources alone left Home at 0 px (measured), so both are needed.
    - Fix `72a2e77`: every wide source gets its file's size
      (`f20/batch-phone/py/source-dims.py --write`, SVG width/height or viewBox, raster pixels); the Home phone
      ratio now applies only below 40rem.
    - Measured with `f20/batch-phone/probe-placeholder.mjs <page> [widths]` (base build `PORT=4175`, working copy
      4173): unfixed Home has 6 pictures at 0 px at 744, 1440 and 1920 (positive control); fixed Home and About 0
      jumps at 390, 744, 1440, 1920. Contact, MenuMe, Scotties, Tales and the loaded-layout `style-diff.mjs` (should
      show no change) were running at the time of writing; results go here.
    - Probe pitfalls, each hit once: agent-browser runs no command while a page is still loading (held images
      delay the load event), so the page measures itself (an injected same-origin script posts to the proxy); the
      pages' CSP blocks that post (`connect-src 'none'`, Contact allows hCaptcha only), so the proxy edits that
      directive; a browser opens 6 connections per host, so held images on the page's host queued the script, and
      pictures now load from `localhost` while the page is `127.0.0.1` (proxy listens on IPv4 and IPv6); pictures
      released in one width's pass came from cache in the next, so each pass uses its own path prefix; `eval`
      prints strings JSON-encoded (decode twice); the probe must `process.exit` or it hangs after reporting.
  - Simulator notes from the phone-frame check (2026-10-22): the no-store server units from 2026-10-19
    (`xinyanchen-no-store`) are gone and `m1`'s `localhost:4173` answers nothing, so the check used the live site
    after the deploy (GitHub Pages sends `styles.css` with `max-age=600`, so Simulator Safari can show CSS up to 10
    minutes old; wait that long after the last visit). Text fragments worked for "In-Browser Doodle Editor" but
    not "A responsive web resource"; `#id` anchors work. `idb ui swipe 196 700 196 250` did not scroll Safari.
    On `m1`, zsh does not split a command stored in a variable (`$I ui ...` fails); write the command out.
    iOS 17.0 result: the phone frame draws with the GIF inside and no corner showing past the bezel
    (`f20/batch-phone/sim17/frame4.png`).
- Tool notes: anchors drop pairs far from their neighbours' median (labels repeated in artwork); agent-browser
  `screenshot --full` drew Home's SVG pictures small, so `chromium-same.mjs` compares scrolled viewport frames;
  same-build noise is only the animated hero (frame 00, and the top of frame 01 at 1440 and 1920).

## Full Safari re-check, 2026-10-22

The user chose "Full Safari re-check first" (before drafting a client reply) once the 2026-10-20 batch was done.
Result: no layout bug in the site. Every Safari and Chromium difference traces to one of two Safari engine
behaviours, both checked directly.

### Method

- Element geometry: every element's box on all six live pages, compared between browsers.
  - Safari: Safari 17.5 in the Sonoma VM at 2x, window widths 744, 790, 1024, 1280, 1440 and 1920.
  - Chromium: same window width with its 15 px scrollbar shown (`AGENT_BROWSER_HIDE_SCROLLBARS=false`), so the
    layout widths match; all 36 pairs matched.
  - Phones: the iOS 17.0.1 iPhone 15 Simulator (393 px wide), against Chromium at 393 by 659.
- Tools in `~/temp/agent/f20/recheck/`:
  - `geometry.js` collects the boxes.
  - `safari-geometry.mjs`, `chromium-geometry.mjs` (`WIDTH`/`HEIGHT` override the window), `sim-geometry.mjs`
    with `assemble-sim.py` collect them per browser.
  - `sources.py <dir>` lists where differences start (boxes relative to the parent).
  - `pair-shot.mjs <page> <width> <path> <out>` screenshots one element in both browsers.
  - `safari-mq.mjs`, `safari-eval.mjs` (script in `PROBE`) probe Safari directly.
- Outputs: `geo/`, `simgeo/`, `geo-sources-6.txt`, `pairs/`.

### Phones

About, Contact, Home and MenuMe were identical to the quarter pixel. Scotties differed by 4 px. Tales was 190 px
shorter in Safari, made up of paragraphs 2 to 7 px shorter (see "Whole-pixel line heights").
A first pass compared Chromium at 390 against the Simulator's 393 and showed spurious 3 px width
differences everywhere; the Simulator's iPhone 15 is 393 wide.

### Breakpoints sit 15 px later in Safari with classic scrollbars

- Safari leaves its classic scrollbar out of the width that media queries test; Chromium counts it.
- Measured with `matchMedia`, Scotties:
  - `(width >= 80rem)` first matches at a 1295 px window (`clientWidth` 1280); `min-width: 1279px` fails at 1280.
  - `(width >= 64rem)` first matches at 1039.
- `100vw` is the same in both browsers (790 at a 790 window), so only media queries move.
- WebKit's open bug: https://bugs.webkit.org/show_bug.cgi?id=52653
  ("Media queries should ignore scroll bars when calculating width of viewport", status NEW).
- Effect: at window widths 1280 to 1294, Safari shows the tablet layout where Chromium shows desktop (likewise 1024
  to 1038). This produced the large differences: Scotties about 950 px of page height at 1024 and 1280, MenuMe
  531 px and Tales 537 px at 1280.
- The tablet layout is built for content up to 1279 px wide, and Safari gives it 1265, so it lays out as designed
  (`pairs/scotties-1280-s9-safari.png`).
- The client's 1920 px window, and overlay-scrollbar Macs (trackpad default), are not affected.
- No change made.

### Whole-pixel line heights in Safari

- Safari 17.5 lays out a fractional line height as the whole pixel below it.
- Four lines of a test paragraph (`probe-lineheight.js`):

  ```text
  # ~/temp/agent/f20/recheck/probe-lineheight.js
  line-height  Safari  Chromium
  29.98px      116     119.94
  29.5px       116     118
  19.5px       76      78
  26.6px       104     106.38
  30px         120     120
  ```

- The fluid type often gives fractional sizes; Tales body text at 393 is 14.9915 px with a 29.98 px line.
- Safari's lines are therefore up to 1 px tighter:
  - About 190 px over the Tales phone page.
  - 25 to 95 px on desktop pages at 790 and 1440.
  - The Contact footer lines: 26 against 27.
  - On Home, a span inside the project text measures differently; screenshots at 1440 show the same line breaks
    in both (`pairs/index-1440-s7-*.png`).
- 744 and 1920 match almost exactly because the fluid sizes clamp to whole values there.
- The user chose "Round line heights" (over leaving both; breakpoints stay as they are): Safari and Chrome should
  agree to the pixel.
- Landed `64d6dbc`: the 53 `line-height` declarations that can come out fractional are
  `round(nearest, ..., 1px)`; unitless factors are written in em inside it (`2` to `2em`); 17 constant ones
  (`calc(Nrem / 16)` with whole N, `3rem`, `inherit`) unchanged.
  - Positive control first (`probe-round.js`): four 14.9915 px lines at `round(nearest, 2em, 1px)` measure 120 in
    Safari 17.5 and Chromium (116 and 119.875 unrounded).
  - Edit set from data: `tag-lh.mjs` adds `--lh-src: "L<line>"` beside every declaration in a throwaway copy, so
    each element reports the declaration its line height comes from (`lh-collect.mjs`, Chromium, 6 pages at 360,
    393, 744, 790, 1024, 1280, 1440, 1920). Every visible text element at those widths has a declared line height
    (none fall back to `normal`); 50 declarations gave fractions. Not exercised: the open phone menu, the
    enlarged-view popovers and pseudo-element text; the rewrite covers their declarations, but the inheritance
    check did not see them.
  - Inheritance check (`lh-compare.mjs`, before against after): 3669 text elements, 0 still fractional, 0 moved
    more than 0.5 px from the rounded old value, so turning factors into em changed no inherited line height.
  - iOS 17.0.1 Simulator at 393 before the commit (worktree `f20/lh-wt` served by the inject server on 4177,
    `run-sim-after.mjs`, `simgeo-after/`): `round()` applies on iOS 17.0. Tales 19928 px in Safari and Chromium
    (was 19744 against 19934); About, Contact, Home identical; MenuMe 1 px; Scotties 2 px in two paragraphs of
    `section:7` (left as is).
  - Desktop Safari 17.5 against Chromium on the live site after the deploy (`run-desktop-after.mjs`,
    `geo-after/`, log `run-desktop-after.log`), page heights at 744, 790, 1024, 1280, 1440, 1920:
    - About, Contact, Home, Tales (except 1280): equal at every width.
    - MenuMe 744, 790, 1440, 1920: within 1 px. Scotties 744, 1440, 1920: equal.
    - Still different, from the scrollbar breakpoint shift the user kept: MenuMe 1024 (81 px, its sitemap tree)
      and 1280 (438), Scotties 1024 and 1280 (about 1000), Tales 1280 (635).
    - Scotties 790: header `p:2` one line longer in Safari (28 px); Scotties 1440: `section:9` `div:4>p:1` one line
      longer, page height equal. Both were there before `64d6dbc` (27.75 and 22.75 px), so they are text-width
      wraps, not line height; left as is.
    - Home's project-text spans still measure as two-line boxes in Safari; same wraps on screen (screenshots).
    - Before the change, the same widths differed by 25 to 95 px on most pages.
- Client reply drafted (the user chose "Draft client reply"):
  `../Client screenshots 2026OCT220120/reply-draft.md`, Chinese with an English reference. It covers CF72 to
  CF111, the bubbles, the GIFs and our own fixes. It says to send or merge the 2026-10-20 draft first if that
  was never sent (unknown to the agent).
- Decided by the user, 2026-10-22, on whether the 2026-10-20 reply was sent: "Merge them. I did talk with the
  client but it's not up to me to make sure the client reads everything. For important questions vs a human the
  only foolproof way is to ask until we get answers." So one message carries both rounds, the open questions
  lead it, and every later reply repeats each question until the client answers it.
- The user, 2026-10-22: keep the Sonoma VM running (podman on m1 stays stopped, `snowflake-proxy` down,
  keepalive disabled, until the user says otherwise).
- Merged: `../Client screenshots 2026OCT220120/reply-draft.md` leads with six open questions (the five of
  2026-10-20 plus what CF90's 0.3 s counts from), then the 2026-10-22 round, then the 2026-10-20 content. The old
  `05-client-reply-draft.md` is marked superseded. Backups:
  - `/home/user/temp/agent/f20/05-client-reply-draft.before-merge-2026-10-22.md`
  - `/home/user/temp/agent/f20/reply-draft.before-merge.md`
- Attachments refreshed: `../Client comparison screenshots 2026OCT170133/evidence/send-64d6dbc/` (16 pairs,
  8.4 MB), every pair checked by eye.
  - After frames at `64d6dbc`, in `evidence/after-64d6dbc/`:
    - desktop: Safari 17.5 (Sonoma VM) at 1920 by 950, live site, by `xyc-after/desktop-env.mjs` (`desktop.mjs`
      with `DRIVER`, `ORIGIN`, `BROWSER` from the environment; accepts 2x frames);
    - phone: the iOS 17.0.1 Simulator through the inject server (repo on 4177, m1's 4175 tunnelled to it) by
      `xyc-after/refresh-64d6dbc.mjs`;
    - extras: Chromium, by `extras-after-env.mjs` (`HOST` from the environment).
  - Pairs by `xyc-after/make-pairs-64d6dbc.mjs` (skips frames not captured), send set by `send-64d6dbc.mjs`.
  - `sim17-match.mjs` framed WeChat 97, 543 and 544 correctly. 549 (`Community Highlights` at 160) and 552 (the
    final card's text at 180) were reframed by hand to show the chevrons and both buttons.
  - Two `sim17-frame.mjs` runs at once on one Simulator can cross; run them one after another.
  - Do not send `send-d7fbea3/` or `send-5cf1620/`.
- Next, decided by the user 2026-10-22 ("I'll review and send"): the user fills the placeholders and sends the
  merged reply with `send-64d6dbc/`. When the client answers, record each answer in `07-what-we-fixed.md` and act
  on it; repeat every unanswered question in the next reply. Rig state: Sonoma VM running (the user's choice),
  podman on m1 stopped, keepalive disabled; Simulator, inject server and tunnel stopped.
- The user, 2026-10-22, before sending: "Are we really fine now? I'd rather not do another round with the
  client. I'm tired." Decided:
  - "Silence means keep": questions 2 to 6 of the reply are reworded to say the shipped answer is live and stays
    unless the client says otherwise. Only IMG_0804 needs the client to act (the only copy we have,
    `../Client comparison screenshots 2026OCT170133/IMG_0804 1.pdf`, is blank). This replaces "repeat every
    unanswered question" for those five.
  - "Yes, check them" before sending: the open phone menu, the enlarged-view popovers and pseudo-element text in
    Safari 17.5 and iOS 17, plus the Scotties 790 header wrap and the Scotties 1440 `section:9` wrap.
  - Then the user: "Please also check every page x device x viewport by eye and make sure nothing looks wrong."
- Reply reworded (local file only): one "需要您做的一件事" / "One thing we need from you" (IMG_0804), then
  "我们替您定下的几处" / "Choices we made for you" (five items, no reply needed); cross-references repointed.
- By-eye pass, in progress (scripts in `~/temp/agent/f20/eye/`):
  - `frames-safari.mjs`: Safari 17.5 (Sonoma VM), live site, widths 744, 790, 1024, 1180, 1280, 1440, 1920, all
    950 tall, frames every 800 px (unit `xinyanchen-eye-safari`, under `vm-sonoma.lock`), into `safari/`.
  - `frames-sim.mjs <label> <UDID>`: iOS 17.0.1 Simulator frames from the working tree (equal to `main`) via
    `inject/server.mjs` on 4175 (new `?scroll=&frame=` mode reports height and scroll position), into
    `sim-<label>/`. Devices: iPhone 15 (`9CA037B0-...`), then iPad 10th (`DF24B12C-...`) portrait.
  - Queue: look at every frame; then the menu, popovers and pseudo-element text; then the Scotties wraps; fix
    findings one commit each.
  - The user, 2026-10-22: "The .png is outdated. Use the latest .fig as ground truth." The PNG and PDF exports
    in `../Phone`, `../Tablet`, `../Desktop` and `doc/reference/` are older than the design; compare against
    `../Website (Copy) 2026OCT191300.fig` only. Node boxes per frame: `~/temp/agent/fig-parse/dump-boxes.mjs`
    into `~/temp/agent/f20/fig-191300/boxes.jsonl`; solid fills under a frame: `frame-fills.mjs`.
  - Running list of findings: `~/temp/agent/f20/eye/findings.md`. Fixed so far (each checked in Chromium,
    Safari re-check after deploy pending):
    - `8469182` About photos wrapped 2+1 at a 744 px window with a classic scrollbar (row 15 px narrower than the
      design); the wide gallery no longer wraps.
    - `2d6fc5d` Contact Name and Phone stacked at 744 for the same reason; the wide row no longer wraps.
    - `d97fb53` MenuMe learnings: the drip painted over the copy's last line at tablet widths; the copy now
      paints above it, as the design layers it.
    - `c36f398` Scotties challenge cloud on tablet widths: the `.fig` Tablet frame draws it 433 wide with seven
      lines; ours stretched and rewrapped. Safari probe: seven lines and the natural ratio at 744, 790, 1024, 1180,
      1279, 1280, 1440 and 1920.
    - `2b05e51` Scotties tablet chevrons and bolt: the `.fig` chevron group is turned 180°, so `boxes.jsonl`
      (which reads only `m02`/`m12`) reports its far corner; `~/temp/agent/fig-parse/node-transform.mjs` prints
      the full matrix. The bolt now sits 9/433 of the cloud above it.
    - `a5ffefb` Tales Challenge note on tablet widths: the outline was smaller than the design and the copy ran
      into it. At 744 the longest line now clears the outline by 20 px (design 19) and the next heading sits 84
      below (design 87). Edge: at a 640 layout the backing is 2 px from the window edge (no horizontal scroll).
    - `6ae9ba6` MenuMe story: the copy's last line ran into the pot at most widths under 1380 (Chromium sweep 360
      to 1920 by 10). New `.tablet-break` and a phone split that stays until 45rem; minimum gap now 9.5 px (580),
      11.7 at 360, 14.9 at 740.
    - `d714dcb` MenuMe persona names: the brush plate was the `h4` background and cropped; it is now a `::before`
      at the brush's own 1019/333 ratio behind the name.
    - `693ff9e` Scotties phone bolt: the Phone frame draws the desktop bolt 3.7% taller and 7.2 px above the
      cloud, its tip on line 3's baseline; ours ran about 4 px past it into "no". Shape kept, tip pinned.
    - `b48d7bd` Scotties cloud: every Scotties frame layers cloud, bolt, text from bottom to top; our bolt
      (a positioned `::before`) painted over the copy. The copy is positioned now and paints on top.
    - `96df23c` Tales phone subtitle: a 260 px cap left "Play" alone on a third line; the Phone frame's box is
      319. The phone cap is per page now (`--summary-subtitle-phone`: Tales 319, MenuMe and Scotties 260).
    - `dd506bf` Case-study hero on phones and tablets: subtitle pitch 27 (was 30) and a 5.3 px top margin (was
      16), so its first baseline sits 33.3 under the title's (designs 33.8) and the summary 102.3 (designs 101.6
      to 105). Probe: `~/temp/agent/f20/eye/hero-baselines.js`; design baselines:
      `~/temp/agent/fig-parse/hero-baselines.mjs`.
    - `0e4ad72` Phone summaries at 15 on 30 on every page (MenuMe and Scotties were 14 on 28); their wraps now
      match the Phone frames at 390.
    - MenuMe story, follow-up to `6ae9ba6`: its forced breaks left a short line at most widths away from the
      designs' own (Safari 1024: "a daily source of" alone). Now the breaks apply only where a sweep shows they
      give the design's lines (tablet 740 to 895, desktop from 1392); elsewhere a right gutter as wide as the
      pot, and "budget‑friendly ritual." is glued. Line-quality probe `~/temp/agent/f20/eye/story-quality.js`
      (fill per line, pot clearance), run in Chromium (`story-quality.mjs`) and in Safari
      (`safari-sweep.mjs`: one load, resize per width; env PROBE, FROM, TO, STEP).
  - Lessons this round, continued:
    - Forced `<br>` in fluid text gives the design's lines only near the design's width; sweep every width
      for short lines, not just for collisions.
    - Chromium sweeps here run without a scrollbar. Safari's classic scrollbar narrows the layout while `vw`
      keeps the window width, so thresholds found in Chromium can be 15 to 30 px off in Safari; sweep there.
    - Stopping a Safari unit mid-run leaves Safari paired with the dead session ("already paired with another
      WebDriver session"): restart the guest agent with `launchctl kickstart -k
      gui/501/dev.monochromatic.safaridriver` (via `ssh m1`, then `ssh -i ~/.ssh/id_ed25519_vm
      admin@192.168.64.9`). `safari-sweep.mjs` now closes its session on SIGTERM.
  - Still open, small: the desktop Scotties cloud copy starts 117 below the cloud top, the `.fig` 112.
  - Left as is: Tablet/Scotties draws its summary 10 px tighter under its one-line subtitle than the other five
    frames (ours 75.3 under the title's baseline, design 67.6); Phone/Tales wraps "Lab" alone in Client &
    Partners (319 px box), ours fits two lines in 325.
  - Lessons this round:
    - Captures older than a fix show the old page: check frame times against `git log` before reviewing.
    - Colour masks for ink gaps need a strict tolerance (20 for the bolt `#becb9d`); 60 caught grey text
      anti-aliasing and gave a false 1 px gap.
    - Partial commits: `git apply --cached --unidiff-zero` of the wanted hunks, then `git commit --no-only`
      (the git-policy guard accepts it; it commits exactly the index).
    - Never wait with `tail --pid=$(pgrep --newest --full ...)`: the pattern matches the waiting shell itself and
      hangs to the timeout. Use the background task's own completion notice.
    - The default `agent-browser` session belongs to another session; use `--session xinyan`.
  - Checked against the `.fig` and left as is: Home phone Scotties pill over the grey wave (drawn so); Home phone
    footer gold `#C27F36` (the `.fig` Phone/Home frame uses it; other pages `#D8A150`); Contact intro "via email,"
    (`2ea3807`); Matcha role gap (`7b70e03`); Contact captcha centred over Send.
  - Done by eye: desktop Safari Home, About, Contact at all widths; MenuMe 744; iPhone Home, About, Contact.
  - Continued, same day:
    - `bc86e99` Scotties persona photos: Jonathan's file is 492 by 616, the others 490 by 616, so at one width his
      photo rendered 1.1 px shorter and his name sat 1.1 px higher (seen at 790, 1024, 1920). Every Scotties frame
      keeps the photos one height (Tablet 293.01 each, names at y 3570). The photos take 490:616 with
      `object-fit: cover`; Chromium probe at 390, 790, 1024, 1440, 1920: three equal heights, names level.
    - Case-study hero meta items ended on a lone word in Safari (`~/temp/agent/f20/eye/meta-probe.js` through
      `safari-sweep.mjs`, 640 to 1920 by 10, live site before the fix): Scotties at every width from 790 to 1410
      ("Mobile)", "Jarvis", "College", "Wireframes)"), MenuMe 640 to 650 ("College"), Tales from 1010
      ("Experience", "Plan"). No design frame ends an item on one word; the Desktop frame even sets "(Desktop &
      Mobile)" and "Hi-Fi Wireframes)" as their own lines. Fixed in `1286269`: every meta item's last two words
      (Scotties' whole "(Desktop & Mobile)") are joined with `&nbsp;`, on all three pages. Chromium 320 to 1920
      by 10 (`meta-cr.mjs`, which also reports sideways overflow): no lone last word. Safari re-sweep after
      deploy pending.
    - `0df35fc` Scotties personas below 640: the phone rules grow each photo with the window (320 px at 580)
      while the row still wrapped at a 240 px basis, so from 552 px two personas shared a row and the page
      scrolled sideways by up to 65 px (Chromium 560 to 630; Safari windows up to 655). Each persona now takes a
      full row; 390 unchanged.
    - Left as is: Tales scrolls sideways by 5 to 15 px at 320 to 340 px. The element is `.impact-cards`, a fixed
      350 px chevron strip (`--strip`, the Phone frame's width), centred. Every iOS 17 iPhone is at least 375 wide.
    - Separator bars: Safari 1280 started a Tales meta line with "| Hi-fi Phase Team Lead". Every " | " in the meta
      items now keeps its bar with the word before it. `meta-probe.js` also flags lines that start with a bar;
      positive control: the live page (before deploy) flags Tales at 1250 to 1265 in Chromium; the working tree
      flags nothing from 320 to 1920 on all three pages.
    - Scotties type panel: in a 1280 Safari window (tablet layout, see the 15 px breakpoint shift) the tablet panel
      had grown to 976 px, its "Body Text" label about 25 px against 15.4 px body; the Tablet frame draws it 620
      wide, label 16 over 14 px body (Desktop: 18 over 16 in 1082). Like the Tales tablet charts (fixed at 610,
      522 and 538 px up to the desktop layout), the panel now keeps 620 px, centred.
    - `187d31b` Closing quotes: iPhone Scotties ended on "brand."" alone; the Phone frame ends on "competitive
      modern brand."". Each closing quote's last two words are glued. Live sweep before (`quote-cr.mjs`): lone
      last word on every page at many widths; after: none from 320 to 1920. The commit's own control widths came
      from two sweeps sharing the `xinyan2` browser session; corrected in a commit comment. Lesson: one
      agent-browser session per running sweep.
    - Popovers (`states/`, MenuMe 744 and 1920): image, close button and scrolling look right. The blue ring on
      the dialog is the focus ring from the scripted click; not checked with a real mouse click.
    - Retracted the same day: "Safari picks `<picture>` sources against the window minus the scrollbar while CSS
      uses the full window". Measured (`picture-edge.mjs`): `matchMedia('(width >= 80rem)')` is false at a 1294
      window (clientWidth 1279) and true at 1295; the sources switch at the same points (1294/1295, 654/655), so
      art and layout always agree. Resizing re-selects sources. The lesson: test the CSS side with the same probe
      before calling two mechanisms inconsistent.
    - Checked against the `.fig` and left as is:
      - Scotties sitemap labels wrap in Safari from 660 to 800 (at 744: Apparel & Accessories, Our Team, Event &
        Community Hub, Community Highlights). The Tablet frame draws the tree as a raster with about 10 px labels;
        at the body size the client asked for (CF93) the four columns need about 652 px, and the user already
        chose to keep these breaks after `891312c`. Safari sweep: `sitemap-probe.js`.
      - "—from high-energy color tokens" starts a line in the Scotties learnings card at 790 and 1920; the Tablet
        frame breaks the same way (`text-lines.mjs`). Same class as the Lo-fi "—Skateboarding".
      - Scotties closing buttons stack Mobile above Desktop; the Tablet frame does too (y 9750 and 9786).
      - Scotties cloud copy breaks: the Tablet and Desktop frames force the same breaks.
      - Desktop Scotties "Lo-fi Homepage": the wireframe sits 9 px under the heading in the `.fig` too.
      - MenuMe "Component Library:" is Medium in every frame; only the three colour names are Bold
        (`~/temp/agent/fig-parse/text-styles.mjs`, new: font-style runs of text nodes containing a string).
      - The `.fig` reads "stepper steppers (+ / -)"; the site's "steppers" is the earlier copy fix `af9e40d`.
    - Done by eye since: Safari Tales 1024 and 1440 (to 04), Scotties 790, 1024, 1280 (to 02), 1920; MenuMe
      1024 and 1280 story after the gutter fix (clear of the pot); iPhone MenuMe, all frames.
    - Safari re-checks on the live site after the deploy of `187d31b` (Pages run 39784841955):
      - `meta-probe.js` through `safari-sweep.mjs`, 640 to 1920 by 10, all three case studies: no meta item ends
        on a lone word and no line starts with a bar (129 widths each; files `meta2-*.txt`).
      - `fit-probe.js` (new: sideways overflow, Scotties persona boxes wider than their row, type panel width),
        Scotties 640 to 1300 by 5: no overflow anywhere; one persona per row in the phone layout (windows 640 to
        650); type panel 520 to 620 px in the tablet layout, never wider, desktop art from a 1295 window.
    - iPhone Tales, all 36 frames, and iPhone Home, About, Contact again: no other findings.
    - `c96e902` Tales headings: iPhone broke "OPH Dedicated Sub-site (Web / UX/UI)" and "In-Browser Doodle
      Editor (Web / Tool PoC)". The Phone frame (`2307:46090`) draws "OPH Dedicated Sub-site / (Web UX/UI)" (a
      forced break) and "In-Browser Doodle Editor / (Web Tool PoC)"; Tablet and Desktop draw each on one line.
      The parentheticals' words are joined with `&nbsp;`. Chromium at 393 and 320: two lines each, as drawn.
    - `9d97db6` + `bebcd18` Phone closing quotes, wrapped as drawn (the tablet and desktop quotes already were).
      Drawn boxes: Tales 349 px at x 18 (4 lines), MenuMe 335 (6 lines), Scotties 348 (6 lines, forced breaks
      after "can" and "community"). The site's phone quotes sat in the 325 px text column at 393: Tales took 5
      lines ("...framework that / evolves alongside their / children's development.""), MenuMe moved "cooks"
      down a line, Scotties ignored the two forced breaks. Each phone quote now takes its drawn box, centred,
      capped at the screen minus 13 px gutters; Scotties' breaks are `phone-break`s. Chromium
      (`quote-lines-cr.ts`): line for line as drawn from 375 to 639; 640, 744, 1440 identical to live; at 320
      Scotties leaves "community" alone (no iOS 17 iPhone is that narrow). iOS 17 Simulator at 393: all three
      as drawn (`quote-iphone17/`). `9d97db6` put the rule before the general `.closing-reflection` rule, whose
      `margin-inline: 0` (all widths, same specificity) won, so the boxes started at the column edge and MenuMe
      and Tales scrolled sideways by 8 px up to 360 and 380; `bebcd18` nests the phone rule after the reset.
      Correction comment: [9d97db6-correction]. Lessons: the trial CSS came from the inject server's unlayered
      `EXTRA_CSS`, which outranks every layered rule, so a trial can pass where the layered rule loses; and a
      line probe that reads widths says nothing about position, so measure the box's left and right gaps too.
      `margin-rules.js` lists every rule that matches an element and sets a margin, nested selectors resolved.
      Inline `<style>` injection does nothing here: the pages' CSP blocks it.
    - Open, for the user: the phone menu's close button gets the site's purple focus box when the menu opens
      in Safari, even from a pointer click (Safari 17.5 at a 500 px window, WebDriver element click,
      `states/index-500-portfolio-primary-navigation.png`), because `autofocus` puts focus on it and WebKit
      counts that as visible focus. Chromium shows no box after a click. The Phone `.fig` menu (`Frame 2`,
      `2280:41000`) draws only the three lines.
    - Phone menu captures in the Simulator: `menu-sim.ts` opens the menu through the inject server's
      `&popover=` branch. That branch never reports for the menu (it waits for the menu logo, a lazy image the
      phone layout does not load), so the script waits for the `&scroll=0&frame=` report instead.
    - `c96e902` checked in iOS 17 Safari (`heading-iphone17/`): both headings break as drawn.
    - Chromium after a real click (agent-browser `click`): the menu opens, focus does not land on the close
      button, nothing matches `:focus-visible`; screenshot `menu-click-chromium.png`.
    - In flight (2026-10-22 afternoon): unit `xinyanchen-safari-recapture` (Safari 17.5, live site after
      `bebcd18`) runs `phone-lines.js` at 500 to 650 px windows on the three case studies, then recaptures every
      case-study frame at all seven widths into `safari/` (the earlier frames are in
      `safari-pre-quotes-1022/`); review all of them. Unit `xinyanchen-eye-ipad` captures every page on the
      iPad 10th (iOS 17.0.1) into `sim-ipad10/`; build sheets with `simtriples.mjs ipad10 <page>` and review.
      Then report to the user with both open questions (menu focus box, and anything new) in the question tool.
    - Scripts here are `.ts` now (the repo rule against new `.mjs`); `~/temp/agent/f20/eye/package.json` sets
      `"type": "module"` because `~/temp/agent/f20/package.json` made Node read `.ts` as CommonJS.
    - `f213b57` MenuMe Personalized Menu flow: the tablet flow rule ended at 68.25rem, so from a 1092 px window
      the plain row drew the lo-fi screen 400 px wide and 862 tall beside 234 px hi-fi screens (seen in the
      Safari 1180 sheet). The rule now holds until 80rem. Chromium: lo-fi 197, 208, 226 px beside pairs 404,
      428, 465 at 1092, 1165, 1279, no overflow (`menume-usability-1165.png`, `-1279.png`). Other rules ending
      at 68.25rem: the focus group has its own rule from 68.25rem; Weekly Specials falls back to a row that
      looks right at 1180. Safari check after deploy still pending.
    - Desktop Safari sheets reviewed (recapture after `bebcd18`): MenuMe all seven widths, Scotties 744, 790,
      1024, 1180, 1280, 1440. The Scotties "Lo-fi Homepage" heading 9 px above its wireframe at 1440 is drawn
      that way (Desktop frame: heading box ends at y 9279, wireframe starts at 9288).
    - Found, since fixed (`a12e59b`, `b0d6ef0`, `c9cc147`):
      - Scotties hero meta at a 1280 Safari window (1265 CSS, tablet-to-desktop band, so the
        `.desktop-break` is hidden): "Hi-" ends a line and "fi Wireframes)" starts the next. The plain hyphen
        is a break opportunity; Tales already writes `Hi&#8209;fi`. Fix: `Lo&#8209;fi`, `Hi&#8209;fi`.
      - Scotties Phone headings at 393 break unlike the Phone frame: we draw "Research & User / Personas" and
        "Core Value Proposition & Emotional / Benefits"; the frame draws "Research & / User Personas" and
        "Core Value Proposition / & Emotional Benefits". The by-eye iPhone pass missed both.
      - Hero subtitles end on one word in the band below the desktop frame: Scotties "Redesign" from 1060 to
        1190 (Chromium), MenuMe "Ecosystem" from 1050 to 1430, which includes the Safari 1440 window
        (1425 CSS; visible in `safari-sheets/menume-1440-00.png`; the earlier "MenuMe 1440 fine" was wrong).
    - Heading check plan (advisor-agreed): diff every heading's line breaks against the `.fig` at each frame's
      own width (from the depth-0 rows of `boxes.jsonl`), keyed by node GUID, because `text-lines.mjs` takes
      the first node matching a prefix and Desktop Scotties has two "Wireframing Execution" nodes. Compare
      line count and each line's first word. Fix with width-independent joins (`&nbsp;`, `&#8209;`,
      `<br class="phone-break">`), never per-heading widths; one commit per heading group; Safari check at
      window = frame width + 15. Between frame widths, fix only what those joins fix anyway or what looks
      broken; a lone word in a full-width banner heading at 320 px is not a defect to chase.
    - New tools in `~/temp/agent/f20/eye/`: `orphan-probe.js` + `orphan-cr.ts` (headings and titles whose last
      line is one word; env PAGES FROM TO STEP; log `orphan-cr.log`, 6 pages, 320 to 1920 by 10, many flags,
      mostly in-between widths), `lines-probe.js` + `lines-cr.ts` (rendered heading lines; env PAGE WIDTHS
      PREFIXES; session `xinyan2`), `fig-heading-lines.ts` (`.fig` lines per frame and prefix).
    - Heading commits (all Chromium-checked; Safari check after deploy still pending):
      - `b0d6ef0` Scotties: `Research &amp; User&nbsp;Personas`,
        `Core Value Proposition &amp;&nbsp;Emotional&nbsp;Benefits`.
      - `f4b4150` MenuMe: eight phone headings joined or broken with `<br class="phone-break">` as Phone MenuMe
        draws them.
      - `a12e59b` Scotties hero meta: `Lo&#8209;fi`, `Hi&#8209;fi&nbsp;Wireframes)`.
      - `398e851` Tales "How might we" quote: measure 320 px on phones, 608 px at 744 growing to the Desktop
        frame; our line widths equal the `.fig` glyph widths in Chromium.
      - `867d0d1` Tales: `Strategic&nbsp;Alignment`; "The Core Product:" then a phone break.
      - `7622273` About: `I’m&nbsp;not&nbsp;working?`.
      - `9e42f83` MenuMe: `Iterative&nbsp;Design` (its `.fig` node text starts with a stray "Flows", so the
        diff could not pair it).
      - `c9cc147` hero subtitles: `Connected&nbsp;Grocery&nbsp;Ecosystem`, `E&#8209;Commerce&nbsp;UX&nbsp;Redesign`.
      - `1400e3e` last two words joined in headings and card titles across Home, MenuMe, Scotties and Tales,
        plus Scotties' Jonathan Miller copy "culture&nbsp;history." (lone "history." on the iPad).
    - Heading diff after these (`heads-diff.ts`, every visible `h1` to `h6` at 390, 744, 1440 against the
      `.fig` node with the same text): no line-break differences left. Unpaired headings (NOFIG) are ones the
      design splits across nodes or draws on one line.
    - Tried and reverted before commit: a phone `text-wrap: balance` on all headings. It fixed some headings
      and broke others (Home "Dedicated", MenuMe, About `h2`).
    - Sweep 320 to 1920 by 10 (`orphan-cr-3.log`): sideways scroll only from the known 350 px impact strip
      below 350 px. Remaining lone-word flags are two-word headings that wrap at narrow in-between widths.
    - iPad 10th (820) frames reviewed for all six pages. Tales persona copy ends on "routine." and "terms.":
      body copy, left as is. The Tales impact cards wrapped 3 + 1 at 820 while Tablet Tales draws one row:
      the four chevrons fill the strip exactly, and sub-pixel rounding wrapped the last one at some widths
      (Chromium 780, 800, 820, 1180; fine at 744, 760, 1024, 1279). `81028ed` sets `flex-wrap: nowrap` from
      40rem. Chromium sweep 320 to 1925 by 7 (`impact-cr.ts`, `impact-sweep.log`): one row everywhere from
      640, no overflow.
    - Checked after the `0c8d237` deploy:
      - Safari 17.5, live site (`heads-safari.ts`, `heads-safari.log`): every heading's line breaks at all 18
        page frames (window = frame width + 15, so 390, 744 and 1440 CSS) match the `.fig`; same counts as
        Chromium, no differences.
      - Safari 17.5 impact strip (`safari-sweep.mjs` with `impact-probe.js`, `impact-safari.log`): one row,
        `flex-wrap: nowrap`, no sideways scroll at every 5 px from 640 to 1920 CSS (257 widths).
      - iPad 10th (iOS 17.0.1, working tree, `text-sim.ts`, `text-ipad10/`): impact cards in one row; Scotties
        "culture history." and the hero meta "Lo-fi & Hi-fi Wireframes)" read right.
      - Scotties 1920 Safari frames reviewed: nothing wrong. A body line in "Visualizing Subculture Energy"
        starts with "—from"; a normal break before a dash, left as is.
      - Tales Safari recapture (all seven widths) reviewed: the 1024 and 1180 impact titles mixed one and two
        lines. `89b8055` writes the Tablet frame's break after each title's first word as a `tablet-break` and
        drops the balance rule. Chromium: every title two lines from 642 to 1285. From 1286 to 1383 titles
        still mix one and two lines (no design frame there; equal-height chevrons; left as is); from 1384 all
        one line, as Desktop Tales draws them.
      - The same sweep (`impact-sweep-2.log`, first sweep's check had only tested 640 and up) found phones
        stacking the impact cards one per row at 397, 439, 474, 551, 586 and 621 px: two chevrons fill a phone
        row exactly. `3958664` makes each phone chevron a
        quarter pixel narrower. Chromium 1 px sweep 320 to 645 plus 744, 820, 1024, 1180, 1279
        (`impact-sweep-3.log`): two rows on phones, one row from 640, at all 331 widths.
      - Phone Tales also breaks each impact title after its first word (Phone frame nodes `2332:53826`,
        `2332:53825`, `2332:53795`, `2332:53794`); ours wrapped on its own, matching at 390 but not wider
        (Safari at 393, the iPhone 15 width: "Behavioral Normalization" on one line). The next commit after
        `3958664` replaces the `tablet-break` with a plain `<br>` that the card rule hides from 80rem.
        Chromium every 1 px from 320 to 1925 (`impact-sweep-4.log`): phones two rows, all titles two lines;
        640 to 1279 one row, two lines; 1384 up one line; 1280 to 1383 mixed (left as is, no design frame).
        Safari 1 px sweep before this commit (`impact-safari-2.log`): phones two rows at every width 390 to 639.
      - Running: unit `xinyanchen-flexrows` (`flexrows-cr.ts`, session `xinyan`) counts the rows of every
        wrapping flex container on all six pages at every 1 px from 320 to 1920 and flags any whose row count
        rises as the window widens (the same rounding wrap); output `flexrows.out`, `flexrows-<page>.log`.
        Result: no other rounding wraps. Flags checked by measuring the items: Contact's email row flips
        between 1 and 2 "rows" from 1095 to 1189, but the email and its wave share one line at every width
        (their tops differ by under a pixel, the wave being top-aligned and the email centred); MenuMe
        changes at 640 (the 40rem layout breakpoint); Scotties' hero goes side by side at 1052 and its two
        prototype buttons stack in the narrower text column until they fit side by side again. Home has no
        wrapping flex rows.
      - In flight: unit `xinyanchen-eye-iphone-after` (iPhone 15, iOS 17.0.1, working tree) recaptures Home,
        About, MenuMe, Scotties and Tales into `sim-iphone17-after/`; unit `xinyanchen-safari-recapture`
        recaptures Tales at seven widths into `safari/` (log `frames-safari-1022c.log`). Review both.
    - More tools: `fig-all-lines.ts` (every visible text node's lines in the 18 frames, `fig-lines.json`),
      `heads-probe.js` + `heads-diff.ts` (env ONLY `device:page`), `split-probe.js` (words split at a
      hyphen), `impact-cr.ts`; `orphan-cr.ts` takes PROBE to pick the probe file, and `orphan-probe.js`
      reports `OVERFLOW n` for sideways scroll.

### CF112: the navigation on the left edge, 2026-10-22

- The client: "Get the logo+nav bar to always stick to the left side of the screen with padding, clamped by the
  leftmost side of the river." The user then: "Must also work on ultrawide screens. Or screens where the river
  can't cover the whole width and has to be centered."
- "The river" is Home's gold band (the client's own word for it: "下面那条河流的黄色").
- Before (Chromium, `f20/eye/nav-geom.ts`): the navigation keeps the 1440 design offset from a centred 1440 column,
  so its left edge is at 35 (744), 70 (1440), 150 (1600), 310 (1920), 630 (2560), on all pages. Home's river
  image box spans the whole window at every width (left 0; 1920 by 495 at 1920, 2560 by 495 at 2560), because
  its SVGs use `preserveAspectRatio="none"` and are clipped to x 0 to 1440: the river stretches sideways and its
  left end is the window's left edge.
- Reading: the navigation's left edge is the design padding (35 at 744 growing to 70 at 1440) plus the river's
  left offset, which is zero while the river covers the window and half the uncovered width once it is centred.
- The user, during the fix: "at 1920 the river is stretched about 33% beyond its design ratio - no the river
  should never be stretched." Then: "The river should never be bigger than its designed size."
- Landed `4b5101e`: `--river-max-inline-size` (1440, on `:root`); Home's `.intro-wave` and About's
  `.portrait-wave` keep their drawings' ratio (`aspect-ratio` 1440/495 and 1440/690 instead of fixed heights),
  cap at that width and centre; the navigation's `inset-inline-start` adds `max(0, (100cqw - cap) / 2)`.
  Chromium (`nav-geom.ts`, all six pages, 640 to 3440): rivers keep the ratio at every width (Home 744 by
  255.75, was 261; About 744 by 356.5, was 370); at 1440 river boxes and page heights unchanged; above 1440 the
  river is centred (left 240 at 1920, 1000 at 3440) and the navigation sits 70 right of it (310, 1070) on every
  page. So at 1920 the navigation stays where it was and the river now starts 240 in, with straight cut ends.
  Captures: `f20/eye/ultrawide-before/`, `ultrawide-after-1440/` (with `index-1920-fade.png`, a trial
  160 px fade on both ends set through CSSOM: the page's CSP drops injected `<style>` elements).
- The user chose (AskUserQuestion): "Straight cut (Recommended)" for the centred river's ends, and "Same rule
  (Recommended)" for the footer waves, which broke the same rules (`footer-geom.ts`): Home and About footers
  stretched (5.333 at 1920 against the drawing's 4), Contact's grew past its drawing (3440 by 860), case-study
  footers squeezed at 744 (4.088 against 4.571) and stretched at 1920 (6.095). Then: "\"stretching\" down is
  fine. proportional." (shrinking with the window below 1440 keeps the drawing's ratio, as built).
- Landed `ac88e70`: a components `.footer-wave` rule caps at `--river-max-inline-size` and centres from 40rem;
  pages set `aspect-ratio` (1440/360 Home, About, Contact; 1440/315 case studies) instead of fixed heights.
  Chromium on all six pages at 640 to 3440: every footer keeps its ratio, 1440 wide from 1440, left 240 at 1920;
  case-study footers 19 px shorter at 744 with the text on the wave as before (`footer-after/`).
- Every wave image on all pages (`waves-geom.ts`, flags a box off its declared drawing ratio by over 0.5 percent
  or wider than drawn): none at 390, 744, 1024, 1440, 1920, 3440. Positive control on the live site before
  `ac88e70` deployed: flags the footers (33.3 at 1920, -10.6 at 744).
- Safari 17.5 (live, after `4b5101e`; `cf112-check.ts`): Home 161 of 161 widths 640 to 1920 every 8 match (river
  ratio, river left max(0, (cw - 1440) / 2), nav 35 + 35 growth + river left); About and Scotties all wide
  widths match. At the 1920 window (1905 layout) both rivers start at 232.5 and the nav at 302.5.
- Correction, the user: "the 70px was min from left of logo to left of screen." `4b5101e` had put the logo 70
  inside the river (310 at 1920); `b0b22e4` makes the logo's left edge `max(padding, river left)`. Chromium
  (Home, About, Tales): logo 35 (744), 70 (1440, 1500, 1580), 80 (1600), 240 (1920), 1000 (3440), equal to the
  river's left end from 1580 up. The Safari results recorded for `4b5101e` (nav 302.5 at the 1920 window) are
  superseded; unit `xinyanchen-safari-cf112b` (`safari-cf112b.ts`, logs `cf112b-safari-<page>.log`, checked by
  `cf112-check.ts`, now expecting the max rule) re-runs Home and About once the deploy is live. Expect the
  logo at 232.5 at the 1920 window (1905 layout).
- The user, relaying the client: "Client said to stretch the river and footer patterns to at least cover 1080p."
  Asked how; the user chose "Grow evenly (Recommended)": keep the drawn shape, grow to 1920 wide, centre only
  beyond 1920. Supersedes "never bigger than its designed size" for windows up to 1920. In progress:
  `--river-max-inline-size` 1440 to 1920 (Home's river and every footer share it; the logo rule follows). The
  user then: "For About: The cut river on About is never meant to cover the entire width anyway." So About's
  `.portrait-wave` keeps its own 1440 cap (as before CF112) and its photo composition is unchanged.
- Landed `048408b` (cap 1920; About's portrait wave keeps 1440). Chromium: Home river 1920 by 660 at 1920,
  footers 1920 by 480 or 420, logo 70 up to 1920 and 320 at 2560; footers at 1920 read fine (`cover1080-footer/`).
  Safari re-check of the new rules: unit `xinyanchen-safari-cf112c` (`safari-cf112b.ts`) waits for the deploy,
  then nav and river (`cf112b-safari-<page>.log`, `cf112-check.ts`) and every wave (`waves-safari-<page>.log`,
  `waves-probe.js` now flags ratio skew, width over 1920, About's wave over 1440). Result (live `048408b`):
  Home and About 161 of 161 widths each match (`cf112-check.ts`); every wave image on all six pages, 81 widths
  each, none flagged. At the client's 1920 window (1905 layout): Home's river 1905 by 654.84 from 0, logo 70;
  About's river 1440 by 690 from 232.5. The wave probe's positive control ran in Chromium only (same script).
  CF112 done.
- Tablet after the ratio change (Chromium, `f20/eye/tablet-after/`): About at 744, 820, 1024 and Home at 744 read
  as before; About's photo still sits on the gold band, matching the earlier Safari capture
  (`eye/safari1x/about-744-00.png`) and the tablet reference.
- Client reply (`../Client screenshots 2026OCT220120/reply-draft.md`, not sent): CF112 and the 1080p sizing added
  to the 22 October desktop section in both languages; the old "menu follows the centred content" bullet now
  points to them; attachment 8 rebuilt with its after side at `048408b` (Safari 17.5, 1920 by 950,
  `xyc-after/pair8-048408b.ts`), old pair moved to `evidence/send-64d6dbc-replaced/`, `captions.md` updated.
- Menu focus box (task 77), asked of the user with three options; the user chose "Focus the menu itself
  (Recommended)". Landed `5c772d4`: the nav gets `tabindex="-1"`, the close button loses `autofocus`, and
  `portfolio-navigation.mjs` focuses the nav on the popover's `toggle` (open) event; `styles.css` drops the nav's
  outline on `:focus`. A first try put `autofocus` on the nav itself: Chromium then focused the always-visible
  wide nav at page load (`document.activeElement` NAV at 1440), so it moved to the script. Chromium
  (`nav-focus-check.ts`, all six pages): load leaves focus on BODY at 1440 and 390; open focuses the nav, outline
  none; Tab goes to Close, then Home; Escape closes. A run against a cached old script failed the open check (the
  positive control). Safari 17.5, live `5c772d4` (`safari-menu-focus.ts`, real WebDriver click on the hamburger,
  all six pages): load leaves focus on BODY at 1440 and 390; open focuses the nav, nav and close button outline
  none. Screenshots (`eye/menu-focus-safari/<page>-open.png`) looked at: no box on the panel or the close button.
  The close button draws the same three bars as the open button (the supplied artwork), not an X.
  iOS 17.0.1 Simulator (iPhone 15, 393 wide, working tree at `261969d` through `inject/server.mjs` on 4185,
  `menu-sim.ts iphone17-focus`): the menu opens through `showPopover()`, which fires the same `toggle` handler a
  tap does, not a real tap (m1 has no tap tool: no `idb`, `cliclick` or Appium). All six screenshots
  (`eye/menu-iphone17-focus/<page>.png`) looked at: no box on the panel or the button. Keyboard order (Tab,
  Escape) was checked in Chromium only.
- Safari 17.5 Tales impact titles every 1 px, 390 to 1440 window (`impact-safari-3.log`, after `c28a368`): phones
  two rows and every title on two lines at all widths; 655 to 1294 one row, two lines; 1295 to 1401 mixed (the
  known no-frame range); one line from 1402 (layout 1387). No sideways scroll at any of 1051 widths.
- iPhone 15 (iOS 17.0.1) Tales after-capture (36 frames, working tree with `c28a368`) reviewed
  (`simtriples/iphone17-after-tales-for-safer-trails-*.png`): fine; impact cards two per row, every title broken
  after its first word. With Home, About, MenuMe and Scotties, every iPhone page is now reviewed after the fixes.
- iPhone 15 (iOS 17.0.1) Scotties after-capture reviewed (`simtriples/iphone17-after-scotties-*.png`): fine. One
  callout breaks "divisions / —Skateboarding," where all three Phone frames break "divisions— / Skateboarding,".
  Left as is with the Scotties "—from" line: the designs themselves start three lines with an em dash
  (`fig-lines.json`: 3 start, 19 end, 40 mid-line), and body copy breaks are not matched elsewhere either.
- Done: unit `xinyanchen-safari-cf112` (Tales impact titles, results in the Tales bullet in this section) and
  unit `xinyanchen-safari-waves` (`safari-waves.ts`, `waves-probe.js`, all six pages at 81 widths from 640 to
  1920, `waves-safari-<page>.log`): no wave flagged. The older sweep `impact-safari-2.log` ran before `c28a368`
  and is superseded by `impact-safari-3.log`.
- Former coverage gaps, closed in Safari 17.5 on live `b0fb626` (the user chose "Close Safari gaps first";
  `eye/safari-gaps.ts`, output `eye/safari-gaps.out`):
  - Wide windows: the VM screen is 1920 by 1200 at dpr 2, yet WebDriver reached every requested layout up to 3840.
    All six pages at 1905, 1985, 2045, 2060, 2061, 2100, 2200, 2400, 2560, 3000, 3440 and 3840: nav left equals
    `max(70, (width - 1920) / 2)` everywhere (70 up to 2060, 70.5 at 2061, 960 at 3840); Home river 1920 by 660
    centred from 1985 up; About river 1440 by 690 centred; no wave flagged.
  - Positive control for `waves-probe.js` in Safari: clean before each break; a Home footer wave set to
    `aspect-ratio: 1440 / 200` is flagged (skew 80); About's `.portrait-wave` with `max-inline-size: none` at 1905
    flags every layer (1905 wide).
  - Phone menu keyboard (390 layout, real click on the hamburger): open focuses the nav on all six pages. Plain
    Tab stays on the nav (Safari's default Tab skips buttons and links); Option+Tab reaches Close, then Home;
    Escape closes the menu and focus goes to BODY (Safari does not focus a clicked button, so there is no
    earlier focus to return to). On Contact, plain Tab leaves the open menu for the form's name field behind it,
    and the menu stays open until Escape. Not a regression: the old `autofocus` on Close led to the same next
    field. Asked the user whether the menu should close when focus leaves it; the user chose "Leave as is
    (Recommended)", so the menu keeps the standard non-closing popover behaviour.
- Client reply re-read (the user chose "Re-read the draft first"), not sent: the logo bullet claimed the logo lines
  up with the river on every screen wider than 1920; corrected in both languages to "never outside the river's left
  end, lined up from about a 2060 px layout". The menu focus fix (Safari's purple box around the close button) was
  missing and is added under the self-found fixes in both languages. The draft's header records the re-read.

### Not ours

The Contact page's fourth body `<div>` (added after the scripts, the hCaptcha widget) has a `position: fixed`
child that Safari reports as tall as the page and Chromium as tall as the window.

### Not run

The planned 1x Safari pass at 790 and 1440. Neither engine behaviour depends on pixel density.

## Client batch, 2026-10-22 evening: arrows

The user: "Client just found more "Arrow stabbed through shapes" issues AFTER EVERYTHING, which means your
verification is insufficient." The client's shots are in
`/var/home/user/xinyanchen-portfolio/Client screenshots 2026OCT222006/` and the new design is
`/var/home/user/xinyanchen-portfolio/Website (Copy) 2026OCT222006.fig` (unpacked to
`/home/user/temp/agent/f20/fig-222006/`). The .fig's "10月22日修改意见：" block also holds three phone shots (the live
site in WeChat on an iPhone) with purple circles; `fig-222006/oct22-sheets.py` rebuilds all nine shots into
`fig-222006/oct22/`.

### Why the earlier verification missed these

The earlier arrow check covered only the eight Scotties callouts at four widths and counted only connector pixels
inside a box. It never checked missing arrowheads, tips that miss their dashed box, or MenuMe. A connector the
same colour as the border it crosses also left no difference on the border itself, so the inside part was
disconnected from the outside part and the stab went unseen.

### The client's instructions, as written (file name, then translation)

- CF113 "鼠标移到这里时，箭头变成和外框一样的黄色。": on hover the back-to-top arrow turns the same gold as its ring.
- CF114 "箭头根部与右边的文字距离有点宽。（我用紫色标注了）": desktop Scotties core values, the gap between the chevron
  trail's root and the "Belonging" text is a bit wide (marked in purple).
- CF115 "这个虚线框我调整了一下，让它将button都框在里面。平板和手机版本也需要调一下。": the client moved the MenuMe
  Checkout dashed box so it encloses the buttons; tablet and phone need the same.
- CF116 "这个箭头的末端没有显示 箭头的根部刺穿了文字框": tablet MenuMe, the squiggle's arrowhead is missing and the
  gold elbow's root pierces the Design Iteration box.
- CF118 "箭头要往上移一点": tablet Scotties lo-fi listing, the orange arrow should move up a little.
- CF119 "浅绿色的箭头还没有对准绿色虚线框": tablet Scotties hi-fi, the light green arrow is not yet aimed at the green
  dashed box.
- There is no CF117 file.
- Phone shots 1 and 3 (purple circles): MenuMe phone, the gold elbow's root pierces the Design Iteration box top.
- Phone shot 2: Scotties lo-fi listing phone, the sage arrowhead sits on and through the sage dashed box's
  bottom line.

### Design changes in the new .fig

`fig-222006/diff-boxes.py` against the previous file: MenuMe Desktop "Rectangle 100" (the Checkout dashed box)
moved from y 11206 to 11214; Tales Desktop restructured (Group 40 moved and shrank, "image 17" and two
"Picture2" removed, Key Insights vectors nudged).

Tales, investigated 2026-10-22 late night, fixed in `2e9f145`: the client replaced the raster bubble ("image 17") with
the two vector bubbles, Group 239398 (play, a translation) and Group 239399 (trust, the same two vectors rotated by
the group matrix -0.363 -0.932 / 0.932 -0.363). `near.py` boxes for rotated nodes are not frame positions; compose
with `node-transform.mjs` instead. `fig-222006/tales/bubble-boxes.py` gives the true curve bounds in frame
coordinates; the bubble files the site already uses match those shapes (play fill 395.9 by 360.7 against 396 by
361, trust fill 353.8 by 387.7 against 354 by 388). The titles had not moved (within 2.5 px of the new file), but the
layers sat 5 to 20 px off around them (play 7 to 15 px high, trust 15 to 20 px right and low). Only the desktop
block (`width>=80rem`) changed: the tablet and phone designs did not, so their insets stay. After: Chromium and
Safari 17.5 (`eye/safari-bubble-state.ts`) at 1440 and 1920 put every layer within 0.02 px of the design relative to
its title; Safari window shots in `eye/tales-bubbles-safari/`. A review suspected those shots used a cached
stylesheet (the Trust outline's left edge at the heading row reads 782 px, near the old CSS's box edge 780.5).
Ruled out: `safari-bubble-state.ts` now also saves a screenshot from the same session that reports the new computed
values (`eye/tales-bubbles-safari-r3/1440.png`), and all three captures put the Trust outline 111 px left of its
text at that row, so they show the same CSS. The box edge is the outline's leftmost point lower down, not that row.
Decided by the user 2026-10-22: keep `2e9f145`. The user reviews and sends the updated client reply themselves.

### Full by-eye re-check, 2026-10-22 late night to 2026-10-23 (done)

The user chose "Re-check every page by eye" before sending. Plan, in order (scripts in `~/temp/agent/f20/eye/`):

1.  Safari 17.5, live site, every page at 744, 790, 1024, 1180, 1280, 1440, 1920 by 950: `frames-safari-r2.mjs`
    (unit `xinyanchen-eye-safari-r2`, under `vm-sonoma.lock`) into `safari-r2/`; sheets two frames at a time via
    `safari-sheets-r2.ts` into `safari-sheets-r2/`.
2.  iOS 17.0.1 Simulator, iPhone 15 then iPad 10th portrait (never both at once): `frames-sim-r2.mjs <label>
    <UDID>` from the working tree through `inject/server.mjs` on 4187 (units `xinyanchen-inject-4187`,
    `xinyanchen-m1-tunnel-4187`) into `sim-<label>-r2/`.
3.  Look at every frame; compare against the earlier pass's frames (`safari/`, `sim-<label>/`) to see what moved.
    Findings go to `eye/findings-r2.md`, fixes one commit each, checked in Safari.

Step 1 done: 485 frames, every sheet of all six pages at all seven widths looked at. No layout finding.
The earlier `safari/` pass had case-study frames only, so Home, About and Contact had no baseline and were
looked at in full. Already-decided items were seen again and left:

- em-dash line starts (About "—such as", Scotties);
- Scotties desktop wireframe headings 9 px above their wireframes, as the `.fig` draws them;
- the 65 px MenuMe desktop "Profile & Settings" box.

MenuMe at 1180 and 1280 is about 400 px shorter than in the earlier pass: that pass ran before `f213b57`.

One broken-image "?" appeared, on MenuMe 744 frame 09 (the Personalized Menu lo-fi wireframe). It is the second
sighting after the Shopping List one at 728. `eye/safari-broken-probe.ts` loaded the page fresh 12 times in
Safari 17.5 (744 ×4 and 728 ×2, each with forced-eager and with plain scrolling): 25 images per load, 0 broken.
Read as a passing fetch failure during the capture; nothing to change in the page.

Step 2, iPhone 15 done (117 frames, every sheet looked at). Home, About, Contact, MenuMe and Scotties: nothing
wrong. Tales: one finding. In the Key Insights "Bridging the Gap via Play" bubble, the last line
"engaging, non-threatening stories." runs past the yellow fill into the white notch by the tail
(`eye/sim-iphone15-r2/tales-for-safer-trails-06.png`).

Cause: `a2f653c` fitted the phone text insets (13% and 21%) to the old bubble art; the client's bubble files
(`4a1471a`, `8e51b4f`) came later and the phone fit was not re-checked.
Design: the latest `.fig` (Phone Tales, node 2313:49628, `eye/fig-bubble-boxes.ts`) breaks the copy by hand
after "non-threatening", so "stories." sits alone. Tablet and desktop have their own insets (`width>=40rem`) and
pass.

Checker: `eye/bubble-fit/` (`capture.mts`, `analyze.py`). Each bubble is shot twice in Chromium, text shown and
text transparent. Ink pixels lying on anything other than the bubble's fill colour are flagged. It runs both as
written and with forced plain wrapping, because iOS before Safari 17.5 has no `text-wrap: balance`.
Positive control: it flags the Play bubble at 393.
It also flags the Scotties Core Challenge cloud at 393: "no e-" touches the lightning bolt. The phone `.fig`
draws that overlap, so it stays.

Next, queued:

- choose the smallest Play end inset that passes at 320 to 639 (`try-ends.mts`);
- apply it to the Play rule only, as one commit;
- re-run the checker, then Safari 17.5 and the iOS Simulator;
- re-run the full baseline sweep (`capture.mts` with no width list, into `eye/bubble-fit/live/`), one at a time.

The first inset trial and the baseline sweep both died at 01:05 on 2026-10-23 with agent-browser's
`Failed to read: Resource temporarily unavailable (os error 11)`. No kernel fork rejections in that window, so it is
the 30 s read timeout under host load (Monochromatic `doc/troubleshooting/agent-browser-eagain.md`), not a task
ceiling. `capture.mts` now redoes a failed width from scratch, up to four tries. The trial restarted at 02:11 as unit
`xinyanchen-bubble-fit-ends2` (log `eye/bubble-fit/ends2.log`), alone, at about 4 s per width.

iPad 10th capture finished (unit `xinyanchen-eye-sim-ipad-r2` inactive); every sheet viewed, nothing wrong.

Play bubble fix: `bfd1b60` (phone Play copy `margin-inline: 13% 23%`). Trial: 21% control flagged 48 of 176
(320 to 424, 584 to 639); 23% and 25% flagged 0 of 176. Checked live: iOS 17.0.1 iPhone 15 Simulator
(`eye/bubble-iphone15/`, "stories." alone on the last line, on the fill), Safari 17.5 at 744, 1024, 1920
(`eye/tales-bubbles-safari-r4/`, unchanged), Chromium checker 320 to 639 clean for both Tales bubbles.

New, found by the full checker on the live site (`eye/bubble-fit/after.txt`, marked images `after/*-cross.png`),
older than `bfd1b60` (the tablet rules override it from 640 up) and never covered before (the first baseline died
at 616; the Safari pass started at 744). All in the band from 640 to just under 744:

- Scotties Core Challenge cloud, 640 to 680: the copy re-breaks around its hard breaks ("Out-of- / town",
  "the / store", "big-box / sporting") and runs out of the cloud's bottom. 688 to 728: "sporting" touches the
  right outline.
- Tales Trust bubble, 640 to 728: line starts ("professionals.") sit on the white gap left of the fill.
- Tales Play bubble, 672 to 736: the end of "non-threatening" reaches the tail notch.

Safari 17.5 shows the Scotties one too (`eye/band-safari/scotties-656.png`, `-696.png`). Cause, measured in
Chromium (`eye/band-measure.ts`): from 744 down to 704 the Scotties cloud shrinks 433 to 405 px while its copy
stays 14 px; the Tales copy scales against the phone's 322 px reference although the tablet bubbles are 325 and
333 px at 744, so it shrinks 1 to 3 % slower than its bubble and gains a fifth line. Fixes: `3a2231f` (Scotties
tablet copy `min(1em, 14 * 100cqw / 433)`), `f61ff83` (Tales tablet h4 and p scale against 325 and 333). The 1em
caps hold from 744 up, so those widths should not move.

Checked: Safari 17.5 at 656, 696, 704, 720 (`eye/band-safari-after/`): the Scotties cloud keeps its seven 744
lines inside, Play and Trust keep four lines on the fill. Chromium checker (`after2.txt`): Tales 0 crossings at
every width; the only flags are the 82 phone Scotties bolt overlaps the design draws. `compare-runs.ts after
after2 744`: 436 rows identical, 2 changed, Trust at 1280: the tablet rule also reached desktop (1280 bubble
359 px, so the new reference shrank its copy and re-wrapped it). `e5e1c7d` scopes the new font rules to
`width<80rem`.

Final check after `e5e1c7d` (`after3.txt`, live from 06:50 UTC): Tales 0 crossings at every width from 320 to
2560, the only flags the 82 phone Scotties bolt overlaps; `compare-runs.ts after after3 744`: 438 identical, 0
changed. Safari 17.5 on the final CSS (`eye/band-safari-final/`): Trust at 704 as before, at 1280 back to its
pre-`f61ff83` title width (144 px), every line on the fill. Corrective comment posted on `f61ff83` (its message
says "below 744"; it also re-wrapped Trust at 1280). Reply draft updated with these fixes (backup
`/home/user/temp/agent/f20/reply-draft.before-bubbles.md`); not sent.

Coverage gap, open: the by-eye passes covered Safari 744 to 1920, iPhone 393 and iPad 820. The band from 640 to
743 was never looked at by eye on any page; the checker that found these defects covers only the three bubbles.
The client resizes a Mac Safari window ("Window made narrower"), so that band is reachable. The user chose "Sweep
640-743 first", before sending the reply. Running: Safari 17.5 frames of all six pages at 640, 672, 704, 736
(`eye/frames-safari-band.mjs`, frames `eye/safari-band-r1/`, unit `xinyanchen-eye-safari-band`, log
`eye/frames-safari-band.log`); sheets via `eye/safari-sheets-band.ts` into `eye/safari-sheets-band/`; every sheet
viewed; fixes one commit each.

Band sweep progress (2026-10-23 morning). Viewed, nothing wrong: Home, About, Contact at all four widths; MenuMe
640, 672, 736 and 704 apart from the personas; Scotties 640 sheets 00 to 18. Checked and intended: MenuMe 640's
first Usability Finding box sits 19 px left of the text column (the phone design's `margin-inline-start: -19u`),
and its "End-to-End User Experience Delivery" heading breaks into three lines by the phone-only `<br>`s.
The Home 640 broken-image "?" (third sighting) did not reproduce: `eye/safari-broken-probe.ts index 640 4`, eight
fresh loads, 26 images each, 0 broken; still treated as a passing fetch failure.

- `8a84970` MenuMe tablet personas: below 744 the persona copy held 14 px while its column shrank, so Alicia's
  copy took a fifth line below 707 (Chromium) and that line, "reduction tools.", crossed the yellow scribble (Safari
  704 frame `safari-band-r1/menume-704-05.png`). Matthew's took a fourth below 744. The copy now scales with the
  column below 744 (`min(shared size, 14 * --u)`, line height 2em rounded). Measured with
  `eye/persona-measure.ts` (trials go in through a constructed stylesheet: the CSP blocks `<style>` injection,
  so the first trial run silently measured nothing; positive control at 704 confirmed it applied). Live check
  (`eye/verify-persona-live.ts`, fresh browser session: the first run measured a cached stylesheet): 640 to 743
  all keep the 744 lines (4, 4, 3); 744, 800, 1024, 1279 identical to before. Safari 17.5 live
  (`eye/persona-safari-alicia/`, `eye/persona-safari-matthew/`): Alicia four lines at 641 to 744, clear of the
  scribble; Matthew three.
- Open: Scotties phone layout at 625 (Safari 640 window, `safari-band-r1/scotties-640-06.png`): the top chevron
  of the pillars' trail touches "visual layouts.", the Excitement copy's last line. New checker
  `/home/user/temp/agent/f20/eye/deco-clash/` (`capture.ts`: as is, paragraphs transparent, plus pseudo-elements
  and images hidden; `analyze.py`: minimum distance from text ink to decoration ink). Smoke test: 625 at 1.0 px,
  390 at 19, 744 at 16, 1440 at 23. Full run 320 to 639 in unit `xinyanchen-deco-clash`, output `pillars/`.
  Checker pitfalls found on the way: element screenshots came back blank (now full 2400 px viewport shots cropped
  to the element), the fixed phone header covered the element's top (now scrolled 200 px clear), and relative
  output paths fail in agent-browser (absolute only).
- Sweep finished: every band sheet viewed. Tales clean at all four widths; Scotties clean apart from the two
  pillar trails.
- `8effe96` Scotties tablet pillars: the same cause as the personas. Below 744 the three pillar columns narrow
  with `--u` but the copy held 14 px, so Belonging gained a line from 736, Confidence from 704, Excitement had nine
  at 640 (`eye/pillar-measure.ts`), and the trails met the text: Safari 672 (`eye/pillars-safari/scotties-672.png`)
  shows the Confidence trail's chevrons against "trusted"; Chromium clearance (`deco-clash/pillars-tablet/`)
  16 px at 744 but 2 to 14 px from 654 to 692. Fix: below 744 (and below desktop) the copy is
  `min(shared, 14 * --u)` and the lead `min(shared, 16 * --u)`. Trial (constructed stylesheet): every width 640 to
  743 keeps the 744 lines (7/2, 7/1, 8/2); 744, 800, 1024, 1279 identical. Live (`eye/verify-pillars-live.log`,
  fresh session): the same. Clearance under 6 px (`deco-clash/pillars-tablet-after/`, 640 to 800): before 5 of 68
  widths, after 0 of 81. Safari 17.5 after (`eye/pillars-safari-after/`): 641 and 672 clear. Safari 744 line
  widths differed by 1 px from the earlier after-shot, but two shots of the same CSS reproduce the before widths
  exactly (`eye/spread-a/`, `eye/spread-b/`), so that is run-to-run spread; Safari 744 reads 14 px personas and
  14/16 px pillars (`eye/spread-persona/`, `eye/spread-c/`): 744 is unchanged.
- Safari WebDriver recovery: stopping a flock'd Safari run mid-way leaves Safari "already paired with another
  WebDriver session". Fix: `flock vm-sonoma.lock ssh m1 "ssh -o BatchMode=yes -i ~/.ssh/id_ed25519_vm
  admin@192.168.64.9 'launchctl kickstart -k gui/501/dev.monochromatic.safaridriver'"`.
- Scotties phone pillars (open, task 98): full Chromium run 320 to 639 (`deco-clash/pillars/pillars.txt`):
  clearance under 6 px at 356 (5), 404 to 432 (3 to 4) and 620 to 639 (0 to 1, touching). Cause: the art scales
  with vw/390 while the 14 px copy does not, so the Excitement copy drops to fewer lines and its long last line,
  "visual layouts.", lands over the trail's upward chevrons. A fixed copy width was rejected (the lead span needs
  245 px at 639 while the body re-breaks above 244.4 px). Trial: `<br class="phone-break">` before "layouts." (the
  phone design ends on "layouts." alone). Safari trial (`eye/pillars-safari-phone-trial/`): 393 and 625 clean,
  but 480 reads "high-" / "energy visual" / "layouts.", two short lines in a row. Every width's lines
  (`eye/excitement-words.ts`, logs `eye/excitement-words*.log`): the plain break leaves "visual" alone at 357 to
  360 and 498 to 560. Keeping "high-energy visual" together fixes that. Characters were rejected: Playfair has no
  U+2011 glyph (it would fall back to another font), and a word joiner plus no-break space changed 27 widths from
  640 up (880 to 900, 1349, 1352; `eye/joiner-*.log`). A `<span>` in that paragraph gets the lead phrase's block
  display, size, weight and orange (`:is(h1, h2, p)>span` and the pillar `&>p>span` rules; `eye/span-styles.ts`).
- `dcd0c69` Scotties phone pillars: `niche gear through <span class="keep-together">high-energy
  visual</span><br class="phone-break"> layouts.`; the wrapper is `all: unset` on the full pillar path (outranks
  the pillar span rules) plus `white-space: nowrap` below 40rem. Local Chromium before commit: 640 to 1279 and
  1280 to 2560 step 3 identical to the published lines (0 of 1067 widths differ); 387 to 409 (390, 393) keep
  today's lines; every phone width ends on "layouts." alone with no lone "visual"; the wrapper's computed style
  equals its paragraph's apart from display inline and, below 640, nowrap (14 widths). Safari 17.5 live
  (`eye/pillars-safari-phone-live/`, 393, 480, 500, 560, 625, 744): clear, black Medium copy, 393 and 744 line
  widths match the earlier shots. The local Safari run failed: nothing forwards 4173 from Linux to m1 (only 4454),
  so Safari checks run against the published site. Clearance (`deco-clash/pillars-local/`, the committed code,
  320 to 639; analyze with `uv run --isolated --with numpy --with scipy --with pillow python -I analyze.py <dir>
  6`): under 6 px before 50 of 320 widths, after 0 of 320; the closest is 14.9 px at 320, against the design's own
  15 to 19; 625 to 639 went from 0 to 1 px to 19 to 20 px. Live Chromium (fresh session, `eye/live-phone.log`):
  all 320 phone widths' lines equal the local run. Not checked: Safari below a 393 layout (the window cannot get
  narrower) and the iOS 17 Simulator (the user's call).

### Arrow audit tool

`/home/user/temp/agent/f20/arrow-audit/`: `capture.ts` saves each page full-length twice (as is, and with every
arrow-painting element and pseudo-element hidden through `insertRule`), at 38 widths from 360 to 1920;
`analyse.py` takes the difference as arrow ink, bridges pieces by a 4-step dilation, and flags ink that is both
outside a shape's border box and inside its inner box deeper than 2 px. Positive control: the site at
`06d9798^` (before the callout fix), served from worktree `arrow-audit/old-06d9798` on port 4186. Before the
bridging step the tool missed all eight known stabs; after it, it flags all eight (depth 2.8 to 5.9 px), and the
current Scotties shows none. On current MenuMe it flags the client's CF116 stab (393: depth 3.8; 728: depth 3.3).
Known intended hits: arrowheads entering a screen image to reach their dashed box, and the back-to-top arrow
inside the footer wave's image rectangle.

### Fixes so far

- `7b3b2fa` CF113: hover arrow uses `--color-river-gold`. Safari 17.5, all six pages: arrow rgb(104,85,135) to
  rgb(216,161,80), equal to the ring.
- `8655c36` CF115: `assets/menume-weekly-specials-high-fidelity-shopping-list-highlights.svg` path gets
  `translate(0 8)`; the one SVG serves desktop, tablet and phone. Checked by eye later (Chromium, Safari 17.5,
  iOS 17); see "Arrowhead gap sweep, 2026-10-22 night".
- `03a434a` CF116 elbow: tablet block size 217.2u to 212.2u minus the border; phone bottom margin -29.5u to -20u
  minus the border, so the foot ends in the box border. Checked by eye later (Chromium, Safari 17.5, iOS 17); see
  "Arrowhead gap sweep, 2026-10-22 night".
- `fbf998e` CF116 squiggle: `assets/menume-usability-tablet-squiggle-down.svg` is the design's body plus head,
  composed through the group matrices (`fig-222006/squiggle/compose.py`); the body matches the old asset point for
  point. Tablet only; checked by eye later (Chromium, Safari 17.5); see "Arrowhead gap sweep, 2026-10-22 night".

### CF118 and CF119 measurements

Tablet lo-fi listing ("Desktop - 2 1", top 7852, height 404), arrow tips from the screen top: dark 62, orange 122,
sage 222.5. Dashed boxes: dark 22 to 88, orange 94 to 137, sage 27 to 334.

Tablet hi-fi ("Home 2", x 78, top 8741, 286 by 922), arrow tips from the screen top: dark Arrow 16 at 133.5, orange
Arrow 17 at 385.4, sage Arrow 14 at 647.5, dark elbow Arrow 19 at 810. Dashed boxes from the screen top: Rect 96
19 to 251, Rect 97 277 to 434, Rect 98 552 to 619, Rect 99 647 to 832.

Cause at 728: callouts sit in grid rows beside the screen with a minimum height of the design's; at narrow tablet
widths their text overflows that height, the callouts grow, and connectors, which hang from their callouts, drift
down relative to the screen.

### Progress, 2026-10-22 night

Client files CF120 to CF122 are the three phone shots in the .fig: CF120 and CF122 MenuMe phone (the gold elbow
root through the Design Iteration box, fixed in `03a434a`), CF121 Scotties phone listing (sage arrowhead through
the sage box line).

- CF114 `9aa0b8f`: desktop (1280 up) uses `assets/scotties-desktop-core-value-chevron-trails.svg`, built by
  `fig-222006/build-desktop-trails.py`: the tablet chevron (scale 1.692) on each of the 42 chevrons of the desktop
  rasters (image 144, 145, 146), overlap 0.85 to 0.94. Before: Belonging trail 58 design px from its text (design
  21.5). After: 22 at 1280 to 1920; all 42 chevrons within 0.78 design px (`arrow-audit/cf114-blobs.py`; the old
  build fails it: worst 58.65, 15 unmatched).
- CF118 `b5e2ad7`: tablet callouts grew past their design height and pushed later callouts and connectors down.
  Lo-fi insets were 20 px where the design has 14 from the outer edge; below the design width the 14 px text
  wrapped into more lines. Below 1092 (lo-fi) and 1280 (hi-fi) the callout text is now `min(14px + growth, 14u)`
  with line height `min(28px + growth, 28u)` rounded, letter spacing restated. Tip sweep 640 to 1091 (16 px
  steps, `arrow-audit/tip-probe.ts`, `tip-analyse.py`): no callout grows; every tip within 5 design px of the
  design and in its box (before: orange lo-fi +25 at 728, +128 at 640; hi-fi elbow +38 at 728, +248 at 640).
- CF119 `084ff80`: hi-fi sage `--y` 125.8 to 63.7, aimed at the sage box centre (585.5 from the screen top);
  the tablet design ends it on the dark box edge (647.5), the desktop design aims at the centre.
- CF121 `ae7e206`: phone listing arrows measured against their dashed lines (`arrow-audit/touch-probe.ts`,
  `touch-analyse.py`, `overshoot.py`: pixel diff with and without the overlay). At 390 before: sage 10 px past the
  line, orange 5 px short, dark 3 px short; after: -1, 0, +1.

### Desktop growth and arrow lengths

The desktop lo-fi listing growth (callouts 14 to 62 px taller than their boxes at 1104 to 1279, the orange elbow
33 to 48 design px low) was fixed in `fb5676f` (callout type scaled below 1440, bounded `<90rem` so 1440 up keeps
its sizes). `9f141fb` lengthened the desktop heads that stopped short at 1920 (hi-fi `--x`/`--w` -52 to -55, second
-54 to -60, lo-fi sage -98 to -103, lo-fi orange elbow top -61 to -69 with block size 129.7 to 137.7).

### Arrowhead gap sweep, 2026-10-22 night

The touch audit only flagged stabs; arrowheads that stop short of their dashed line went unmeasured. New
`arrow-audit/gap-sweep.py` measures every connector's head against its same-coloured line at every probed width:
the head is the only ink thick enough to hold a 6 px square, the direction comes from the shaft just behind it,
the tip is the head's farthest pixel. Validated against hand measures with `overshoot.py` at 1092, 1280 and 1920
(identical values). `gap-sheet.py` and `gap-sheets.ts` build contact sheets of every tip.

Checked by eye (Chromium): CF115 Checkout box encloses Subtotal and Checkout at 393, 744 and 1920; CF116 elbow
root ends in the Design Iteration border at 393, 728 and 1920, squiggle heads present at 744.

Found and fixed, with the design's own tip positions as the reference (commits: desktop `a37116d`, tablet lo-fi
`3d07f44`, phone lo-fi `f71573b`, phone hi-fi `f07232f`, tablet hi-fi `9a4c4c0`):

- Desktop hi-fi elbow 4 px short at 1280 to 1920: `--x`/`--w` 46.5 to 50, `--v` 27 to 30.5 (bend in place).
- Desktop lo-fi dark 3 to 4 px short at 1092 to 1920: `--w` 102 to 105.
- Desktop lo-fi homepage 2 to 4 px short at 1092 to 1920 (design tip 1.6 px inside the nav box): 172.6 to 175.6,
  bend kept in place.
- Tablet lo-fi listing (640 to 1091): the one shared highlights SVG puts the boxes about 4 px right of the tablet
  design's, so the heads ended short by a fixed number of design units: dark 10, orange 7, sage 2.5 (design tips:
  dark 1.9 before its rect, orange 1.1 inside, sage 4.8 inside). Dark `--w` 89 to 99.5, orange elbow 67.5 to 75
  with its bend kept, sage 133.7 to 136.7.
- Tablet hi-fi (640 to 1279): straight connectors hang from inside the 4 px border while the design measures from
  the outer edge, so they were 3 to 4 px short at every width; `width<80rem` adds `4rem / 16` to the three
  straight ones. Sage `--x`/`--w` 57.6 to 59.6 for its remaining 2 units.
- Phone hi-fi from 545 px: `.portrait-artwork` keeps its 400 px cap, so the screenshot stopped growing while the
  callouts and connectors kept scaling; at 639 the orange arrow ended on the dark box and the dark one ran into
  the footer. The phone hi-fi figure now sets `max-inline-size: none`, as the lo-fi ones already did.
- Phone lo-fi homepage arrow 4 px short at 360 to 480 (design: 3 px into the nav box line); and the homepage,
  listing dark and listing orange arrows drifted past their lines from 520 (up to 6 px at 639) because their
  scaled lengths included the unscaled 4 px border. Now `59u + 4px`, `63u + 4px`, `287u + 4px`.

Design-intended, kept: MenuMe phone weekly-specials gold arrow ends on the recipes screen's edge (design tip x 305,
screen edge 303.2, dashed box edge 295.6). Tablet lo-fi homepage arrow's head points at its callout, not a box.

Verified in Chromium: full Scotties re-sweep `touch-fix3` (26 widths, 360 to 1920), 198 heads measured, all within
-1 to +3 px of their line's outer edge except the tablet hi-fi elbow (-2 at 640 to 800, then lengthened 36 to 37.5
with its bend kept; re-check `touch-fix4`) and the desktop lo-fi sage at 1092 only (-2; 0 from 1200). Positive
control: the same filter flags 107 heads in the pre-fix sweep `touch-all`. A first filter read the wrong column
and flagged nothing; caught by that control. Phone hi-fi orange at 360 to 393 is misread as pointing down (no
measure); crops at 360, 375 and 393 show it touching its line. MenuMe had no CSS change in that pass, and its
results were not summarized; see "Arrow audit close-out" for the MenuMe tablet overshoot this missed.

Re-check `touch-fix4` after the elbow change: every tablet hi-fi head -1 to +1 px at 640, 728, 800, 1000 and 1279.

Safari 17.5 (Sonoma VM, live site after `9a4c4c0`, `eye/safari-gaps2.ts`, 36 window shots in
`eye/gaps2-safari/`): at 728, 1092, 1280 and 1920 every Design Iteration head meets its dashed line, looked at.
iOS 17.0.1 Simulator, iPhone 15, 393 (`eye/sim-gaps.ts`, `sim-gaps2.ts`, through `inject/server.mjs` on 4187
reverse-tunnelled to m1; 10 frames in `eye/sim-gaps/`): all eight phone heads meet their lines, looked at.
Simulator shut down, inject server and tunnel stopped.

MenuMe and CF114 (no CSS change in the sweep, checked because the client's CF120 and CF122 shots were iPhones):

- Safari 17.5, live site, 728, 1280 and 1920 (`eye/safari-phrases.ts`, `eye/menume-safari/`,
  `eye/menume-safari-r2/`): CF115 Checkout box encloses Subtotal and Checkout; the gold elbow root ends in the
  Design Iteration border; squiggle heads present. CF114 Belonging chevron trail at 1280 and 1920
  (`eye/cf114-safari/`) sits next to its text.
- Seen once, not reproduced: the first Safari capture at 728 showed a broken-image "?" for the Shopping List screen.
  `eye/safari-img-state.ts` then reported all three hi-fi screens complete at 780×1688 at 728 and 1920, and a repeat
  capture rendered it. Watch for it if the client reports a missing screen.
- iOS 17.0.1 Simulator, iPhone 15, 393 (`eye/sim-menume.ts`, frames in `eye/sim-menume/`): elbow root ends on the
  Design Iteration top border (crop `iter2-root.png`), Checkout box encloses Subtotal and Checkout.
- Design-intended, kept: the opening squiggle's head reaches into the "While cooking at home" box, as the design
  draws it; listed in the client reply as a keep-unless-objected item.

### Arrow audit close-out, 2026-10-22 late night

Missed, then fixed (`cfc4560`): the MenuMe tablet Design Iteration elbow (640 to 1091) ended 4 to 6 px past the
Ground Beef dashed line's outer edge, its head on the photo. The pre-fix sweep `gap-all.txt` already said so (`+4` to
`+6`, head id 2), but nobody read the MenuMe rows: the summary only covered Scotties. Design: Arrow 36 tip x 274.0,
Rectangle 97 x 272.6 (1.4 px past the edge). The CSS run (61.5 units) equals the design's, so the root must sit
right of the design's (inferred from the CSS, 4 px border plus 147.5u against the design's 142.5, not measured);
the run is now 58 units with the head at 43 and the line 44.5, and the root stays put.
Re-sweep after `cfc4560` (`touch-menume-fix`, all 26 widths, `gap-menume-fix.txt`): the elbow head measures +2
at 640 and -1 at 900, 1000 and 1091. At 700 to 800 the analyser lost it: the device GIF changes frame between the
A and C captures, so about 100,000 px differ there and the head search lands on orange blocks (the "down" +14 to
+29 rows at 360 to 1200 are those blocks, looked at in `mfix-<width>.png`). `elbow-tips.py` and a windowed crop
beside the first screen (`elbow-fix-a/b/c.png`) show the tip on the dashed line, clear of the photo, at 640, 700,
728, 744, 800, 900, 1000 and 1091. Safari 17.5, live (`eye/menume-elbow-safari/`): same at 728 and 1000. The
phone weekly-specials gold arrow still ends on the screen edge as designed (-10 to -15).

Lesson for any sweep: summarize every page's rows with a sign-aware filter (results print as `+4`, so a
`/^-?[0-9.]+$/` match skips every overshoot); the Scotties summary was rechecked sign-aware and stands (198 heads,
outliers as recorded).

Other pages, by construction:

- Index, About, Contact: no connectors. The only arrow is the back-to-top button (CF113). Probe:
  `rg --count "data-case-study|portrait-artwork|zoomable-artwork|class=\"note"` finds 25 on Scotties and 38 on
  MenuMe (control) and none on the three pages. A first probe for "arrow|connector|squiggle|chevron" also found
  nothing on Scotties, so it proved nothing.
- Tales: every arrow is drawn inside a diagram image (age tiers, metrics, ecosystem, character studies, the three
  small illustrations; desktop, tablet and phone variants), so layout cannot move an arrow relative to its target.
  No asset SVG has live `<text>` (`rg "<text"` over `assets/*.svg` finds none; the same search finds 16 `<path>` in
  the age-tier diagram), so no font fallback can push a label into an arrow. Styles have no connector rule in the
  Tales blocks. All 14 diagram SVGs rendered in Chromium (`f20/tales-diagrams/shoot.mts`, sheets `sheet-a/b/c.png`)
  and the three ecosystem flowcharts looked at at 2x: every arrowhead stops short of its icon or dashed circle.

### Tooling limits

`touch-crops.py` picks the ink point nearest overlay ink farthest from the centroid; for the phone hi-fi connectors
at 560 and 639 it picks callout junctions, not tips. `touch-analyse.py` under-reads the dashed line thickness at
large scales (t 1 to 2 for 3 to 5 px lines), so depth 2 there can still be inside the line.

## Client batch, 2026-10-23 noon

The user answered the "run the simulator check?" question with the folder
`/var/home/user/xinyanchen-portfolio/Client screenshots 2026OCT231205/`: three new client shots, so the reply waits
for them.

### The client's instructions, as written (file name, then translation)

- CF123 "箭头根部刺穿了线框@Aquaticat": desktop MenuMe at 1920 by 946, Personalized Menu Flow: the arrow's root
  pierces the box outline (purple circle on the right edge of the Design Iteration box, where the gold elbow
  starts). Addressed to Aquaticat.
- CF124 "这里多了一个箭头。": iPhone (WeChat), MenuMe phone layout: there is an extra arrow here (purple circle at the
  right edge of the second My Preferences screen, beside its Allergies and Dislikes dashed box: a gold arrowhead
  with no line).
- CF125 "这个sitmap是不是无法居中？": iPhone, Scotties phone sitemap: can't this sitemap be centred? (The tree sits
  at the left with empty space to its right.)

### Fixes, 2026-10-23 afternoon

- `0366b74` CF123: the desktop elbow (`assets/menume-usability-desktop-connector-elbow.svg`, row `::after` at 982u,
  54u wide) drew its top line from x 1, 8 units inside the iteration's outer edge (991u), so it ran 4 px past the
  4 px border at 1440 to 2560 (3.2 at 1280; `eye/cf123-probe.ts`). The line now starts at x 7, ending in the middle
  of the border as the CF116 fix does; bend and head unchanged. Crops `eye/cf123/pair-*.png`.
- Why the audit missed it: the stab audit had only ever run MenuMe at 393, 430, 728 and 744. Control: the pre-fix
  tree (worktree `arrow-audit/old-cf123`, port 4189, unit `xinyanchen-old-cf123`) flags it at 1440 and 1920 (depth
  2.5) but not at 1280 (the 2 px threshold); `analyse.py` now takes `DEPTH` and `CORNER` from the environment.
  Full sweep of MenuMe and Scotties at 39 widths, 360 to 2560 (`arrow-audit/full-cf123/`, local 4173): at depth
  0.5 the Scotties note hits are the notes' own rounded corners (crop `scotties-700-127-38.png`), so the rerun
  skips ink within 24 px of a corner (`full-cf123-corner/`). Real finds, open: the MenuMe tablet elbow root starts
  0.9 to 3.2 px inside the iteration box at 960 to 1279; the MenuMe phone elbow head goes 1.1 to 3.5 px past the
  iteration's left border at 414 to 560.
- `7d7b355` CF124: the hi-fi preference screens image (`assets/menume-personalization-high-fidelity-screens.webp`)
  was rendered from `Desktop/MenuMe.pdf` (box x 738.5 to 1177.5, y 9594 to 10051 at 4 px per point, found by
  matching a fresh render, `f20/cf124/match.py`) with the desktop elbow's head (PDF path, tip 1165.99, 9678) on the
  second screen. Desktop's CSS head covers it; tablet showed it above its own head, phone showed it alone. Removed
  by `f20/cf124/fill.py`: the head triangle's pixels (1384) take the colour just below them in the same column (the
  dashed box has a gap there, dashes end at 9676.5 and restart at 9685.5), the dash end's rows kept; nothing else
  and no alpha changed. Two rejected attempts: replacing pixels from a PDF re-render with the path redacted (the
  redaction also removed dash pieces, and renders differ from the asset in 213,071 pixels). Crops at 393 to 1920
  `eye/cf124-corner/pair-*.png`.
- `18fe94a` CF125: phone sitemap: `.sitemap>ul` is `fit-content` with auto margins below 40rem. Scotties
  gaps equal on both sides at 320 to 639; MenuMe's phone sitemap was already centred; 640 up identical
  (`eye/cf125-probe.ts`, logs `eye/cf125-*.log`). Side finding: at 1280 a Scotties sitemap box runs 10.7 px past
  its figure (live too), to look at.
- `1f276d3` audit find: the tablet elbow (`assets/menume-usability-tablet-connector-elbow.svg`) top line now starts
  at x 10.5 (was 7.5), 2 units inside the iteration's outer edge: root in the border at 640 (2.4 px clear of the
  box interior), 744 (2.0), 1000 (1.5), 1279 (0.8). Crops `eye/tablet-root/pair-*.png`. Not yet checked in Safari.
- `de313aa` side finding: the Scotties desktop sitemap's columns are percentages of the design's 1086 px column but
  its boxes keep drawn widths, so below about 1410 Profile, Favorites and Cart ran up to 10.7 px past the column
  (1280), past the chevrons' end and 15 px off centre (`eye/sitemap-overflow.ts`, shots `eye/sitemap-1280/`). The
  third column is now `min(336/1086, 100% - 575/1086 - 171px)`. Nothing past the column at 1280 to 2560; box rects
  equal to live at 1412 and up, differ at 1280, 1400, 1408 (`eye/sitemap-rects-*.log`).
- `a28d9c1` audit find: the phone elbow head ends at 45.5 units plus 2 px (was 51.5). Audit `arrow-audit/phone104-before/`
  (live) against `phone104-after/` (local), 18 widths 320 to 639, DEPTH 0.5, CORNER 24: the head's 11 hits on the
  iteration box (414 to 620, 1.1 to 3.5 px) are gone. Remaining hits, unchanged and as designed: the elbow root
  crossing the hi-fi screenshot's frame to its dashed Dislikes box (0.6 to 3 px into the image box, crop
  `phone104-after-report/crops/menume-560-8-46.png`), and the opening squiggle in the intro note (reply choice 8).
  Head crops `eye/phone104-head/head-*.png`.
- Found by those crops, pre-existing and live: the head sits a fixed 126 units below the iteration box's top, but
  the box's text does not scale with the units, so the box is relatively shorter on wider phones (`eye/phone104-probe.log`:
  8 lines at 390, 5 at 560 to 620, 4 at 639); the head reached the bottom corner at 620 and fell 7.7 px below the
  box at 639. `8c72034`: the elbow moved from the subsection's `::before` to the iteration box's `::before`
  (absolute), head at `min(126u, box bottom - 24 px corner - half the head)`; advisor's ranking, clamp over
  proportional (45 % of the box everywhere would move the head at every width but 390; not offered to the client).
  Pixel diff `arrow-audit/phone104-v2/` against `phone104-after/` (`eye/pixel-diff.py`): identical at 320 to 480
  and 520 to 560, head moved at 580 to 639, 92 antialiasing pixels of the root at 500 (no visible move); crops
  `eye/phone104-v2/`.
- Safari 17.5 live, by eye (`eye/safari-cf123/`, zooms in `zoom*/`): CF123 root in the border at 1280, 1440, 1920;
  tablet root at 744, 1000, 1279; CF124 one head at 744, 1000, 1920; Scotties sitemap inside and centred at 1280,
  1360, 1440; CF125 centred at 393, 430, 520, 625; phone elbow at 393, 430, 560, 600, 625 (Safari wraps the box to
  4 lines already at 625, where the clamp holds the head on the straight edge). Not checked: the iOS 17 Simulator.
- Post-fix audit (advisor): `arrow-audit/phone104-v2-report/` (local, 320 to 639): no hits on the iteration box;
  the elbow is still in the A/B diff (its root's 17 image hits present; `hosts.json` tags the box's `::before`).
  `arrow-audit/post-fix/` (live, MenuMe, the sweep's 31 widths 640 to 2560) against `full-cf123-corner/`
  (`eye/report-compare.py`): the tablet root's 10 hits (840, 960 to 1279) gone, nothing new, 91 rows unchanged
  (the ones already judged intended). `full-cf123-corner` postdates `0366b74`, so the desktop root was never in it;
  the pre-fix control for that was `old-cf123`.
- Reply draft updated: sections "10 月 23 日这一批" and "23 October" (backup
  `/home/user/temp/agent/f20/reply-draft.before-cf123.md`).
- Cleanup: unit `xinyanchen-old-cf123` stopped, worktree `arrow-audit/old-cf123` removed, sessions xinyan10 to 25
  closed.
- `#106` sweep: viewed every raster next to a CSS connector (MenuMe personalization lo-fi and hi-fi, the six
  weekly-specials screens, Scotties lo-fi homepage and listing, Scotties hi-fi homepage): no other baked arrow pieces.

## Client batch, 2026-10-23 12:54, and the systematic pass

### The client's instructions, as written

Folder `../Client screenshots 2026OCT231254/` (iPhone, WeChat in-app browser, MenuMe):
- "CF1001 Why isn't this one shape?": finding bubbles 1 and 2; each outline visibly breaks where the tail joins.
- "CF1002 Why isn't this one shape?": bubbles 2 and 3, the same.

### The user, 2026-10-23

- "all this back and forth is harming my reputation. Despite you checking so much, we're still not looking hard
  enough ... There have been 7 rounds already." Asked whether the advisor would know more.
- Chose "Systematic pass first": hold the reply; the reply goes out once, after the pass.
- Is exporting the latest Figma file's phone and tablet frames (2x PNG or PDF) now; folder path to come. "Meanwhile
  you can still work."

### Diagnosis (advisor, accepted by the user's choice)

- Each round built a precise checker for the previous complaint's category; the client's next find is a new
  category. Most categories share one cause: a shape the designer drew as one stroke is assembled on the site
  from two or three pieces (image dashes plus CSS dashes, line plus separate head, outline mask plus tail mask), and
  every seam shows to the designer.
- The design-against-site pixel comparison only ever ran at the desktop design (1440); phone and tablet were
  walked by eye without the design frame beside the site. Five of the last six client finds were phone.
- The iOS 17 Simulator was asked about instead of run; phone checks go there without asking.

### Plan (queue)

1. Seam inventory from the CSS: every pseudo-element with `mask:` or an SVG background whose host or sibling also
   draws; per page and layout, decide one SVG path from the fig or keep with a reason. Output
   `f20/seams/inventory.md`.
2. The MenuMe finding bubbles: read how the fig draws them; one path, one mask. Known defects in the current two
   masks: the tail's left end sits about 18 drawing units above the outline's bottom line and 6 units in from its
   end; the right join meets exactly in the CSS math, yet the client's iPhone shows a gap, so reproduce it in the
   simulator before reasoning further.
3. A one-shape checker: connected components of each outline's colour inside its box (number disc hidden) must be
   one, at every width; then run it over every outline the site draws (clouds, Tales bubbles, elbows, boxes).
4. iOS 17 Simulator on m1 (one at a time, output on `/Volumes/MacData`) for every phone fix of the day and the pass.
5. Design-against-site diff at 390 and 744 for all four pages, from the user's exports, side-by-side sheets plus
   the deterministic ink diff.
6. Then the reply, once.

### Design exports from the user

The user exported every frame of the latest fig (17 zips, then two missing ones: Tales desktop and MenuMe
tablet). Organized into `../Design exports 2026OCT231305/` as `desktop/`, `tablet/`, `phone/` (PDF and PNG per
page; tablet "Contract" is the fig's own name for Contact), with the original zips in `zips/`.

### Step 2 done: finding bubbles, `a8acded`

- Cause, reproduced: the outline mask kept its drawing's aspect ratio (SVG default `preserveAspectRatio`) while
  the tail mask was placed by percentages, so any box taller than the drawing (a larger reader font: the client's
  photos show the text a line longer) moved the tail away from the outline. Chromium at 393 with the bubble text
  ×1.12 gives a 239 px box instead of 211.6 and six lines, matching the photos.
- Fix: one closed path (`assets/menume-finding-bubble.svg`, built by `f20/bubble/build.py` from the akar-icons
  chat-bubble geometry the fig uses, mapped X = 12.975x − 23.95, Y = 12.975y − 36.925), `preserveAspectRatio="none"`,
  on the `::before`; the `::after` tail and both old assets are gone.
- One-shape checker (`f20/oneshape/`): 117 captures (13 widths from 320 to 1920, text ×1, ×1.12, ×1.25, three
  bubbles): new 117 one shape; live before the fix 73 not one (2 of 39 at ×1, at 320; 32 of 39 at ×1.12; all at
  ×1.25). The old drawing also showed the tail's left stroke poking above the body at every size.
- iOS 17.0.1 Simulator, iPhone 15: new bubble whole at normal and ×1.12 text; the old build at ×1.12 shows the
  broken joins exactly as in the client's photos (`f20/oneshape/sim/bubble-4189-*.png`).
- Known limit: the stretched drawing thickens the horizontal strokes with the box's height ratio. Measured 4 px
  top and sides at ×1 and ×1.12, 5 px top vs 4 px sides at ×1.25 (`f20/oneshape/thick-local.txt`).
- Safari 17.5 live after deploy (`eye/safari-bubble/`): one outline at 393, 744, 1440. The Linux-side WebDriver
  tunnel had died with the network drop; restarted as unit `xyc-sonoma-tunnel` (`ssh -N -L 4454:127.0.0.1:4454 m1`).

### Step 4: iOS 17 Simulator on today's phone fixes

`f20/oneshape/sim-fixes.ts`, iPhone 15 (393), working tree as pushed, shots `f20/oneshape/sim/fix-*.png`:
- CF124: the second preference screen has no stray arrowhead.
- `a28d9c1`/`8c72034`: the phone elbow runs from the hi-fi screens to the iteration box's left edge; head on the
  straight edge, not past it.
- CF125: the Scotties sitemap tree is centred (gaps 205 and 210 device px of 1179).
- `dcd0c69`: the Excitement pillar ends on "layouts." alone; the chevron trail starts clear of it.

### Step 1 and 3: seam inventory and larger-text stress run (in progress)

- Inventory (Sonnet subagent, code reading only): `f20/seams/inventory.md`, 39 pieced objects, 13 high risk
  (TA1, TA2, ME2, ME4, ME5, ME7, ME8, ME9, SC1, SC3, SC6, SC7, SC8). ME4 is the bubble, fixed.
- Stress run: `f20/stress/capture.ts` sets every element in `main` to its computed font size × 1, 1.12, 1.25 (a
  reader's larger font, the CF1001 cause), at 15 widths 320 to 1920, and crops each high-risk object plus ME3, ME6,
  SC5, SC11 (unit `xinyanchen-stress`, output `f20/stress/run/`). `grid.py` makes per-object sheets (rows widths,
  columns factors) for review by eye. Next: review every grid; redraw as one shape or tie to one box what breaks.
- How the client's text got larger (fetched, not recalled): WeChat on iOS writes a percentage
  `-webkit-text-size-adjust` on `body` when the reader raises WeChat's font size; only rendered text grows, not em or
  rem widths and padding (juejin.cn/post/7127309064756789261; Wikimedia T222752 records the same body style). In the
  iOS 17 Simulator, `body{-webkit-text-size-adjust:112%}` on the old two-piece bubble (`4191`) detaches the tail
  exactly as in CF1001/CF1002 (`f20/oneshape/sim/tsa-112-4191-findings.png`). So the client most likely reads with
  WeChat's text enlarged, and every drawn shape holding text must survive it. Rig: `f20/oneshape/sim-tsa.ts <pct>`.
- Rig pitfall: port 4190 is on the Fetch "bad ports" list (ManageSieve); Safari answers "couldn't connect" although
  curl on m1 gets 200. Use 4192 and up.
- Findings so far, each checked on a crop (detail and paths: `f20/stress/findings.md`):
  - TA2 Tales Challenge notepad: from x1.12 at every phone width, and at x1.25 on desktop, the purple outline keeps
    its x1 size centred in the taller box, so the copy runs through the rings and out the bottom. Probe: the box grows
    238 to 271 to 333 px at 390 while the drawing does not (`f20/stress/probe/box.log`).
  - TA1 Tales Key Insights bubbles: the box keeps its height (307 px at 390 at every factor); the copy runs past the
    round outline at x1.25 on phones and from x1.12 at 640 to 744 and on desktop.
  - ME2 pot icon on "ritual" at 320 (even at x1); ME2/ME3 "Culinary Framework" label under both boxes at tablet
    x1.12; ME5 persona scribble through text at 320 (x1) and at larger text to 744.
  - ME8 desktop (1279 up): no gold arrow from the Design Iteration box to the Ground Beef card, which the latest
    desktop design draws.
  - Not defects: the ME4 bubble tail corner (the design's own tail is a separate stroke poking in); the ME5 photo
    frames' doubled outline (baked into the client's photo files).
- Landed `36e40e7` (merge carrying the fix): the desktop Weekly Specials arrow from Design Iteration to the Ground
  Beef card (rule from `a16d9ff`) never rendered; `4157a03`'s second-row `content: none` outweighed it. Tip on the
  dashed line at 1280, 1440, 1920 (Chromium, `f20/stress/probe/me8-head-*.png`). Safari check pending. Still no
  connector between 1092 and 1279 (queued).
- Verified design deviations awaiting the user's choice (detail in `f20/design-cmp/triage.md`): Tales phone citation
  boxes (inner padding about 27 CSS px against 12, extra bullet gaps); Scotties phone brand box (site about 350 by
  245 against the design's 241 by 307, splat hidden); tablet river (desktop drawing scaled, lines half as thick);
  MenuMe badge "4" (Abril's hairline 4 against the design's Apple LiGothic); tablet corner art 14 to 17 px taller.
- Queued inferable fixes: ME2 pot over "ritual" at 320; ME2/ME3 "Culinary Framework" under the boxes at tablet
  x1.12; ME5 scribble on "Mom" at 320; MenuMe 1279 x1.25 recapture; Scotties stress grids (unit
  `xinyanchen-stress3`). Lesson: a reviewer subagent overwrote `f20/stress/crop.py`; briefs now say to create or
  change no file outside its crops directory.
- Fix direction under test (`4193` in `sim-tsa.ts`): shapes whose copy must fit the drawing opt out of the reader's
  enlargement with `-webkit-text-size-adjust:100%`, versus outlines that follow a taller box. A user decision, since
  it trades the reader's larger text against the drawn fit.

### Step 5: design against site at 390 and 744 (in progress)

- `f20/design-cmp/capture.ts` (full-page Chromium shots at 2x plus heading positions) and `sheets.py` (cut design
  export and site at matched headings, side by side): 231 sheets in `f20/design-cmp/sheets/`, section heights in
  `sheets.log`. Four Sonnet reviewers are listing every visible difference per page group into
  `f20/design-cmp/review-*.md`; each finding gets verified here before it counts.
- Checked so far: the phone Contact gap above Send is the required hCaptcha box (blank on `127.0.0.1` captures); the
  inputs are 48 px tall against about 36 in the design (open, to triage with the review).
- Capture faults the review exposed (so the sheets were redone): agent-browser `screenshot --full` swapped Home's
  `<picture>` corner art at 744 to the phone file (a second logo over "Hello", art cut at 622 px), while a viewport
  screenshot at the same width is correct; and Home's intro animation needs about 6 s. New capture:
  `f20/shot/fullpage.ts` (real 4000 px viewports, stitched; fixed elements hidden after the first tile) plus
  `SETTLE=9000`; output `f20/design-cmp/site-v2/`, `sheets-v2/`. The stress run uses it too (unit
  `xinyanchen-stress2`). Never use `screenshot --full` for evidence on this site.
- Triage of reviewer findings: `f20/design-cmp/triage.md` (artefact, agreed, design slip, or open, with evidence).
- M6 done (tablet rivers). From 640 to 1279 the site used the desktop drawings scaled down, so Home's three river
  stripes ran out of the gold band onto the white. Both pages now carry a `(40rem<=width<80rem)` source cut from
  the tablet export (`pdftocairo -svg`, layers by path index; scripts in `f20/river/`):
  - Home intro river, `e8ae32f`: seven `home-tablet-introduction-wave-*.svg` files, 744 by 262, plus an
    `aspect-ratio: 744 / 262` rule for that range. Chromium 640/744/1100/1279 use the tablet file and 1280 the
    wide one; Safari 17.5 at 744 and 1100 is correct once the reveal animation ends (`WAIT=8000`).
  - Contact email divider, `0cbc73e`: six `contact-tablet-email-divider-*.svg` files, viewBox `313 299 339 50`;
    no CSS change, since the source's width and height give the box its shape. The tablet export draws the flower
    as a raster, so the desktop vector flower is scaled (0.4742) onto the raster's square; the far corners agree to
    0.01 px. The composite differs from the design render in 7 of 271,200 pixels at 4x (10% fuzz). Chromium
    640/744/1100/1279 use the tablet file (1279: 627 by 92.4) and 1280 the wide one (627 by 86); Safari 17.5 at
    744 and 1100 is correct.
- M2 done (tablet top corner), `a37a7ed`. Home, About and Contact share one corner drawing, and their tablet
  frames carry the same two paths (purple under clip `0 0 744 77`, grey under `0 0 744 134`). The new
  `home-tablet-top-corner-decorations.svg` (744 by 134, top right anchored) serves `(40rem<=width<80rem)`; the
  desktop height formula now starts at `width>=80rem`, so the tablet file keeps its ratio (115.3 tall at 640, 230.3
  at 1279, then 261.8 for the wide file at 1280). Composite against the design render at 4x right of the nav: 29 of
  696,800 pixels differ. Chromium 640/744/1100/1279/1280 on all three pages shows no contact with the nav or the
  headings; Safari 17.5 Home 744 and About 1100 are correct.
- M3 About's shift: fixed by the same corner commit. About 744 against the About tablet render, right of the nav:
  0.05 of 45,560 pixels differ; a 3 px shifted control gives 246.
- MenuMe badge "4": done earlier in `b744c1a` (Inter Medium numerals); triage marked.
- Tales phone closing logo, `ede6950`: 264 px wide and centred, 58 px under the copy (fig 2332:50901). Chromium
  390: x 63, 264 by 75.8, gaps 58 and 70 (design 58 and 68); 744 unchanged; 320 fills its 252 px column.
- Tales phone Key Insights, `5576184`. The latest fig sets each bubble's copy in one size (14 px, title bold),
  left-aligned on 28 px lines (`fig-parse/node-runs.mts` prints a text node's styled runs); desktop alone sets the
  title 2 px larger. Phone bubbles measured on the export (`f20/design-cmp/keyins/bounds.py`): outlines 295.5 and
  278 px wide. The phone rule sets the widths, offsets and insets (`flex: none`: the row's `flex: 1 1 240px` had
  stretched them to the column), moves Trust's fill 7.5 px out as the export draws it, and holds the pair at the
  322 px column past 390, centred, so the copy keeps the 390 lines (with the 1em cap and a growing bubble,
  "stories." re-joined its line and hit the notch from 432 to 456). Bubble-fit checker 320 to 639 by 8 plus
  390/393/744/1280/1440: 0 of 90 as written (first attempt: 52 flagged); 2 single-pixel flags in forced wrapping
  with the same line widths, read as noise.
- Tablet Key Insights titles, `324e90b`: 14 px like the copy, as Tablet Tales sets them (fig 2197:7938 and
  2197:8067); bubble-fit checker 0 of 80 flagged; Safari 744 checked.
- Tales phone personas, `41dcff5`: photos 280 px wide, copy inset 40 and 21 px, as Phone Tales draws them; two
  `&nbsp;` glues end the strays ("busy daily routine.", "medical terms."). Boxes within 1 px of the design; orphan
  probe 0 (9 before the glue).
- Tales long section titles, `a035e84`: Core Solution, Digital Touchpoint and Campaign titles at 22 px growing to
  30, held to a 292 px measure at phone; "Campaign & Impact" glued. Measured at 390 and 744.
- Tales Doodle mockup, `4aa3201`: 290 px wide at phone, 386 from 640 up (was the column); bezel within 2 px of the
  design at 390 and 744.
- Citation boxes: already done in `78bfba1`; live x 20, width 350, padding 15/16 match the design.
- Tales impact strip, `c98860f`: rings 56, 54.5 and 80 px at 390, 744 and 1440 (were 61, 61, 86); phone band 74
  (was 84; three title lines still fit, paired paragraphs stay level 320 to 639); desktop stems 34 (were 31).
  Measured with `f20/impact/ring.py` on 2x renders of the design PDFs against 2x Chromium shots: site 56/24/73.5
  against design 56/23.5/73.5 at 390, 54/25/71.5 against 54.5/23.5/72 at 744, 80/34 against 80/34 at 1440.
- MenuMe phone bulb and label, `28c15ee`: the dual-loop drawing 145 px (bulb 75 px as Phone MenuMe draws it, was
  93), the label 16 px on 32 px lines (fig 2365:68709, was 18 on 28), 27.5 px under the bulb's base bar. Chromium
  390 on 2x renders: bulb 75 by 88.5 against 75 by 87, label 147.5 px wide on both, gap 28 against 27.5.
- MenuMe question disc, `9596951`: all three designs place one 138 by 140 bitmap ("image 102") whose teal circle
  fills about 86 percent of the box, with a hollow outlined "?". Redrawn by hand (no tracing) in
  `assets/menume-teal-question-mark-disc.svg`: circle r 43 at (50, 48), the mark a white stroke under a narrower
  teal one. Chromium 390: circle 49 by 48.75 at 267 to 316 and 10.7 to 59.5 in the quote box, against the design
  49.6 by 49.8 at 266.5 to 316.1 and 10.6 to 60.4.
- MenuMe phone usability squiggles, `539ebb2`: both were an old auto-traced squiggle (42.5 by 81 px, about two
  thirds of the design's ink). Each is now cut from Phone/MenuMe.pdf (`pdftocairo -svg`, two filled paths apiece,
  `f20/arrows/cut_paths.py`), placed by its ink box: `menume-usability-phone-squiggle-personalization.svg` 50.5 by
  82.9, 15.75 in and 14.25 under its screen; `...-weekly-specials.svg` 59.6 by 87.5, 131.25 in and 22.9 under.
  Chromium 390: ink 49 by 81, 1070 px² against the design's 50 by 82, 1096.
- Scotties brand box dashes, `46c273f`: the fig sets "Rectangle 65" to a 5 px inside stroke with dashPattern
  [20, 20] and radius 50 (`fig-parse/node-stroke.mts` prints stroke fields). A dashed border cannot set dash
  length, so `assets/scotties-positioning-note-dashed-outline.svg` (a 10 px stroke on the box edge, half clipped)
  draws it over a transparent 5 px border. Chromium 390: dashes 20, gaps 20; the box is still 241 by 309 at x 56.
- Lesson: the review sheets (`sheets-v2`) predate several fixes; measure the live site before acting on a triage
  item (citations were already right).
- Lesson: never wait on `pgrep --full <pattern>` when the pattern also appears in the waiting command; the wait
  matched its own shell three times this round and sat until its timeout.
- Tales Doodle demo pill, `e6a5586`: 21 px each side of its 14 px label, as Phone and Tablet Tales draw it (178.5
  and 180 px wide); Chromium 178.8 at 390 and 744 (was 168.8). Desktop keeps its 250 px minimum.
- Copy items from the triage, kept as written: "behavior" (the pages use American spelling throughout) and "12 years
  old" (the design's "under 12-year-old" is ungrammatical); both read as design slips.
- Safari 17.5 batch (`f20/safari-batch/run.ts`, shots `f20/safari-batch/*.png`): Tales 744 impact strip, Key
  Insights, Core Solution title and Doodle; Tales 1440 impact strip; MenuMe disc and Scotties dashes at 744 and
  1440. All render as in Chromium.
- iOS 17.0.1 Simulator pass (`f20/sim17/sim-inject.ts r1023`, shots `sim17-r1023-NN.png`): impact strip, Core
  Solution, MenuMe disc, bulb and label, both usability squiggles and the Scotties dashes read right. It found
  "stories." alone on the last line of the Play bubble (Key Insights); Chromium agreed at 320 to 639 and 1280.
- Tales Play bubble, `fae2f76`: `threatening&nbsp;stories.` now breaks "engaging, non-" / "threatening stories."
  (Chromium's own break at 1100). Bubble-fit checker 0 of 72 flagged from 320 to 1920, balanced and greedy.
- Lesson: agent-browser screenshot paths must be absolute even when the capture script runs from the output's
  parent folder (`capture.mts` failed with "No such file or directory" on a relative out dir).
- Running: `f20/impact/orphan-sweep.ts` (every visible text block of two or more lines whose last line is one word;
  positive control `CONTROL=1` brings back "stories." at 320) on all six pages at 57 widths, logs
  `orphan-a.log` and `orphan-b.log`. The control run alone found about 20 such body paragraphs on Tales at 320,
  and the iOS 17 frame of the Tales outcomes shows "resources." alone at 393. Plan: glue the last two words
  where flagged, re-sweep, then Safari and Simulator.
- Simulator re-shoot `r1024`: the Play bubble ends "threatening stories." clear of the notch; the Doodle button
  and the Thank-you footer read right.
- Tales single leaf, `be0af05`: every design leaf is 21.75 px tall with a 3 px stroke at 390 and 744 (Ages, Poster,
  persona names, Channels labels); Desktop Tales draws heading leaves 26.5 px and persona leaves 29 px, still 3 px.
  Ours had a 2 px stroke. Redrawn by hand along the centre line of the Tablet Tales outline (paths 204 and 205 of
  `pdftocairo -svg`) as a 3 px `vector-effect="non-scaling-stroke"`, so the stroke stays 3 px as the glyph grows.
  Checked in Chromium (390, 744, 1440), Safari 17.5 (744, 1440) and the iOS 17 Simulator (`r1025`). Open, low:
  Desktop Tales draws The Challenge and the Channels labels with a veined leaf.
- Design verdicts recorded in `triage.md`: About bold extent differs between the design's own frames (site kept);
  the Tablet Contact Send pill is lighter than Phone and Desktop (site kept).
- Stray last words (task #117): `f20/impact/orphan-sweep.ts` flagged 147 elements across the six pages at 57
  widths (`orphan-groups.txt`). Kept as drawn: two-word labels in the MenuMe flow chart and Scotties sitemap, and the
  impact title "Behavioral Normalization" (Phone Tales breaks it after its first word); list in
  `f20/impact/glue-exclude.txt`. `glue.py` joined the last two words of the rest with `&nbsp;` (123 places, plus
  `Nurse&nbsp;&amp;&nbsp;Mom` and the jump list's `Campaign&nbsp;&amp;&nbsp;Impact` by hand, so no line starts
  with "&"). Bubble-fit checker after it: 0 of 80. Commits: `03d2adb` Tales, `c0aa129` MenuMe, `eed0238` Scotties,
  `abf7111` Home, About and Contact. Two subjects miscount (Tales; MenuMe is 46, not 47); corrective comments
  [03d2adb][03d2adb-correction] and [c0aa129][c0aa129-correction]. Re-sweep: nothing left but the excluded labels.
- Lesson: the glue made two MenuMe phone findings overflow at 320, and the sweep's OVERFLOW lines showed it before
  the commit; read those lines before committing any glue. A soft hyphen is no remedy: browsers break at it
  whenever the prefix fits, so `hier&shy;archies` split at most widths up to 1920 (`f20/impact/shy-check.ts`).
- Lesson: `safari-shot.ts` sets `innerWidth`, which includes the VM's classic scrollbar (15 px), so a 320 run lays
  out at 305; pass 335 for a 320 layout. Selectors must have a box: `display: contents` rows do not scroll.
  Even at 335 the page scrolls sideways by 8 px there, because `100vw` (335) still counts the scrollbar and the
  phone art unit grows from it (the Weekly Specials iteration ends at 328; `f20/badge/safari-eval.ts` with
  `overflow-probe.js`). Rig only: iOS has overlay scrollbars, Chromium at 320 gives scrollWidth 320, and desktop
  Safari windows cannot be that narrow. Safari 17.5 at a 320 layout otherwise: both findings fit, the Daniel persona
  clears the scribble (`f20/impact/safari/me-335-*.png`).
- #114 at 1x, landed:
  - `94affff` Tales: impact strip, Challenge pad and device pair capped at `100vw - 40px`; no page overflow on any
    page at 320 to 1440, image ratios unchanged.
  - `064f9c8` MenuMe personas below 390: the text keeps the scribble's 97 px lane and the subtitle shrinks with the
    art (13 px at 320); 390 measured unchanged (225 px text, 16 px subtitle).
  - `faf5638` MenuMe Weekly Specials: the tablet flow now holds to 80rem, so 1092 to 1279 has both squiggles and
    the elbow to the Ground Beef card, as the Tablet frame draws. Tip on the dashed line at 1092, 1150, 1200, 1279
    in Chromium (`f20/impact/me8tips/tips-sheet.png`) and at 1200 in Safari 17.5 (`f20/impact/safari/`).
  - `38f66cb` MenuMe phone findings: side padding shrinks faster than the box below 390, so the glued pairs fit at
    320 (15 px padding, about 1 px slack); 390 and wider unchanged.
  - The MenuMe pot near "ritual" at 320 already clears it.
  - Left as is: "Core Task Flows (Logic & Decision Frameworks)" overflows its 252 px column by 3 px at 320 only
    (`f4b4150` keeps the Phone frame's break); it is centred, so it reaches 1.5 px into a 34 px gutter, no scroll.
    The 2 px `a` and the "What should I cook tonight?" h3 OVERFLOW lines predate this work.
- Next: the layer removal (#115), then `triage.md`'s Scotties items.

### Scotties design pass and layer-removal checks

- Scotties phone type and palette panels, `c3c56a0`: the Phone design's panels are one raster (xref 58 in
  Phone/Scotties.pdf, extracted with its soft mask) at 1228 by 606; a `(width < 40rem)` source serves it as
  `assets/scotties-type-specimens-and-brand-color-palette-phone.png`. This also clears the cone overlap.
- Scotties intro chevron strip, `e39e01d`: 15 px tall below 1280 (20 on desktop), 86 px under the buttons and 76
  above the jump list at 390 and 87 and 80 at 744, as the designs draw it; desktop unchanged.
- Scotties phone Core Challenge, `ebab562`: measured on the Phone design's pixels from the heading's ink top
  (`f20/scot-ty/phone/rows.py`, a colour-band analyzer), chevrons 65 (ours 64.5), cloud 130 (130.5), skate 23 under
  the cloud (24). The cloud copy keeps its 40 px top: at the drawn 49 its last line falls through the cloud's
  foot, seen by eye though the band numbers looked fine. Checked by eye at 320, 375 and 390.
- Em dashes, `bb9a62f`: a word joiner (`&#8288;`) before every body-text em dash. Before: Scotties started a line
  with "—from" at every width from 1408 to 1920. After: `f20/impact/dash-sweep.ts` finds no line starting with a
  dash on any page from 320 to 1920 by 16.
- Scotties green dashed boxes, `eb9f3e8`: fig "Rectangle 73" and "74" are 5 px inside, dashes [20, 20], radius 50
  in all three designs (`fig-parse/dash-all.mts` lists every dashed node with its frame chain). Same SVG approach
  as the brand box. Three padding overrides had the 4 px border built in (`- 4rem / 16`), and the desktop hi-fi
  insets are tuned to the design's wrap, which gained a line at 1440 until they gave the pixel back. Box rects
  identical to HEAD at 13 widths (`f20/scot-ban/box-rects.ts` against a `wt-nl-head` worktree).
- Kept: the phone Visual Strategy banner's flatter notch. Phone/Scotties.pdf draws every banner's chevrons with the
  same horizontal geometry and sets their height to the band, so the single-line band's chevrons are the two-line
  drawing squashed to 74 %. Our SVG matches the two-line phone bands and all tablet bands exactly. Matching it
  would stretch the art. Details in `f20/design-cmp/triage.md`.
- Layer removal (#115), Chromium: 0 differences on all six pages at 10 widths, menu closed and open
  (`f20/nolayer/head-plain.log`). Positive control (`wt-nl-ctl`, 1 px more padding on a MenuMe finding): 122
  differences at 390, so the diff can see a change. States variant (hover, focus, active on every control): 0
  differences (`f20/nolayer/states.log`). Safari 17.5 run in progress (unit `xinyanchen-nolayer-safari`, log
  `f20/nolayer/safari-head.log`); the unwrap lands only when it reports 0.
- Scotties lo-fi skate icon, `b33a123`: 77.5 px wide, 45.7 in from the box's right and 33 above it on phone and
  tablet; 87.6, 15.5 and 37.6 on desktop. The phone size is capped at 390's, since it grew into the heading at 639.
- Lo-fi listing wireframe, `a534bf0`, and hi-fi homepage screenshot, `b7bcab3`: a 1 px sage inset outline. Every
  design strokes both 1 px inside (`fig-parse/image-strokes.mts` lists every stroked image node); the listing
  file was cropped at its right edge in `aba53f4`, and the hi-fi PNG has no frame of its own.
- Phone hi-fi chevron trail, `9a8d0b1`: 31 px under the last callout (design 31.5), 25 above the link (25.8).
- Key Learnings badges, `e7cb96f`: 120 at 390, 144 at 744 (the tablet design), 164 at 1440; icon 56 %.
- Dotted chevrons, `3b9d075` (Core Challenge) and `8697985` (hi-fi trail): the fig strokes both 3 px with [3, 3]
  dashes at their drawn size; ours scaled with the art down to 1.3 and 1.8 px and read as faint fine dots. Now a
  3 px `vector-effect="non-scaling-stroke"` dash. Needs the Safari check (non-scaling stroke in a CSS background
  SVG).
- Moodboard frame, `05c575d`: Tablet and Desktop stroke it 5 px inside; the file's own frame (20 of 3924 px)
  renders 3.2 at the tablet's 624, so a 5 px inset outline from 640 up.
- Checked, no change: "exact specs." is already glued (`&nbsp;`); the heading icon gap follows the fig (3, 11, 19 px
  from the text), not the review's 14.
- Tales veined leaf, `9dabcd3`: every design draws The Challenge with a filled leaf whose vein tapers inside it (19,
  19, 27 px), and Desktop also the Offline and Online Channels labels (17.7). The glyph is the designs' own path,
  copied from Desktop/Tales; leaves were told apart by box in all three PDFs (`f20/leaf/veined/inventory.py`).
- Home Echoes poster frame: the gold double frame was the export's 32 fill pieces, so every 45 px join showed as a
  faint light line (review L1). Redrawn by hand as one 4.8 px stroked path; 4x renders old against new differ only on
  the old joins and the arcs' edge anti-aliasing (`f20/echoes/frame-diff.png`).
- Seam scan: `f20/echoes/abut-scan.py` lists same-fill paths whose boxes share an edge. On every SVG asset it flags
  the old Echoes file (40, the control) and only the Tales ecosystem diagram's 14 px QR icon, which shows no seams
  at 12x. Limit: it reads absolute M/L/C paths only; files using H/V or relative commands are skipped.
- Cascade layers removed, `c6ba439`. Safari 17.5: 54 page-widths, 0 differences (`f20/nolayer/safari-head.log`).
  Chromium re-run on the content of `417ca00`: 120 plain and open-menu checks and 24 state checks, 0 differences
  (`head2-plain.log`, `head2-states.log`). The repo's unwrapped file was byte-identical to the tested candidate.
  Safari 17.5 on exactly what shipped, `c6ba439~1` against `c6ba439`: 54 page-widths, 0 differences
  (`f20/nolayer/safari-shipped.log`). Worktrees `wt-nl-*`, `wt-nl2-*` and `wt-nl3-*` removed.
- Safari 17.5 second and third batches (`f20/badge/batch2/`, `batch3/`): phone type and palette panel, intro strip,
  lo-fi dashed box and skate icon, hi-fi dashed box, the hi-fi trail end (its dotted chevron, clear of the last
  callout and above the links) and the brand box, at 390, 744 and 1425. Every Scotties item in the reply draft's
  design-pass bullet now has a Safari shot.
- Safari 17.5 batch of this segment's fixes (`f20/badge/batch1/`, layouts 390, 744, 1425): 3 px dots on both dotted
  chevrons (the non-scaling stroke works in a CSS background SVG), hi-fi and listing frames, moodboard 5 px frame,
  badges, veined leaf at The Challenge and on desktop Channels, Echoes frame without seams. iOS 17.0.1 Simulator
  (`f20/sim17/seg24/`): Core Challenge dots, listing frame, veined leaf, all as in Safari.
- iOS focus zoom, now settled by source: WebKit's `_zoomToFocusRect` (`Source/WebKit/UIProcess/API/ios/
  WKWebViewIOS.mm`) scales to `16 / fontSize` when scaling is allowed. The Contact fields are 15 px on phone and the
  viewport allows scaling, so a tap zooms the page to about 1.067. Decision, 2026-10-24: the user chose "Keep 15
  px" over 16 px field text on phones. Do not raise it again or add `maximum-scale` (that blocks pinch zoom).
- Reply draft: this segment's fixes added (both languages).
- In progress (2026-10-24, after the user asked "You sure the client isn't gonna find more problems?"): a whole-page
  by-eye sweep after today's commits. Safari 17.5, unit `xinyanchen-safari-sweep24`
  (`f20/badge/safari-tiles.ts`, tiles in `f20/sweep24/safari/<inner width>/<page>/`), inner widths 405, 759, 1935,
  335, 654, 1107, 1295, 1455 (layouts 390, 744, 1920, 320, 639, 1092, 1280, 1440). Then the iOS 17 Simulator on the
  phone pages, then the enlarged (tap-to-zoom) views, which carry the new 1 px and 5 px outlines but were never
  looked at. Findings go to `f20/sweep24/findings.md`.
  - 2026-10-24: the WebDriver and page tunnels to m1 had died. Restarted as units `xyc-sonoma-tunnel`
    (`-L 4454:127.0.0.1:4454 m1`) and `xyc-m1-site-tunnel` (`-R 127.0.0.1:4173:127.0.0.1:4174 m1`, so the guest's
    `localhost:4173` reaches the no-store server on Linux 4174). Checked: `/status` ready, styles.css served with
    the no-layer header.
  - m1 swap at 5 of 6 GB during the sweep: the Simulator pass waits until the VM is idle, never alongside it.
  - Finding class: the #117 last-word glue (`&nbsp;` before the last word) can move the lone word one line up at
    other widths, or leave a hyphenated compound's back half alone ("real-" / "world"). Seen in Safari at 390:
    MenuMe's two Usability Finding boxes ("world", "ambiguous"), Tales Potential for Impact 03 ("adolescent").
    Safari and Chromium break these lines differently (Chromium shows the same boxes at other widths), so choose
    glue fixes from Safari measurements only. Detector: `f20/sweep24/strand-scan.js` (rendered lines per block),
    run in Safari by `f20/badge/safari-strand-scan.ts` (unit `xinyanchen-safari-strand`, queued on the VM lock
    behind the sweep, output `f20/sweep24/safari-strand.jsonl`), filtered by `f20/sweep24/strand-filter.ts`
    (patterns "moved" and "half"). Chromium run: `strand-scan.jsonl`.
    Safari result (`f20/sweep24/safari-strand-filtered.txt`, 20 widths): lone words or split compounds in MenuMe
    (real-world, ambiguous, Personalized Menu Flow heading, lightweight) and Tales (in-backpack, adolescent,
    progressive, Well-Being). Hyphen breaks that leave two words on the next line are normal and kept. "The Core
    Product: / Double-Sided / One-Pager System" at 320 kept: no arrangement fits fewer lines.
  - New class, text painted over by decoration (Safari, 320): Home's grey river covers "Men" of MenuMe's
    description; Contact's footer wave covers "Chen" of "© 2026 Xinyan Chen". Detector `f20/occlude/occlude.py`
    (Chromium via Python Playwright, `bypass_csp`; four paint-only screenshots per tile). Positive control caught
    both. Full run: unit `xinyanchen-occlude`, 27 widths, `f20/occlude/all/report.jsonl`.
  - New class, sideways scrolling in Safari only (Chromium: none at 16 widths, `f20/occlude/overflow-chromium.log`):
    MenuMe 320/360/375 ("2. Weekly Specials Flow" heading and the note after it, 8/3/1 px), Scotties 320 (Core Value
    Proposition heading, 1 px), Tales 320 (age timeline figure, 3 px). `f20/occlude/overflow-safari.log`; box
    chains by `f20/occlude/chain-probe.js` through `f20/badge/safari-probe.ts`.
  - Lesson, test rig: the Sonoma VM's Safari showed classic scrollbars (virtual mouse, `AppleShowScrollBars`
    unset), so `100vw` was the layout width plus 15 and every `vw`-based size (`--phone-art-growth`,
    `--phone-tablet-reference-growth`) was computed for a wider screen than the layout. That made the Tales
    figures run 3 px off-screen at 320 in the VM only (iPhones overlay their scrollbars). 2026-10-24: set
    `defaults write -g AppleShowScrollBars -string WhenScrolling` in the guest (revert:
    `defaults delete -g AppleShowScrollBars`), then `killall Safari` and the safaridriver kickstart. Checked:
    `innerWidth` equals `clientWidth` at 320 and 390. Since then pass layout widths directly (no +15).
  - Sideways scrolling, rerun with overlay scrollbars (`f20/occlude/overflow-safari2.log`): none on any page at
    16 widths 320 to 1920. The earlier Safari overflow was the scrollbar artifact; the classic-scrollbar run is the
    positive control.
  - Text under decoration, fixed: `7b18ea8` (Home project copy above the phone side waves), `7415285` (footer text
    above the footer wave). The overlap detector finds 0 at 320, 340, 360 on all six pages after; the full run found
    nothing else from 360 to 768 (beyond still running at the time).
  - Glue, fixed from Safari variant scores (`f20/sweep24/variants-score.ts` over `variants2.jsonl`,
    `variants3.jsonl`; 26 widths): `89526ba` MenuMe "Flow:&nbsp;Expanding" and "and&nbsp;lightweight", 0 one-word
    lines at any width. Still open: real-world, ambiguous, Tales cards (`variants4.jsonl` queued).
  - New class, title text on a white notch or under a neighbouring shape. Detector: `f20/badge/safari-banners.ts`
    (Safari screenshots plus line boxes) and `f20/occlude/banner-foreign.py` (pixels in a line's middle that are
    neither text, band, nor a blend). Scotties "Wireframing Execution" (glued into one line against the phone
    design's two) ran onto the notch at 320 to 540, 390 included; below 390 the titles kept their size while the
    chevrons kept 26%. Fixed in `59fea15` (glue removed; band type, line and padding shrink with the screen below
    390). Kept: "Key Learnings & Strategic Reflection" touches the notch at 390 and 744 exactly as the phone and
    tablet designs draw it. Safari recapture after `59fea15` (`f20/occlude/banners-after/`): Wireframing clear at
    every width; below 390 each band now matches its 390 look. At 640 "Reflection" still ran 44 px onto the notch
    (tablet type fixed at 24 px from 640 to 744 while the chevron is 26%): `331a80c` shrinks the band's type, line
    and padding below 744 the same way. Its Safari recapture (`banners-after2/`, 639 to 768) was queued when this
    was written. The 640 "Research & User Personas" hit is a capture artifact (line boxes measured before the persona
    photo loaded and moved the page); recheck it by eye.
  - Tales "Scalable Community&nbsp;Reach" ran under the previous arrow's tip at 320, and the card copy's glued
    endings ran past their columns at 320 to 393 and 640 to 700. Variant scores (`variants4.jsonl`) showed ungluing
    only trades the overrun for one-word lines. Root cause, as with the banners: the impact strip shrinks with the
    screen below 390 and from 640 to 744 while its words did not. `d501ff0` scales card titles and copy
    with the strip there (`--card-shrink`); unchanged at 390 to 639 and 744 up. Trade-off accepted: card copy is
    11.8 px at 320 (was 15), 13.6 at 360, 14.4 at 375; no iOS 17 iPhone is 320 wide. Safari checks queued: units
    `xinyanchen-safari-cards` (`f20/occlude/cards-after/`, run `banner-foreign.py` on it) and
    `xinyanchen-safari-textover2` (`textover-safari2.log`, compare with `textover-safari.log`).
  - New class, Chromium only: no self-hosted face has U+2011, and Chromium draws Abril Fatface's from a fallback
    font (heavier bar; MenuMe "Cross‑Device" heading). Playfair faces and all of Safari draw the font's own hyphen
    (`f20/occlude/hyphen-safari.log`, equal widths). Fixed in `ca044fd`, the MenuMe heading, with a hyphen plus word joiner
    (U+2060): in both engines as wide as the plain hyphen and unbroken (`f20/occlude/wj-probe.js`,
    `wj-safari.log`). The other no-break hyphens are all in Playfair and render correctly in both; left as is.
  - Still open in the glue class: MenuMe "real-world" (every variant so far leaves a one-word line somewhere) and
    "ambiguous" ("and&nbsp;ambiguous" left lone words only at 360 and 375). Round five with word-joiner variants
    queued as unit `xinyanchen-safari-variants5` (`f20/sweep24/variants5.jsonl`, score with
    `node variants-score.ts variants5.jsonl`). Tales "adolescent" and "progressive" need rescoring after the card
    scaling, which changed their line breaks below 390.
  - Results (2026-10-24 evening): tablet banners after `331a80c` touch the notch in proportion to the 744 design
    from 640 to 768 (103 to 149 px, was 339 at 640); the 640 "Research" flag is a capture artifact, clear by eye.
    Tales cards after `d501ff0`: 0 of 32 titles over another shape; overruns left: "institutional resources." 5 to
    7.6 px into the card's empty tip padding at every phone width (as at 390, fine by eye). MenuMe notes fixed in
    `179e474`: "real-&#8288;world" without end glue (never splits; last-line "restrictions." at 414, 639, 820,
    1180, 1280, 1366) and "and&nbsp;ambiguous" (lone word only at 360 and 375). Tales "adolescent" and
    "progressive" left as is: the narrow two-column cards hold one-word lines at every phone width ("steadily",
    "support", "preventative" at 390), which no single glue removes. Correction ([d501ff0-correction]): the cards
    do not keep their 390 breaks below 390, because the copy's side padding (15 and 24 px) does not shrink with the
    text; at 320 card 03 ends "encounter / adolescent / peer pressures." Nothing overruns or overlaps.
  - Chromium overlap run complete (162 page-widths, 320 to 2560): one new hit, MenuMe My Core Contributions at
    1366, the orange "1" badge over "presets." at the end of card 1. Safari check of those cards at 12 widths
    queued after the tiles (unit `xinyanchen-safari-contrib`, `f20/occlude/contrib/`; `banner-foreign.py` now takes
    the commonest colour as the band for text without a background).
  - Fresh Safari tiles after today's fixes, overlay scrollbars: unit `xinyanchen-safari-sweep25`,
    `f20/sweep25/safari/<width>/<page>/`, widths 390, 320, 744, 639, 1092, 1280, 1440.
  - By eye, fresh Safari tiles (`f20/sweep25/sheets/`): 390 and 320, all six pages, nothing new to fix. Kept at
    320 only: the Home phone descriptions are one `<span>` per design line at full width, so the longest line
    (312 px) leaves 4 px margins at 320 (31 at 375, 24 at 360); narrowing the box would strand words like "for",
    and shrinking the type would make it about 11.5 px. No current iPhone is 320 wide.
  - By eye, same tiles, 639, 744, 1092, 1280 and 1440 (1920 below), all six pages: one new finding, Tales card 02 at
    1092 ends "physical, in- / backpack / school distribution." (the `school&nbsp;distribution` glue strands
    "backpack"); variants scored in Safari (`f20/sweep24/variants-spec6.json`, unit
    `xinyanchen-safari-variants6`, queued behind the contribution check). Kept, by the user's 414 to 639 choice
    (`568c81b`): at 600 to 639 the Scotties challenge cloud scales with the art, so its copy is 22.2 px beside 15 px
    body text; nothing overlaps.
  - Landed `95ca56c`: Tales card 02 `physical,&nbsp;in-&#8288;backpack school&nbsp;distribution`, the only
    variant with no one-word line, split compound or overrun at 30 Safari widths (`f20/sweep24/variants7`).
  - Landed `17d922f`: MenuMe contribution badge. Safari pixel check (`f20/occlude/banner-foreign.py` on
    `.contribution-cards .note>p`) found ink under badge 1 only on desktop (1360 to 1390, "presets."); phone and
    tablet widths Chromium flagged by line box (400, 568 to 576, 640, 732 to 750) were clear, because line boxes
    include leading. Fix: a 40 px inline-block after the last paragraph on desktop (the disc reaches 36 px into the
    copy). Chromium em-box sweep (`f20/badge/disc-sweep-em.py`): cards change height only at 1310 to 1424, 1440 and
    1920 unchanged; Safari after: 0 of 128 paragraphs at 16 widths from 1280 to 1920. Rejected: the same spacer
    on phone and tablet, which grew the 744 cards 303 to 331 px for line-box contact with no ink.
    Limit: Chromium's em-box metric still reports 0.5 px of contact at 1352 with the spacer; Safari shows no ink
    there (`contrib3`). Cost of `95ca56c`: in Safari at 600 the card 02 copy takes 7 lines instead of 6 (Chromium
    unchanged at 6; the strip height there is set by the tallest card, which Chromium measures unchanged at 666).
  - 1920 (the client's viewport) was missing from the sweep (the tile run's width list left it out; Safari reaches
    1920 fine). Captured afterwards (unit `xinyanchen-safari-sweep25-1920`) and reviewed tile by tile at full
    size, the first 950 px of each page first. One finding, landed `787ef5a`: the desktop Scotties persona copy
    wrapped unlike the design (Jake to four lines, "and style." alone for Gwen). Its measures (273, 282, 268.5)
    were fitted before the copy went Medium; Chromium wraps as drawn from 279.5 to 308, 300.5 to 330 and 270 to
    326 px (`f20/badge/persona-measure.py`), now 294, 315 and 298. Chromium 1280 to 2560 by 8: as drawn
    everywhere, columns at least 34 px apart, no sideways scroll; Safari at 1280, 1366, 1440, 1600, 1920 and
    2560: 3, 2 and 3 lines as drawn (`f20/occlude/persona/`). Kept as designed: MenuMe "preference- / driven" in
    the closing quote and "15- / minute" in card 1 (both drawn so in Desktop/MenuMe.pdf), Tales "ages 4 / to 12"
    (drawn so).
  - Open, not audited: other measures whose comments say "wraps as drawn" (about 15 in `styles.css`) were fitted
    in Bold or before later weight changes and may have drifted the same way. The user's rule is natural wrapping
    without stranded words, not line-for-line fidelity, so they matter only where a drift strands a word; the
    by-eye sweep at eight widths found no other case.
  - Next: the iOS 17 Simulator frames (r3), then the enlarged image views.
  - The Safari text-overrun probe (`f20/occlude/text-over-probe.js`, `textover-safari.log`) also lists Tales
    "institutional&nbsp;resources." running past its card column at 320 to 393 (at 320 to within a few px of the
    screen edge) and "school&nbsp;distribution." at 320 and 340.
- Lesson, waiting (2026-10-24, after the user asked "How long do we need to wait? Is there a way for us to wait
  less?"): `tail --pid="$(systemctl --user show <unit> --property=MainPID --value)"` on a unit that has already
  finished gets PID 0 and waits out its whole timeout; one wait sat idle on finished Safari jobs. Start jobs with
  `systemd-run --wait` in a background command instead, so the notification comes when the job ends. Measured run
  times: 130 Safari banner shots about 3.7 min; the overrun probe plus a variant round about 15 min, mostly a fixed
  2 to 2.5 s settle after each of 156 page reloads. Next speed-up: load each page once and resize it across widths;
  screen in Chromium (parallel) and use Safari (one VM, one WebDriver session) only to confirm.
- Lesson: when one framed image lacks its frame, list every stroked image in the fig before fixing one; the hi-fi
  screenshot and moodboard had the same gap as the listing and were found only by that list.
- Lesson: systemd's `StandardOutput=file:` does not truncate; a rerun writes over the old log in place and leaves a
  mix. Use `truncate:`.
- Lesson: `rg --replace '$1'` without `--only-matching` keeps the rest of the line, so a PID taken that way is
  wrong; several bounded waits returned at once this round.

[d501ff0-correction]: https://github.com/chen1054/chen1054.github.io/commit/d501ff0f04a6a0f6fcfe060bc6aad377fe609675#commitcomment-206506496
[03d2adb-correction]: https://github.com/chen1054/chen1054.github.io/commit/03d2adbf6711ffb16cab0a693a266e74c621e627#commitcomment-206404984
[c0aa129-correction]: https://github.com/chen1054/chen1054.github.io/commit/c0aa1297ac152a43ee7d6b5a9b6e646f78cd2477#commitcomment-206404986

[9d97db6-correction]: https://github.com/chen1054/chen1054.github.io/commit/9d97db6ee73b1491efca31a274756919e2a5610d#commitcomment-206148699
[411935c-correction]: https://github.com/chen1054/chen1054.github.io/commit/411935c76035c5c0a8fac95f514e7fbcbc0492a4#commitcomment-205881788
[d7fbea3-correction]: https://github.com/chen1054/chen1054.github.io/commit/d7fbea3063932748c75c99c570d98ae6cdde2c24#commitcomment-205881791
[6e97123-correction]: https://github.com/chen1054/chen1054.github.io/commit/6e9712362158159c54d20ddf0e0fd0953b684814#commitcomment-205881795
[1b85496-correction]: https://github.com/chen1054/chen1054.github.io/commit/1b85496719015c4ac70ac67620e740735304f924#commitcomment-205880540
[bda96e8-correction]: https://github.com/chen1054/chen1054.github.io/commit/bda96e82021850bdc8e3665542bdd0b3475e9577#commitcomment-205869889
[a5102be-correction]: https://github.com/chen1054/chen1054.github.io/commit/a5102be978faccf474a31f8b539bd1ad3a4cf7cf#commitcomment-205848188
[5cf1620-correction]: https://github.com/chen1054/chen1054.github.io/commit/5cf1620e727bda1cd3f6a633d3eef596236d0a09#commitcomment-205734606
