import { LINKS, MODS, UPDATES } from "./data.js";

const page = document.body.dataset.page;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmtDate = (iso) => new Date(iso + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const statusClass = (s) => "status-" + s.toLowerCase().replace(/\s+/g, "-");
const progress = (mod) => {
  const ms = mod.milestones || [];
  if (!ms.length) return 0;
  const score = ms.reduce((t, m) => t + (m.status === "done" ? 1 : m.status === "now" ? 0.5 : 0), 0);
  return Math.round((score / ms.length) * 100);
};
const currentStep = (mod) => mod.milestones.find((m) => m.status === "now") || mod.milestones.find((m) => m.status !== "done") || mod.milestones.at(-1);

/* Simple line icons (not brand logos) */
const ICON = {
  discord: '<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 3.5V17h0A2.5 2.5 0 0 1 4 14.5z"/><circle cx="9" cy="10.5" r="1"/><circle cx="15" cy="10.5" r="1"/>',
  youtube: '<rect x="3" y="5.5" width="18" height="13" rx="3.5"/><path d="M10.5 9.5v5l4-2.5z"/>',
  tiktok: '<path d="M9 18.5a3 3 0 1 1 0-6"/><path d="M12 4v11.5"/><path d="M12 4c.5 2.5 2.5 4 5 4"/>',
  github: '<path d="M8.5 8 4.5 12l4 4"/><path d="M15.5 8l4 4-4 4"/><path d="M13.5 6l-3 12"/>',
  patreon: '<path d="M12 19.5s-7-4.3-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.3c0 4.9-7 9.2-7 9.2z"/>'
};
const icon = (k) => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${ICON[k]}</svg>`;

/* ---------- Header & footer ---------- */
const NAV = [
  ["index.html", "Mods", "home"],
  ["install.html", "Install", "install"],
  ["about.html", "About", "about"]
];

function header() {
  const el = document.querySelector("[data-header]");
  if (!el) return;
  el.innerHTML = `
    <a class="skip" href="#main">Skip to content</a>
    <div class="nav-wrap">
      <div class="nav-pill glass">
        <a class="brand" href="index.html">
          <img class="wordmark" src="assets/brand/torqz-wordmark.svg" alt="Torqz Mods" width="160" height="46">
        </a>
        <button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav"><span></span><span></span><span class="sr-only">Menu</span></button>
        <nav id="nav" aria-label="Main">
          ${NAV.map(([href, label, id]) => `<a href="${href}"${id === page ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
        </nav>
      </div>
    </div>`;
  const btn = el.querySelector(".menu-btn");
  const nav = el.querySelector("nav");
  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("open", !open);
  });
  const onScroll = () => el.classList.toggle("scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

const SOCIALS = [
  ["discord", "Discord", "Chat, test builds and bug reports"],
  ["youtube", "YouTube", "Build videos and showcases"],
  ["tiktok", "TikTok", "Short clips from the garage"],
  ["patreon", "Patreon", "Support Torqz Mods"]
];

function footer() {
  const el = document.querySelector("[data-footer]");
  if (!el) return;
  el.innerHTML = `
    <div class="shell">
      <div class="foot glass">
        <div class="foot-brand">
          <img class="wordmark" src="assets/brand/torqz-wordmark.svg" alt="Torqz Mods" width="150" height="43">
          <div><p>Independent mods for BeamNG.drive. Not affiliated with BeamNG GmbH.</p></div>
        </div>
        <div class="foot-links">
          ${SOCIALS.map(([k, name]) => LINKS[k]
            ? `<a class="icon-btn" href="${esc(LINKS[k])}" target="_blank" rel="noopener" aria-label="${name}" title="${name}">${icon(k)}</a>`
            : `<span class="icon-btn is-soon" title="${name}: coming soon" aria-label="${name}, coming soon">${icon(k)}</span>`).join("")}
        </div>
      </div>
    </div>`;
}

/* ---------- Home hero: live build card ---------- */
function ring(pct, size = 132) {
  const r = size / 2 - 9, c = 2 * Math.PI * r;
  return `<svg class="ring" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" aria-hidden="true">
    <defs><linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#38e1ff"/><stop offset="1" stop-color="#4f6bff"/></linearGradient></defs>
    <circle class="ring-track" cx="${size / 2}" cy="${size / 2}" r="${r}"/>
    <circle class="ring-fill" cx="${size / 2}" cy="${size / 2}" r="${r}" stroke-dasharray="${c.toFixed(1)}" style="--c:${c.toFixed(1)};--off:${(c * (1 - pct / 100)).toFixed(1)}"/>
  </svg>`;
}

function liveCard() {
  const el = document.querySelector("[data-live]");
  if (!el) return;
  /* Feature whichever mod has the newest update; fall back to the one in development. */
  const newest = UPDATES[0] && MODS.find((m) => m.name === UPDATES[0].mod);
  const mod = newest || MODS.find((m) => m.status === "In development") || MODS[0];
  if (!mod) return;
  const released = mod.status === "Released";
  const pct = released ? 100 : progress(mod);
  const step = currentStep(mod);
  const latest = UPDATES.find((u) => u.mod === mod.name);
  const next = released ? MODS.find((m) => m.status === "In development") : null;
  const big = released && mod.version ? "v" + esc(mod.version) : pct + "%";
  const small = released ? "out now" : "built";
  const sub = released
    ? `${esc(mod.access)} download &middot; <strong>Version ${esc(mod.version || "")}</strong>`
    : `Working on <strong>${esc(step.name)}</strong>`;
  el.innerHTML = `
    <div class="live-top">
      <span class="live-dot" aria-hidden="true"></span>
      <span>${released ? "Latest release" : "Live build"}</span>
      <span class="status ${statusClass(mod.status)}">${esc(mod.status)}</span>
    </div>
    <div class="live-main">
      <div class="ring-wrap">${ring(pct)}<div class="ring-label"><strong${released ? ' style="font-size:1.35rem"' : ""}>${big}</strong><span>${small}</span></div></div>
      <div>
        <h2>${esc(mod.name)}</h2>
        <p>${sub}</p>
      </div>
    </div>
    <ol class="steps-mini">
      ${mod.milestones.map((m) => `<li class="ms-${m.status}"><span class="lamp" aria-hidden="true"></span>${esc(m.name)}</li>`).join("")}
    </ol>
    ${latest ? `<a class="live-update" href="#updates"><span>Latest: ${fmtDate(latest.date)}</span>${esc(latest.title)}</a>` : ""}
    ${next ? `<a class="live-update live-next" href="install.html"><span>Up next &middot; ${esc(next.access)}</span>${esc(next.name)}: ${esc(currentStep(next).name.toLowerCase())}, ${progress(next)}% built</a>` : ""}`;
  requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add("is-loaded")));
}

/* ---------- Mods ---------- */
function carArt() {
  return `<svg class="car-art" viewBox="0 0 800 300" aria-hidden="true">
    <path d="M40 236c0-24 18-38 58-44l130-20c58-50 128-66 214-66 92 0 144 28 196 66l80 13c34 6 44 25 44 51H702a62 62 0 0 0-124 0H264a62 62 0 0 0-124 0z"/>
    <path class="car-glass" d="M262 170c46-38 104-50 180-50 74 0 116 18 156 50z"/>
    <path d="M436 120v50"/>
    <circle cx="202" cy="236" r="46"/><circle cx="640" cy="236" r="46"/>
    <circle class="hubcap" cx="202" cy="236" r="16"/><circle class="hubcap" cx="640" cy="236" r="16"/>
  </svg>`;
}

function media(mod) {
  return mod.image
    ? `<img src="${esc(mod.image)}" alt="${esc(mod.name)}" loading="lazy">`
    : `<div class="media-art"><div class="media-grid"></div>${carArt()}<img class="media-logo" src="assets/brand/torqz-icon.svg" alt="" width="64" height="64"></div>`;
}

function downloadButton(mod, small = false) {
  if (mod.access === "Patreon" && !mod.download) {
    return LINKS.patreon
      ? `<a class="btn primary${small ? " sm" : ""}" href="${esc(LINKS.patreon)}" target="_blank" rel="noopener">Join on Patreon</a>`
      : `<span class="btn ghost is-off${small ? " sm" : ""}" aria-disabled="true">Patreon coming soon</span>`;
  }
  return mod.download
    ? `<a class="btn primary${small ? " sm" : ""}" href="${esc(mod.download)}">Download${mod.version ? " v" + esc(mod.version) : ""}</a>`
    : `<span class="btn ghost is-off${small ? " sm" : ""}" aria-disabled="true">Not released yet</span>`;
}

function mods() {
  const el = document.querySelector("[data-mods]");
  if (!el) return;
  el.innerHTML = MODS.map((mod) => {
    const pct = progress(mod);
    const extra = mod.features.length - 3;
    return `
    <article class="mod-card glass spot" id="${esc(mod.id)}">
      <div class="mod-media">${media(mod)}<span class="status ${statusClass(mod.status)}">${esc(mod.status)}</span></div>
      <div class="mod-body">
        ${mod.project ? `<span class="mod-project">${esc(mod.project)}${mod.access === "Patreon" ? " · Patreon" : ""}</span>` : ""}
        <h3>${esc(mod.name)}</h3>
        <p class="mod-tag">${esc(mod.tagline)}</p>
        <p>${esc(mod.description)}</p>
        <div class="bar" role="img" aria-label="${pct}% built, working on ${esc(currentStep(mod).name)}">
          <div class="bar-head"><span>${esc(currentStep(mod).name)}</span><span>${pct}%</span></div>
          <div class="bar-track"><div class="bar-fill" style="--w:${pct}%"></div></div>
        </div>
        <ul class="chips">${mod.features.slice(0, 3).map((f) => `<li>${esc(f)}</li>`).join("")}${extra > 0 ? `<li class="more">+${extra} more</li>` : ""}</ul>
        <div class="mod-actions">${downloadButton(mod, true)}<a class="btn ghost sm" href="install.html">How to install</a></div>
      </div>
    </article>`;
  }).join("") + `
    <div class="mod-card next-card">
      <div class="next-inner">
        <span class="next-plus" aria-hidden="true">+</span>
        <h3>Next project</h3>
        <p>Something new is coming to the garage. Follow along to see it first.</p>
        <a class="btn ghost sm" href="about.html">Follow Torqz</a>
      </div>
    </div>`;
}

function updates() {
  const el = document.querySelector("[data-updates]");
  if (!el) return;
  el.innerHTML = UPDATES.slice(0, 6).map((u, i) => `
    <li class="glass${i === 0 ? " is-new" : ""}">
      <div class="u-meta"><time datetime="${u.date}">${fmtDate(u.date)}</time><span class="u-mod">${esc(u.mod)}</span>${i === 0 ? '<span class="u-new">New</span>' : ""}</div>
      <h3>${esc(u.title)}</h3>
      <p>${esc(u.text)}</p>
    </li>`).join("");
}

/* ---------- Install page ---------- */
function downloads() {
  const el = document.querySelector("[data-downloads]");
  if (!el) return;
  el.innerHTML = MODS.map((mod) => `
    <li class="glass">
      <span class="brand-mark lg"><img src="${esc(mod.image || "assets/brand/torqz-icon.svg")}" alt="" width="52" height="52"></span>
      <div class="dl-info">
        <strong>${esc(mod.name)}</strong>
        <span>${mod.download ? (mod.version ? "Version " + esc(mod.version) : "Latest version") : mod.status === "Released" ? `${mod.access === "Patreon" ? "For Patreon members. " : ""}${mod.version ? "Version " + esc(mod.version) : "Out now"}` : `${mod.access === "Patreon" ? "For Patreon members. " : ""}In development, ${progress(mod)}% built`}</span>
      </div>
      ${downloadButton(mod)}
    </li>`).join("");
}

/* ---------- About page ---------- */
function socials() {
  const el = document.querySelector("[data-socials]");
  if (!el) return;
  el.innerHTML = SOCIALS.map(([k, name, blurb]) => {
    const url = LINKS[k];
    const inner = `<span class="s-icon">${icon(k)}</span><span class="s-text"><strong>${name}</strong><span>${url ? blurb : "Coming soon"}</span></span>`;
    return url
      ? `<a class="social glass spot" href="${esc(url)}" target="_blank" rel="noopener">${inner}</a>`
      : `<span class="social glass is-soon" aria-disabled="true">${inner}</span>`;
  }).join("");
}

function aboutStats() {
  const el = document.querySelector("[data-about-stats]");
  if (!el) return;
  const inDev = MODS.filter((m) => m.status === "In development").length;
  const released = MODS.filter((m) => m.status === "Released").length;
  el.innerHTML = `
    <li><strong>${MODS.length}</strong><span>${MODS.length === 1 ? "project" : "projects"}</span></li>
    <li><strong>${inDev}</strong><span>in development</span></li>
    <li><strong>${released}</strong><span>released</span></li>`;
}

/* ---------- Cursor spotlight on cards (only reacts to the pointer) ---------- */
function spotlight() {
  document.addEventListener("pointermove", (e) => {
    const card = e.target.closest?.(".spot");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, { passive: true });
}

header(); footer(); liveCard(); mods(); updates(); downloads(); socials(); aboutStats(); spotlight();
if (!document.querySelector("[data-live]")) requestAnimationFrame(() => document.body.classList.add("is-loaded"));
