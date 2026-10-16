# Xinyan Chen portfolio

Phone Home implementation with all six projects and the footer,
based on the supplied `Phone/Home` design.
Run `mise run preview` and visit `http://localhost:4173`.
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

The hamburger opens the supplied phone navigation menu using a native popover.
Its close button, Escape, and outside clicks dismiss it.
The approved local `phone-navigation-menu.mjs` module closes it when a link is selected.
Home returns to the homepage; Work jumps to the first project.
About and Contact temporarily open `https://example.com`.
The menu is ready for its separate review.
The final About destination and case-study pages belong to later work.

See [the handover](doc/handover/phone-intro.md) for scope and verification,
and [the extracted intro reference](doc/reference/home-introduction-through-first-decorative-wave.svg)
for the original layout.
The [full Home comparison](doc/review/phone-home-reference-comparison.svg)
shows the implemented page beside the supplied design at matching scale.
The [menu comparison](doc/review/phone-navigation-menu-reference-comparison.svg)
shows the supplied and implemented 97-pixel panels beside each other.
