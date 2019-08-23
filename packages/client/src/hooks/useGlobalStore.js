import create from 'zustand'

import LocalStorage from 'constants/LocalStorage'
import { media } from 'constants/Styles'
import firebaseWorker from 'utils/firebaseWorker'
import searchWorker from 'utils/searchWorker'

const [useGlobalStore, { setState }] = create(set => ({
  media: { isDesktop: null, isMobile: null },
  normalizedCollections: null,
  user: null
}))

if (typeof window === 'object') {
  const setMediaListener = (key, query) => {
    const mql = window.matchMedia(query)

    const setMatches = () =>
      setState(state => ({ media: { ...state.media, [key]: mql.matches } }))

    setMatches()
    mql.addListener(setMatches)
  }

  setMediaListener('isDesktop', media.desktop)
  setMediaListener('isMobile', media.mobile)

  searchWorker
    .init()
    .then(normalizedCollections => setState({ normalizedCollections }))

  firebaseWorker.getUser().then(uid => {
    setState({ user: uid })

    if (uid) {
      window.localStorage.setItem(LocalStorage.HAS_SIGNED_IN, 'true')
      window.___logUser(uid)
    } else {
      window.localStorage.removeItem(LocalStorage.HAS_SIGNED_IN)
    }
  })
}

export function useMedia () {
  return useGlobalStore(state => state.media)
}

export function useNormalizedCollections () {
  return useGlobalStore(state => state.normalizedCollections)
}

export function useUser () {
  return useGlobalStore(state => state.user)
}
