function oneSecond () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 1010)
  })
}

module.exports = {
  writeBatchesToDB: async function (batches) {
    for (let i = 0; i < batches.length; i++) {
      await oneSecond()
      batches[i].commit().then(function () {
        console.log('Wrote batch ' + i)
      })
    }
  }
}
