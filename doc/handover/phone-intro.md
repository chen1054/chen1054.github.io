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

- Home content is complete and the user accepted its hover behavior.
- The menu is implemented and accepted by the user.
- Home adaptation to Tablet and Desktop is complete.
  Minimum code remains the first priority and minimum breakpoints the second.
- About is implemented and browser-verified across Phone, Tablet, and Desktop.
  Contact and case-study pages remain deferred.
  Case studies still use the approved temporary `https://example.com` destination.
- Ask for missing original materials instead of inventing replacements.

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
