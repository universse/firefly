import React, { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import FirebaseContext from 'contexts/FirebaseContext'

export const AuthenticationContext = createContext()

export default function Authentication ({ children }) {
  const [user, setUser] = useState(false)
  const firebase = useContext(FirebaseContext)

  useEffect(() => {
    firebase.addEventListener(
      'message',
      e => e.data.type === 'auth' && setUser(e.data.payload)
    )
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
