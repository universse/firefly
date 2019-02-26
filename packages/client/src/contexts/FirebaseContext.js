import { createContext } from 'react'
import workerize from 'workerize'

// import firebase from '../services/firebase'

const config = process.env.GATSBY_FIREBASE_CONFIG

const actionCodeSettings = JSON.stringify({
  url: `${process.env.GATSBY_HOME_PAGE}/welcome`,
  handleCodeInApp: true
})

const firebase =
  typeof window === 'object' &&
  workerize(`
importScripts('https://www.gstatic.com/firebasejs/5.8.4/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/5.8.4/firebase-auth.js')
importScripts('https://apis.google.com/js/platform.js')

firebase.initializeApp(${config})
const auth = firebase.auth()
const googleProvider = new firebase.auth.GoogleAuthProvider()
const facebookProvider = new firebase.auth.FacebookAuthProvider()
const actionCodeSettings = ${actionCodeSettings}

export function isSignInWithEmailLink (href) {
  return auth.isSignInWithEmailLink(href)
}

export function sendSignInLinkToEmail (email) {
  return auth
    .sendSignInLinkToEmail(email, actionCodeSettings)
}

export function signInWithEmailLink (email, href) {
  auth.signInWithEmailLink(email, href)
}

export function signInWithGoogle () {
  return auth.signInWithRedirect(googleProvider)
}

export function signOut () { 
  return auth.signOut()
}

const stopAuthListener = auth.onAuthStateChanged(user => {
    stopAuthListener()

    user 
      ? user.getIdToken().then(idToken => self.postMessage({ type: 'auth', payload: idToken }))
      : self.postMessage({ type: 'auth', payload: null })
  }
)
`)

const FirebaseContext = createContext(firebase)

export default FirebaseContext
