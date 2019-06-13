import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'

import FirebaseWorkerEvents from 'constants/FirebaseWorkerEvents'

firebase.initializeApp(JSON.parse(process.env.GATSBY_FIREBASE_USERS))
const auth = firebase.auth()
const actionCodeSettings = {
  url: `${process.env.GATSBY_ORIGIN}/welcome`,
  handleCodeInApp: true
}

const stopAuthListener = auth.onAuthStateChanged(user => {
  stopAuthListener()

  user
    ? user.getIdToken().then(idToken =>
        postMessage({
          type: FirebaseWorkerEvents.AUTH_STATE_CHANGED,
          payload: { idToken, uid: user.uid }
        })
      )
    : postMessage({
        type: FirebaseWorkerEvents.AUTH_STATE_CHANGED,
        payload: null
      })
})

// export function createUserWithEmailAndPassword (email, password) {
//   return auth.createUserWithEmailAndPassword(email, password)
// }

// export async function fetchSignInMethodsForEmail (email) {
//   try {
//     const signInMethods = await auth.fetchSignInMethodsForEmail(email)
//     if (
//       signInMethods.includes(
//         firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
//       )
//     ) {
//     }
//     if (
//       signInMethods.includes(
//         firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
//       )
//     ) {
//     }
//   } catch {
//     throw new Error()
//   }
// }

export function isSignInWithEmailLink (href) {
  if (auth.isSignInWithEmailLink(href)) {
    return true
  }
  throw new Error()
}

export function sendSignInLinkToEmail (email) {
  return auth.sendSignInLinkToEmail(email, actionCodeSettings)
}

// export function signInWithEmailAndPassword (email, password) {
//   return auth.signInWithEmailAndPassword(email, password)
// }

export async function signInWithEmailLink (email, href) {
  try {
    const result = await auth.signInWithEmailLink(email, href)
    return result.additionalUserInfo.isNewUser
  } catch {
    throw new Error()
  }
}

export function signOut () {
  return auth.signOut()
}

// export function sendPasswordResetEmail (email) {
//   return auth.sendPasswordResetEmail(email)
// }

// export function updatePassword (password) {
//   return auth.currentUser.updatePassword(password)
// }

const firestore = firebase.firestore()

// TODO no short form
// export async function createCollection (collection) {
//   const { name, category, level, urls, tags } = collection

//   const newCollection = {
//     n: name,
//     c: category,
//     l: level,
//     us: urls.map(({ title, type, url, description }) => ({
//       ti: title,
//       ty: type,
//       u: url,
//       d: description
//     })),
//     t: tags,
//     s: ['']
//   }

//   const batch = firestore.batch()
//   const collectionDoc = firestore.collection('collections').doc()

//   newCollection.us.forEach((url, i) => {
//     const urlDoc = firestore.collection('urls').doc()
//     const id = urlDoc.id
//     batch.set(urlDoc, url)
//     newCollection.us[i] = id
//     collection.urls[i].id = id
//   })

//   batch.set(collectionDoc, newCollection)

//   try {
//     await batch.commit()
//     collection.id = collectionDoc.id.toLowerCase()
//     return collection
//   } catch {
//     throw new Error()
//   }
// }

const cache = {}

export async function fetchCollection (id) {
  if (cache[id]) {
    return cache[id]
  }

  const docRef = firestore.collection('collections').doc(id)

  try {
    const doc = await docRef.get()
    if (doc.exists) {
      const collection = doc.data()
      const urlIds = collection.us

      await Promise.all(
        urlIds.map(async (id, i) => {
          const urlRef = firestore.collection('urls').doc(id)
          const doc = await urlRef.get()
          collection.us[i] = { id, ...doc.data() }
        })
      )

      cache[id] = collection

      return collection
    }
    throw new Error()
  } catch {
    throw new Error()
  }
}

export async function fetchUserData () {
  const userData = { love: {}, save: {}, check: {} }

  try {
    const docs = await firestore
      .collection('users')
      .doc(auth.currentUser.uid)
      .collection('data')
      .get()

    docs.forEach(doc => {
      userData[doc.id] = doc.data()
    })

    return userData
  } catch {
    throw new Error()
  }
}

export async function uploadOfflineData ({ check, save }) {
  const checkRef = firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('data')
    .doc('check')
  const saveRef = firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('data')
    .doc('save')
  const batch = firestore.batch()

  const checkKeys = Object.keys(check)
  if (checkKeys.length) {
    checkKeys.forEach(
      id => (check[id] = check[id] || firebase.firestore.FieldValue.delete())
    )
    batch.set(checkRef, check, { merge: true })
  }

  const saveKeys = Object.keys(save)
  if (saveKeys.length) {
    saveKeys.forEach(
      id => (save[id] = save[id] || firebase.firestore.FieldValue.delete())
    )
    batch.set(saveRef, save, { merge: true })
  }

  try {
    await batch.commit()
  } catch {
    throw new Error()
  }
}

export async function action ({ id, action }) {
  const docRef = firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('data')
    .doc(action.replace('un', ''))

  const data = {
    [id]: action.startsWith('un')
      ? firebase.firestore.FieldValue.delete()
      : true
  }

  if (action.endsWith('love')) {
    const lovesDocRef = firestore.collection('loves').doc(id)
    const batch = firestore.batch()

    batch.set(docRef, data, { merge: true })
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
    } catch {
      throw new Error()
    }
  } else {
    try {
      docRef.set(data, { merge: true })
    } catch {
      throw new Error()
    }
  }
}

const date = `${new Date().getDate()}-${new Date().getMonth() + 1}`
const id = firestore.collection('collections').doc().id
const session = Date.now() + ''
let index = 0

// eslint-disable-next-line
import 'firebase/storage'

export async function uploadScreenRecordings (events) {
  try {
    await firebase
      .storage()
      .ref()
      .child('SRs')
      .child(date)
      .child(auth.currentUser ? auth.currentUser.uid : id)
      .child(session)
      .child(index + '.json')
      .putString(JSON.stringify(events))

    index++
  } catch {
    throw new Error()
  }
}
