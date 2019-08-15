const animate = require('./src/animate')
const toTitleCase = require('./src/toTitleCase')
const { truncate, getTruncatedString } = require('./src/truncate')

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
  // [endpoint, redirect]
  EndPoints: {
    API: ['/api'],
    FIRE: ['/fire'],
    GRAPHQL: ['/graphql']
  },
  ItemTypes: ['article', 'book', 'code', 'course', 'podcast', 'url', 'video'],
  NetlifyFunction: '/.netlify/functions',
  animate,
  toTitleCase,
  truncate,
  getTruncatedString
}
