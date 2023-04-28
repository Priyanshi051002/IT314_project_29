module.exports = {
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
      // faker add so no error in register
      plugins: ["@cypress/webpack-dev-server", "cypress-faker"],
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    projectId: "steqzz",
    screenshotOnRunFailure: true,
    screenshotsFolder: "cypress/screenshots",
    trashAssetsBeforeRuns: true,
    videoCompression: 0,
    downloadsFolder: "cypress/downloads",
    waitForAnimations: true,
  },
};
