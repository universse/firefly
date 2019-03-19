import React, { memo, useState, useEffect } from 'react'
import localforage from 'localforage'

import Landing from './Landing'
import LatestActivity from './LatestActivity'
import Onboard from './Onboard'
import LocalStorage from 'constants/LocalStorage'
import { hasSignedIn, isNewUser } from 'utils/localStorageUtils'

export default memo(function Hero () {
  const [latestActivity, setLatestActivity] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    localforage
      .getItem(LocalStorage.LATEST_ACTIVITY)
      .then(setLatestActivity)
      .catch(() => setLatestActivity(false))
      .finally(() => setIsLoading(false))
  }, [])

  if (!hasSignedIn()) {
    return <Landing />
  }

  if (isNewUser()) {
    return <Onboard />
  }

  if (isLoading) {
    return <>Loading</>
  }

  return latestActivity ? (
    <LatestActivity latestActivity={latestActivity} />
  ) : (
    <Onboard />
  )
})
