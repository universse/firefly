const admin = require('firebase-admin')
const { writeFileSync } = require('fs')
const { resolve } = require('path')
const { Categories, ItemTypes } = require('common')

require('./config')
const { writeBatchesToDB } = require('./utils')

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

processed.collections.forEach(({ name, category, level, tags, urls }, i) => {
  const batchNo = Math.floor(i / 15)

  if (!batches[batchNo]) {
    batches[batchNo] = firestore.batch()
  }

  const batch = batches[batchNo]

  const collectionDoc = firestore.collection('collections').doc()
  const collectionId = collectionDoc.id

  const us = []
  urls.forEach(({ url, title, description, type }, i) => {
    const urlDoc = firestore.collection('urls').doc()
    const id = urlDoc.id

    batch.set(urlDoc, {
      u: url,
      ti: title,
      d: description,
      ty: ItemTypes.indexOf(type),
      c: collectionId
    })

    us[i] = id

    final.urls[id] = { id, url, title, description, type, collectionId }
  })

  batch.set(collectionDoc, {
    n: name,
    c: Categories.indexOf(category),
    l: level,
    us,
    t: tags
  })

  final.collections[collectionId] = {
    id: collectionId,
    name,
    category,
    level,
    tags,
    urlIds: us
  }
})
;(() => {
  writeBatchesToDB(batches)

  writeFileSync(
    resolve(__dirname, '../data/final.json'),
    JSON.stringify(final, null, 2)
  )
})()
