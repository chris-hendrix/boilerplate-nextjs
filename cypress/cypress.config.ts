import { defineConfig } from 'cypress'

const cypressConfig = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',
    video: false,
    screenshotOnRunFailure: false,
    supportFile: 'cypress/support.ts',
  },
})

export default cypressConfig
