var plugins = []

// emotion must be FIRST
plugins.unshift(
  process.env.NODE_ENV === 'development'
    ? ['emotion', { sourceMaps: true }]
    : ['emotion'],
)

module.exports = {
  presets: ['next/babel', '@emotion/babel-preset-css-prop'],
  plugins,
}
