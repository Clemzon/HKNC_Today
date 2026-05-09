const SANITY_PROJECT_ID = "q9a2ofgp";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2025-01-01";

const homePageQuery = encodeURIComponent(`
  *[_type == "siteContent"][0]{
    homeWelcome,
    homePageOverview,
    homeHeadlines,
    homeCampusQuickLook,
    homeActivitiesGlance,
    homeWeekGlance,
    homeHighlights,
    homeCafeteriaPreview,
    homeBenefits,
    homeMission,
    homeFooter
  }
`);

const homePageUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${homePageQuery}`;

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

  if (lines.length === 0) {
    container.innerHTML = `<p>${fallbackMessage}</p>`;
    return;
  }

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

async function loadHomePageContent() {
  try {
    const response = await fetch(homePageUrl);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    const content = data?.result || {};

    renderTextBlock(
      "home-welcome-content",
      content.homeWelcome,
      "Welcome content has not been posted yet."
    );

    renderListBlock(
      "home-page-overview-content",
      content.homePageOverview,
      "Page overview content has not been posted yet."
    );

    renderTextBlock(
      "home-headlines-content",
      content.homeHeadlines,
      "Headlines have not been posted yet."
    );

    renderTextBlock(
      "home-campus-quick-look-content",
      content.homeCampusQuickLook,
      "Campus quick look content has not been posted yet."
    );

    renderListBlock(
      "home-activities-glance-content",
      content.homeActivitiesGlance,
      "Activities at a glance have not been posted yet."
    );

    renderListBlock(
      "home-week-glance-content",
      content.homeWeekGlance,
      "This week at a glance has not been posted yet."
    );

    renderListBlock(
      "home-highlights-content",
      content.homeHighlights,
      "Campus highlights have not been posted yet."
    );

    renderListBlock(
      "home-cafeteria-preview-content",
      content.homeCafeteriaPreview,
      "Cafeteria preview content has not been posted yet."
    );

    renderListBlock(
      "home-benefits-content",
      content.homeBenefits,
      "Benefits have not been posted yet."
    );

    renderTextBlock(
      "home-mission-content",
      content.homeMission,
      "Mission statement has not been posted yet."
    );

    renderTextBlock(
      "home-footer-content",
      content.homeFooter,
      "HKNC Today is a student-focused campus information project."
    );
  } catch (error) {
    console.error("Error loading homepage content:", error);

    renderTextBlock(
      "home-welcome-content",
      "",
      "Unable to load welcome content right now."
    );

    renderTextBlock(
      "home-page-overview-content",
      "",
      "Unable to load page overview right now."
    );

    renderTextBlock(
      "home-headlines-content",
      "",
      "Unable to load headlines right now."
    );

    renderTextBlock(
      "home-campus-quick-look-content",
      "",
      "Unable to load campus quick look right now."
    );

    renderTextBlock(
      "home-activities-glance-content",
      "",
      "Unable to load activities at a glance right now."
    );

    renderTextBlock(
      "home-week-glance-content",
      "",
      "Unable to load this week at a glance right now."
    );

    renderTextBlock(
      "home-highlights-content",
      "",
      "Unable to load campus highlights right now."
    );

    renderTextBlock(
      "home-cafeteria-preview-content",
      "",
      "Unable to load cafeteria preview right now."
    );

    renderTextBlock(
      "home-benefits-content",
      "",
      "Unable to load benefits right now."
    );

    renderTextBlock(
      "home-mission-content",
      "",
      "Unable to load mission statement right now."
    );

    renderTextBlock(
      "home-footer-content",
      "",
      "Unable to load footer content right now."
    );
  }
}

loadHomePageContent();