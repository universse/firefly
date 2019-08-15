// const functions = require('firebase-functions')
const admin = require('firebase-admin')
// const pgp = require('pg-promise')({
//   capSQL: true // generate capitalized SQL
// })

const { origin } = require('./constants')

async function fire (req, res) {
  res.set('Access-Control-Allow-Origin', origin)

  const { events } = req.body

  let pages = 0
  const startedAt = events[0].timestamp
  const sessionId = generateSessionId(startedAt)
  const duration = events[events.length - 1].timestamp - startedAt

  events.forEach(event => {
    if (event.type === 'view page' || event.type === 'view collection') {
      pages = pages + 1
    }
  })
  // .sort(
  //   ({ timestamp: timestamp1 }, { timestamp: timestamp2 }) =>
  //     timestamp1 - timestamp2
  // )

  const session = {
    sessionId,
    ...req.session,
    startedAt,
    pages,
    duration
  }

  try {
    await saveToFirebase({ [sessionId]: events }, session, sessionId)
    res.status(200).json({ success: true })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: e.message })
  }
}

async function saveToFirebase (events, session, sessionId) {
  const bucket = admin.storage().bucket()

  await Promise.all([
    bucket.file(`fire/events/${sessionId}.json`).save(JSON.stringify(events)),
    bucket.file(`fire/sessions/${sessionId}.json`).save(JSON.stringify(session))
  ])
}

// const db = pgp({
//   connectionString: functions.config().postgres.url,
//   ssl: true
// })

// const sessionColumns = new pgp.helpers.ColumnSet(
//   [
//     'sessionId',
//     'uid',
//     'createdAt',
//     'startedAt',
//     'duration',
//     'pages',
//     'latency',
//     'pageLoad',
//     'ref',
//     'userAgent',
//     'language',
//     'timezone'
//   ],
//   { table: 'sessions' }
// )

// need id
// const eventColumns = new pgp.helpers.ColumnSet(
//   ['sessionId', 'type', 'timestamp', { name: 'properties', mod: ':json' }],
//   { table: 'events' }
// )

// await db.task('inserting-session', t => {
//   const insert = pgp.helpers.insert(session, sessionColumns)
//   return t.none(insert)
// })

// await db.task('inserting-events', t => {
//   const insert = pgp.helpers.insert(events, eventColumns)
//   return t.none(insert)
// })

// write to excel/postgres

async function saveToPostgres () {}

function hashString (str) {
  let hash = 0

  if (str.length === 0) {
    return hash
  }

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }

  return hash
}

function generateSessionId (startedAt) {
  return `${Date.now()}-${hashString(startedAt + '')}`
}

module.exports = fire
