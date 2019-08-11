const cors = require('cors')({
  origin: true
})
const admin = require('firebase-admin')

const { transporter } = require('./constants')

const domain = '*'

function getHTMLTemplate (isInvite, link) {
  return isInvite
    ? `<p>Phuoc invited you to collaborate on an app.</p><p>Click <a href='${link}'>here</a> to sign in.</p>`
    : `<p>Welcome. Click <a href='${link}'>here</a> to sign in.</p>`
}

function invite (req, res) {
  return cors(req, res, async () => {
    const { emails, isInvite, redirect, url } = req.body

    await Promise.all(
      emails.map(async email => {
        const link = await admin.auth().generateSignInWithEmailLink(email, {
          url: `${url}?redirect_to=${encodeURIComponent(redirect)}`,
          handleCodeInApp: true
        })

        await transporter.sendMail({
          from: 'Firefly',
          to: email,
          subject: 'Sign Up',
          html: getHTMLTemplate(isInvite, link)
        })
      })
    )

    res.set('Access-Control-Allow-Origin', domain)
    res.status(200).json({ success: true })
  })
}

module.exports = invite
