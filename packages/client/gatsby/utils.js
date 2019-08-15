const { Categories, animate } = require('@firefly/core')

function slugify (str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

// TODO fetch categories from database for automation
module.exports = {
  createCollectionPath: ({ id, name }) =>
    `/collection/${slugify(name)}-${id.toLowerCase()}`,

  createCategoryPath: category => `/category/${slugify(Categories[category])}`,

  isIndexPage: pathname => pathname.startsWith('/category') || pathname === '/',

  scrollToHero: () =>
    animate({
      func: current => window.scrollTo(0, current),
      from: window.scrollY,
      to: document.getElementById('Hero').offsetHeight
    })
}
