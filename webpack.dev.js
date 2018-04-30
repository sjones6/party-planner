const { resolve } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const config = common[0];
const Notify = require('webpack-build-notifier')

module.exports = merge(config, {
  entry: [config.entry, 'webpack-hot-middleware/client'],
  devtool: 'source-map',
  mode: 'development',
  watch: true,
  watchOptions: {
    ignored: /node_modules|dist/
  },
  plugins: [
    new Notify({
      title: "PartyPlanner Webpack Build",
      sound: false
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
})