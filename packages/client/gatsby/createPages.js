const { resolve } = require('path')
const { createCollectionPath } = require('./utils')

// const categories = [
//   { category: 'artificial intelligence', to: '/artificial-intelligence/' },
//   { category: 'cloud', to: '/cloud/' },
//   { category: 'design', to: '/design/' },
//   { category: 'marketing', to: '/marketing/' },
//   { category: 'programming', to: '/programming/' },
//   { category: 'psychology', to: '/psychology/' },
//   { category: 'startup', to: '/startup/' },
//   { category: 'web development', to: '/web-development/' }
// ]

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

  // categories.forEach(({ category, to }) =>
  //   createPage({
  //     path: to,
  //     component: resolve('./src/templates/category.js'),
  //     context: { category }
  //   })
  // )

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
