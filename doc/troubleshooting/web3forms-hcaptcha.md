# Web3Forms native form rejects a missing hCaptcha response

## Symptom

The first authorized Contact test reached `https://api.web3forms.com/submit`.
Web3Forms returned HTTP 400 with `Form submission failed!`
and `hCaptcha Token is mandatory for this form`.
That rejected request is not evidence of email delivery.

## Root cause and evidence

The native form sent the supplied access key and named contact fields without a captcha token.
The response establishes that this key's submissions require hCaptcha.
The provider account settings and private backend source were not inspected.
The initial native-only implementation omitted a required integration.

The [official Web3Forms hCaptcha guide][web3forms-captcha] documents the widget,
provider loader, and client-side validation.
The user supplied that same guide and approved the vendor scripts,
including an exception to the normal module/`.mjs` requirement.

The public loader was retrieved on October 15, 2026.
It exposes no release version;
its SHA-256 was `ee095cf9704e6e328e6ff428e1ca04dc58ea64cf408cfa1a0270a45011bba2ae`.
The private evidence file is `${HOME}/temp/agent/portfolio-intro/web3forms-client-observed.js:1`.
Relevant excerpts from that minified line:

```js
// Public Web3Forms client loader, observed line 1.
document.querySelectorAll('[data-captcha="true"]')
"50b2fe65-b00b-4b9e-ad62-3ba471098be2"
"https://js.hcaptcha.com/1/api.js?recaptchacompat=off"
```

The first excerpt locates widget containers;
the other excerpts identify the default public sitekey and SDK URL.
These are source excerpts, not a standalone executable snippet.
The provider handles server-side verification;
the site's local module only checks that a response is present.

## Verification

Verification used the headed native `agent-browser` 0.39.1 session against the Python static preview.
No additional npm package was installed.

Working observations:

- The approved compact widget rendered at 158 by 138 pixels.
- `http://portfolio.localhost:4173/contact.html` loaded without the localhost warning.
- Selecting its checkbox opened a real hCaptcha challenge.
- Contact's CSP allowed its scripts and frames without browser errors.
- The local validation module blocked a missing response and showed the requested reminder.
- A disposable form fixture exercised both validation branches with a submit-event sink.
  No fixture or synthetic response reached Web3Forms.
- Responsive checks from 320 to 2560 pixels found no horizontal overflow or undecoded images.
- The user reported `Sent` after being asked to send the authorized test through this form.
  No confirmation-page or inbox evidence was independently inspected.

Failing observations:

- The native form without hCaptcha received the HTTP 400 diagnostic.
- `http://localhost:4173/contact.html` displayed
  `Warning: localhost detected. Please use a valid host.`

The [hCaptcha local-development documentation][hcaptcha-guide]
explains its restrictions on `localhost` and `127.0.0.1`.
The working local subdomain was measured in this Chrome preview,
not assumed to work in every browser.

## Verified integration and tradeoffs

`contact.html` includes the official `data-captcha="true"` widget and provider loader.
Its compact setting fits the narrow form without another breakpoint.
The CSP admits the provider loader and hCaptcha script, frame, style, and connection origins
documented in the [hCaptcha developer guide][hcaptcha-guide].
Other pages retain their local-only resource policy.

`contact-form-captcha-validation.mjs` reads `h-captcha-response` from the submitted form.
It prevents an empty response from navigating to the provider error page.
Instead of a blocking `alert()` (the pattern in Web3Forms' own example), it inserts a `role="alert"` reminder
above the captcha, replacing it on each refused send so screen readers announce it again.
The provider's `script.js` only loads hCaptcha and does not block an unsolved submit itself (read 2026-10-19).
Web3Forms still validates the response server-side.
This adds a human challenge and external form resources,
both approved by the user.
The widget adds vertical content absent from the supplied page designs.

## What does not work

The initial access-key-only native form does not satisfy this key's mandatory captcha requirement.
Plain `localhost` renders the provider's warning even though the SDK and widget load.
Loading the widget without a response cannot establish successful delivery.
No fabricated response, test-key substitution, or provider-setting bypass was attempted.

## Upstream filing decision

- Upstream fault: no defect established;
  the initial site omitted a documented mandatory integration.
- Upstream fixability: not assessed because no upstream defect needs a patch.
- Supported use case: the official guide supports native HTML forms with this widget.
- Contribution acceptance: not assessed; no report or contribution is proposed.
- Maintainer willingness: not assessed; the documented integration addresses the omission.
- Fix prototype: no upstream prototype is warranted;
  the local integration and validation were exercised in the real browser.

Nothing to add upstream.
No duplicate-tracker search, issue draft, issue, or comment was produced for this configuration mismatch.
Do not repeat the authorized test: the user reported sending it.

[web3forms-captcha]: https://docs.web3forms.com/getting-started/customizations/spam-protection/hcaptcha
[hcaptcha-guide]: https://docs.hcaptcha.com/
