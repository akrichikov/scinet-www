import { type PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  webServer: {
    command: "npm run dev",
    port: 8022, // Updated to match dev script port
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: "http://localhost:8022", // Updated to match port
  },
};

export default config;