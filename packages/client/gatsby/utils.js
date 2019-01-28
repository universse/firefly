const slug = require('slug')

// get unique categories
module.exports = {
  createCollectionPath: ({ id, name }) =>
    `/collections/${slug(`${name} ${id}`, { lower: true })}`,
  createCategoryPath: category => `/category/${slug(category)}`
}
