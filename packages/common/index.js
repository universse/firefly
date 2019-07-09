const toTitleCase = require('./src/toTitleCase')
const truncate = require('./src/truncate')

module.exports = {
  Categories: [
    'artificial intelligence',
    'cloud',
    'design',
    'marketing',
    'programming',
    'psychology',
    'startup',
    'web development'
  ],
  DifficultyLevels: ['introductory', 'fundamental', 'intermediate', 'advanced'],
  ItemTypes: ['article', 'book', 'code', 'course', 'podcast', 'url', 'video'],
  NetlifyFunction: '/.netlify/functions/',
  NormalizedCollectionsFilename: 'mivEB3GnRswZyWZMNkaO',
  toTitleCase,
  truncate
}
