const SANITY_PROJECT_ID = "q9a2ofgp";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2025-01-01";

const weeklyMenuQuery = encodeURIComponent(`
  *[_type == "siteContent"][0]{
    weeklyMenu
  }
`);

const weeklyMenuUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${weeklyMenuQuery}`;

async function loadWeeklyMenu() {
  const container = document.getElementById("weekly-menu-content");

  if (!container) {
    return;
  }

  try {
    const response = await fetch(weeklyMenuUrl);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    const weeklyMenu = data?.result?.weeklyMenu || "";

    if (!weeklyMenu.trim()) {
      container.innerHTML = "<p>No weekly menu has been posted yet.</p>";
      return;
    }

    const lines = weeklyMenu
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const list = document.createElement("ul");

    lines.forEach((line) => {
      const item = document.createElement("li");
      item.textContent = line;
      list.appendChild(item);
    });

    container.innerHTML = "";
    container.appendChild(list);
  } catch (error) {
    console.error("Error loading weekly menu:", error);
    container.innerHTML = "<p>Unable to load this week’s menu right now.</p>";
  }
}

const weeklyMenuFileQuery = encodeURIComponent(`
  *[_type == "siteContent"][0]{
    "weeklyMenuFileUrl": weeklyMenuFile.asset->url
  }
`);

const weeklyMenuFileUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${weeklyMenuFileQuery}`;

async function loadWeeklyMenuFile() {
  const weeklyLink = document.getElementById("weekly-menu-link");

  if (!weeklyLink) {
    return;
  }

  try {
    const response = await fetch(weeklyMenuFileUrl);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    const fileUrl = data?.result?.weeklyMenuFileUrl || "";

    if (!fileUrl.trim()) {
      weeklyLink.removeAttribute("href");
      weeklyLink.textContent = "No weekly menu file has been uploaded yet.";
      return;
    }

    weeklyLink.href = fileUrl;
    weeklyLink.textContent = "View or download the weekly menu";
  } catch (error) {
    console.error("Error loading weekly menu file:", error);
    weeklyLink.removeAttribute("href");
    weeklyLink.textContent = "Unable to load the weekly menu file right now.";
  }
}

loadWeeklyMenu();
loadWeeklyMenuFile();