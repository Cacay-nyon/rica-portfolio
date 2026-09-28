/*
 * RICA'S PORTFOLIO — EDITABLE SETTINGS & PROJECTS
 * No libraries, accounts, API keys, or build tools required.
 * Put new images/videos in assets/, then change the entries below.
 */
"use strict";

const SETTINGS = {
  whatsappNumber: "639761144862", // International digits only; no +, spaces or hyphens.
  assetsDirectory: "assets/",
};

const PROJECTS = {
  thumbnails: [
    { title: "Micro Goals Strategy", file: "thumbnail-microgoals-BtHQJu3L.jpg", category: "YouTube thumbnail · Canva" },
    { title: "Effortless Success", file: "thumbnail-effortless-CefVw2NH.jpg", category: "YouTube thumbnail · Canva" },
    { title: "The 1% Rule", file: "thumbnail-1percent-yzJZUmuH.jpg", category: "YouTube thumbnail · Canva" },
  ],
  social: [
    { title: "Facebook Ads Course", file: "social-fb-ads-seminar-CAO5F8GE.jpg", category: "Social media graphic · Canva" },
    { title: "Facebook Ads Training", file: "social-fb-ads-D-WpPlbS.jpg", category: "Social media graphic · Canva" },
    ...[
      "social-panic-1-DS93Czou.jpg", "social-panic-2-9ZIiyvct.jpg", "social-panic-3-DkbnaNw-.jpg",
      "social-panic-4-BWpJDPOm.jpg", "social-panic-5-D824GNtV.jpg", "social-panic-6-BBU7zdGz.jpg", "social-panic-7-BRf2qzhk.jpg",
    ].map((file, index) => ({ title: `Wellness Carousel · Slide ${index + 1}`, file, category: "Carousel design · Canva" })),
  ],
  posters: [
    { title: "Valerie", file: "poster-valerie-r97kaSE6.jpg", category: "Product poster · Canva" },
    { title: "Fling Tea · Pee Easy", file: "poster-fling-tea-1-Ky6qIgGb.jpg", category: "Product poster · Canva" },
    { title: "Fling Tea · Sugar Guard", file: "poster-fling-tea-2-oV2asKxR.jpg", category: "Product poster · Canva" },
  ],
  video: [{ title: "Short-Form Video Edit", file: "portfolio-video-BvR9G9FH.mp4", category: "Video editing · CapCut", type: "video" }],
};

// Existing published figures, retained with screenshots. Update together if you have new insights.
const ACCOUNTS = {
  sports: {
    label: "Sports community · Instagram reel",
    headline: "One reel. A conversation worth sharing.",
    description: "A relatable moment from padel life, shared far beyond the original post. 10K shares show how often viewers chose to pass it along.",
    context: "Posted February 26, 2026 · Insights saved April 19, 2026",
    stats: [["336K", "Reel views"], ["226K", "Accounts reached"], ["10K", "Shares"]],
    secondary: [["3.3K", "likes"], ["8.5s", "avg. watch time"], ["592", "saves"], ["119", "comments"], ["127", "reposts"]],
    images: [
      { title: "Featured reel — 336K views", file: "insights-screenshot-D6ewWz_S.jpg" },
      { title: "Viral reel — 76K views", file: "insights-screenshot-3-CCPzloDk.jpg" },
      { title: "30-day account overview", file: "insights-screenshot-2-dDjLhvHC.jpg" },
    ],
    note: "Performance snapshots from my existing portfolio. The featured reel, second reel, and 30-day account overview are separate views; open each screenshot for its reporting context.",
  },
  personal: {
    label: "Personal brand · Instagram & Facebook reel",
    headline: "Reaching beyond an existing audience.",
    description: "A cross-platform reel with 29,888 total views. More than half of those views came from people who weren’t following the account.",
    context: "Single-reel snapshot · Instagram and Facebook",
    stats: [["29.9K", "Total views"], ["57.6%", "Views from non-followers"], ["3h 22m", "Watch time"]],
    secondary: [["4.6K", "Instagram views"], ["25.3K", "Facebook views"], ["42.4%", "followers"], ["57.6%", "non-followers"]],
    images: [{ title: "Cross-platform reel — 29,888 views", file: "insights-personal-1-C7d-2PIq.jpg" }],
    note: "A cross-platform reel snapshot from my existing portfolio. Platform totals are displayed as rounded figures. Open the original insight for the full context.",
  },
};

const asset = (filename) => SETTINGS.assetsDirectory + filename;
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

// Mobile navigation: button, Escape, outside-click, and link selection all work.
const navigation = document.getElementById("navigation");
const menuButton = document.getElementById("menu-toggle");
function closeMenu() {
  navigation.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
}
menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});
navigation.addEventListener("click", (event) => { if (event.target.closest("a")) closeMenu(); });
document.addEventListener("click", (event) => { if (!event.target.closest(".header")) closeMenu(); });
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation.classList.contains("is-open")) {
    closeMenu(); menuButton.focus();
  }
});
window.matchMedia("(min-width: 801px)").addEventListener("change", () => closeMenu());

// Default is light. Only an explicit choice is remembered on this device.
const themeButton = document.getElementById("theme-toggle");
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeButton.setAttribute("aria-pressed", String(theme === "dark"));
  themeButton.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
}
try { setTheme(localStorage.getItem("rica-theme") === "dark" ? "dark" : "light"); }
catch { setTheme("light"); }
themeButton.addEventListener("click", () => {
  const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(theme);
  try { localStorage.setItem("rica-theme", theme); } catch { /* Works even when storage is blocked. */ }
});

// Native dialog provides keyboard focus containment and Escape-to-close.
const lightbox = document.getElementById("lightbox");
const lightboxContent = document.getElementById("lightbox-content");
let previewOpener = null;
let appPreviewIndex = -1;
const appPieces = [...document.querySelectorAll('[data-app-piece]')];
const appPreviewNav = document.getElementById('app-preview-nav');
function openPreview(project, opener) {
  previewOpener = opener;
  appPreviewIndex = appPieces.indexOf(opener);
  appPreviewNav.hidden = appPreviewIndex < 0;
  if (appPreviewIndex >= 0) document.getElementById('app-preview-count').textContent = `${appPreviewIndex + 1} / ${appPieces.length}`;
  document.getElementById("lightbox-title").textContent = project.title;
  lightboxContent.replaceChildren();
  const media = document.createElement(project.type === "video" ? "video" : "img");
  media.src = asset(project.file);
  if (project.type === "video") {
    media.controls = true;
    media.playsInline = true;
    media.preload = "metadata";
  } else {
    media.alt = project.title;
  }
  lightboxContent.append(media);
  if (!lightbox.open) lightbox.showModal();
  document.body.classList.add("modal-open");
  document.getElementById("close-lightbox").focus();
}
function stepAppPreview(direction) {
  if (appPreviewIndex < 0) return;
  const piece = appPieces[(appPreviewIndex + direction + appPieces.length) % appPieces.length];
  const returnFocus = previewOpener;
  const activeControl = document.activeElement;
  openPreview({ title: piece.dataset.title, file: piece.dataset.preview }, piece);
  previewOpener = returnFocus;
  if (activeControl instanceof HTMLElement) activeControl.focus({ preventScroll: true });
}
document.getElementById('app-prev').addEventListener('click', () => stepAppPreview(-1));
document.getElementById('app-next').addEventListener('click', () => stepAppPreview(1));
lightbox.addEventListener('keydown', event => {
  if (appPreviewIndex >= 0 && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
    event.preventDefault(); stepAppPreview(event.key === 'ArrowLeft' ? -1 : 1);
  }
});
document.getElementById("close-lightbox").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
  const bounds = lightbox.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (event.target === lightbox && outside) lightbox.close();
});
lightbox.addEventListener("close", () => {
  const video = lightboxContent.querySelector("video");
  if (video) video.pause();
  lightboxContent.replaceChildren();
  document.body.classList.remove("modal-open");
  previewOpener?.focus({ preventScroll: true });
});

function renderProjects(category) {
  const grid = document.getElementById("work-grid");
  grid.replaceChildren();
  grid.classList.toggle("video-grid", category === "video");
  for (const project of PROJECTS[category]) {
    const card = element("button", "project-card");
    card.type = "button";
    card.setAttribute("aria-label", `${project.type === "video" ? "Play" : "Preview"} ${project.title}`);
    card.setAttribute("aria-haspopup", "dialog");
    const picture = element("div", "project-image");
    if (project.type === "video") {
      picture.classList.add("video-cover");
      const play = element("span", "play-symbol", "▶");
      play.setAttribute("aria-hidden", "true");
      picture.append(play, element("strong", "", "From raw clips to ready to post."), element("small", "", "Watch my video editing sample"));
    } else {
      if (category === "posters") picture.classList.add("poster");
      if (category === "social") picture.classList.add("social");
      const image = document.createElement("img");
      image.src = asset(project.file);
      image.alt = project.title;
      image.loading = "lazy";
      image.decoding = "async";
      picture.append(image);
    }
    const meta = element("div", "project-meta");
    const text = element("div");
    text.append(element("h3", "", project.title), element("p", "", project.category));
    const arrow = element("span", "project-arrow", "↗");
    arrow.setAttribute("aria-hidden", "true");
    meta.append(text, arrow);
    card.append(picture, meta);
    card.addEventListener("click", () => openPreview(project, card));
    grid.append(card);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && !document.documentElement.classList.contains('motion-paused')) {
      card.animate([{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}], {duration:360,delay:Math.min(grid.children.length - 1, 4)*35,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});
    }
  }
  document.querySelectorAll("[data-filter]").forEach((button) => {
    const active = button.dataset.filter === category;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
    button.querySelector("span").textContent = String(PROJECTS[button.dataset.filter].length).padStart(2, "0");
  });
  document.getElementById("work-status").textContent = `Showing ${PROJECTS[category].length} ${category} projects.`;
}
document.querySelectorAll("[data-filter]").forEach((button) => button.addEventListener("click", () => renderProjects(button.dataset.filter)));
renderProjects("thumbnails");

function renderAccount(key) {
  const account = ACCOUNTS[key];
  const container = document.getElementById("account-results");
  container.replaceChildren();
  const label = element("p", "account-label", account.label);
  label.setAttribute("role", "status");
  const stats = element("div", "stat-grid");
  account.stats.forEach(([value, title]) => {
    const stat = element("div", "stat");
    stat.append(element("div", "stat-value", value), element("div", "stat-label", title));
    stats.append(stat);
  });
  const secondary = element("div", "substats");
  account.secondary.forEach(([value, title]) => {
    const detail = element("span");
    detail.append(element("strong", "", value), document.createTextNode(title));
    secondary.append(detail);
  });
  const gallery = element("div", `insight-grid${account.images.length === 1 ? " single" : ""}`);
  account.images.forEach((project) => {
    const button = element("button", "insight-card");
    button.type = "button";
    button.setAttribute("aria-label", `View original insight: ${project.title}`);
    button.setAttribute("aria-haspopup", "dialog");
    const image = document.createElement("img");
    image.src = asset(project.file);
    image.alt = project.title;
    image.loading = "lazy";
    button.append(image, element("p", "", `${project.title} ↗`));
    button.addEventListener("click", () => openPreview(project, button));
    gallery.append(button);
  });
  const feature = element("div", "result-feature");
  const story = element("div", "result-story");
  story.append(label, element("h3", "result-headline", account.headline), element("p", "result-description", account.description), stats, secondary, element("p", "result-context", account.context));
  const evidence = element("div", "result-evidence");
  evidence.append(element("p", "evidence-label", "THE ORIGINAL INSIGHTS"), gallery.firstElementChild);
  feature.append(story, evidence);
  container.append(feature);
  if (gallery.children.length) {
    const more = element("details", "result-more");
    more.append(element("summary", "", "More performance snapshots +"), gallery);
    container.append(more);
  }
  container.append(element("p", "results-note", account.note));
  document.querySelectorAll("[data-account]").forEach((button) => {
    const active = button.dataset.account === key;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}
document.querySelectorAll("[data-account]").forEach((button) => button.addEventListener("click", () => renderAccount(button.dataset.account)));
renderAccount("sports");

// Expand the appropriate service when a hero link points to its details.
function expandLinkedService() {
  const id = window.location.hash.slice(1);
  const target = document.getElementById(id);
  if (target instanceof HTMLDetailsElement) target.open = true;
}
window.addEventListener("hashchange", expandLinkedService);
expandLinkedService();

// Functional contact without a pretend success message or an unconfigured backend.
// The visitor reviews the prepared message in WhatsApp and sends it themselves.
const form = document.getElementById("contact-form");
document.getElementById("contact-submit").disabled = false;
form.action = `https://wa.me/${SETTINGS.whatsappNumber}`;
document.querySelectorAll('a[href^="https://wa.me/"]').forEach((link) => { link.href = form.action; });
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const message = String(data.get("message") || "").trim();
  if (!name || !message) {
    const field = !name ? form.elements.namedItem("name") : form.elements.namedItem("message");
    field.setCustomValidity("Please enter a little more detail.");
    field.reportValidity();
    field.addEventListener("input", () => field.setCustomValidity(""), { once: true });
    return;
  }
  const text = [
    `Hi Rica! I'm ${name}.`,
    `I could use help with: ${data.get("service")}.`,
    email ? `My email: ${email}` : "",
    "", message,
  ].filter((line, index) => line || index === 3).join("\n");
  window.location.assign(`https://wa.me/${SETTINGS.whatsappNumber}?text=${encodeURIComponent(text)}`);
});
document.getElementById("year").textContent = String(new Date().getFullYear());


// Open the real project used in each hero collage card.
document.querySelectorAll("[data-preview]").forEach((card) => {
  card.addEventListener("click", () => openPreview({ title: card.dataset.title, file: card.dataset.preview }, card));
});

