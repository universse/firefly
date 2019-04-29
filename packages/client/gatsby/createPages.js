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

  db.data.allCollections.edges.forEach(({ node: { id, name } }) =>
    createPage({
      path: createCollectionPath({ id, name }).slice(1),
      component: resolve('./src/templates/collection.js'),
      context: {
        id
      }
    })
  )
}
