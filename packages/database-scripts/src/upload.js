const admin = require('firebase-admin')
const { writeFileSync } = require('fs')
const { resolve } = require('path')

require('./config')
const { parseCollection, parseUrl, writeBatchesToDB } = require('./utils')

const processed = require('../data/processed.json')

let final

try {
  final = require('../data/final.json')
} catch {
  final = { collections: {}, urls: {} }
}

// production
const firebaseKey = JSON.parse(process.env.FIREBASE_COLLECTIONS)

admin.initializeApp({
  credential: admin.credential.cert(firebaseKey)
})
const firestore = admin.firestore()

const batches = []

processed.collections.forEach(
  ({ id, name, category, level, tags, urls }, i) => {
    const batchNo = Math.floor(i / 15)

    !batches[batchNo] && (batches[batchNo] = firestore.batch())

    const batch = batches[batchNo]

    const collectionDoc = firestore.collection('collections').doc()
    const collectionId = collectionDoc.id

    const urlIds = []

    urls.forEach((url, i) => {
      const urlDoc = firestore.collection('urls').doc()
      const id = urlDoc.id

      batch.set(
        urlDoc,
        parseUrl({
          ...url,
          collectionId
        })
      )

      urlIds[i] = id

      final.urls[id] = {
        id,
        ...url,
        collectionId
      }
    })

    const collection = {
      name,
      category,
      level,
      tags,
      urlIds
    }

    batch.set(collectionDoc, parseCollection(collection))

    final.collections[collectionId] = {
      id: collectionId,
      ...collection
    }
  }
)
;(() => {
  writeBatchesToDB(batches)

  writeFileSync(
    resolve(__dirname, '../data/final.json'),
    JSON.stringify(final, null, 2)
  )
})()
