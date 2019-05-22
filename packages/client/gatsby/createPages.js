const fs = require('fs')
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

  createPage({
    path: '/collection',
    component: resolve('./src/templates/collection.js'),
    matchPath: '/collection/*',
    context: {
      id: 'fallback'
    }
  })

  const searchData = []
  const normalizedCollections = {}

  db.data.allCollections.edges.forEach(({ node }) => {
    const { id, name } = node

    searchData.push({ id, name })
    normalizedCollections[node.id.toLowerCase()] = node

    createPage({
      path: createCollectionPath({ id, name }),
      component: resolve('./src/templates/collection.js'),
      matchPath: undefined,
      context: {
        id
      }
    })
  })

  const dataDir = 'public/data/'
  !fs.existsSync(dataDir) && fs.mkdirSync(dataDir)

  fs.writeFileSync(
    `${dataDir}inSZHihe121BmAaTS48B.json`,
    JSON.stringify(searchData)
  )

  fs.writeFileSync(
    `${dataDir}mivEB3GnRswZyWZMNkaO.json`,
    JSON.stringify(normalizedCollections)
  )
}
