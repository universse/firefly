const functions = require('firebase-functions')
const cors = require('cors')({
  origin: true
})
const admin = require('firebase-admin')
const nodemailer = require('nodemailer')

admin.initializeApp()

function getHTMLTemplate (isInvite, link) {
  return isInvite
    ? `<p>Phuoc invited you to collaborate on an app.</p><p>Click <a href='${link}'>here</a> to sign in.</p>`
    : `<p>Welcome. Click <a href='${link}'>here</a> to sign in.</p>`
}

function invite (req, res) {
  return cors(req, res, async () => {
    const { emails, isInvite, url } = req.body

    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.mailtrap.io',
    //   port: 2525,
    //   auth: {
    //     user: 'ae54daca8d2e17',
    //     pass: 'd09bc1ca151f7e'
    //   }
    // })

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
        user: functions.config().gmail.user,
        pass: functions.config().gmail.pass
      }
    })

    await Promise.all(
      emails.map(async email => {
        const link = await admin.auth().generateSignInWithEmailLink(email, {
          url,
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

    res.set('Access-Control-Allow-Origin', '*')
    res.status(200).json({ success: true })
  })
}

module.exports = invite
