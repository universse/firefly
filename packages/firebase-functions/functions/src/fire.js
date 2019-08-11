// const functions = require('firebase-functions')
const cors = require('cors')({
  origin: true
})
// const pgp = require('pg-promise')({
//   capSQL: true // generate capitalized SQL
// })

// require('./config')

// const db = pgp({
//   connectionString: process.env.POSTGRES_URL,
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

const domain = '*'

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

// write to excel/postgres

function fire (req, res) {
  return cors(req, res, async () => {
    let pages = 0
    const startedAt = req.events[0].timestamp
    const sessionId = generateSessionId(startedAt)
    const duration = req.events[req.events.length - 1].timestamp - startedAt

    const events = req.events
      // .sort(
      //   ({ timestamp: timestamp1 }, { timestamp: timestamp2 }) =>
      //     timestamp1 - timestamp2
      // )
      .map(event => {
        if (event.type === 'view page' || event.type === 'view collection') {
          pages = pages + 1
        }

        return {
          sessionId,
          ...event
        }
      })

    const session = {
      ...req.body.session,
      sessionId,
      startedAt,
      pages,
      duration
    }

    const fireRef = admin
      .storage()
      .ref()
      .child('fire')

    try {
      await Promise.all([
        fireRef
          .child('events')
          .child(sessionId + '.json')
          .putString(JSON.stringify(events)),
        fireRef
          .child('sessions')
          .child(sessionId + '.json')
          .putString(JSON.stringify(session))
      ])

      res.set('Access-Control-Allow-Origin', domain)
      res.status(200).json({ success: true })
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: e.message })
    }
  })
}

module.exports = fire
