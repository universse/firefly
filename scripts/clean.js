const shell = require('shelljs')

shell.rm('-rf', 'packages/client/node_modules')
shell.exec('yarn workspace client clean')
shell.exec('yarn workspace netlify-functions clean')
shell.rm('-rf', 'packages/database-functions/functions/node_modules')
shell.rm('-rf', 'packages/database-scripts/node_modules')
shell.rm('-rf', 'packages/lambdas/node_modules')
shell.rm('-rf', 'packages/netlify-functions/node_modules')
