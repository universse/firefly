const { origin, transporter } = require('./constants')

async function requestAccess (req, res) {
  const { authorizedEmails, email: invitee, href } = req.body

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

  res.set('Access-Control-Allow-Origin', origin)
  res.status(200).json({ success: true })
}

module.exports = requestAccess
