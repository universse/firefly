const admin = require('firebase-admin')

const { origin, transporter } = require('./constants')

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
    console.log(e)
    userRecord = await auth.createUser({ email })
  }

  await database.ref().update({
    [`drafts/${draftId}/authorized/${userRecord.uid}`]: email
  })
}

async function invite (req, res) {
  const { draftId, emails, redirect, url } = req.body

  await Promise.all(
    emails.map(async email => {
      draftId && (await authorizeUser(draftId, email))

      const link = await auth.generateSignInWithEmailLink(email, {
        url: `${url}?redirect_to=${encodeURIComponent(redirect)}`,
        handleCodeInApp: true
      })

      await transporter.sendMail({
        from: 'Firefly',
        to: email,
        subject: 'Sign Up',
        html: getHTMLTemplate(draftId, link)
      })
    })
  )

  res.set('Access-Control-Allow-Origin', origin)
  res.status(200).json({ success: true })
}

module.exports = invite
