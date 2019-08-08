const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const cors = require('cors')({
  origin: true
})

admin.initializeApp()
const firestore = admin.firestore()

const app = express()

const authenticate = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer ')
  ) {
    res.status(403).send('Unauthorized')
    return
  }

  const idToken = req.headers.authorization.split('Bearer ')[1]

  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken)
    req.user = decodedIdToken
    next()
    return
  } catch {
    res.status(403).send('Unauthorized')
  }
}

app.use(cors)
app.use('/create', authenticate)

app.get('/retrieve', async (req, res) => {
  const id = req.query.id
  firestore.collection('collections')
})

app.post('/create', async (req, res) => {
  const { uid } = req.user
  const data = req.body.data
  const batch = firestore.batch()
  const docRef = firestore.collection('collections').doc()
  batch.set(docRef, collectionData)

  return batch
    .commit()
    .then(() => res.status(200).json({ id: docRef.id }))
    .catch(() => res.sendStatus(500))
})

exports.api = functions.https.onRequest(app)
