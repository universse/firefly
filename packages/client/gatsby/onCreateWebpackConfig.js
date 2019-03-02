const { resolve } = require('path')

module.exports = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [resolve('./src'), 'node_modules']
    }
  })
}
