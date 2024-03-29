const shell = require('shelljs')

const commitMessage = process.argv[3]

shell.exec('yarn lint')
shell.exec('git add .')
shell.exec(`git commit -m "${commitMessage}"`)
shell.exec('git push -f github')
shell.exec('git push -f origin master')
