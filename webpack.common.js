const path = require('path')

const webpack = require('webpack')
const I18nPlugin = require('i18n-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const languages = require('./i18n.conf.js')

module.exports = Object.keys(languages).map(lang => ({
  entry: path.join(__dirname, 'src', 'client', 'main.js'),

  name: lang,
  
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `${lang}/bundle.[name].js`,
    publicPath: '/'
  },

  context: __dirname,

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          'babel-loader',
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: [
            'vue-style-loader',
            'css-loader',
            'sass-loader'
          ],
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },

  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js',
      '@': path.join(__dirname),
      '~': path.join(__dirname, 'src', 'client'),
      'sass': path.join(__dirname, 'src', 'sass'),
      'sass-vars$': path.join(__dirname, 'src', 'sass', '_variables.scss'),
    }
  },

  target: "web",

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      filename: `index.${lang}.html`,
      template: 'src/index.html',
      title: 'Party Planner',
      minify: true
    }),
    new I18nPlugin(languages[lang]),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin()
  ]
}))