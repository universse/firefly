const functions = require('firebase-functions')

const admin = require('firebase-admin')
admin.initializeApp()

// const fire = require('./src/fire')
const invite = require('./src/invite')
const requestAccess = require('./src/requestAccess')

// exports.fire = functions.https.onRequest(fire)
exports.invite = functions.https.onRequest(invite)
exports.requestAccess = functions.https.onRequest(requestAccess)
