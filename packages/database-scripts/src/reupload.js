const admin = require('firebase-admin')
const { Categories, DifficultyLevels, ItemTypes } = require('common')

require('./config')
const { writeBatchesToDB } = require('./utils')

const final = require('../data/final.json')

const firebaseKey = JSON.parse(process.env.FIREBASE_COLLECTIONS)

admin.initializeApp({
  credential: admin.credential.cert(firebaseKey)
})
const firestore = admin.firestore()

const collectionBatches = []

Object.values(final.collections).forEach(
  ({ id, name, category, level, tags, suggestions, urlIds }, i) => {
    const batchNo = Math.floor(i / 15)

    if (!collectionBatches[batchNo]) {
      collectionBatches[batchNo] = firestore.batch()
    }

    const batch = collectionBatches[batchNo]

    const collectionDoc = firestore.collection('collections').doc(id)

    batch.set(collectionDoc, {
      n: name,
      c: Categories.indexOf(category),
      l: DifficultyLevels.indexOf(level),
      us: urlIds,
      t: tags,
      s: suggestions
    })
  }
)

const urlBatches = []

Object.values(final.urls).forEach(
  ({ id, url, title, description, type }, i) => {
    const batchNo = Math.floor(i / 15)

    if (!urlBatches[batchNo]) {
      urlBatches[batchNo] = firestore.batch()
    }

    const batch = urlBatches[batchNo]

    const urlDoc = firestore.collection('urls').doc(id)

    batch.set(urlDoc, {
      u: url,
      ti: title,
      d: description,
      ty: ItemTypes.indexOf(type)
    })
  }
)
;(() => {
  writeBatchesToDB(collectionBatches)
  writeBatchesToDB(urlBatches)
})()
