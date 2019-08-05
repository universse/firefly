module.exports = async ({ page, actions: { createPage, deletePage } }) => {
  if (page.path.includes('/curate')) {
    deletePage(page)
    createPage({
      ...page,
      matchPath: '/curate/*',
      context: { noSearch: true }
    })
  }

  if (page.path.includes('/new-collection')) {
    deletePage(page)
    createPage({
      ...page,
      matchPath: '/new-collection/*'
    })
  }
}
