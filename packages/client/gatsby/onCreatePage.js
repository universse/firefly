const { createCategoryPath } = require('./utils')
const { Categories } = require('common')

module.exports = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  if (page.path === '/') {
    deletePage(page)

    createPage({
      ...page,
      context: { category: 'all', isIndexPage: true }
    })

    createPage({
      ...page,
      path: createCategoryPath('all'),
      context: { category: 'all', isIndexPage: true }
    })

    Categories.forEach(category =>
      createPage({
        ...page,
        path: createCategoryPath(category),
        context: { category, isIndexPage: true }
      })
    )
  }
}
