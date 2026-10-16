# agent-browser 0.39.1: headed preview verification stops responding

## Symptom

The agent's headed Chromium session stopped completing preview checks.
`agent-browser` reported `CDP command timed out: Runtime.evaluate`.
A subsequent `open http://localhost:4173/` reported
`tab is not responding and did not recover after activation`.

The user's own browser displayed the corrected portfolio successfully.
Do not treat the automation failure as evidence of a portfolio rendering failure.

## Root cause

Unknown.
The observations locate a failure in the agent's existing browser session,
but do not identify its cause.
No upstream source defect has been established.

Earlier process pressure is a separate incident:
the parent worker slice measured 252 tasks against a limit of 256,
and Python reported `RuntimeError: can't start new thread`.
That observation does not establish the cause of the later unresponsive tab.

## Verification

The affected CLI was agent-browser 0.39.1,
attached to disposable headed Chromium through CDP port 9237.

- Failed: evaluating an async expression awaiting `document.fonts.ready`.
- Failed: reopening `http://localhost:4173/` in that existing session.
- Worked: `agent-browser --headed --session portfolio-intro --cdp 9237 close`.
- Worked: a direct HTTP request to the Python preview server returned HTTP 200.
- Worked: the user confirmed the corrected artwork in their own preview.

## Verified workarounds

No automated verification workaround was established for the unresponsive tab.
User review provides visual evidence,
but does not replace the incomplete automated geometry and browser-error checks.

## What does not work

Closing the agent-browser connection and reconnecting to the same Chromium process
did not restore navigation.
Do not repeat the same check and report it as passing.

The CLI also rejected `set device 'iPhone 11'` as an unknown device.
That command did not establish iPhone emulation;
it is separate from the unresponsive-tab failure.

## Upstream filing decision

- Upstream fault: not established.
- Fixability: unknown without a root cause.
- Supported use case: the CLI accepted the headed CDP connection and close command.
  The installed CLI rejected the requested iPhone 11 preset.
- Contribution policy: not investigated because no source defect is established.
- Maintainer intent: not investigated for the same reason.
- Prototype: none; no identified upstream defect to patch.

Nothing fileable is established.
No upstream issue or comment was drafted or sent.
Codex integration investigation is also excluded by the workspace's
`Monochromatic/.out-of-scope/codex-harness.md` policy.

## Later successful verification

A fresh headed Chromium process subsequently completed the intro,
Tales, and full Home checks through the same CDP port and private profile.
This is evidence from a new run;
it does not identify the cause of the earlier unresponsive session.

The full Home capture uses a 390 by 5200 viewport,
which fits its 5077-pixel page height without a vertical scrollbar.
Shorter Linux Chromium viewports had a measured 15-pixel scrollbar.
For 320 and 414-pixel content-width checks,
the outer viewport widths were 335 and 429 pixels respectively.
Read `document.documentElement.clientWidth` before reporting the tested width.

The fresh run verified all images,
scrolling, pointer and keyboard navigation,
focus outlines, both color preferences,
and the absence of page errors and external Home resource loads.
The durable results are recorded in the
[Home handover](../handover/phone-intro.md).

## SVG background cache observation

During hover implementation, opening an existing URL reused older page or SVG state.
The page initially retained its former disabled About button;
reloading loaded the new anchor.
A directly opened button SVG likewise lacked its newly added path ID and style until reloaded.
Image decoding also reused older SVG content for existing asset URLs.

The changed button backgrounds initially received fresh, descriptive filenames ending in
`background-and-shadow-oklch-hover.svg`.
On 2026-10-15, the maximum-chroma preview renamed them again to end in
`background-and-shadow-maximum-chroma-hover.svg`.
The subsequent sRGB-safe adjustment on 2026-10-15 replaced that suffix with
`background-and-shadow-srgb-gamut-boundary-hover.svg`.
The page stylesheet uses those URLs for normal and fragment-targeted hover states.
With the final production URLs, decoded raster samples changed fill color on hover
while the shadow-only pixels remained equal for all three variants.
Pointer hover selected the correct fragment for every link.

This records observed cache reuse and the verified asset-URL change.
It does not establish an upstream browser or agent-browser defect,
or the cause of the earlier unresponsive session.

## Color-probe precision

The initial literal-color gamut probe accepted gold chroma `0.146647`.
Verification through the actual SVG's `currentColor` conversion rejected that value:
its converted blue channel was `-0.0000093855`.
The final gold chroma `0.146646` converted to positive blue `0.00000784531`.
The underlying difference between the conversion paths was not investigated.

Use the actual SVG stylesheet fill and original `color` attribute when checking gamut limits.
Do not rebuild probe inputs from serialized computed RGB or OKLCH strings,
which can round their components.
The final probe kept original lightness and hue,
confirmed every sRGB channel was in range,
and proved that the next six-decimal chroma value was outside the gamut.

## Responsive reference measurement with a scrollbar

The responsive verification run measured a 759-pixel outer viewport
and a 744-pixel document content width.
An interpolation based on `100vw` had already started growing at that size,
so its fonts and horizontal offsets missed the supplied 744-pixel Tablet reference.

The verified replacement gives `body` an inline-size container
and uses `100cqw` in the shared interpolation variable.
At a measured 744-pixel content width,
the Tablet project gutter returned to 50 pixels,
body text returned to 14 pixels,
and the complete page measured 3302 pixels tall.
The same implementation was exercised at 1440 pixels with and without a vertical scrollbar.

Report the measured content width separately from the outer viewport width.
The overflow check was validated by temporarily inserting a block
100 pixels wider than the document and observing horizontal overflow,
then removing it before the real measurements.
No upstream defect is established by these measurements.

## Full-page capture dimensions

In the responsive run,
`agent-browser screenshot --full` produced a 744 by 3302 PNG
from the 759 by 1024 outer viewport,
and a 1440 by 5685 PNG from the 1455 by 1080 outer viewport.
Both the `file` command and browser image decoding confirmed those dimensions.
These full-page captures already omit the measured 15-pixel scrollbar.

The initial comparison SVGs declared the outer viewport widths for those PNGs,
which scaled the implementation images before clipping them.
The corrected comparisons declare each PNG's native width and height.
Read actual capture dimensions before embedding screenshots in comparisons.
