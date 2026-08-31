(function () {
  "use strict";

  /* Mobile menu: close details when clicking outside or pressing Escape */
  var mobileMenus = Array.prototype.slice.call(
    document.querySelectorAll(".mobile-site-menu")
  );

  if (mobileMenus.length) {
    document.addEventListener("click", function (event) {
      var target = event.target;
      if (!(target instanceof Element)) return;

      mobileMenus.forEach(function (menu) {
        if (!menu.open) return;
        var summary = target.closest(".mobile-site-menu > summary");
        var links = target.closest(".mobile-menu-links");
        if (summary || links) return;
        var panel = target.closest(".mobile-menu-panel");
        if (panel || !menu.contains(target)) {
          menu.open = false;
        }
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        mobileMenus.forEach(function (m) { m.open = false; });
      }
    });
  }

  /* Screenshot lightbox: native <dialog> with keyboard navigation */
  var dialog = document.querySelector(".lightbox");
  if (!(dialog instanceof HTMLDialogElement)) return;

  var dialogImage = dialog.querySelector(".lightbox-image");
  var closeBtn = dialog.querySelector(".lightbox-close");
  if (!dialogImage) return;

  var buttons = Array.prototype.slice.call(
    document.querySelectorAll(".screenshot-button")
  );
  if (!buttons.length) return;

  var activeButton = null;
  var activeIndex = -1;

  function getCaption(btn) {
    var figure = btn.closest("figure");
    var figcaption = figure && figure.querySelector("figcaption");
    if (figcaption && figcaption.textContent.trim()) {
      return figcaption.textContent.trim();
    }
    var img = btn.querySelector("img");
    return img ? (img.getAttribute("alt") || "").trim() : "";
  }

  function getSrc(btn) {
    var img = btn.querySelector("img");
    return img ? img.getAttribute("src") || "" : "";
  }

  function updateDialog(btn) {
    var caption = getCaption(btn);
    dialogImage.src = getSrc(btn);
    dialogImage.alt = caption || "Expanded screenshot";
  }

  function openAt(btn) {
    activeButton = btn;
    activeIndex = buttons.indexOf(btn);
    updateDialog(btn);
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  }

  function close() {
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
    activeButton = null;
    activeIndex = -1;
  }

  function cycle(direction) {
    if (!dialog.open || !buttons.length) return;
    var next = (activeIndex + direction + buttons.length) % buttons.length;
    activeIndex = next;
    activeButton = buttons[next];
    updateDialog(activeButton);
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () { openAt(btn); });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", function (event) {
      event.preventDefault();
      close();
    });
  }

  /* Click on backdrop closes the dialog */
  dialog.addEventListener("click", function (event) {
    var rect = dialog.getBoundingClientRect();
    var inside =
      event.clientX >= rect.left && event.clientX <= rect.right &&
      event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (!inside) close();
  });

  document.addEventListener("keydown", function (event) {
    if (!dialog.open) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      cycle(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      cycle(-1);
    }
  });

  /* Native cancel (ESC) just closes — no preventDefault */
})();
