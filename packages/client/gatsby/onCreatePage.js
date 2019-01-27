const { createCategoryPath } = require('./utils')

const categories = [
  'all',
  'artificial intelligence',
  'cloud',
  'design',
  'marketing',
  'programming',
  'psychology',
  'startup',
  'web development'
]

module.exports = ({ page, actions }) => {
  const { createPage } = actions

  page.path === '/' &&
    categories.forEach(category =>
      createPage({
        ...page,
        path: createCategoryPath(category),
        context: { category }
      })
    )
}
