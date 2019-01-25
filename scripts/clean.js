const shell = require('shelljs')

shell.rm('-rf', 'packages/client/node_modules')
shell.rm('-rf', 'packages/lambdas/node_modules')
