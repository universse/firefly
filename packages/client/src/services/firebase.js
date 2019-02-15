import firebase from 'firebase/app'
import 'firebase/auth'

import LocalStorage from 'constants/LocalStorage'

const config = JSON.parse(process.env.GATSBY_FIREBASE_CONFIG)

const setHasSignedIn = () => {
  window.localStorage.setItem(LocalStorage.HAS_SIGNED_IN, 'true')
  window.location.reload()
}

class Firebase {
  constructor (firebase) {
    firebase.initializeApp(config)
    this.auth = firebase.auth()
    this.googleProvider = new firebase.auth.GoogleAuthProvider()
    this.facebookProvider = new firebase.auth.FacebookAuthProvider()
    this.actionCodeSettings = {
      url: `${process.env.GATSBY_HOME_PAGE}/welcome`,
      handleCodeInApp: true
    }
  }

  setAuthListener = cb => this.auth.onAuthStateChanged(cb)

  createUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  signInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password).then(setHasSignedIn)

  sendSignInLinkToEmail = email =>
    this.auth.sendSignInLinkToEmail(email, this.actionCodeSettings)

  signInWithEmailLink = email =>
    this.auth
      .signInWithEmailLink(email, window.location.href)
      .then(setHasSignedIn)

  signInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider).then(setHasSignedIn)

  signInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider).then(setHasSignedIn)

  signOut = () =>
    this.auth.signOut().then(() => {
      window.localStorage.removeItem(LocalStorage.HAS_SIGNED_IN)
      window.location.reload()
    })

  sendPasswordResetEmail = email => this.auth.sendPasswordResetEmail(email)

  updatePassword = password => this.auth.currentUser.updatePassword(password)
}

export default typeof window === 'object' && new Firebase(firebase)
