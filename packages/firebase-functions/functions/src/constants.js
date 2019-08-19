const functions = require('firebase-functions')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'ae54daca8d2e17',
    pass: 'd09bc1ca151f7e'
  }
})

module.exports = {
  origin: '*',
  sgKey: functions.config().sendgrid.key,
  transporter
}
