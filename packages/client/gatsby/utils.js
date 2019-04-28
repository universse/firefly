const getSlug = require('speakingurl')

// TODO get unique categories for automation, unique tags for search
module.exports = {
  createCollectionPath: ({ id, name }) =>
    `/collections/${getSlug(`${name} ${id}`)}`,

  createCategoryPath: category => `/category/${getSlug(category)}`,

  isIndexPage: pathname => {
    try {
      pathname = pathname || window.location.pathname
      return pathname.includes('/category/') || pathname === '/'
    } catch {
      return false
    }
  },

  scrollToHero: (smooth = true) =>
    window.scrollTo({
      top: document.getElementById('hero').offsetHeight,
      behavior: smooth ? 'smooth' : 'auto'
    })
}
