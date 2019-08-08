const shell = require('shelljs')

shell.exec('yarn workspace netlify-functions clean')
shell.exec('lerna clean --yes')
shell.exec('rm -rf yarn.lock')
