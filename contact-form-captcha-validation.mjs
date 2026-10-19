document.querySelector(".message-form").addEventListener(
  "submit",
  (event) => {
    const captchaResponse = new FormData(event.currentTarget).get("h-captcha-response");
    if (!captchaResponse) {
      event.preventDefault();
      alert("Please complete the captcha before sending your message.");
    }
  }
);
