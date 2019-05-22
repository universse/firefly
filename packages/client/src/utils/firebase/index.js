import FirebaseWorker from './firebase.worker'

const firebaseWorker = typeof window === 'object' && new FirebaseWorker()

export default firebaseWorker

if (process.env.NODE_ENV === 'production' && typeof window === 'object') {
  let events = []
  let processing = []

  import('rrweb').then(({ record }) =>
    record({
      emit (event) {
        events.push(event)
      }
    })
  )

  setInterval(() => {
    if (events.length) {
      processing = [...events]
      events = []
      firebaseWorker
        .uploadScreenRecordings(processing)
        .catch(() => (events = processing.concat(events)))
    }
  }, 12000)
}
