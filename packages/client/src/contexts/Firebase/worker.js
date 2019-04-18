import workerize from 'workerize'

import FirebaseWorkerEvents from 'constants/FirebaseWorkerEvents'

const config = process.env.GATSBY_FIREBASE_USERS

const actionCodeSettings = JSON.stringify({
  url: `${process.env.GATSBY_HOME_PAGE}/welcome`,
  handleCodeInApp: true
})

const worker =
  typeof window === 'object' &&
  workerize(`
importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-auth.js')
importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-firestore.js')

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
        payload: { idToken, uid: user.uid }
      }))
    : self.postMessage({
        type: '${FirebaseWorkerEvents.AUTH_STATE_CHANGED}',
        payload: null
      })
})

const firestore = firebase.firestore()
const cache = {}

export function createUserWithEmailAndPassword (email, password) {
  return auth.createUserWithEmailAndPassword(email, password)
}

export async function fetchSignInMethodsForEmail (email) {
  try {
    const signInMethods = await auth.fetchSignInMethodsForEmail(email)
    if (
      signInMethods.includes(
        firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
      )
    ) {
    
    }
    if (
      signInMethods.includes(
        firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
      )
    ) {
    
    }
  } catch (e) {

  }
}

export function isSignInWithEmailLink (href) {
  return auth.isSignInWithEmailLink(href)
}

export function sendSignInLinkToEmail (email) {
  return auth.sendSignInLinkToEmail(email, actionCodeSettings)
}

export function signInWithEmailAndPassword (email, password) {
  return auth.signInWithEmailAndPassword(email, password)
}

export async function signInWithEmailLink (email, href) {
  try {
    const result = await auth.signInWithEmailLink(email, href)
    return { isNewUser: result.additionalUserInfo.isNewUser }
  } catch (e) {
    return { error: e.code }
  }
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

export async function createCollection (collection) {
  const { name, category, level, urls, tags } = collection

  const newCollection = {
    n: name,
    c: category,
    l: level,
    us: urls.map(({ title, type, url, description}) => ({ ti: title, ty: type, u: url, d: description })),
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
  
  try {
    await batch.commit()
    collection.id = collectionDoc.id.toLowerCase()
    return { collection }
  } catch {
    return { error: true }
  }
}

export async function fetchCollection (id) {
  if (cache[id]) {
    return { collection: cache[id] }
  }

  const docRef = firestore.collection('collections').doc(id)
  
  try {
    const doc = await docRef.get()
    if (doc.exists) {
      const collection = doc.data()
      const urlIds = collection.us
      
      await Promise.all(urlIds.map(async (id, i) => {
        const urlRef = firestore.collection('urls').doc(id)
        const doc = await urlRef.get()
        collection.us[i] = { id, ...doc.data() }
      }))

      cache[id] = collection

      return { collection }
    } else {
      return { error: true }
    }
  } catch {
    return { error: true }
  }
}

export async function fetchUserData () {
  const userData = { love: {}, save: {}, check: {} }

  try {
    const data = await firestore.collection(auth.currentUser.uid).get()
    data.forEach(doc => {
      userData[doc.id] = doc.data()
    })

    return { userData }
  } catch (e) {
    return { error: true }
  }
}

export async function loveCollection (id) {
  const loveDocRef = firestore.collection(auth.currentUser.uid).doc('love')
  const lovesDocRef = firestore.collection('loves').doc(id)

  try {
    await firestore.runTransaction(async transaction => {
      try {
        const [loveDoc, lovesDoc] = await Promise.all([
          transaction.get(loveDocRef),
          transaction.get(lovesDocRef)
        ])

        if (loveDoc.exists) {
          const love = loveDoc.data()

          if (love[id]) {
            transaction.update(loveDocRef, {
              [id]: firebase.firestore.FieldValue.delete()
            })

            transaction.update(lovesDocRef, {
              count: lovesDoc.data().count - 1
            })
          } else {
            transaction.update(loveDocRef, {
              [id]: true
            })

            lovesDoc.exists
              ? transaction.update(lovesDocRef, {
                count: lovesDoc.data().count + 1
              })
              : transaction.set(lovesDocRef, { count: 1 })
          }
        } else {
          transaction.set(loveDocRef, { [id]: true })
          transaction.set(lovesDocRef, { count: 1 })
        }
      } catch (e) {
        return { error: true }
      }
    })
    return {}
  } catch (e) {
    return { error: true }
  }
}

export async function saveCollection (id) {
  const saveDocRef = firestore.collection(auth.currentUser.uid).doc('save')

  try {
    const saveDoc = await saveDocRef.get()

    if (saveDoc.exists) {
      const save = saveDoc.data()

      if (save[id]) {
        saveDocRef.update({
          [id]: firebase.firestore.FieldValue.delete()
        })
      } else {
        saveDocRef.update({
          [id]: true
        })
      }
    } else {
      saveDocRef.set({ [id]: true })
    }
  } catch {
    return { error: true }
  }
}

export async function uploadOfflineData ({ check, save }) {
  const userRef = firestore.collection(auth.currentUser.uid)

  try {
    return {}
  } catch {
    return { error: true }
  }
}
`)

export default worker
