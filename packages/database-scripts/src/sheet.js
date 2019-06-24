const XLSX = require('xlsx')
const metascraper = require('metascraper')([
  // require('metascraper-author')(),
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-publisher')(),
  require('metascraper-title')()
])
const got = require('got')
const { writeFileSync } = require('fs')
const { resolve } = require('path')
const { toTitleCase } = require('common')

const { truncate } = require('./utils')

const workbook = XLSX.readFile(resolve(__dirname, '../data/raw.xlsx'))
const worksheet = workbook.Sheets['Sheet1']

const NUMBER_OF_URLS = 20
const processed = { collections: [] }

;(async () => {
  await Promise.all(
    XLSX.utils
      .sheet_to_json(worksheet)
      .slice(0, 8)
      .map(async row => {
        const urls = []

        await Promise.all(
          Array(NUMBER_OF_URLS)
            .fill(null)
            .map(async (_, i) => {
              const targetUrl = row[`url${i}`]

              if (targetUrl) {
                const type = row[`url${i}type`]
                const { body: html, url } = await got(targetUrl)
                const {
                  title,
                  description,
                  image,
                  publisher
                } = await metascraper({
                  html,
                  url
                })

                urls[i] = {
                  description: truncate(description),
                  image,
                  publisher,
                  title: toTitleCase(title),
                  type,
                  url
                }
              }
            })
        )

        const tags = []

        for (let i = 0; i < 3; i++) {
          row[`tag${i}`] && tags.push(row[`tag${i}`])
        }

        processed.collections.push({
          _EXCEL_KEY: row.no,
          category: row.category,
          level: row.level,
          name: toTitleCase(row.name),
          tags,
          urls
        })
      })
  )

  writeFileSync(
    resolve(__dirname, '../data/processed.json'),
    JSON.stringify(processed, null, 2)
  )
})()
