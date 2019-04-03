/* eslint-disable */

class Firebase {
  googleProvider = new firebase.auth.GoogleAuthProvider()
  facebookProvider = new firebase.auth.FacebookAuthProvider()

  createUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  signInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password).then(onSignIn)

  signInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider).then(onSignIn)

  signInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider).then(onSignIn)

  sendPasswordResetEmail = email => this.auth.sendPasswordResetEmail(email)

  updatePassword = password => this.auth.currentUser.updatePassword(password)
}
