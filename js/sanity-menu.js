const SANITY_PROJECT_ID = "q9a2ofgp";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2025-01-01";

const menuPageQuery = encodeURIComponent(`
  *[_type == "menuContent"][0]{
    title,
    menuIntro,
    weeklyMenu,
    "weeklyMenuFileUrl": weeklyMenuFile.asset->url,
    menuNote
  }
`);

const menuPageUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${menuPageQuery}`;

function renderTextBlock(containerId, content, fallbackMessage) {
  const container = document.getElementById(containerId);

  if (!container) {
    return;
  }

  const cleanContent = content || "";

  if (!cleanContent.trim()) {
    container.innerHTML = `<p>${fallbackMessage}</p>`;
    return;
  }

  const lines = cleanContent
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  container.innerHTML = "";

  lines.forEach((line) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = line;
    container.appendChild(paragraph);
  });
}

function renderListBlock(containerId, content, fallbackMessage) {
  const container = document.getElementById(containerId);

  if (!container) {
    return;
  }

  const cleanContent = content || "";

  if (!cleanContent.trim()) {
    container.innerHTML = `<p>${fallbackMessage}</p>`;
    return;
  }

  const lines = cleanContent
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) {
    container.innerHTML = `<p>${fallbackMessage}</p>`;
    return;
  }

  const list = document.createElement("ul");

  lines.forEach((line) => {
    const item = document.createElement("li");
    item.textContent = line;
    list.appendChild(item);
  });

  container.innerHTML = "";
  container.appendChild(list);
}

function renderMenuFileLink(fileUrl) {
  const weeklyLink = document.getElementById("weekly-menu-link");

  if (!weeklyLink) {
    return;
  }

  if (!fileUrl || !fileUrl.trim()) {
    weeklyLink.removeAttribute("href");
    weeklyLink.textContent = "No weekly menu file has been uploaded yet.";
    return;
  }

  weeklyLink.href = fileUrl;
  weeklyLink.textContent = "View or download the weekly menu";
}

async function loadMenuContent() {
  try {
    const response = await fetch(menuPageUrl);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    const content = data?.result || {};

    renderTextBlock(
      "menu-page-intro-content",
      content.menuIntro,
      "Menu page information has not been posted yet."
    );

    renderListBlock(
      "weekly-menu-content",
      content.weeklyMenu,
      "No weekly menu has been posted yet."
    );

    renderMenuFileLink(content.weeklyMenuFileUrl || "");

    renderTextBlock(
      "menu-note-content",
      content.menuNote,
      "Menu items may change. Please check with staff for the latest update."
    );
  } catch (error) {
    console.error("Error loading menu content:", error);

    renderTextBlock(
      "menu-page-intro-content",
      "",
      "Unable to load menu page information right now."
    );

    renderTextBlock(
      "weekly-menu-content",
      "",
      "Unable to load this week’s menu right now."
    );

    const weeklyLink = document.getElementById("weekly-menu-link");
    if (weeklyLink) {
      weeklyLink.removeAttribute("href");
      weeklyLink.textContent = "Unable to load the weekly menu file right now.";
    }

    renderTextBlock(
      "menu-note-content",
      "",
      "Unable to load the menu note right now."
    );
  }
}

loadMenuContent();