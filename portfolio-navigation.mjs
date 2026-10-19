document.getElementById("portfolio-primary-navigation").addEventListener(
  "click",
  (event) => {
    if (event.target.closest("a")) {
      event.currentTarget.hidePopover();
    }
  }
);
