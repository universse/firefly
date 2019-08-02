import localforage from 'localforage'

import LocalStorage from 'constants/LocalStorage'

Promise.all([
  localforage.getItem(LocalStorage.OFFLINE_QUEUE),
  localforage.getItem(LocalStorage.SYNCING)
]).then(([changes, syncing]) =>
  syncing
    ? localforage
        .setItem(LocalStorage.OFFLINE_QUEUE, {
          check: { ...syncing.check, ...changes.check },
          save: { ...syncing.save, ...changes.save }
        })
        .then(() => localforage.removeItem(LocalStorage.SYNCING))
    : !changes &&
      localforage.setItem(LocalStorage.OFFLINE_QUEUE, {
        check: {},
        save: {}
      })
)

export async function getItem (key) {
  return localforage.getItem(key)
}

export async function setItem (key, value) {
  return localforage.setItem(key, value)
}

export async function removeItem (key) {
  return localforage.removeItem(key)
}

export async function clear () {
  localforage.clear()
}

export async function saveChangesToQueue ({ id, action, check, save }) {
  localforage.getItem(LocalStorage.OFFLINE_QUEUE).then(changes => {
    if (action) {
      changes[action.replace('un', '')][id] = !action.startsWith('un')
      localforage.setItem(LocalStorage.OFFLINE_QUEUE, changes)
    } else {
      localforage.setItem(LocalStorage.OFFLINE_QUEUE, {
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
    localforage.setItem(LocalStorage.SYNCING, changes),
    localforage.setItem(LocalStorage.OFFLINE_QUEUE, {
      check: {},
      save: {}
    })
  ])
}

export async function restoreQueue (changes) {
  localforage.getItem(LocalStorage.OFFLINE_QUEUE).then(newChanges => {
    localforage.setItem(LocalStorage.OFFLINE_QUEUE, {
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
