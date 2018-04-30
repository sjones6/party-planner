const merge = require('webpack-merge');
const prods = require('./webpack.prod.js')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
 
module.exports = merge(prods[0], {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
})
