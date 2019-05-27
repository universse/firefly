const { createCategoryPath } = require('./utils')
const { Categories } = require('common')

module.exports = ({ page, actions: { createPage } }) => {
  if (page.path === '/') {
    createPage({
      ...page,
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
