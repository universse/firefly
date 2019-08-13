const { writeFileSync } = require('fs')
const { resolve } = require('path')
const shell = require('shelljs')
const firebasePackageJSON = require('../packages/firebase-functions/functions/package.json')

if (firebasePackageJSON.engines) {
  delete firebasePackageJSON.engines
  writeFileSync(
    resolve(__dirname, '../packages/firebase-functions/functions/package.json'),
    JSON.stringify(firebasePackageJSON, null, 2)
  )
}

const commitMessage = process.argv[3]

shell.exec('git add .')
shell.exec(`git commit -m "${commitMessage}"`)
shell.exec('git push -f origin master')
