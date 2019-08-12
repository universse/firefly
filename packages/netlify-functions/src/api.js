const express = require('express')
const serverless = require('serverless-http')
const compression = require('compression')
const metascraper = require('metascraper')([
  // require('metascraper-author')(),
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-publisher')(),
  require('metascraper-title')()
])
const got = require('got')
const {
  NetlifyFunction,
  getTruncatedString,
  truncate,
  toTitleCase
} = require('common')

const basePath = process.env.ORIGIN ? `${NetlifyFunction}api` : '/api'

const app = express()
const router = express.Router()
router.use(compression())

router.post('/', async (req, res) => {
  const { href } = JSON.parse(req.body)

  try {
    const { body: html, url } = await got(href)
    const metadata = await metascraper({ html, url })

    const { description, title } = metadata

    metadata.title = toTitleCase(title)
    metadata.description = getTruncatedString(description)
    metadata.cutOff = truncate(metadata.description, 60)

    res.status(200).json(metadata)
  } catch {
    res.status(400).json({ error: true })
  }
})

app.use(basePath, router)

export const handler = serverless(app)
