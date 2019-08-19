const admin = require('firebase-admin')

const { writeBatchesToDB } = require('./utils')
require('./config')

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

const schema = ['collections', 'urls']

const collectionsDB = collections.firestore()
const usersDB = users.firestore()

let count = 0
let batchNo = 0
const batches = []
const BATCH_SIZE = 498

;(async () => {
  await Promise.all(
    schema.map(async collection => {
      const snapshot = await usersDB.collection(collection).get()

      snapshot.forEach(doc => {
        if (count === BATCH_SIZE) {
          count = 0
          batchNo++
        }
        count++

        if (!batches[batchNo]) {
          batches[batchNo] = collectionsDB.batch()
        }
        const docRef = collectionsDB.collection(collection).doc(doc.id)
        batches[batchNo].set(docRef, doc.data())
      })
    })
  )

  writeBatchesToDB(batches)
})()
