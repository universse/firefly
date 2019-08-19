const admin = require('firebase-admin')
const sgMail = require('@sendgrid/mail')

const { sgKey, origin } = require('./constants')

sgMail.setApiKey(sgKey)

const auth = admin.auth()
const database = admin.database()

function getHTMLTemplate (isInvite, link) {
  return isInvite
    ? `<p>Phuoc invited you to collaborate on an app.</p><p>Click <a href='${link}'>here</a> to sign in.</p>`
    : `<p>Welcome. Click <a href='${link}'>here</a> to sign in.</p>`
}

async function authorizeUser (draftId, email) {
  let userRecord

  try {
    userRecord = await auth.getUserByEmail(email)
  } catch (e) {
    userRecord = await auth.createUser({ email })
  }

  await database.ref().update({
    [`drafts/${draftId}/authorized/${userRecord.uid}`]: email
  })
}

async function invite (req, res) {
  res.set('Access-Control-Allow-Origin', origin)

  const { draftId, emails, redirect, url } = req.body

  const mails = []

  try {
    await Promise.all(
      emails.map(async email => {
        draftId && (await authorizeUser(draftId, email))

        const link = await auth.generateSignInWithEmailLink(email, {
          url: `${url}?redirect_to=${encodeURIComponent(redirect)}`,
          handleCodeInApp: true
        })

        mails.push({
          from: 'Phuoc <s.phuoc.317049@gmail.com>',
          to: email,
          subject: 'Sign Up',
          html: getHTMLTemplate(draftId, link)
        })
      })
    )

    await sgMail.send(mails)

    res.status(200).json({ success: true })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: e.message })
  }
}

module.exports = invite
