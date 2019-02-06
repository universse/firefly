var getSlug = require('speakingurl')

// get unique categories
module.exports = {
  createCollectionPath: ({ id, name }) =>
    `/collection/${getSlug(`${name} ${id}`)}`,
  createCategoryPath: category => `/category/${getSlug(category)}`
}
