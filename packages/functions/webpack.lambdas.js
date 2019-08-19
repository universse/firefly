const slsw = require('serverless-webpack')
const nodeExternals = require('webpack-node-externals')
// const webpack = require('webpack')

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  devtool: 'source-map',
  externals: [nodeExternals()],
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  optimization: {
    minimize: false
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.(gql|graphql)/,
        use: 'graphql-tag/loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/
      }
    ]
  }
  // plugins: [new webpack.IgnorePlugin(/^pg-native$/)]
}
