# Phone intro handover

## Agreed scope

- Implement only the intro from `../Phone/Home.png`,
  through “More About Me” and the first decorative wave.
- Present it for review before implementing project sections.
- Hamburger and About button remain visual previews;
  their behavior belongs to later steps.
- The user will supply more material as work proceeds.
  Ask for missing material instead of approximating it.
- Minimum code is the highest priority for this portfolio.
  Ask before introducing a substantial amount of code.
- Keep this handover updated in the portfolio repository.
- The finished site must make no third-party requests, except for the future form.
  The user explicitly permits locally hosted original fonts and artwork.

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
- `index.html` contains the intro markup and CSS, with no JavaScript or dependencies.
- `mise run preview` serves the static files at `http://localhost:4173`.
- The supplied white design is retained in either system color preference.
  No alternate theme has been supplied or invented.

## Work remaining

- Compare the running intro with the reference at 390 pixels wide;
  check phone widths and browser errors.
- Record verification and commits here, then present the intro for review.
- Wait for review and further supplied material before extending the page.
