# Phone Home implementation handover

## Agreed scope

- The first step implemented the intro from `../Phone/Home.png`,
  through “More About Me” and the first decorative wave.
  The user accepted the artwork correction and then authorized the Tales section.
- The user accepted Tales and authorized the complete Home page.
  Implement the remaining project sections and footer without section review checkpoints.
  The menu still requires a separate review.
- All six case-study links temporarily open `https://example.com`,
  explicitly confirmed by the user for the remaining five buttons.
- Hamburger and About button remain visual previews;
  their behavior belongs to later steps.
- The user will supply more material as work proceeds.
  Ask for missing material instead of approximating it.
- Minimum code is the highest priority for this portfolio.
  Ask before introducing a substantial amount of code.
- Keep this handover updated in the portfolio repository.
- Use `agent-browser` in headed mode for this project for the rest of this session.
- Command invocations no longer need `TOKIO_WORKER_THREADS`.
  Prefer non-login shells for agent commands.
- The finished site must make no third-party requests, except for the future form.
  The user explicitly permits locally hosted original fonts and artwork.
- All pages share a separate `styles.css`.
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
- `index.html` contains the intro and Tales markup;
  `styles.css` holds shared page styles.
  There is no JavaScript or npm dependency.
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

- The user accepted the artwork correction: “Yeah that works.”
- Next discussed step is the “Tales For Safer Trails” project section
  from the supplied Home reference,
  followed by another section review.
  The user authorized implementation with “Do it.”
  That section and its following decorative wave are now implemented.
- Complete MenuMe, Scotties, Matcha Delight,
  Echoes of Tradition, Faces of the Future,
  Youth in Limbo, and the footer from the supplied Home reference.
- The Tales “View case study” link opens `https://example.com` for now,
  as explicitly requested by the user.
  This is a navigation destination, not an externally loaded page asset.
- Menu behavior and the About destination remain deferred.
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

## Verification status

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
