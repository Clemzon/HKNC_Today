
const SANITY_PROJECT_ID = "q9a2ofgp";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2025-01-01";

const query = encodeURIComponent(`
  *[_type == "siteContent"][0]{
    weeklyActivities
  }
`);

const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${query}`;

async function loadWeeklyActivities() {
  const container = document.getElementById("weekly-activities-content");

  if (!container) return;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    const weeklyActivities = data?.result?.weeklyActivities;

    if (!weeklyActivities || !weeklyActivities.trim()) {
      container.innerHTML = "<p>No weekly activities have been posted yet.</p>";
      return;
    }

    const lines = weeklyActivities
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (lines.length === 0) {
      container.innerHTML = "<p>No weekly activities have been posted yet.</p>";
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
  } catch (error) {
    console.error("Error loading weekly activities:", error);
    container.innerHTML =
      "<p>Unable to load this week’s activities right now.</p>";
  }
}

loadWeeklyActivities();