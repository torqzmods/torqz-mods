import { test, expect } from "@playwright/test";
const path="/v4-preview/";
test("Six complete chapters, real project details and immediate logo",async ({page})=>{
  await page.goto(path);
  await expect(page.locator(".chapter")).toHaveCount(6);
  await expect(page.locator(".header-logo-mark")).toHaveCSS("visibility","visible");
  await expect(page.locator(".header-logo-mark")).toHaveCSS("opacity","1");
  await expect(page.locator(".header-logo-mark")).toHaveCSS("background-image",/torqz-logo.webp/);
  await expect(page.locator("#project")).toContainText("TORQZ");
  await expect(page.locator("#build")).toContainText("Vehicle Data");
  await expect(page.locator("#journal .journal-entry")).toHaveCount(2);
  await expect(page.locator("#project")).toContainText("IN DEVELOPMENT");
  await expect(page.locator("body")).toContainText("NOT BEAMNG GAMEPLAY FOOTAGE");
});
test("Genuine feature selector responds to mouse and keyboard",async ({page})=>{
  await page.goto(path);
  await expect(page.getByRole("tab")).toHaveCount(6);
  await page.getByRole("tab",{name:/Vehicle Data/}).click();
  await expect(page.locator("#feature-reveal")).toContainText("vehicle detection");
  await expect(page.getByRole("tab",{name:/Vehicle Data/})).toHaveAttribute("aria-selected","true");
  await page.getByRole("tab",{name:/Vehicle Data/}).focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("tab",{name:/Future Garage Storage/})).toHaveAttribute("aria-selected","true");
});
test("Saved V3 theme preference maps to new V4 themes",async ({page})=>{
  await page.goto(path);
  await expect(page.locator("html")).toHaveAttribute("data-theme","carbon");
  await page.locator("[data-theme-button]").click();
  await page.locator('[data-theme-choice="violet"]').click();
  await expect(page.locator("html")).toHaveAttribute("data-theme","violet");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme","violet");
  await page.locator("[data-theme-button]").click();
  await page.locator('[data-theme-choice="carbon"]').click();
});
test("Rail jumps to actual chapters",async ({page})=>{
  await page.goto(path);
  await page.locator('[data-rail="build"]').click();
  await expect(page).toHaveURL(/#build$/);
  await expect(page.locator("#build")).toBeVisible();
});
test("Mobile navigation opens, navigates and closes",async ({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto(path);
  await page.locator("[data-menu-button]").click();
  await expect(page.locator("[data-mobile-nav]")).toBeVisible();
  await page.locator('[data-mobile-nav] a[href="#journal"]').click();
  await expect(page).toHaveURL(/#journal$/);
  await expect(page.locator("[data-mobile-nav]")).toBeHidden();
  await expect(page.locator(".header-logo-mark")).toHaveCSS("visibility","visible");
});
for(const width of [360,390,430,768,1024,1366,1440,1920]){
 test("No horizontal overflow at "+width+"px",async ({page})=>{
   await page.setViewportSize({width,height:900});
   await page.goto(path);
   await page.waitForTimeout(80);
   const size=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
   expect(size.scroll-size.client).toBeLessThanOrEqual(3);
 });
}
test("Reduced-motion preference does not hide content",async ({page})=>{
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto(path);
  await expect(page.locator(".hero h1")).toBeVisible();
  await expect(page.locator(".concept-vehicle")).toBeVisible();
});
