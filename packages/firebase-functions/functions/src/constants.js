// const transporter = nodemailer.createTransport({
//   host: 'smtp.mailtrap.io',
//   port: 2525,
//   auth: {
//     user: 'ae54daca8d2e17',
//     pass: 'd09bc1ca151f7e'
//   }
// })

const functions = require('firebase-functions')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: functions.config().gmail.user,
    pass: functions.config().gmail.pass
  }
})

module.exports = {
  origin: '*',
  transporter
}
