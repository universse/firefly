import create from 'zustand'

import LocalStorage from 'constants/LocalStorage'
import { media } from 'constants/Styles'
import firebaseWorker from 'utils/firebaseWorker'
import offlineStorageWorker from 'utils/offlineStorageWorker'
import searchWorker from 'utils/searchWorker'

const LATEST_ACTIVITY = 'latestActivity'

const MEDIA = 'media'
const IS_DESKTOP = 'isDesktop'
const IS_MOBILE = 'isMobile'

const NORMALIZED_COLLECTIONS = 'normalizedCollections'
const USER = 'user'

const [useGlobalStore, { setState, subscribe }] = create(set => ({
  [LATEST_ACTIVITY]: { isLoading: true, data: null },
  [MEDIA]: { [IS_DESKTOP]: null, [IS_MOBILE]: null },
  [NORMALIZED_COLLECTIONS]: null,
  [USER]: null,
  actions: {
    setLatestActivity: latestActivity =>
      set({ [LATEST_ACTIVITY]: { data: latestActivity } })
  }
}))

function initialize () {
  const setMediaListener = (key, query) => {
    const mql = window.matchMedia(query)

    const setMatches = () =>
      setState(state => ({
        [MEDIA]: { ...state[MEDIA], [key]: mql.matches }
      }))

    setMatches()
    mql.addListener(setMatches)
  }

  setMediaListener(IS_DESKTOP, media.desktop)
  setMediaListener(IS_MOBILE, media.mobile)

  searchWorker.init().then(data => setState({ [NORMALIZED_COLLECTIONS]: data }))

  firebaseWorker.getUser().then(uid => {
    setState({ [USER]: uid })

    if (uid) {
      window.localStorage.setItem(LocalStorage.HAS_SIGNED_IN, 'true')
      window.___logUser(uid)
    } else {
      window.localStorage.removeItem(LocalStorage.HAS_SIGNED_IN)
    }
  })

  offlineStorageWorker
    .getItem(LocalStorage.LATEST_ACTIVITY)
    .then(data => setState({ [LATEST_ACTIVITY]: { data } }))
    .catch(() => setState({ [LATEST_ACTIVITY]: { data: null } }))
}

if (typeof window === 'object') initialize()

function selectLatestActivity (state) {
  return state[LATEST_ACTIVITY]
}

subscribe(
  ({ data }) =>
    data &&
    offlineStorageWorker.persist({
      [LocalStorage.LATEST_ACTIVITY]: data
    }),
  {
    selector: selectLatestActivity
  }
)

export function useGlobalActions () {
  return useGlobalStore(state => state.actions)
}

export function useLatestActivity () {
  return useGlobalStore(selectLatestActivity)
}

export function useMedia () {
  return useGlobalStore(state => state[MEDIA])
}

export function useNormalizedCollections () {
  return useGlobalStore(state => state[NORMALIZED_COLLECTIONS])
}

export function useUser () {
  return useGlobalStore(state => state[USER])
}
