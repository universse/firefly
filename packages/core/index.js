const toTitleCase = require('./src/toTitleCase')
const { truncate, getTruncatedString } = require('./src/truncate')

const Categories = [
  'artificial intelligence',
  'cloud',
  'design',
  'marketing',
  'programming',
  'psychology',
  'startup',
  'web development'
]

const DifficultyLevels = [
  'introductory',
  'fundamental',
  'intermediate',
  'advanced'
]

const ItemTypes = [
  'article',
  'book',
  'code',
  'course',
  'podcast',
  'url',
  'video'
]

function slugify (str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

function createCollectionPath ({ id, name }) {
  return `/collection/${slugify(name)}-${id.toLowerCase()}`
}

function createCategoryPath (category) {
  return `/category/${slugify(Categories[category])}`
}

module.exports = {
  Categories,
  DifficultyLevels,
  ItemTypes,
  toTitleCase,
  truncate,
  getTruncatedString,
  createCollectionPath,
  createCategoryPath
}
