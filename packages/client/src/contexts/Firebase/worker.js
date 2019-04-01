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
importScripts('https://www.gstatic.com/firebasejs/5.9.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/5.9.0/firebase-auth.js')
importScripts('https://www.gstatic.com/firebasejs/5.9.0/firebase-firestore.js')

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

function oneSecond () {
  return new Promise(resolve => setTimeout(resolve, 1010))
}

export async function loveCollection (id) {
  if (!auth.currentUser) {
    await oneSecond()
  }
  const userDocRef = firestore.collection('users').doc(auth.currentUser.uid)
  const lovesDocRef = firestore.collection('loves').doc(id)

  try {
    await firestore.runTransaction(async transaction => {
      try {
        const [userDoc, lovesDoc] = await Promise.all([
          transaction.get(userDocRef),
          transaction.get(lovesDocRef)
        ])
        
        if (!userDoc.exists) {
          transaction.set(userDocRef, { loved: { [id]: true } })

          !lovesDoc.exists
            ? transaction.set(lovesDocRef, { count: 1 })
            : transaction.update(lovesDocRef, {
              count: lovesDoc.data().count + 1
            })
        } else {
          const loved = userDoc.data().loved

          if (loved[id]) {
            delete loved[id]
            transaction.update(lovesDocRef, {
              count: lovesDoc.data().count - 1
            })
          } else {
            loved[id] = true
            
            !lovesDoc.exists
              ? transaction.set(lovesDocRef, { count: 1 })
              : transaction.update(lovesDocRef, {
                count: lovesDoc.data().count + 1
              })
          }
          transaction.update(userDocRef, { loved })
        }
      } catch (e) {
        console.log(e)
        return { error: true }
      }
    })
    return {}
  } catch (e) {
    console.log(e)
    return { error: true }
  }
}

export async function saveCollections (collections) {
  if (!auth.currentUser) {
    await oneSecond()
  }
  const userDocRef = firestore.collection('users').doc(auth.currentUser.uid)

  try {
    await firestore.runTransaction(async transaction => {
      try {
        const userDoc = await transaction.get(userDocRef)
        
        !userDoc.exists
          ? transaction.set(userDocRef, { saved: collections })
          : transaction.update(userDocRef, { saved: collections })
      } catch {
        return { error: true }
      }
    })
    return {}
  } catch {
    return { error: true }
  }
}
`)

export default worker
