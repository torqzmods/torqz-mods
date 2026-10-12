/* Night Circuit V4 design preview. Real source data from existing V3 modules. */
import { MODS } from "../js/mods.js";
import { UPDATES } from "../js/updates.js";

const project = MODS.find(item => item.id === "project-01");
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const escapeHtml = text => String(text ?? "").replace(/[&<>"']/g, ch => ({
  "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
}[ch]));
const label = status => status === "in-progress" ? "In Progress" : status === "complete" ? "Complete" : "Planned";

function initFeatureSpotlight() {
 const list = $("#feature-selector");
 const stage = $("#feature-reveal");
 if (!project || !list || !stage) return;
 const features = project.features || [];
 list.innerHTML = features.map((item, i) =>
   '<button type="button" class="feature-tab" role="tab" id="feature-tab-' + i +
   '" data-feature-index="' + i + '" aria-controls="feature-reveal" aria-selected="' + (i === 0) +
   '" tabindex="' + (i === 0 ? 0 : -1) + '"><b>' + String(i + 1).padStart(2,"0") +
   '</b><strong>' + escapeHtml(item.title) + '</strong><small>' + escapeHtml(label(item.status)) + '</small></button>'
 ).join("");
 function select(index, focus = false) {
   const item = features[index];
   if(!item) return;
   $$(".feature-tab").forEach((tab,i)=>{
     const selected = i === index;
     tab.setAttribute("aria-selected",String(selected));
     tab.tabIndex = selected ? 0 : -1;
   });
   stage.setAttribute("aria-labelledby","feature-tab-" + index);
   stage.innerHTML = '<span class="feature-counter">' + String(index + 1).padStart(2,"0") +
     ' / ' + String(features.length).padStart(2,"0") + '</span><h3>' +
     escapeHtml(item.title) + '</h3><span class="feature-status">Status: ' +
     escapeHtml(label(item.status)) + '</span><p>' +
     escapeHtml(item.description) +
     '</p><span class="feature-disclaimer">INTENDED FEATURE · CONCEPT PRESENTATION, NOT FUNCTIONAL GAMEPLAY</span>';
   if(focus)list.querySelectorAll("[role=tab]")[index]?.focus();
 }
 list.addEventListener("click",event=>{
   const tab=event.target.closest("[data-feature-index]");
   if(tab)select(Number(tab.dataset.featureIndex));
 });
 list.addEventListener("keydown",event=>{
   if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End"].includes(event.key))return;
   const tabs=$$(".feature-tab");
   const current=tabs.findIndex(t=>t.getAttribute("aria-selected")==="true");
   const i=event.key==="Home"?0:event.key==="End"?tabs.length-1:
      (current+(event.key==="ArrowUp"||event.key==="ArrowLeft"?-1:1)+tabs.length)%tabs.length;
   event.preventDefault();select(i,true);
 });
 select(0);
}

function renderMilestones() {
 const mount=$("#milestone-list");
 if(!mount || !project)return;
 mount.innerHTML=(project.milestones||[]).map((milestone,i)=>
   '<div class="milestone ' + (milestone.status==="in-progress" ? "current" : "") +
   '"><span>' + String(i+1).padStart(2,"0") + '</span><h3>' +
   escapeHtml(milestone.name) + '</h3><small>' +
   escapeHtml(label(milestone.status)) + '</small></div>'
 ).join("");
}
function renderJournal() {
 const mount=$("#journal-entries");
 if(!mount)return;
 const relevant=UPDATES.filter(entry=>entry.projectId==="project-01");
 mount.innerHTML=relevant.map(entry=>
   '<article class="journal-entry"><div><time datetime="' + escapeHtml(entry.date) +
   '">' + escapeHtml(entry.displayDate) +
   '</time></div><div><span class="journal-category">' +
   escapeHtml(entry.category||"Development") +
   '</span><h3>' + escapeHtml(entry.title) +
   '</h3><p>' + escapeHtml(entry.description) + '</p></div></article>'
 ).join("");
}
function initTheme(){
 const button=$("[data-theme-button]");
 const popover=$("[data-theme-panel]");
 if(!button||!popover)return;
 const themes=["carbon","copper","violet"];
 const options=$$("[data-theme-choice]");
 const current=()=>themes.includes(document.documentElement.dataset.theme)?document.documentElement.dataset.theme:"carbon";
 function reflect(){
   options.forEach(item=>item.setAttribute("aria-pressed",String(item.dataset.themeChoice===current())));
   button.setAttribute("aria-label","Choose color theme, current: "+({carbon:"Deep Tide",copper:"Alloy Dusk",violet:"Ultraviolet Night"}[current()]));
 }
 function close(){
   popover.hidden=true;
   button.setAttribute("aria-expanded","false");
 }
 button.addEventListener("click",()=>{
   popover.hidden=!popover.hidden;
   button.setAttribute("aria-expanded",String(!popover.hidden));
 });
 options.forEach(option=>option.addEventListener("click",()=>{
   const theme=option.dataset.themeChoice;
   if(!themes.includes(theme))return;
   document.documentElement.dataset.theme=theme;
   try{localStorage.setItem("torqz-theme-v3",theme);}catch(_){}
   reflect();close();button.focus();
 }));
 document.addEventListener("pointerdown",event=>{
   if(!popover.hidden&&!popover.contains(event.target)&&!button.contains(event.target))close();
 });
 document.addEventListener("keydown",event=>{
   if(event.key==="Escape"&&!popover.hidden){close();button.focus();}
 });
 reflect();
}
function initMenu(){
 const button=$("[data-menu-button]"),menu=$("[data-mobile-nav]");
 if(!button||!menu)return;
 function close(){menu.hidden=true;button.setAttribute("aria-expanded","false");button.setAttribute("aria-label","Open menu");}
 button.addEventListener("click",()=>{
   const opening=menu.hidden;menu.hidden=!opening;
   button.setAttribute("aria-expanded",String(opening));
   button.setAttribute("aria-label",opening?"Close menu":"Open menu");
 });
 menu.querySelectorAll("a").forEach(link=>link.addEventListener("click",close));
 document.addEventListener("keydown",event=>{if(event.key==="Escape"&&!menu.hidden){close();button.focus();}});
 document.addEventListener("pointerdown",event=>{if(!menu.hidden&&!button.contains(event.target)&&!menu.contains(event.target))close();});
}
function initRail(){
 const anchors=$$("[data-rail]");
 const chapters=$$("[data-chapter]");
 if(!anchors.length||!chapters.length)return;
 const update=id=>anchors.forEach(anchor=>{
   if(anchor.dataset.rail===id)anchor.setAttribute("aria-current","true");
   else anchor.removeAttribute("aria-current");
 });
 if("IntersectionObserver" in window){
   const io=new IntersectionObserver(entries=>{
     for(const entry of entries){
       if(entry.isIntersecting)update(entry.target.id);
     }
   },{rootMargin:"-22% 0px -58% 0px",threshold:0});
   chapters.forEach(chapter=>io.observe(chapter));
 }
}
function initHeroLight(){
 const stage=$("[data-hero-stage]");
 const hero=$(".hero");
 if(!stage||!hero)return;
 const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 const fine=window.matchMedia("(pointer:fine)").matches;
 if(reduce||!fine)return;
 let id=0,offset=0;
 hero.addEventListener("pointermove",event=>{
   const box=hero.getBoundingClientRect();
   const x=(event.clientX-box.left)/box.width-.5;
   offset=Math.max(-6,Math.min(6,x*9));
   if(id)return;
   id=requestAnimationFrame(()=>{
     stage.style.translate=offset.toFixed(2)+"px 0";
     id=0;
   });
 },{passive:true});
 hero.addEventListener("pointerleave",()=>{stage.style.translate="0 0";},{passive:true});
}
initFeatureSpotlight();
renderMilestones();
renderJournal();
initTheme();
initMenu();
initRail();
initHeroLight();
