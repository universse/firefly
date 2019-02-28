const { createCategoryPath } = require('./utils')
const { Categories } = require('common')

module.exports = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  if (page.path === '/') {
    deletePage(page)

    createPage({
      ...page,
      path: '/',
      context: { category: null }
    })

    createPage({
      ...page,
      path: createCategoryPath('all'),
      context: { category: null }
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
