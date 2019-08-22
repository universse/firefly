const admin = require('firebase-admin')
const { writeFileSync } = require('fs')
const { resolve } = require('path')
// const cluster = require('cluster')
// const numCPUs = require('os').cpus().length

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
const firebaseCollectionsKey = JSON.parse(process.env.FIREBASE_COLLECTIONS)
const firebaseUsersKey = JSON.parse(process.env.FIREBASE_USERS)

const collections = admin.initializeApp(
  {
    credential: admin.credential.cert(firebaseCollectionsKey)
  },
  'collections'
)

const users = admin.initializeApp(
  {
    credential: admin.credential.cert(firebaseUsersKey)
  },
  'users'
)

const collectionsDB = collections.firestore()
const usersDB = users.firestore()

const collectionBatches = []
const userBatches = []

processed.collections.forEach(
  ({ _EXCEL_KEY, loveCount, urls, ...collection }, i) => {
    const batchNo = Math.floor(i / 15)

    !collectionBatches[batchNo] &&
      (collectionBatches[batchNo] = collectionsDB.batch())

    !userBatches[batchNo] && (userBatches[batchNo] = collectionsDB.batch())

    const collectionBatch = collectionBatches[batchNo]
    const userBatch = userBatches[batchNo]

    const collectionDoc = collectionsDB.collection('collections').doc()
    const collectionId = collectionDoc.id

    const lovesDoc = usersDB.collection('loves').doc(collectionId)
    userBatch.set(lovesDoc, { count: loveCount })

    const urlIds = []
    urls.forEach((url, i) => {
      const urlDoc = collectionsDB.collection('urls').doc()
      const id = urlDoc.id

      collectionBatch.set(
        urlDoc,
        parseUrl({
          ...url
          // collectionId
        })
      )

      urlIds[i] = id

      final.urls[id] = {
        // id,
        ...url
        // collectionId
      }
    })

    collectionBatch.set(
      collectionDoc,
      parseCollection({ ...collection, urlIds })
    )

    final.collections[collectionId] = {
      // id: collectionId,
      _EXCEL_KEY,
      ...collection,
      urlIds
    }
  }
)
;(async () => {
  await writeBatchesToDB(collectionBatches)
  await writeBatchesToDB(userBatches)

  writeFileSync(
    resolve(__dirname, '../data/final.json'),
    JSON.stringify(final, null, 2)
  )
})()
