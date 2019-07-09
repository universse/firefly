function slugify (str) {
  return str
    .replace(/\s+&\s+/g, '-')
    .replace(/\s+/g, '-')
    .toLowerCase()
}

// TODO get unique categories for automation, unique tags for search
module.exports = {
  createCollectionPath: ({ id, name }) =>
    `/collection/${slugify(name)}-${id.toLowerCase()}`,

  createCategoryPath: category => `/category/${slugify(category)}`,

  isIndexPage: pathname => pathname.startsWith('/category') || pathname === '/',

  scrollToHero: () =>
    window.scrollTo({
      top: document.getElementById('hero').offsetHeight,
      behavior: 'smooth'
    })
}
