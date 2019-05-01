const shell = require('shelljs')

// cd C:/gsutil
// python gsutil config

const projectId = 'firefly-users-db-dev'
const folder = 'SRs'
const destination = 'C:/Users/Ulrjch/Downloads'

shell.exec(
  `python C:/gsutil/gsutil -m cp -r gs://${projectId}.appspot.com/${folder} ${destination}`
)
