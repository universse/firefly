const metascraper = require('metascraper')([
  // require('metascraper-author')(),
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-publisher')(),
  require('metascraper-title')()
])
const got = require('got')
const { getTruncatedString, truncate, toTitleCase } = require('@firefly/core')

module.exports = async (req, res) => {
  // if (event.httpMethod !== 'POST') {
  //   return { statusCode: 405, body: 'Method Not Allowed' }
  // }

  const { href } = req.body

  try {
    const { body: html, url } = await got(href)
    const metadata = await metascraper({ html, url })

    const { description, title } = metadata

    metadata.title = toTitleCase(title)
    metadata.description = getTruncatedString(description)
    metadata.cutOff = truncate(metadata.description, 60)

    res.status(200).json(metadata)
  } catch (e) {
    res.status(400).json({ error: true })
  }
}
