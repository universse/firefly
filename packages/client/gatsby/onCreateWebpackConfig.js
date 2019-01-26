const { resolve } = require('path')

module.exports = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [resolve(__dirname, '../src'), 'node_modules']
    }
  })
}
