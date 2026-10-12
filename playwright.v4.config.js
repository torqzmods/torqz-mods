import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir:"./tests",
  testMatch:/v4-preview\.spec\.js/,
  timeout:30000,
  use:{
    baseURL:"http://127.0.0.1:8765",
    browserName:"chromium",
    viewport:{width:1440,height:900}
  },
  reporter:[["list"],["html",{open:"never",outputFolder:"v4-preview-qa/report"}]],
  outputDir:"v4-preview-qa/test-results"
});
