const sgMail = require('@sendgrid/mail')

const { sgKey, origin } = require('./constants')

sgMail.setApiKey(sgKey)

async function requestAccess (req, res) {
  res.set('Access-Control-Allow-Origin', origin)

  const { authorizedEmails, email: invitee, href } = req.body
  try {
    await sgMail.sendMultiple({
      from: invitee,
      to: authorizedEmails,
      subject: 'Request Access',
      html: `<p>${invitee} requested access. Click <a href='${href}?invitee=${invitee}'}'>here</a> to accept.</p>`
    })

    res.status(200).json({ success: true })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: e.message })
  }
}

module.exports = requestAccess
