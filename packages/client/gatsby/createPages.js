const { resolve } = require('path')
const { createCollectionPath } = require('./utils')

module.exports = async ({ graphql, actions: { createPage } }) => {
  const db = await graphql(
    `
      {
        allCollections {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `
  )

  createPage({
    path: '/collection',
    component: resolve('./src/templates/collection.js'),
    matchPath: '/collection/*',
    context: {
      id: 'fallback'
    }
  })

  db.data.allCollections.edges.forEach(({ node: { id, name } }) =>
    createPage({
      path: createCollectionPath({ id, name }),
      component: resolve('./src/templates/collection.js'),
      matchPath: undefined,
      context: {
        id
      }
    })
  )
}
