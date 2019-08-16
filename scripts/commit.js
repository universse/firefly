const shell = require('shelljs')

const commitMessage = process.argv[3]

shell.exec('git add .')
shell.exec(`git commit -m "${commitMessage}"`)
shell.exec('git push -f origin master')
