# Xinyan Chen portfolio

Responsive Home implementation with all six projects and the footer,
based on the supplied Phone, Tablet, and Desktop Home designs.
Run `mise run preview` and visit `http://localhost:4173`.
There is no install or build step.

The text is HTML.
All pages share `styles.css`.
Artwork and button backgrounds are extracted from the supplied PDF.
Each decorative wave component is its own SVG asset and HTML image.
Picture sources select the supplied phone or wide artwork.
One 40rem breakpoint switches to inline navigation and alternating flexbox project columns.
CSS grids are prohibited.
Named SVG views trim blank export margins on wide screens without duplicating artwork.
Their boxes align with the outer column edges while text remains left-aligned.
Explicit phone aspect ratios preserve the original frames when resizing back to phone widths.
Typography, spacing, and illustrations resize fluidly between the Tablet and Desktop reference widths.
The content and navigation are shared, and responsive behavior adds no JavaScript.
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
The phone menu has been reviewed and accepted.
The About page is available at `about.html`,
and Home's About links now open it.
It reuses the navigation, shared stylesheet, fonts, and existing responsive breakpoint.
The original portrait appears on phone too, as confirmed by the user.
Biography text remains live HTML;
gallery photographs and gold shadows are preserved directly from the supplied reference PNGs.
“View My CV” opens the locally hosted résumé PDF.
Contact and case-study pages belong to later work.

See [the handover](doc/handover/phone-intro.md) for scope and verification,
and [the extracted intro reference](doc/reference/home-introduction-through-first-decorative-wave.svg)
for the original layout.
The [full Home comparison](doc/review/phone-home-reference-comparison.svg)
shows the implemented page beside the supplied design at matching scale.
The [menu comparison](doc/review/phone-navigation-menu-reference-comparison.svg)
shows the supplied and implemented 97-pixel panels beside each other.
The [Tablet comparison](doc/review/tablet-home-responsive-reference-comparison.svg)
and [Desktop comparison](doc/review/desktop-home-responsive-reference-comparison.svg)
show the supplied references beside the responsive implementation at matching scale.
The full-page captures already omit the scrollbar;
the comparisons retain their native pixel dimensions.
