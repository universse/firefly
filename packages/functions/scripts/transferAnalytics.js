const admin = require('firebase-admin')
const pgp = require('pg-promise')({
  capSQL: true
})
// const shell = require('shelljs')

const { writeBatchesToDB } = require('./utils')
require('./config')

const firebaseKey = JSON.parse(process.env.FIREBASE_USERS)

admin.initializeApp({
  credential: admin.credential.cert(firebaseKey)
})

const EVENTS_TABLE = 'events'
const SESSIONS_TABLE = 'sessions'
const _TIMESTAMP = '_timestamp'

const db = pgp({
  connectionString: process.env.POSTGRES_URL,
  ssl: true
})

const sessionColumns = new pgp.helpers.ColumnSet(
  [
    'id',
    'uid',
    'createdAt',
    'startedAt',
    'eventCount',
    'duration',
    'pageCount',
    'latency',
    'pageLoad',
    'ref',
    'userAgent',
    'language',
    'timezone'
  ],
  { table: SESSIONS_TABLE }
)

const eventColumns = new pgp.helpers.ColumnSet(
  ['sessionId', 'type', 'timestamp', { name: 'properties', mod: ':json' }],
  { table: EVENTS_TABLE }
)

const firestore = admin.firestore()

async function transfer () {
  const Sessions = []
  const Events = []

  const metadataDoc = firestore.collection(SESSIONS_TABLE).doc('metadata')

  let sessionsSnapshot
  try {
    const metadata = await metadataDoc.get()

    sessionsSnapshot = await firestore
      .collection(SESSIONS_TABLE)
      .where(_TIMESTAMP, '>', metadata.data().lastTransferredSessionTimestamp)
      .orderBy(_TIMESTAMP, 'asc')
      .get()
  } catch {
    sessionsSnapshot = await firestore
      .collection(SESSIONS_TABLE)
      .orderBy(_TIMESTAMP, 'asc')
      .get()
  }
  if (!sessionsSnapshot.size) return

  let lastTransferredSessionTimestamp

  // let count = 0
  // let batchNo = 0
  // const batches = []
  // const BATCH_SIZE = 497

  sessionsSnapshot.forEach(async doc => {
    const { _timestamp, events, ...session } = doc.data()
    Sessions.push({ ...session, uid: session.uid || null })
    lastTransferredSessionTimestamp = _timestamp

    events.forEach(event => {
      Events.push({
        ...event,
        sessionId: session.id,
        properties: event.properties || null
      })
    })

    // if (count === BATCH_SIZE) {
    //   count = 0
    //   batchNo++
    // }
    // count++

    // if (!batches[batchNo]) {
    //   batches[batchNo] = firestore.batch()
    // }
    // batches[batchNo].delete(doc.ref)
  })

  await db.task('inserting-session', t => {
    const insert = pgp.helpers.insert(Sessions, sessionColumns)
    return t.none(insert)
  })

  await db.task('inserting-events', t => {
    const insert = pgp.helpers.insert(Events, eventColumns)
    return t.none(insert)
  })

  // batches[batchNo].set(metadataDoc, {
  //   lastTransferredSessionTimestamp
  // })

  // writeBatchesToDB(batches)

  await metadataDoc.set({
    lastTransferredSessionTimestamp
  })
}

;(async () => {
  try {
    await transfer()
  } catch (e) {
    console.log(e)
  }
})()

// function downloadData () {
//   const projectId = 'firefly-users-db'
//   const folder = 'fire'
//   const destination = 'C:/Users/Ulrjch/Downloads'

//   shell.exec(
//     `python C:/gsutil/gsutil -m cp -r gs://${projectId}.appspot.com/${folder} ${destination}`
//   )
// }

// async function dropTables () {
//   await db.none(`DROP TABLE ${EVENTS_TABLE}`)
//   await db.none(`DROP TABLE ${SESSIONS_TABLE}`)
// }

// async function createTables () {
//   await db.none(
//     `
//       CREATE TABLE ${SESSIONS_TABLE}(
//         id text NOT NULL PRIMARY KEY,
//         uid text,
//         "createdAt" timestamptz NOT NULL,
//         "startedAt" timestamptz NOT NULL,
//         "eventCount" integer NOT NULL,
//         duration decimal NOT NULL,
//         "pageCount" integer NOT NULL,
//         latency decimal NOT NULL,
//         "pageLoad" decimal NOT NULL,
//         ref text NOT NULL,
//         "userAgent" text NOT NULL,
//         language text NOT NULL,
//         timezone text NOT NULL
//       )`
//   )

//   await db.none(
//     `
//     CREATE TABLE ${EVENTS_TABLE}(
//       id serial PRIMARY KEY,
//       "sessionId" text REFERENCES sessions(id),
//       type text NOT NULL,
//       timestamp decimal NOT NULL,
//       properties json
//     )`
//   )
// }

// dropTables().then(createTables)
