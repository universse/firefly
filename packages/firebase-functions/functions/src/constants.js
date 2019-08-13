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
  key: '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',
  origin: '*',
  transporter
}
