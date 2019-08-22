const got = require('got')

require('./config')

const deploy = () =>
  got
    .post(`${process.env.NETLIFY_BUILD_HOOK}?trigger_title=manual+deploy`)
    .catch(console.log)

module.exports = deploy
