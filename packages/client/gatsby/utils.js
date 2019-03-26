var getSlug = require('speakingurl')

// TODO get unique categories
module.exports = {
  createCollectionPath: ({ id, name }) =>
    `/collections/${getSlug(`${name} ${id}`)}`,

  createCategoryPath: category => `/category/${getSlug(category)}`,

  scrollToHero: smooth =>
    window.scrollTo({
      top: document.getElementById('hero').offsetHeight,
      behavior: smooth ? 'smooth' : 'auto'
    })
}
