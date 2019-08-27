const { resolve } = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = ({ actions: { replaceWebpackConfig }, getConfig, stage }) => {
  const config = getConfig()

  config.module.rules.push({
    test: /\.worker\.js$/,
    use: { loader: 'workerize-loader' }
  })
  config.output.globalObject = 'this'

  config.resolve.modules = [resolve('./src'), 'node_modules']

  stage === 'build-javascript' &&
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: '3001'
      })
    )

  replaceWebpackConfig(config)
}
