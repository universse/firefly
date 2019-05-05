const { Categories, ItemTypes } = require('common')

function parseCollection ({ name, category, level, tags, urlIds }) {
  return {
    n: name,
    c: Categories.indexOf(category),
    l: level,
    us: urlIds,
    t: tags
  }
}

function parseUrl ({ url, title, description, image, type, collectionId }) {
  return {
    u: url,
    ti: title,
    d: description,
    i: image,
    ty: ItemTypes.indexOf(type),
    c: collectionId
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
