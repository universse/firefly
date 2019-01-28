import React, { createContext, useContext, useEffect, useState } from 'react'

import FirebaseContext from 'contexts/FirebaseContext'

export const AuthenticationContext = createContext()

export default function Authentication ({ children }) {
  const [user, setUser] = useState(false)
  const firebase = useContext(FirebaseContext)

  useEffect(() => {
    const stopAuthListener = firebase.setAuthListener(currentUser => {
      setUser(currentUser)
    })

    return () => stopAuthListener()
  }, [])

  return (
    <AuthenticationContext.Provider value={user}>
      {children}
    </AuthenticationContext.Provider>
  )
}
