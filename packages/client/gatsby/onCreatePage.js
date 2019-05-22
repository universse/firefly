const { createCategoryPath } = require('./utils')
const { Categories } = require('common')

module.exports = ({ page, actions: { createPage, deletePage } }) => {
  if (page.path === '/') {
    createPage({
      ...page,
      context: { isIndexPage: true }
    })

    createPage({
      ...page,
      path: createCategoryPath('all'),
      context: { isIndexPage: true }
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
