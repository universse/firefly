const Tabletop = require('tabletop')
const { writeFileSync } = require('fs')
const { resolve } = require('path')

require('./config')

const processed = { collections: [] }

Tabletop.init({
  key: process.env.SHEET_URL,
  callback: data =>
    writeFileSync(
      resolve(__dirname, './data.json'),
      JSON.stringify(processed, null, 2)
    ),
  simpleSheet: true,
  parseNumbers: true,
  postProcess: element => {
    element['urls'] = []
    Array(20)
      .fill(null)
      .forEach((_, i) => {
        const urlStr = element[`url${i}`]

        if (urlStr) {
          const [url, type] = urlStr.split(';')
          url && element['urls'].push({ url, type })
        }

        delete element[`url${i}`]
      })

    delete element['rowNumber']
    processed.collections.push(element)
  }
})
