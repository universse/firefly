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
    const docs = await firestore.collection(auth.currentUser.uid).get()
    docs.forEach(doc => {
      userData[doc.id] = doc.data()
    })

    return { userData }
  } catch {
    return { error: true }
  }
}

export async function uploadOfflineData ({ check, save }, isNewUser) {
  const checkKeys = Object.keys(check)
  const saveKeys = Object.keys(save)

  if (!checkKeys.length && !saveKeys.length) return {}
  
  const checkRef = firestore.collection(auth.currentUser.uid).doc('check')
  const saveRef = firestore.collection(auth.currentUser.uid).doc('save')
  const batch = firestore.batch()

  if (isNewUser) {
    checkKeys.length && batch.set(checkRef, check)
    saveKeys.length && batch.set(saveRef, save)
  } else {
    checkKeys.length &&
      checkKeys.forEach(id => {
        check[id] = check[id] || firebase.firestore.FieldValue.delete()
      })

    saveKeys.length &&
      saveKeys.forEach(id => {
        save[id] = save[id] || firebase.firestore.FieldValue.delete()
      })

    batch.update(checkRef, check)
    batch.update(saveRef, save)
  }

  try {
    await batch.commit()
    return {}
  } catch {
    return { error: true }
  }
}

export async function action ({ id, action }) {
  const docRef = firestore
    .collection(auth.currentUser.uid)
    .doc(action.replace('un', ''))

  if (action.endsWith('love')) {
    const lovesDocRef = firestore.collection('loves').doc(id)
    const batch = firestore.batch()

    action.startsWith('un')
      ? batch.update(docRef, {
        [id]: firebase.firestore.FieldValue.delete()
      })
      : batch.set(
        docRef,
        {
          [id]: true
        },
        { merge: true }
      )
    batch.set(
      lovesDocRef,
      {
        count: action.startsWith('un')
          ? firebase.firestore.FieldValue.increment(-1)
          : firebase.firestore.FieldValue.increment(1)
      },
      { merge: true }
    )

    try {
      await batch.commit()
      return {}
    } catch {
      return { error: true }
    }
  } else {
    try {
      action.startsWith('un')
        ? docRef.update({
          [id]: firebase.firestore.FieldValue.delete()
        })
        : docRef.set(
          {
            [id]: true
          },
          { merge: true }
        )
      return {}
    } catch {
      return { error: true }
    }
  }
}
`)

export default worker
