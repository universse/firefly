const cors = require('cors')({
  origin: true
})
const admin = require('firebase-admin')

const { transporter } = require('./constants')

const domain = '*'

function requestAccess (req, res) {
  return cors(req, res, async () => {
    const { authorizedEmails, email: invitee, href } = req.body

    // get uid

    await Promise.all(
      authorizedEmails.map(async email => {
        await transporter.sendMail({
          from: 'Firefly',
          to: email,
          subject: 'Something',
          html: `<p>${invitee} requested access. Click <a href='${href}?invitee=${invitee}'}'>here</a> to accept.</p>`
        })
      })
    )

    res.set('Access-Control-Allow-Origin', domain)
    res.status(200).json({ success: true })
  })
}

module.exports = requestAccess
