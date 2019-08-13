const { writeFileSync } = require('fs')
const { resolve } = require('path')
const shell = require('shelljs')
const firebasePackageJSON = require('../package.json')

if (!firebasePackageJSON.engines) {
  firebasePackageJSON.engines = { node: '8' }
  writeFileSync(
    resolve(__dirname, '../package.json'),
    JSON.stringify(firebasePackageJSON, null, 2)
  )
}

const start = process.argv[3] === 'start'

start
  ? shell.exec('firebase use development && firebase serve --only functions')
  : shell.exec('firebase use production && firebase deploy')
