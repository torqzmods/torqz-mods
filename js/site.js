import { LINKS, MODS, UPDATES } from "./data.js";

const page = document.body.dataset.page;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmtDate = (iso) => new Date(iso + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const statusClass = (s) => "status-" + s.toLowerCase().replace(/\s+/g, "-");

/* ---------- Header & footer ---------- */
const NAV = [
  ["index.html", "Mods", "home"],
  ["install.html", "Downloads & install", "install"],
  ["about.html", "About", "about"]
];

function header() {
  const el = document.querySelector("[data-header]");
  if (!el) return;
  el.innerHTML = `
    <a class="skip" href="#main">Skip to content</a>
    <div class="shell bar">
      <a class="brand" href="index.html" aria-label="Torqz Mods home">
        <img src="assets/brand/torqz-logo.webp" alt="" width="36" height="36">
        <span>Torqz Mods</span>
      </a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav">Menu</button>
      <nav id="nav" aria-label="Main">
        ${NAV.map(([href, label, id]) => `<a href="${href}"${id === page ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
      </nav>
    </div>`;
  const btn = el.querySelector(".menu-btn");
  const nav = el.querySelector("nav");
  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("open", !open);
  });
}

const SOCIALS = [
  ["discord", "Discord", "Chat, test builds and bug reports"],
  ["youtube", "YouTube", "Build videos and showcases"],
  ["tiktok", "TikTok", "Short clips from the garage"],
  ["github", "GitHub", "This website's code"]
];

function socialLinks(detailed = false) {
  return SOCIALS.map(([key, name, blurb]) => {
    const url = LINKS[key];
    const inner = detailed
      ? `<strong>${name}</strong><span>${url ? blurb : "Coming soon"}</span>`
      : `${name}${url ? "" : " <small>soon</small>"}`;
    return url
      ? `<a class="social" href="${esc(url)}" target="_blank" rel="noopener">${inner}</a>`
      : `<span class="social is-soon" aria-disabled="true">${inner}</span>`;
  }).join("");
}

function footer() {
  const el = document.querySelector("[data-footer]");
  if (!el) return;
  el.innerHTML = `
    <div class="shell foot">
      <div>
        <strong class="foot-name">Torqz Mods</strong>
        <p>Independent mods for BeamNG.drive. Not affiliated with BeamNG GmbH.</p>
      </div>
      <div class="foot-social">${socialLinks()}</div>
    </div>`;
}

/* ---------- Gauge (home hero) ---------- */
function gauge() {
  const el = document.querySelector("[data-gauge]");
  if (!el) return;
  const mod = MODS.find((m) => m.status === "In development") || MODS[0];
  if (!mod) return;
  const ms = mod.milestones;
  const cx = 160, cy = 160, r = 128, start = 150, sweep = 240, gap = 4;
  const seg = sweep / ms.length;
  const pt = (deg, rad = r) => {
    const a = (deg * Math.PI) / 180;
    return [cx + rad * Math.cos(a), cy + rad * Math.sin(a)];
  };
  const arc = (a0, a1, rad = r) => {
    const [x0, y0] = pt(a0, rad), [x1, y1] = pt(a1, rad);
    return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${rad} ${rad} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  };
  let nowIdx = ms.findIndex((m) => m.status === "now");
  if (nowIdx < 0) nowIdx = Math.max(0, ms.filter((m) => m.status === "done").length - 1);
  const needleDeg = start + seg * nowIdx + seg / 2;

  const segs = ms.map((m, i) => {
    const a0 = start + i * seg + gap / 2, a1 = start + (i + 1) * seg - gap / 2;
    return `<path class="seg seg-${m.status}" d="${arc(a0, a1)}"/>`;
  }).join("");
  const ticks = Array.from({ length: ms.length * 4 + 1 }, (_, i) => {
    const d = start + (sweep / (ms.length * 4)) * i;
    const major = i % 4 === 0;
    const [x0, y0] = pt(d, r - 18), [x1, y1] = pt(d, r - (major ? 30 : 24));
    return `<line class="tick${major ? " major" : ""}" x1="${x0.toFixed(1)}" y1="${y0.toFixed(1)}" x2="${x1.toFixed(1)}" y2="${y1.toFixed(1)}"/>`;
  }).join("");
  const [nx, ny] = pt(0, r - 40);

  el.innerHTML = `
    <svg viewBox="0 0 320 250" role="img" aria-labelledby="gauge-title">
      <title id="gauge-title">${esc(mod.name)} progress: ${ms.filter((m) => m.status === "done").length} of ${ms.length} milestones done, currently working on ${esc(ms[nowIdx].name)}.</title>
      <path class="track" d="${arc(start, start + sweep)}"/>
      ${segs}${ticks}
      <g class="needle" style="--to:${needleDeg}deg">
        <line x1="${cx}" y1="${cy}" x2="${nx.toFixed(1)}" y2="${ny.toFixed(1)}"/>
      </g>
      <circle class="hub" cx="${cx}" cy="${cy}" r="9"/>
    </svg>
    <div class="readout">
      <span class="readout-label">${esc(mod.name)} is working on</span>
      <strong>${esc(ms[nowIdx].name)}</strong>
      <span class="readout-step">Milestone ${nowIdx + 1} of ${ms.length}</span>
    </div>`;
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("is-live")));
}

/* ---------- Mods ---------- */
function milestoneList(ms) {
  const label = { done: "Done", now: "In progress", next: "Up next" };
  return `<ol class="milestones">${ms.map((m) => `<li class="ms-${m.status}"><span class="lamp" aria-hidden="true"></span>${esc(m.name)}<span class="sr-only"> (${label[m.status]})</span></li>`).join("")}</ol>`;
}

function downloadButton(mod) {
  return mod.download
    ? `<a class="btn primary" href="${esc(mod.download)}">Download ${esc(mod.name)}${mod.version ? " v" + esc(mod.version) : ""}</a>`
    : `<span class="btn ghost is-off" aria-disabled="true">Not released yet</span>`;
}

function mods() {
  const el = document.querySelector("[data-mods]");
  if (!el) return;
  el.innerHTML = MODS.map((mod, i) => `
    <article class="bay" id="${esc(mod.id)}">
      <div class="bay-num" aria-hidden="true">Bay ${String(i + 1).padStart(2, "0")}</div>
      <div class="bay-main">
        <div class="bay-head">
          <h3>${esc(mod.name)}</h3>
          <span class="status ${statusClass(mod.status)}">${esc(mod.status)}</span>
        </div>
        <p class="bay-tag">${esc(mod.tagline)}</p>
        <p>${esc(mod.description)}</p>
        <ul class="features">${mod.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
        <div class="bay-actions">${downloadButton(mod)}<a class="btn ghost" href="install.html">How to install</a></div>
      </div>
      <aside class="bay-side">
        <h4>Build progress</h4>
        ${milestoneList(mod.milestones)}
      </aside>
    </article>`).join("") +
    `<div class="bay bay-empty"><div class="bay-num" aria-hidden="true">Bay ${String(MODS.length + 1).padStart(2, "0")}</div><p>This bay is open. The next Torqz project will show up here.</p></div>`;
}

function updates() {
  const el = document.querySelector("[data-updates]");
  if (!el) return;
  el.innerHTML = UPDATES.slice(0, 6).map((u) => `
    <li>
      <time datetime="${u.date}">${fmtDate(u.date)}</time>
      <div><h3>${esc(u.title)}</h3><p>${esc(u.text)}</p><span class="update-mod">${esc(u.mod)}</span></div>
    </li>`).join("");
}

/* ---------- Downloads page ---------- */
function downloads() {
  const el = document.querySelector("[data-downloads]");
  if (!el) return;
  el.innerHTML = MODS.map((mod) => `
    <li>
      <div>
        <strong>${esc(mod.name)}</strong>
        <span>${mod.download ? (mod.version ? "Version " + esc(mod.version) : "Latest version") : "In development. No download yet."}</span>
      </div>
      ${downloadButton(mod)}
    </li>`).join("");
}

function socials() {
  const el = document.querySelector("[data-socials]");
  if (el) el.innerHTML = socialLinks(true);
}

header(); footer(); gauge(); mods(); updates(); downloads(); socials();
