const { Categories, ItemTypes } = require('@firefly/core')

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
  writeBatchesToDB
}
