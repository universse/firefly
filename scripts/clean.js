const shell = require('shelljs')

shell.exec('yarn workspace client clean')
shell.exec('yarn workspace functions clean')
shell.exec('lerna clean --yes')
shell.exec('rm -rf yarn.lock')
