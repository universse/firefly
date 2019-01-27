const { resolve } = require('path')

module.exports = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [resolve('./src'), 'node_modules']
    }
  })
}
