import { createContext } from 'react'
import workerize from 'workerize'

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

firebase.initializeApp(${config})
const auth = firebase.auth()
const actionCodeSettings = ${actionCodeSettings}

const stopAuthListener = auth.onAuthStateChanged(user => {
    stopAuthListener()

    user 
      ? user.getIdToken().then(idToken => self.postMessage({ type: 'auth', payload: idToken }))
      : self.postMessage({ type: 'auth', payload: null })
  }
)

export function createUserWithEmailAndPassword (email, password) {
  return this.auth.createUserWithEmailAndPassword(email, password)
}

export function signInWithEmailAndPassword (email, password) {
  return this.auth.signInWithEmailAndPassword(email, password)
}

export function isSignInWithEmailLink (href) {
  return auth.isSignInWithEmailLink(href)
}

export function sendSignInLinkToEmail (email) {
  return auth.sendSignInLinkToEmail(email, actionCodeSettings)
}

export function signInWithEmailLink (email, href) {
  auth.signInWithEmailLink(email, href)
}

export function signOut () { 
  return auth.signOut()
}

export function sendPasswordResetEmail (email) {
  this.auth.sendPasswordResetEmail(email)
}

export function updatePassword (password) {
  this.auth.currentUser.updatePassword(password)
}
`)

const FirebaseContext = createContext(firebase)

export default FirebaseContext
