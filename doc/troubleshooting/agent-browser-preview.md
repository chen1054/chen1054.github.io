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
The page stylesheet uses those URLs for normal and fragment-targeted hover states.
With the final production URLs, decoded raster samples changed fill color on hover
while the shadow-only pixels remained equal for all three variants.
Pointer hover selected the correct fragment for every link.

This records observed cache reuse and the verified asset-URL change.
It does not establish an upstream browser or agent-browser defect,
or the cause of the earlier unresponsive session.
