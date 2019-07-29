import localforage from 'localforage'

const StorageKeys = {
  OFFLINE_QUEUE: 'offlineQueue',
  SYNCING: 'syncing'
}

Promise.all([
  localforage.getItem(StorageKeys.OFFLINE_QUEUE),
  localforage.getItem(StorageKeys.SYNCING)
]).then(([changes, syncing]) =>
  syncing
    ? localforage
        .setItem(StorageKeys.OFFLINE_QUEUE, {
          check: { ...syncing.check, ...changes.check },
          save: { ...syncing.save, ...changes.save }
        })
        .then(() => localforage.removeItem(StorageKeys.SYNCING))
    : !changes &&
      localforage.setItem(StorageKeys.OFFLINE_QUEUE, {
        check: {},
        save: {}
      })
)

export async function getItem (key) {
  return localforage.getItem(key)
}

export async function clear () {
  localforage.clear()
}

export async function saveChangesToQueue ({ id, action, check, save }) {
  localforage.getItem(StorageKeys.OFFLINE_QUEUE).then(changes => {
    if (action) {
      changes[action.replace('un', '')][id] = !action.startsWith('un')
      localforage.setItem(StorageKeys.OFFLINE_QUEUE, changes)
    } else {
      localforage.setItem(StorageKeys.OFFLINE_QUEUE, {
        check: { ...changes.check, ...check },
        save: { ...changes.save, ...save }
      })
    }
  })
}

export async function addToQueue () {
  Promise.all([localforage.getItem('check'), localforage.getItem('save')]).then(
    ([check, save]) =>
      saveChangesToQueue({
        check: check || {},
        save: save || {}
      })
  )
}

export async function processQueue (changes) {
  return Promise.all([
    localforage.setItem(StorageKeys.SYNCING, changes),
    localforage.setItem(StorageKeys.OFFLINE_QUEUE, {
      check: {},
      save: {}
    })
  ])
}

export async function clearQueue () {
  return localforage.removeItem(StorageKeys.SYNCING)
}

export async function restoreQueue (changes) {
  localforage.getItem(StorageKeys.OFFLINE_QUEUE).then(newChanges => {
    localforage.setItem(StorageKeys.OFFLINE_QUEUE, {
      check: { ...changes.check, ...newChanges.check },
      save: { ...changes.save, ...newChanges.save }
    })
  })
}

export async function loadUserData () {
  return Promise.all([
    localforage.getItem('check'),
    localforage.getItem('save')
  ])
}

export async function persist (values) {
  Object.entries(values).map(([key, value]) => localforage.setItem(key, value))
}
