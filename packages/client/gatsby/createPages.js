const fs = require('fs')
const { resolve } = require('path')

const { createCollectionPath } = require('./utils')
const { NormalizedCollectionsFilename } = require('common')

module.exports = async ({
  graphql,
  actions: { createPage, createRedirect }
}) => {
  const db = await graphql(
    `
      {
        allCollections {
          edges {
            node {
              id
              category
              level
              name
              itemCount
              tags
            }
          }
        }
      }
    `
  )

  // createPage({
  //   path: '/collection',
  //   component: resolve('./src/templates/collection.js'),
  //   matchPath: '/collection/*',
  //   context: {
  //     id: 'fallback'
  //   }
  // })

  const normalizedCollections = {}

  db.data.allCollections.edges.forEach(({ node }) => {
    const { id, name } = node

    normalizedCollections[node.id.toLowerCase()] = node

    createPage({
      path: createCollectionPath({ id, name }),
      component: resolve('./src/templates/collection.js'),
      // matchPath: undefined,
      context: {
        id
      }
    })
  })

  const dataDir = 'src/data/'

  !fs.existsSync(dataDir) && fs.mkdirSync(dataDir)

  fs.writeFileSync(
    `${dataDir}${NormalizedCollectionsFilename}.json`,
    JSON.stringify(normalizedCollections)
  )
}
