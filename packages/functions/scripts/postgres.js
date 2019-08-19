const pgp = require('pg-promise')({
  capSQL: true // generate capitalized SQL
})

require('./config')

const final = require('../data/final.json')

const db = pgp({
  connectionString: process.env.POSTGRES_URL,
  ssl: true
})

// const cs = new pgp.helpers.ColumnSet(
//   [
//     'id',
//     'name',
//     'category',
//     'level',
//     { name: 'tags', mod: ':json' },
//     { name: 'related', mod: ':json' },
//     { name: 'suggestions', mod: ':json' }
//   ],
//   { table: 'collections' }
// )

// const data = Object.values(final.collections).map(
//   ({ urlIds, ...collection }) => collection
// )

// index - integer
const cs = new pgp.helpers.ColumnSet(
  [
    'url',
    'title',
    'description',
    'image',
    'publisher',
    'type',
    'index',
    'collectionId'
  ],
  { table: 'urls' }
)

const data = final.urls.map(({ id, ...url }) => url)

;(async function () {
  try {
    db.task('inserting-collections', t => {
      const insert = pgp.helpers.insert(data, cs)
      return t.none(insert)
    })
  } catch {}
})()
