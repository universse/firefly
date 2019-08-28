const fs = require('fs')
const { resolve } = require('path')
const {
  Categories,
  createCategoryPath,
  createCollectionPath
} = require('@firefly/core')

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

  createRedirect({
    fromPath: '/fire/*',
    toPath: `${process.env.FIREBASE_FUNCTIONS}/:splat`,
    statusCode: 200
  })

  createPage({
    path: '/',
    component: resolve('./src/templates/category.js'),
    context: { category: -1, isIndexPage: true }
  })

  Categories.forEach((_, i) =>
    createPage({
      path: createCategoryPath(i),
      component: resolve('./src/templates/category.js'),
      context: { category: i, isIndexPage: true }
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

  const normalizedCollections = {}

  db.data.allCollections.nodes.forEach(({ id, ...node }) => {
    const { name } = node

    normalizedCollections[id] = node

    createPage({
      path: createCollectionPath({ id, name }),
      component: resolve('./src/templates/collection.js'),
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
};
