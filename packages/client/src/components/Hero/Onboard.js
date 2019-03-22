import React, { memo, useEffect } from 'react'
import { css } from '@emotion/core'

import LocalStorage from 'constants/LocalStorage'

function Onboard () {
  useEffect(() => {
    const removeIsNewUser = () =>
      window.localStorage.removeItem(LocalStorage.IS_NEW_USER)

    window.addEventListener('beforeunload', removeIsNewUser)

    return () => {
      removeIsNewUser()
      window.removeEventListener('beforeunload', removeIsNewUser)
    }
  }, [])

  return <>Onboard</>
}

export default memo(Onboard)
