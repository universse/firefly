const { Categories, ItemTypes } = require('common')

function parseCollection ({ category, ...props }) {
  return {
    ...props,
    category: Categories.indexOf(category)
  }
}

function parseUrl ({ type, ...props }) {
  return {
    ...props,
    type: ItemTypes.indexOf(type)
  }
}

function truncate (str, length = 120) {
  if (str.length <= length) return str
  let final
  if (str.slice(0, length).endsWith(' ')) final = str.slice(0, length - 1)
  if (str.slice(0, length + 1).endsWith(' ')) final = str.slice(0, length)
  else {
    const trimmed = str.slice(0, length)
    final = trimmed.slice(0, trimmed.lastIndexOf(' '))
  }
  return `${final}...`
}

function oneSecond () {
  return new Promise(resolve => setTimeout(resolve, 1010))
}

async function writeBatchesToDB (batches) {
  for (let i = 0; i < batches.length; i++) {
    await oneSecond()
    batches[i].commit().then(function () {
      console.log('Wrote batch ' + i)
    })
  }
}

module.exports = {
  parseCollection,
  parseUrl,
  truncate,
  writeBatchesToDB
}
