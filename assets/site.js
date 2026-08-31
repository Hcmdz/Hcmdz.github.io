(function () {
  "use strict";

  /* Lightbox for screenshots */
  var openBtn = document.querySelector(".lightbox");

  function openLightbox() {
    if (!openBtn) return;
    openBtn.classList.add("open");
    openBtn.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    if (!openBtn) return;
    openBtn.classList.remove("open");
    openBtn.setAttribute("aria-hidden", "true");
  }

  document.addEventListener("click", function (event) {
    var btn = event.target.closest(".screenshot-button");
    if (btn) {
      var img = btn.querySelector("img");
      if (img && openBtn) {
        openBtn.querySelector("img").src = img.getAttribute("src");
        openBtn.querySelector("img").alt = img.getAttribute("alt") || "";
        openLightbox();
      }
    }

    if (event.target.closest(".lightbox-close") || event.target === openBtn) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeLightbox();
  });

  if (openBtn) {
    openBtn.setAttribute("aria-hidden", "true");
  }
})();
