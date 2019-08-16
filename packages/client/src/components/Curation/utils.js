import firebaseWorker from 'utils/firebaseWorker'
import postRequest from 'utils/postRequest'

export function invite (emails, redirect, draftId = '') {
  return postRequest('/fire/invite', {
    draftId,
    emails,
    redirect,
    url: `${window.location.origin}/welcome`
  })
}

export function requestAccess (authorizedEmails, href) {
  return firebaseWorker.getEmail().then(email =>
    postRequest('/fire/requestAccess', {
      authorizedEmails,
      email,
      href
    })
  )
}
