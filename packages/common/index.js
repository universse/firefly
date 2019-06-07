const toTitleCase = require('./src/toTitleCase')

const NormalizedCollectionsFilename = 'mivEB3GnRswZyWZMNkaO'

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
  NormalizedCollectionsFilename,
  NormalizedCollectionsPath:
    process.env.NODE_ENV === 'production'
      ? `/api/d/${NormalizedCollectionsFilename}`
      : `/data/${NormalizedCollectionsFilename}.json`,
  toTitleCase
}
