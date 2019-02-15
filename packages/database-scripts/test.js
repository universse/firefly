var fs = require('fs')
var csvFile = './my-huge-file.csv'
var parse = require('csv-parse')

var thisRef
var obj = {}
var counter = 0
var commitCounter = 0
var batches = []
batches[commitCounter] = firestore.batch()

fs.createReadStream(csvFile)
  .pipe(parse({ delimiter: '|', relax_column_count: true, quote: '' }))
  .on('data', function (csvrow) {
    if (counter <= 498) {
      if (csvrow[1]) {
        obj.family = csvrow[1]
      }
      if (csvrow[2]) {
        obj.series = csvrow[2]
      }
      if (csvrow[3]) {
        obj.sku = csvrow[3]
      }
      if (csvrow[4]) {
        obj.description = csvrow[4]
      }
      if (csvrow[6]) {
        obj.price = csvrow[6]
      }
      thisRef = firestore.collection('your-collection-name').doc()
      const id = thisRef.id
      batches[commitCounter].set(thisRef, obj)
      counter = counter + 1
    } else {
      counter = 0
      commitCounter = commitCounter + 1
      batches[commitCounter] = firestore.batch()
    }
  })
  .on('end', function () {
    writeToDb(batches)
  })

function oneSecond () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved')
    }, 1010)
  })
}

async function writeToDb (arr) {
  console.log('beginning write')
  for (var i = 0; i < arr.length; i++) {
    await oneSecond()
    arr[i].commit().then(function () {
      console.log('wrote batch ' + i)
    })
  }
  console.log('done.')
}
