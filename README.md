# Xinyan Chen portfolio

Phone Home implementation with all six projects and the footer,
based on the supplied `Phone/Home` design.
Open `index.html` directly or run `mise run preview` and visit `http://localhost:4173`.
There is no install or build step.

The text is HTML.
All pages share `styles.css`.
Artwork and button backgrounds are extracted from the supplied PDF.
Each decorative wave component is its own SVG asset and HTML image.
The original Abril Fatface and Playfair Display fonts are served locally;
their licenses accompany the font files in `assets/fonts/`.
The portfolio loads no third-party resources.
The About link and all six case-study links temporarily navigate to `https://example.com`,
as requested.
Their hover fills use the maximum sRGB-safe OKLCH chroma at six decimal places,
retaining the original lightness and hue components and shadows.
No npm dependencies are approved; linting and formatting are skipped by project instruction.

The menu control remains disabled for this agreed visual preview.
The menu has its own review step.
The final About destination and case-study pages belong to later work.

See [the handover](doc/handover/phone-intro.md) for scope and verification,
and [the extracted intro reference](doc/reference/home-introduction-through-first-decorative-wave.svg)
for the original layout.
The [full Home comparison](doc/review/phone-home-reference-comparison.svg)
shows the implemented page beside the supplied design at matching scale.
