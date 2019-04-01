/* eslint-disable */

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
    this.auth.signInWithEmailAndPassword(email, password).then(onSignIn)

  sendSignInLinkToEmail = email =>
    this.auth.sendSignInLinkToEmail(email, this.actionCodeSettings)

  signInWithEmailLink = email =>
    this.auth.signInWithEmailLink(email, window.location.href).then(onSignIn)

  signInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider).then(onSignIn)

  signInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider).then(onSignIn)

  signOut = () =>
    this.auth.signOut().then(() => {
      window.localStorage.removeItem(LocalStorage.HAS_SIGNED_IN)
      window.location.reload()
    })

  sendPasswordResetEmail = email => this.auth.sendPasswordResetEmail(email)

  updatePassword = password => this.auth.currentUser.updatePassword(password)
}
