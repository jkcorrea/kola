/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */

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
  },

  // We use absolute imports in `./src/`
  webpack: (config) => {
    config.resolve.modules.push(path.join(__dirname, 'src'))
    return config
  },
}

/* eslint-enable @typescript-eslint/no-var-requires */
/* eslint-enable @typescript-eslint/no-unused-vars */
