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