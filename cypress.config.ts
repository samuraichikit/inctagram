import { defineConfig } from "cypress";
// import 'dotenv/config'


export default defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: false,
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3000',
    excludeSpecPattern:['**/1-getting-started', '**/2-advanced-examples'],
    specPattern: ['**/*.cy.ts'],
    setupNodeEvents(on, config) {
    },
  },
});

/* from config project
import { defineConfig } from "cypress";
import 'dotenv/config'

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3000',
    chromeWebSecurity: false,
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    api_url: "http://localhost:2000",
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    appName: process.env.APP_NAME
  }
});
*/

// from Artyom's project
// const { defineConfig } = require('cypress')
//
// module.exports = defineConfig({
//   viewportHeight: 1080,
//   viewportWidth: 1920,
//   video: false,
//   e2e: {
//     baseUrl: 'http://localhost:4200',
//     excludeSpecPattern: ['**/1-getting-started', '**/2-advanced-examples'],
//     specPattern: ['**/*.spec.js'],//my version of the specPattern option will run all the tests in the cypress/integration directory.
//     // specPattern: 'cypress/e2e/**/*.{js, jsx, ts, tsx}',//his version of the specPattern option will run all the tests in the cypress/e2e directory.
//   },
//
// })

