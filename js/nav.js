document.addEventListener("DOMContentLoaded", async () => {
  const navContainer = document.getElementById("nav-container");

  if (!navContainer) {
    console.error('Navigation container with id "nav-container" was not found.');
    return;
  }

  try {
    const response = await fetch("/componets/nav.html");

    if (!response.ok) {
      throw new Error(`Failed to load nav.html: ${response.status} ${response.statusText}`);
    }

    const navMarkup = await response.text();
    navContainer.innerHTML = navMarkup;

    setActiveNavLink();
    initializeNavigation();
  } catch (error) {
    console.error("Error loading navigation:", error);
    navContainer.innerHTML = `
      <nav aria-label="Main navigation">
        <p>Navigation could not be loaded.</p>
      </nav>
    `;
  }
});

function setActiveNavLink() {
  const currentPath = window.location.pathname.replace(/\/$/, "") || "/index.html";
  const navLinks = document.querySelectorAll('#nav-container a[href]');

  navLinks.forEach((link) => {
    const linkUrl = new URL(link.href, window.location.origin);
    const linkPath = linkUrl.pathname.replace(/\/$/, "") || "/index.html";

    if (linkPath === currentPath) {
      link.setAttribute("aria-current", "page");
    }
  });
}

function initializeNavigation() {
  const navWrapper = document.querySelector(".site-side-nav-wrapper");
  const nav = document.getElementById("site-main-navigation");
  const overlay = document.querySelector(".site-nav-overlay");
  const toggleButton = document.querySelector(".site-menu-toggle");
  const navLinks = document.querySelectorAll("#site-main-navigation a");
  const mobileMedia = window.matchMedia("(max-width: 767px)");

  if (!navWrapper || !nav || !overlay || !toggleButton) {
    return;
  }

  function isMobileView() {
    return mobileMedia.matches;
  }

  function openMobileNav() {
    navWrapper.classList.add("nav-open");
    overlay.hidden = false;
    toggleButton.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-menu-open");
  }

  function closeMobileNav() {
    navWrapper.classList.remove("nav-open");
    overlay.hidden = true;
    toggleButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-menu-open");
  }

  function syncNavigationState() {
    if (isMobileView()) {
      closeMobileNav();
    } else {
      navWrapper.classList.remove("nav-open");
      overlay.hidden = true;
      toggleButton.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-menu-open");
    }
  }

  toggleButton.addEventListener("click", () => {
    if (!isMobileView()) {
      return;
    }

    const isOpen = navWrapper.classList.contains("nav-open");

    if (isOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  overlay.addEventListener("click", () => {
    closeMobileNav();
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (isMobileView()) {
        closeMobileNav();
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isMobileView()) {
      closeMobileNav();
    }
  });

  if (typeof mobileMedia.addEventListener === "function") {
    mobileMedia.addEventListener("change", syncNavigationState);
  } else {
    window.addEventListener("resize", syncNavigationState);
  }

  syncNavigationState();
}