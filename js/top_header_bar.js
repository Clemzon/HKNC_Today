document.addEventListener("DOMContentLoaded", async () => {
  const headerContainer = document.getElementById("top-header-bar-container");

  if (!headerContainer) {
    return;
  }

  try {
    const response = await fetch("/componets/top_header_bar.html");

    if (!response.ok) {
      throw new Error(
        `Failed to load top_header_bar.html: ${response.status} ${response.statusText}`
      );
    }

    const headerMarkup = await response.text();
    headerContainer.innerHTML = headerMarkup;
  } catch (error) {
    console.error("Error loading top header bar:", error);
    headerContainer.innerHTML = `
      <header class="site-header" aria-label="Site header">
        <div class="site-header-inner">
          <p>Header could not be loaded.</p>
        </div>
      </header>
    `;
  }
});