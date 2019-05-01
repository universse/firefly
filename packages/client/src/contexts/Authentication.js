import React, { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import FirebaseWorkerEvents from 'constants/FirebaseWorkerEvents'
import LocalStorage from 'constants/LocalStorage'
import firebaseWorker from 'utils/firebaseWorker'

export const AuthenticationContext = createContext()

export default function Authentication ({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const handleAuth = e => {
      if (e.data.type === FirebaseWorkerEvents.AUTH_STATE_CHANGED) {
        setUser(e.data.payload)

        if (e.data.payload) {
          window.localStorage.setItem(LocalStorage.HAS_SIGNED_IN, 'true')

          window.amplitude &&
            window.amplitude.getInstance().setUserId(e.data.payload.uid)
        }
      }
    }

    firebaseWorker.addEventListener('message', handleAuth)

    return () => {
      firebaseWorker.removeEventListener('message', handleAuth)
    }
  }, [])

  return (
    <AuthenticationContext.Provider value={user}>
      {children}
    </AuthenticationContext.Provider>
  )
}

Authentication.propTypes = {
  children: PropTypes.node.isRequired
}
