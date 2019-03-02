import workerize from 'workerize'

import FirebaseWorkerEvents from 'constants/FirebaseWorkerEvents'

const config = process.env.GATSBY_FIREBASE_CONFIG

const actionCodeSettings = JSON.stringify({
  url: `${process.env.GATSBY_HOME_PAGE}/welcome`,
  handleCodeInApp: true
})

const worker =
  typeof window === 'object' &&
  workerize(`
importScripts('https://www.gstatic.com/firebasejs/5.8.5/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/5.8.5/firebase-auth.js')
importScripts('https://www.gstatic.com/firebasejs/5.8.5/firebase-firestore.js')

firebase.initializeApp(${config})
const auth = firebase.auth()
const actionCodeSettings = ${actionCodeSettings}

const stopAuthListener = auth.onAuthStateChanged(user => {
  stopAuthListener()
      
  user
    ? user
      .getIdToken()
      .then(idToken => self.postMessage({
        type: '${FirebaseWorkerEvents.AUTH_STATE_CHANGED}',
        payload: idToken
      }))
    : self.postMessage({
        type: '${FirebaseWorkerEvents.AUTH_STATE_CHANGED}',
        payload: null
      })
})

const firestore = firebase.firestore()

export function createUserWithEmailAndPassword (email, password) {
  return auth.createUserWithEmailAndPassword(email, password)
}

export function signInWithEmailAndPassword (email, password) {
  return auth.signInWithEmailAndPassword(email, password)
}

export function isSignInWithEmailLink (href) {
  return auth.isSignInWithEmailLink(href)
}

export function sendSignInLinkToEmail (email) {
  return auth.sendSignInLinkToEmail(email, actionCodeSettings)
}

export function signInWithEmailLink (email, href) {
  return auth
    .signInWithEmailLink(email, href)
    .then(result =>
      self.postMessage({
        type: '${FirebaseWorkerEvents.EMAIL_LINK_SIGN_IN_SUCCESS}',
        payload: result.additionalUserInfo.isNewUser
      })
    )
    .catch(({ code }) =>
      self.postMessage({
        type: '${FirebaseWorkerEvents.EMAIL_LINK_SIGN_IN_ERROR}',
        payload: code
      })
    )
}

export function signOut () {
  return auth.signOut()
}

export function sendPasswordResetEmail (email) {
  return auth.sendPasswordResetEmail(email)
}

export function updatePassword (password) {
  return auth.currentUser.updatePassword(password)
}

export function createCollection (collection) {
  const { name, category, level, urls, tags } = collection

  const newCollection = {
    n: name,
    c: category,
    l: level,
    us: urls.map(({ title, type, url }) => ({ ti: title, ty: type, u: url })),
    t: tags,
    s: ['']
  }

  const batch = firestore.batch()
  const collectionDoc = firestore.collection('collections').doc()

  newCollection.us.forEach((url, i) => {
    const urlDoc = firestore.collection('urls').doc()
    const id = urlDoc.id
    batch.set(urlDoc, url)
    newCollection.us[i] = id
    collection.urls[i].id = id
  })

  batch.set(collectionDoc, newCollection)
  
  // return batch
  // .commit()
  // .then(() =>
  //   self.postMessage({
  //     type: '${FirebaseWorkerEvents.COLLECTION_CREATED}',
  //     payload: { id: collectionDoc.id, ...collection }
  //   })
  // )
}

export function fetchCollection (id) {
  const docRef = firestore.collection('collections').doc(id)

  docRef.get().then(async doc => {
    if (doc.exists) {
      const collection = doc.data()
      const urlIds = collection.us
      
      await Promise.all(urlIds.map(async (id, i) => {
        const urlRef = firestore.collection('urls').doc(id)
        const doc = await urlRef.get()
        collection.us[i] = { id, ...doc.data() }
      }))

      self.postMessage({
        type: '${FirebaseWorkerEvents.COLLECTION_FETCH_SUCCESS}',
        payload: collection
      })
    } else {
      self.postMessage({
        type: '${FirebaseWorkerEvents.COLLECTION_FETCH_ERROR}'
      })
    }
  }).catch(() => {
    self.postMessage({
      type: '${FirebaseWorkerEvents.COLLECTION_FETCH_ERROR}'
    })
  })
}
`)

export default worker
