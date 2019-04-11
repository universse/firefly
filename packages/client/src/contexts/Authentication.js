import React, { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { FirebaseContext } from 'contexts/Firebase'
import FirebaseWorkerEvents from 'constants/FirebaseWorkerEvents'
import LocalStorage from 'constants/LocalStorage'

export const AuthenticationContext = createContext()

export default function Authentication ({ children }) {
  const [user, setUser] = useState(null)
  const firebase = useContext(FirebaseContext)

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

    firebase.addEventListener('message', handleAuth)

    return () => {
      firebase.removeEventListener('message', handleAuth)
    }
  }, [firebase])

  return (
    <AuthenticationContext.Provider value={user}>
      {children}
    </AuthenticationContext.Provider>
  )
}

Authentication.propTypes = {
  children: PropTypes.node.isRequired
}
