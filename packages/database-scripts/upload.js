const admin = require('firebase-admin')
const { writeFileSync } = require('fs')
const { resolve } = require('path')

require('./config')

const processed = require('./data/processed.json')
const final = require('./data/final.json')
const { Categories, DifficultyLevels, ItemTypes } = require('common')

const firebaseKey = JSON.parse(process.env.FIREBASE_CREDENTIALS_DEV)

admin.initializeApp({
  credential: admin.credential.cert(firebaseKey)
})

const db = admin.firestore()
db.settings({
  timestampsInSnapshots: true
})
;(async () => {
  await Promise.all(
    processed.collections.map(
      async ({ name, category, level, tags, suggestions, urls }) => {
        let urlIds = []

        await Promise.all(
          urls.map(async ({ url, title, description, type }, i) => {
            const { id } = await db.collection('urls').add({
              u: url,
              ti: title,
              d: description,
              ty: ItemTypes.indexOf(type)
            })
            urlIds[i] = id
            final.urls[id] = { id, url, title, description, type }
          })
        )

        const { id } = await db.collection('collections').add({
          n: name,
          c: Categories.indexOf(category),
          l: DifficultyLevels.indexOf(level),
          t: tags,
          s: suggestions,
          us: urlIds
        })

        final.collections[id] = {
          id,
          category,
          level,
          tags,
          suggestions,
          urlIds
        }

        writeFileSync(
          resolve(__dirname, './data/final.json'),
          JSON.stringify(final, null, 2)
        )
      }
    )
  )
})()
