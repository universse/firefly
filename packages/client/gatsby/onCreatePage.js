const { createCategoryPath } = require('./utils')
const { Categories } = require('common')

module.exports = ({ page, actions }) => {
  const { createPage } = actions

  if (page.path === '/') {
    createPage({
      ...page,
      path: createCategoryPath('all')
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
