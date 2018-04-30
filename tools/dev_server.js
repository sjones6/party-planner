const app = require('server');
const webpack = require('webpack')
const middleware = require('webpack-dev-middleware')
const conf = require('./../webpack.dev.js')
const compiler = webpack(conf)

app.use(require('webpack-hot-middleware')(compiler))
app.get(/.*/, middleware(compiler, {
  writeToDisk: true
}))

app.listen(process.env.PORT || 9090, () =>
  console.log(`Server listening on port ${process.env.PORT || 9090}!`)
)