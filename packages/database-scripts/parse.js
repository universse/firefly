const axios = require('axios')

require('./config')

const mercuryAPI = 'https://mercury.postlight.com/parser?url='
const config = {
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.GATSBY_MERCURY_API_KEY
  }
}

const parse = async ({ id, url }) => {
  const { data: { title, content } } = await axios.get(
    `${mercuryAPI}${url}`,
    config
  )

  return { id, title, content }
}

// const outlineAPI = 'https://outlineapi.com/parse_article?source_url='
// const outline3API = 'https://outlineapi.com/v3/get_article?id='

// const parse = async url => {
//   const { data: { data: { html } } } = await axios.get(`${outline3API}${url}`)

//   return { html }
// }
