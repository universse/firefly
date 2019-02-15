const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const db = admin.firestore()
db.settings({
  timestampsInSnapshots: true
})

exports.retrieve = functions.https.onRequest((req, res) => {
  const id = req.query.id

  return db[id].then(() => res.json({}))
})
