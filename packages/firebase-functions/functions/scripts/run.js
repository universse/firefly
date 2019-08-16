const shell = require('shelljs')

const start = process.argv[3] === 'start'

if (start) {
  shell.exec('firebase use development && firebase serve --only functions')
} else {
  shell.exec('firebase use development && firebase deploy')
  shell.exec('firebase use production && firebase deploy')
}
