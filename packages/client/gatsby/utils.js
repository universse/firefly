const { animate } = require('common')

function slugify (str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

// TODO get unique categories for automation, unique tags for search
module.exports = {
  createCollectionPath: ({ id, name }) =>
    `/collection/${slugify(name)}-${id.toLowerCase()}`,

  createCategoryPath: category => `/category/${slugify(category)}`,

  isIndexPage: pathname => pathname.startsWith('/category') || pathname === '/',

  scrollToHero: () =>
    animate({
      func: current => window.scrollTo(0, current),
      from: window.scrollY,
      to: document.getElementById('hero').offsetHeight
    })
}
