const { createCategoryPath } = require('./utils')
const { Categories } = require('common')

module.exports = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  if (page.path === '/') {
    deletePage(page)

    createPage({
      ...page,
      path: '/',
      context: { category: 'all' }
    })

    createPage({
      ...page,
      path: createCategoryPath('all'),
      context: { category: 'all' }
    })

    Categories.forEach(category =>
      createPage({
        ...page,
        path: createCategoryPath(category),
        context: { category }
      })
    )
  }
}
