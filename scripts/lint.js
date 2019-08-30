const shell = require('shelljs')

shell.exec('yarn workspace client clean')
shell.exec('yarn workspace functions clean')

const packages = ['client', 'core', 'firebase-functions/functions', 'functions']

const packagesGlob = packages.join(',')

shell.exec(
  `eslint "scripts/*.js" "packages/{${packagesGlob}}/{,!(node_modules)/**/}*.js" --fix`
)
