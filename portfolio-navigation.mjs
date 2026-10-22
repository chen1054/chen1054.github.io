const navigation = document.getElementById("portfolio-primary-navigation");

navigation.addEventListener(
  "click",
  (event) => {
    if (event.target.closest("a")) {
      event.currentTarget.hidePopover();
    }
  }
);

/*
  The opened phone menu takes focus itself, so keyboard and screen-reader users start inside it without a focus box
  around the close button. Done here rather than with autofocus, which would also focus the always-visible wide
  navigation when a page loads.
*/
navigation.addEventListener(
  "toggle",
  (event) => {
    if (event.newState === "open") {
      navigation.focus({ preventScroll: true });
    }
  }
);
