document.querySelector(".message-form").addEventListener(
  "submit",
  (event) => {
    const form = event.currentTarget;
    const captchaResponse = new FormData(form).get("h-captcha-response");
    if (!captchaResponse) {
      event.preventDefault();
      // Screen readers announce a role="alert" element when it is inserted, so each refused send replaces the reminder;
      // unlike alert(), it does not block the page.
      form.querySelector(".captcha-reminder")?.remove();
      const reminder = document.createElement("p");
      reminder.className = "captcha-reminder";
      reminder.setAttribute("role", "alert");
      reminder.textContent = "Please complete the captcha before sending your message.";
      form.querySelector(".h-captcha").before(reminder);
    }
  }
);
