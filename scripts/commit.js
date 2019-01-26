const shell = require('shelljs')

const commitMessage = process.argv[3]

shell.exec('git add .')
shell.exec(`git commit -m "${commitMessage}"`)
shell.exec('git push origin master')

// shell.cd('packages/client')

// const cleanMessage =
//   "On branch master\nYour branch is up to date with 'origin/master'.\n\nnothing to commit, working tree clean\n"
// const isClientClean = shell.exec('git status .').stdout === cleanMessage

// if (!isClientClean) {
//   shell.exec('git add .')
//   shell.exec(`git commit -m "${commitMessage}"`)
//   shell.exec('git push origin master')
// }
