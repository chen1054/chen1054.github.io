# Responsive Home implementation handover

## Current state

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
“More About Me” is now a link styled as a button,
temporarily opening `https://example.com`, as explicitly confirmed by the user.
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
- The About link temporarily opens `https://example.com`,
  explicitly confirmed by the user after requesting a link styled as a button.
- The initial hover request increased OKLCH chroma by 10%.
  The user subsequently requested maximum hover chroma.
  After asking whether other components changed,
  the user requested the maximum chroma safe for sRGB.
  Retain the original lightness and hue and keep all sRGB channels in range.
- The user says image inspection is unnecessary for deterministic changes such as this color adjustment.
  Verify the color conversion and rendered state numerically without viewing screenshots.
- The menu's Contact link temporarily opens `https://example.com`, explicitly confirmed by the user.
  About reuses its approved placeholder.
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
- About and Contact pages and their final destinations remain deferred.
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
- The outside-alignment correction is implemented.
  Final width checks, refreshed comparison captures, rendered documentation,
  and private-browser cleanup are in progress.
- A private headed Chromium and nested compositor are running for this task,
  attached through CDP port 9237 using the existing scratch tasks.
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
