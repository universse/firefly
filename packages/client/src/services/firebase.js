import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = JSON.parse(process.env.GATSBY_FIREBASE_CONFIG)

class Firebase {
  constructor (firebase) {
    firebase.initializeApp(config)
    this.auth = firebase.auth()
    this.googleProvider = new firebase.auth.GoogleAuthProvider()
    this.facebookProvider = new firebase.auth.FacebookAuthProvider()
    this.actionCodeSettings = {
      url: 'http://localhost:3000/welcome',
      handleCodeInApp: true
    }
  }

  setAuthListener = cb => this.auth.onAuthStateChanged(cb)

  createUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  signInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)

  sendSignInLinkToEmail = email =>
    this.auth.sendSignInLinkToEmail(email, this.actionCodeSettings)

  signInWithEmailLink = email =>
    this.auth.signInWithEmailLink(email, window.location.href)

  signInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider)

  signInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider)

  signOut = () => this.auth.signOut()

  sendPasswordResetEmail = email => this.auth.sendPasswordResetEmail(email)

  updatePassword = password => this.auth.currentUser.updatePassword(password)
}

export default typeof window === 'object' && new Firebase(firebase)
