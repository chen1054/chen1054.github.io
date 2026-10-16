document.getElementById("portfolio-primary-navigation").addEventListener(
  "click",
  (event) => {
    if (event.target.closest("a")) {
      event.currentTarget.hidePopover();
    }
  }
);

const backToTopLink = document.querySelector(".portfolio-back-to-top-link");
function updateBackToTopLinkVisibility() {
  backToTopLink.hidden = scrollY <= 0;
}
addEventListener("scroll", updateBackToTopLinkVisibility, { passive: true });
updateBackToTopLinkVisibility();
