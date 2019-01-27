const { resolve } = require('path')
const { createCollectionPath } = require('./utils')

module.exports = async ({ graphql, actions }) => {
  const { createPage } = actions

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

  // db.data.allUrls.edges.forEach(({ node: { id } }) => {
  //   createPage({
  //     path: id,
  //     component: resolve('./src/templates/article.js'),
  //     context: { id }
  //   })
  // })

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
