const fs = require('fs')
const { resolve } = require('path')

const { createCollectionPath } = require('./utils')
const { NormalizedCollectionsFilename } = require('common')

module.exports = async ({ graphql, actions: { createPage } }) => {
  const db = await graphql(
    `
      {
        allCollections {
          nodes {
            id
            category
            itemCount
            level
            name
            tags
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

  db.data.allCollections.nodes.forEach(({ id, ...node }) => {
    const { name } = node

    normalizedCollections[id] = node

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
