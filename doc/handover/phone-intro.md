# Portfolio implementation handover

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
