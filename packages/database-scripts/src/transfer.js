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

const schema = { collections: {}, urls: {} }

const collectionsDB = collections.firestore()
const usersDB = users.firestore()

let count = 0
let batchNo = 0
const batches = []

;(async () => {
  await Promise.all(
    Object.keys(schema).map(async collection => {
      await usersDB
        .collection(collection)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (count === 498) {
              count = 0
              batchNo = batchNo + 1
            }

            if (!batches[batchNo]) {
              batches[batchNo] = collectionsDB.batch()
            }

            const batch = batches[batchNo]

            const docRef = collectionsDB.collection(collection).doc(doc.id)

            batch.set(docRef, doc.data())
            count++
          })
        })
    })
  )

  writeBatchesToDB(batches)
})()
