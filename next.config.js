require('dotenv').config()

const path = require('path')

module.exports = {
  exportPathMap: async (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId },
  ) => ({
    '/': { page: '/' },
  }),
  env: {
    PORT: process.env.PORT,
    BASE_URL: process.env.BASE_URL,
    MIXPANEL_TOKEN: process.env.MIXPANEL_TOKEN,
  },

  // We use absolute imports in `./src/`
  webpack: (config) => {
    config.resolve.modules.push(path.join(__dirname, 'src'))
    return config
  },
}
