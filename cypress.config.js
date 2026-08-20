const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'https://opensource-demo.orangehrmlive.com',

    pageLoadTimeout: 120000,
    requestTimeout: 20000,
    responseTimeout: 30000,

    setupNodeEvents(on, config) {
    },
  },
});