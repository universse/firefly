const nodeExternals = require('webpack-node-externals')
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')

module.exports = {
  externals: [nodeExternals()],
  plugins: [
    new Dotenv({ path: '../../.env' }),
    new webpack.IgnorePlugin(/^pg-native$/)
  ]
}
