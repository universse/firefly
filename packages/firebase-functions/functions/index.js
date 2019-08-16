const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

const int = require('./src/int')
const invite = require('./src/invite')
const requestAccess = require('./src/requestAccess')

exports.int = functions.https.onRequest(int)
exports.invite = functions.https.onRequest(invite)
exports.requestAccess = functions.https.onRequest(requestAccess)
