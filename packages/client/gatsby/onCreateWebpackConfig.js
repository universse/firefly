const { resolve } = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = ({ actions: { setWebpackConfig }, stage }) => {
  setWebpackConfig({
    resolve: {
      modules: [resolve('./src'), 'node_modules']
    }
  })

  if (stage === 'build-javascript') {
    setWebpackConfig({
      plugins: [
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: '3001'
        })
      ]
    })
  }
}
