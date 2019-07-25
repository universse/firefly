const fs = require('fs')
const { resolve } = require('path')
const { Categories } = require('common')

const { createCategoryPath, createCollectionPath } = require('./utils')

module.exports = async ({
  graphql,
  actions: { createPage, createRedirect }
}) => {
  createRedirect({
    fromPath: '/api/subscribe',
    toPath:
      'https://emailoctopus.com/api/1.5/lists/28c2f781-9e6b-11e9-9307-06b4694bee2a/contacts',
    statusCode: 200
  })

  createPage({
    path: '/',
    component: resolve('./src/templates/category.js'),
    context: { category: 'all', isIndexPage: true }
  })

  Categories.forEach(category =>
    createPage({
      path: createCategoryPath(category),
      component: resolve('./src/templates/category.js'),
      context: { category, isIndexPage: true }
    })
  )

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

  const searchWorker = fs.readFileSync('src/utils/searchWorker/_template.js', {
    encoding: 'utf8'
  })

  fs.writeFileSync(
    'src/utils/searchWorker/search.worker.js',
    searchWorker.replace('%searchData%', JSON.stringify(normalizedCollections))
  )
}
