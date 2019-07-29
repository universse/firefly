module.exports = async ({ page, actions: { createPage, deletePage } }) => {
  if (page.path.includes('/curate')) {
    deletePage(page)
    createPage({
      ...page,
      context: { noSearch: true }
    })
  }
}
