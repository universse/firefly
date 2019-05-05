const admin = require('firebase-admin')

require('./config')
const { parseCollection, parseUrl, writeBatchesToDB } = require('./utils')

const final = require('../data/final.json')

const firebaseKey = JSON.parse(process.env.FIREBASE_COLLECTIONS)

admin.initializeApp({
  credential: admin.credential.cert(firebaseKey)
})
const firestore = admin.firestore()

const collectionBatches = []

Object.values(final.collections).forEach(({ id, ...collection }, i) => {
  const batchNo = Math.floor(i / 15)

  !collectionBatches[batchNo] &&
    (collectionBatches[batchNo] = firestore.batch())

  const batch = collectionBatches[batchNo]
  const collectionDoc = firestore.collection('collections').doc(id)
  batch.set(collectionDoc, parseCollection(collection))
})

const urlBatches = []

Object.values(final.urls).forEach(({ id, ...url }, i) => {
  const batchNo = Math.floor(i / 15)

  !urlBatches[batchNo] && (urlBatches[batchNo] = firestore.batch())

  const batch = urlBatches[batchNo]
  const urlDoc = firestore.collection('urls').doc(id)
  batch.set(urlDoc, parseUrl(url))
})
;(async () => {
  await writeBatchesToDB(collectionBatches)
  await writeBatchesToDB(urlBatches)
})()
