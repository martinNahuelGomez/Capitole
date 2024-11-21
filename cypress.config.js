const fs = require('fs')

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        writeCsv({ filename, content }) {
          fs.writeFileSync(filename, content)
          return null
        }
      })

      // Set the base URL based on the environment
      const environment = config.env.environment || 'production'
      config.baseUrl = config.env[environment]
      return config
    },
    env: {
      local: 'http://localhost:4000/fashionhub/',
      staging: 'https://staging-env/fashionhub/',
      production: 'https://pocketaces2.github.io/fashionhub/'
    }
  }
}