const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    env: {
      API_URL: 'https://gorest.co.in/public/v2/users',

    },
  },
  
})