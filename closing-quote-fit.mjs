/*
  Case-study closing quotes: every full line reaches both edges of the quote's box (site.css lines that box up with
  the content above it). Each line's letter and word spacing closes up a little (so a word that nearly fits comes up
  onto the line) or opens up a little (so a line that ends short reaches the edge). The breaks are chosen together,
  over the whole quote, so that the spacing changes stay as small and as even as possible from line to line, the
  way typesetting software sets a justified paragraph. A line may break where the browser would: at a space, or after
  a hyphen or a dash. The last line keeps its natural spacing, centred. Without this script the quote wraps
  naturally, centred.
*/

/*
  How far a line's spacing may close up or open out, per character and per space, in em. These are hard clamps: a
  word that would need more closing goes to the next line, and a line that would need more opening stays a little
  short of the edge rather than gaping.
*/
const LETTER_CLOSE = 0.02;
const WORD_CLOSE = 0.08;
const LETTER_OPEN = 0.04;
const WORD_OPEN = 0.4;
/* Cost of a last line that holds a single word, in the units of a line's spacing cost (lineCost). */
const LONE_LAST_WORD = 4;
/* Cost per squared share past the clamp of a line that would need more opening than the clamp allows. */
const SHORT_LINE = 1000;

/*
  The quote as pieces a line may end after, each with what follows it: a space, or nothing where the break comes
  after a hyphen or a dash inside a word. Words split at ordinary spaces only, so no-break spaces keep their words
  together, and a non-breaking hyphen does not split.
*/
function piecesOf(text) {
  const pieces = [];
  for (const word of text.trim().split(/[ \t\n\r]+/)) {
    const parts = word.split(/(?<=[-—])(?=.)/u);
    parts.forEach((part, index) => {
      pieces.push({ text: part, after: index === parts.length - 1 ? " " : "" });
    });
  }
  return pieces;
}

function fitQuote(paragraph, pieces) {
  const style = getComputedStyle(paragraph);
  const fontSize = parseFloat(style.fontSize);
  const baseLetter = parseFloat(style.letterSpacing) || 0;
  const available = paragraph.getBoundingClientRect().width;

  const probe = document.createElement("span");
  probe.className = "closing-reflection-probe";
  paragraph.append(probe);
  const measure = (text, letter = baseLetter, word = 0) => {
    probe.style.letterSpacing = `${letter}px`;
    probe.style.wordSpacing = `${word}px`;
    probe.textContent = text;
    return probe.getBoundingClientRect().width;
  };

  const pieceWidths = pieces.map((piece) => measure(piece.text));
  const pieceCharacters = pieces.map((piece) => [...piece.text].length);
  const spaceWidth = measure("a a") - measure("aa");

  const lineText = (from, to) => {
    let text = "";
    for (let index = from; index < to; index += 1) {
      text += pieces[index].text;
      if (index < to - 1) {
        text += pieces[index].after;
      }
    }
    return text;
  };
  /* Natural width, character count and space count of the line holding pieces from (inclusive) to to (exclusive). */
  const lineFacts = (from, to) => {
    let width = 0;
    let count = 0;
    let spaces = 0;
    for (let index = from; index < to; index += 1) {
      width += pieceWidths[index];
      count += pieceCharacters[index];
      if (index < to - 1 && pieces[index].after === " ") {
        width += spaceWidth;
        count += 1;
        spaces += 1;
      }
    }
    return { width, count, spaces };
  };
  /*
    The share of a line's range its change uses: below 0 closes up, above 0 opens out. Closing past the range is
    impossible (the line would overflow), so it answers null; opening past it answers the share beyond 1.
  */
  const ratio = ({ width, count, spaces }) => {
    const change = available - width;
    const range = change < 0
      ? (count * LETTER_CLOSE + spaces * WORD_CLOSE) * fontSize
      : (count * LETTER_OPEN + spaces * WORD_OPEN) * fontSize;
    if (range === 0) {
      return change === 0 ? 0 : null;
    }
    const share = change / range;
    return share < -1 ? null : share;
  };
  /*
    A line's cost is the size of its spacing change: word spacing per space against 0.1 em plus letter spacing per
    character against 0.01 em, squared, so the breaks chosen change spacing least, and evenly.
  */
  const lineCost = (share) => {
    if (share === null) {
      return Infinity;
    }
    const used = Math.min(share, 1);
    const word = used * (used < 0 ? WORD_CLOSE : WORD_OPEN) / 0.1;
    const letter = used * (used < 0 ? LETTER_CLOSE : LETTER_OPEN) / 0.01;
    /* Past the clamp, the cost grows with how far short of the edge the line stays. */
    const beyond = share > 1 ? share - 1 : 0;
    return word * word + letter * letter + SHORT_LINE * beyond * beyond;
  };

  /* best[i]: least total cost of setting pieces i onward; next[i]: where the line starting at i ends. */
  const count = pieces.length;
  const best = new Array(count + 1).fill(Infinity);
  const next = new Array(count + 1).fill(count);
  best[count] = 0;
  for (let from = count - 1; from >= 0; from -= 1) {
    for (let to = from + 1; to <= count; to += 1) {
      const facts = lineFacts(from, to);
      const lastLineFits = to === count && facts.width <= available;
      const cost = lastLineFits ? (facts.spaces === 0 && to - from === 1 ? LONE_LAST_WORD : 0) : lineCost(ratio(facts));
      /* Longer lines only overflow further. */
      if (cost === Infinity && facts.width > available) {
        break;
      }
      if (cost + best[to] < best[from]) {
        best[from] = cost + best[to];
        next[from] = to;
      }
    }
  }

  /* No set of breaks fits the ranges (a very narrow box): fall back to natural wrapping. */
  if (best[0] === Infinity) {
    probe.remove();
    paragraph.replaceChildren(lineText(0, count));
    return;
  }

  const rendered = [];
  for (let from = 0; from < count; from = next[from]) {
    const to = next[from];
    const text = lineText(from, to);
    const span = document.createElement("span");
    span.className = "closing-reflection-line";
    span.textContent = text;
    const natural = measure(text);
    if (to === count && natural <= available) {
      rendered.push(span);
      continue;
    }
    const { count: characters, spaces } = lineFacts(from, to);
    const share = Math.min(Math.max(ratio({ width: natural, count: characters, spaces }) ?? 0, -1), 1);
    const opening = share >= 0;
    let letter = baseLetter + share * (opening ? LETTER_OPEN : LETTER_CLOSE) * fontSize;
    let word = share * (opening ? WORD_OPEN : WORD_CLOSE) * fontSize;
    /* Correct against the measured line, since summed piece widths and browsers' letter spacing differ slightly. */
    const residual = available - measure(text, letter, word);
    if (spaces > 0) {
      word += residual / spaces;
    } else {
      letter += residual / characters;
    }
    /* The clamps hold after the correction too. */
    letter = Math.min(Math.max(letter, baseLetter - LETTER_CLOSE * fontSize), baseLetter + LETTER_OPEN * fontSize);
    word = Math.min(Math.max(word, -WORD_CLOSE * fontSize), WORD_OPEN * fontSize);
    span.style.letterSpacing = `${letter}px`;
    span.style.wordSpacing = `${word}px`;
    rendered.push(span);
  }
  probe.remove();
  paragraph.replaceChildren(...rendered);
}

for (const paragraph of document.querySelectorAll(".closing-reflection > p")) {
  const pieces = piecesOf(paragraph.textContent);
  let fittedWidth = 0;
  let frame = 0;
  const refit = () => {
    const width = paragraph.getBoundingClientRect().width;
    if (width === fittedWidth) {
      return;
    }
    fittedWidth = width;
    fitQuote(paragraph, pieces);
  };
  document.fonts.ready.then(() => {
    refit();
    new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(refit);
    }).observe(paragraph);
  });
}
