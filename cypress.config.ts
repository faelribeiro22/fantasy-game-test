import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'e2e/**/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
