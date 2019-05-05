const express = require('express')
const serverless = require('serverless-http')
const compression = require('compression')

const metascraper = require('metascraper')([
  require('metascraper-title')(),
  require('metascraper-description')(),
  require('metascraper-image')()
])
const got = require('got')

const { NetlifyFunction } = require('common')

const basePath = process.env.NETLIFY ? `${NetlifyFunction}api` : '/api'

const app = express()
const router = express.Router()
router.use(compression())

router.post('/', async (req, res) => {
  const { url } = JSON.parse(req.body)

  try {
    const { body: html, url: link } = await got(url)
    const { title, description, image } = await metascraper({ html, url: link })

    res.status(200).json({ title, description, image })
  } catch {
    res.status(400).json({ error: true })
  }
})

app.use(basePath, router)

export const handler = serverless(app)
