import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
const browser=await chromium.launch({headless:true});
const widths=[360,390,430,768,1024,1366,1440,1920];
await fs.mkdir("v4-preview-qa/screenshots",{recursive:true});
for(const width of widths){
  const page=await browser.newPage({viewport:{width,height:width<=430?850:1000},deviceScaleFactor:1,reducedMotion:"reduce"});
  await page.goto("http://127.0.0.1:8765/v4-preview/",{waitUntil:"networkidle"});
  await page.screenshot({path:"v4-preview-qa/screenshots/night-circuit-"+width+".png",fullPage:true});
  await page.screenshot({path:"v4-preview-qa/screenshots/hero-"+width+".png",fullPage:false});
  if(width===390){
    await page.locator("[data-menu-button]").click();
    await page.screenshot({path:"v4-preview-qa/screenshots/mobile-menu-390.png"});
  }
  await page.close();
}
await browser.close();
