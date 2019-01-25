const slug = require('slug')

module.exports = {
  createCollectionPath: ({ id, name }) =>
    `/collections/${slug(`${name} ${id}`, { lower: true })}`
}
