const firebase = require('firebase-admin')

require('./config')

const data = require('./data.json')
const firebaseKey = JSON.parse(process.env.FIREBASE_CREDENTIALS_DEV)

firebase.initializeApp({
  credential: firebase.credential.cert(firebaseKey)
})

const db = firebase.firestore()

db.settings({
  timestampsInSnapshots: true
})

data.collections.slice(4).forEach(async ({ urls, ...collection }) => {
  let urlIds = []

  await Promise.all(
    urls.map(async (url, i) => {
      const ref = await db.collection('urls').add(url)
      urlIds[i] = ref.id
    })
  )

  db.collection('collections').add({ ...collection, urlIds })
})
