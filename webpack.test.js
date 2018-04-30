const { resolve } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

// Not needed for these in karma tests
delete common.entry

const conf = common[0];

module.exports = merge(conf, {
  devtool: 'inline-source-map',
  mode: 'development',
  resolve: {
    alias: {
      "@test": resolve(__dirname, 'tests/.utils')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"testing"'
      }
    })
  ]
})