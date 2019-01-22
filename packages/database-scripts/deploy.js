const axios = require('axios')

require('./config')

const deploy = () =>
  axios
    .post(`${process.env.NETLIFY_BUILD_HOOK}?trigger_title=manual+deploy`)
    .catch(error => console.log(error))

module.exports = deploy
