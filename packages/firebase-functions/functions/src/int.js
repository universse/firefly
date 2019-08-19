// const functions = require('firebase-functions')
const admin = require('firebase-admin')

const { origin } = require('./constants')

const firestore = admin.firestore()

async function int (req, res) {
  res.set('Access-Control-Allow-Origin', origin)

  const { events, session } = req.body

  let pageCount = 0
  const eventCount = events.length
  const startedAt = events[0].timestamp
  const sessionId = generateSessionId(startedAt)
  const duration = events[eventCount - 1].timestamp - startedAt

  events.forEach(event => {
    if (event.type === 'view page' || event.type === 'view collection') {
      pageCount = pageCount + 1
    }
    event.timestamp = event.timestamp / 1000
  })

  session.id = sessionId
  session.createdAt = new Date(session.createdAt).toUTCString()
  session.startedAt = new Date(startedAt).toUTCString()
  session.duration = duration / 1000
  session.pageCount = pageCount
  session.latency = session.latency / 1000
  session.pageLoad = session.pageLoad / 1000
  session.eventCount = eventCount
  session._timestamp = admin.firestore.FieldValue.serverTimestamp()
  session.events = events

  try {
    await firestore
      .collection('sessions')
      .doc()
      .set(session)

    res.status(200).json({ success: true })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: e.message })
  }
}

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

// async function saveToFirebase (events, session, sessionId) {
//   const bucket = admin.firestore()

//   await Promise.all([
//     bucket.file(`fire/events/${sessionId}.json`).save(JSON.stringify(events)),
//     bucket.file(`fire/sessions/${sessionId}.json`).save(JSON.stringify(session))
//   ])
// }

module.exports = int
