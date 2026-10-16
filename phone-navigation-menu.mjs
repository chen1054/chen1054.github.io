document.getElementById("phone-navigation-menu").addEventListener(
  "click",
  (event) => {
    if (event.target.closest("a")) {
      event.currentTarget.hidePopover();
    }
  }
);
