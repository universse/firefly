function slugify (str) {
  return str
    .split(' ')
    .map(s => s.toLowerCase())
    .join('-')
}

// TODO get unique categories for automation, unique tags for search
module.exports = {
  createCollectionPath: ({ id, name }) =>
    `/collection/${slugify(name)}-${id.toLowerCase()}`,

  createCategoryPath: category => `/category/${slugify(category)}`,

  isIndexPage: pathname => pathname.startsWith('/category') || pathname === '/',

  scrollToHero: (smooth = true) =>
    window.scrollTo({
      top: document.getElementById('hero').offsetHeight,
      behavior: smooth ? 'smooth' : 'auto'
    })
}
