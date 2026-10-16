# Xinyan Chen portfolio

Responsive Home, About, Contact, Tales for Safer Trails, MenuMe, and Scotties pages,
based on the supplied Phone, Tablet, and Desktop designs.
Home includes all six projects and the footer.
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
Home, About, and the case studies load no third-party resources.
Contact loads the approved Web3Forms and hCaptcha scripts and submits a native HTML POST form.
These form resources are the approved third-party exception.
Home links to `tales-for-safer-trails.html`, `menume.html`, and `scotties.html`.
The remaining Home case-study links temporarily navigate to `https://example.com`, as requested.
Their hover fills use the maximum sRGB-safe OKLCH chroma at six decimal places,
retaining the original lightness and hue components and shadows.
No npm dependencies are approved; linting and formatting are skipped by project instruction.

The hamburger opens the supplied phone navigation menu using a native popover.
Its close button, Escape, and outside clicks dismiss it.
The local `portfolio-navigation.mjs` module closes it when a link is selected.
It also shows the shared back-to-top link after scrolling.
The link sits 1rem from the bottom and right edges and measures 3rem square.
Home returns to the homepage; Work jumps to the first project.
About opens `about.html`; Contact opens `contact.html`.
The phone menu has been reviewed and accepted.
The About page is available at `about.html`,
and Home's About links now open it.
It reuses the navigation, shared stylesheet, fonts, and existing responsive breakpoint.
The original portrait appears on phone too, as confirmed by the user.
Biography text remains live HTML;
photographs are local PNG files extracted from the supplied artwork.
One shared CSS rule gives gallery photographs their rounded corners and gold `box-shadow`.
“View My CV” opens the locally hosted résumé PDF.
The case studies reuse the navigation, footer, back-to-top link, and existing breakpoint.
Their hero columns wrap naturally with flexbox.
A 64rem container query switches their centered headings to left alignment on Desktop.
Their text remains live HTML and their photographs and interface screenshots are local PNGs.
Original vector artwork retains its SVG geometry;
shared masks recolor the matching corner decorations.
Blank SVG export margins are trimmed to the actual painted bounds.
The original full-resolution Scotties homepage screenshot comes directly from the Figma archive.
Every case-study picture and graph opens an in-page native popover.
Shared CSS enlarges the image and permits scrolling in both directions.
Click the enlarged viewer, press Escape, or click outside it to close.
Zooming adds no JavaScript or dependencies.
Prototype and Tales demo links temporarily open `https://example.com`.
Their hover fills also maximize sRGB-safe chroma while retaining lightness and hue.
Contact uses the supplied Phone, Tablet, and Desktop designs,
including the Tablet files named `Contracttablet`.
The form requires Name, Email, and Message; Phone is optional.
Native browser validation checks required fields and email syntax.
Successful submissions use Web3Forms' hosted confirmation page.
The supplied key requires hCaptcha.
The user approved its vendor `.js` scripts as an exception to the module/`.mjs` rule.
A local `contact-form-captcha-validation.mjs` module prevents submission without a captcha response.
No npm dependencies or new breakpoints are needed.
The email address and its link both use `rainbowchen.ccc@gmail.com`, as confirmed by the user.
See [Web3Forms' native form documentation](https://docs.web3forms.com/getting-started/examples/basic-html-contact-form)
for the provider's POST fields and confirmation behavior.

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

About comparisons show the supplied reference and implementation for
[Phone](doc/review/phone-about-responsive-reference-comparison.svg),
[Tablet](doc/review/tablet-about-responsive-reference-comparison.svg),
and [Desktop](doc/review/desktop-about-responsive-reference-comparison.svg).
The Phone implementation includes the original portrait as requested,
although that reference export leaves its portrait area blank.
