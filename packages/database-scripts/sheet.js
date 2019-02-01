const XLSX = require('xlsx')
const metascraper = require('metascraper')([
  require('metascraper-title')(),
  require('metascraper-description')()
])
const got = require('got')
const { writeFileSync } = require('fs')
const { resolve } = require('path')

const processed = require('./data.json')

const workbook = XLSX.readFile(resolve(__dirname, './raw.xlsx'))
const worksheet = workbook.Sheets['Sheet1']

const NUMBER_OF_URLS = 20

;(async () => {
  await Promise.all(
    XLSX.utils.sheet_to_json(worksheet).map(async row => {
      const urls = []

      await Promise.all(
        Array(NUMBER_OF_URLS)
          .fill(null)
          .map(async (_, i) => {
            const urlStr = row[`url${i}`]

            if (urlStr) {
              const [targetUrl, type] = urlStr.split(';')
              const { body: html, url } = await got(targetUrl)
              const { title, description } = await metascraper({ html, url })

              urls[i] = {
                url,
                title,
                description,
                type
              }
            }
          })
      )

      processed.collections.push({
        name: row.name,
        category: row.category,
        level: row.level,
        tags: row.tags,
        suggestions: row.suggestions,
        urls
      })
    })
  )

  writeFileSync(
    resolve(__dirname, './test.json'),
    JSON.stringify(processed, null, 2)
  )
})()
