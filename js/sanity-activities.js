const SANITY_PROJECT_ID = "q9a2ofgp";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2025-01-01";

const weeklyQuery = encodeURIComponent(`
  *[_type == "siteContent"][0]{
    weeklyActivities
  }
`);

const weeklyUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${weeklyQuery}`;

async function loadWeeklyActivities() {
  const container = document.getElementById("weekly-activities-content");

  if (!container) {
    return;
  }

  try {
    const response = await fetch(weeklyUrl);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    const weeklyActivities = data?.result?.weeklyActivities || "";

    if (!weeklyActivities.trim()) {
      container.innerHTML = "<p>No weekly activities have been posted yet.</p>";
      return;
    }

    const lines = weeklyActivities
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
    console.error("Error loading weekly activities:", error);
    container.innerHTML =
      "<p>Unable to load this week’s activities right now.</p>";
  }
}

const monthlyQuery = encodeURIComponent(`
  *[_type == "siteContent"][0]{
    "monthlyActivitiesFileUrl": monthlyActivitiesFile.asset->url
  }
`);

const monthlyUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${monthlyQuery}`;

async function loadMonthlyActivitiesFile() {
  const monthlyLink = document.getElementById("monthly-activities-link");

  if (!monthlyLink) {
    return;
  }

  try {
    const response = await fetch(monthlyUrl);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    const fileUrl = data?.result?.monthlyActivitiesFileUrl || "";

    if (!fileUrl.trim()) {
      monthlyLink.removeAttribute("href");
      monthlyLink.textContent =
        "No monthly activities file has been uploaded yet.";
      return;
    }

    monthlyLink.href = fileUrl;
    monthlyLink.textContent = "View or download the monthly activities list";
  } catch (error) {
    console.error("Error loading monthly activities file:", error);
    monthlyLink.removeAttribute("href");
    monthlyLink.textContent =
      "Unable to load the monthly activities file right now.";
  }
}

loadWeeklyActivities();
loadMonthlyActivitiesFile();