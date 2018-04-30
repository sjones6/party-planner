const common = require('./webpack.common.js')
const merge = require('webpack-merge')

const UglifyJS = require('uglifyjs-webpack-plugin')

module.exports = common.map(config => merge(config, {
  watch: false,
  mode: 'production',
  plugins: [
    new UglifyJS()
  ],
  performance: {
    hints: "warning",
    maxAssetSize: 200000,
    maxEntrypointSize: 400000,
  }
}))