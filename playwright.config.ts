import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir:'./e2e',
  testIgnore:'offline.spec.ts',
  timeout:120_000,
  expect:{ timeout:10_000 },
  fullyParallel:true,
  workers:4,
  reporter:'line',
  use:{
    baseURL:'http://127.0.0.1:4189',
    browserName:'chromium',
    trace:'retain-on-failure',
  },
  webServer:{
    command:'npm run dev -- --host 127.0.0.1 --port 4189 --strictPort',
    url:'http://127.0.0.1:4189',
    reuseExistingServer:true,
    timeout:120_000,
  },
});
