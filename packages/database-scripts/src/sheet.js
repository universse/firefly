const XLSX = require('xlsx')
const metascraper = require('metascraper')([
  require('metascraper-title')(),
  require('metascraper-description')(),
  require('metascraper-image')()
])
const got = require('got')
const { writeFileSync } = require('fs')
const { resolve } = require('path')
const { toTitleCase } = require('common')

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
                const { title, description, image } = await metascraper({
                  html,
                  url
                })

                urls[i] = {
                  url,
                  title: toTitleCase(title),
                  description,
                  image,
                  type
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
          name: toTitleCase(row.name),
          category: row.category,
          level: row.level,
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
