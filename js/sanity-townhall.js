const SANITY_PROJECT_ID = "q9a2ofgp";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2025-01-01";

const townHallQuery = encodeURIComponent(`
  *[_type == "siteContent"][0]{
    townHallIntro,
    townHallMeetingDate,
    townHallMeetingTime,
    townHallMeetingLocation,
    townHallDiscussionTopics,
    townHallResourcesIntro,
    townHallFooter
  }
`);

const townHallUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${townHallQuery}`;

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

function renderPlainText(elementId, content, fallbackMessage) {
  const element = document.getElementById(elementId);

  if (!element) {
    return;
  }

  const cleanContent = content || "";
  element.textContent = cleanContent.trim() || fallbackMessage;
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

async function loadTownHallContent() {
  try {
    const response = await fetch(townHallUrl);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    const content = data?.result || {};

    renderTextBlock(
      "townhall-page-intro",
      content.townHallIntro,
      "Town Hall Committee information has not been posted yet."
    );

    renderPlainText(
      "townhall-meeting-date",
      content.townHallMeetingDate,
      "To be announced"
    );

    renderPlainText(
      "townhall-meeting-time",
      content.townHallMeetingTime,
      "To be announced"
    );

    renderPlainText(
      "townhall-meeting-location",
      content.townHallMeetingLocation,
      "To be announced"
    );

    renderListBlock(
      "townhall-discussion-topics",
      content.townHallDiscussionTopics,
      "Discussion topics have not been posted yet."
    );

    renderTextBlock(
      "townhall-resources-intro",
      content.townHallResourcesIntro,
      "Resource information has not been posted yet."
    );

    renderTextBlock(
      "townhall-footer-content",
      content.townHallFooter,
      ""
    );
  } catch (error) {
    console.error("Error loading Town Hall content:", error);

    renderTextBlock(
      "townhall-page-intro",
      "",
      "Unable to load Town Hall Committee information right now."
    );

    renderPlainText("townhall-meeting-date", "", "Unable to load date");
    renderPlainText("townhall-meeting-time", "", "Unable to load time");
    renderPlainText("townhall-meeting-location", "", "Unable to load location");

    renderListBlock(
      "townhall-discussion-topics",
      "",
      "Unable to load discussion topics right now."
    );

    renderTextBlock(
      "townhall-resources-intro",
      "",
      "Unable to load resource information right now."
    );
  }
}

loadTownHallContent();