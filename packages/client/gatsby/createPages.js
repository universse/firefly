const { resolve } = require('path')
const { createCollectionPath } = require('./utils')

module.exports = async ({
  graphql,
  actions: { createPage, createRedirect }
}) => {
  process.env.NODE_ENV === 'production' &&
    createRedirect({
      fromPath: '/api/fire/*',
      toPath: 'https://api.amplitude.com/:splat',
      statusCode: 200
    })

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
