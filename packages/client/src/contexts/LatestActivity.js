import React, { createContext, useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'

import LocalStorage from 'constants/LocalStorage'
import useOfflinePersistence from 'hooks/useOfflinePersistence'
import offlineStorageWorker from 'utils/offlineStorageWorker'

export const LatestActivityContext = createContext()

export default function LatestActivity ({ children }) {
  const [latestActivity, setLatestActivity] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    offlineStorageWorker
      .getItem(LocalStorage.LATEST_ACTIVITY)
      .then(setLatestActivity)
      .catch(() => setLatestActivity(false))
      .finally(() => setIsLoading(false))
  }, [])

  useOfflinePersistence({ [LocalStorage.LATEST_ACTIVITY]: latestActivity })

  const activity = useMemo(
    () => ({ latestActivity, isLoading, setLatestActivity }),
    [isLoading, latestActivity]
  )

  return (
    <LatestActivityContext.Provider value={activity}>
      {children}
    </LatestActivityContext.Provider>
  )
}

LatestActivity.propTypes = {
  children: PropTypes.node.isRequired
}
