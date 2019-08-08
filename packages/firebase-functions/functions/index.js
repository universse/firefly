const functions = require('firebase-functions')

const invite = require('./invite')

exports.invite = functions.https.onRequest(invite)
