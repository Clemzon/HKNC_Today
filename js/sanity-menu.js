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

const monthlyMenuQuery = encodeURIComponent(`
  *[_type == "siteContent"][0]{
    "monthlyMenuFileUrl": monthlyMenuFile.asset->url
  }
`);

const monthlyMenuUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${monthlyMenuQuery}`;

async function loadMonthlyMenuFile() {
  const monthlyLink = document.getElementById("monthly-menu-link");

  if (!monthlyLink) {
    return;
  }

  try {
    const response = await fetch(monthlyMenuUrl);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    const fileUrl = data?.result?.monthlyMenuFileUrl || "";

    if (!fileUrl.trim()) {
      monthlyLink.removeAttribute("href");
      monthlyLink.textContent = "No monthly menu file has been uploaded yet.";
      return;
    }

    monthlyLink.href = fileUrl;
    monthlyLink.textContent = "View or download the monthly menu";
  } catch (error) {
    console.error("Error loading monthly menu file:", error);
    monthlyLink.removeAttribute("href");
    monthlyLink.textContent =
      "Unable to load the monthly menu file right now.";
  }
}

loadWeeklyMenu();
loadMonthlyMenuFile();