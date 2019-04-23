import React, { useMemo, useContext } from 'react'
import localforage from 'localforage'

import { Dropdown, IconButton } from 'components/common'
import { User } from 'icons'
import { FirebaseContext } from 'contexts/Firebase'
import LocalStorage from 'constants/LocalStorage'

export default function Avatar () {
  const firebase = useContext(FirebaseContext)

  const items = useMemo(
    () => [
      {
        'aria-label': 'Sign Out',
        as: 'button',
        children: 'Sign Out',
        onClick: () =>
          firebase.signOut().then(() => {
            if (window.amplitude) {
              window.amplitude.getInstance().setUserId(null)
              window.amplitude.getInstance().regenerateDeviceId()
            }
            localforage.clear()
            window.localStorage.removeItem(LocalStorage.HAS_SIGNED_IN)
            window.location.reload()
          })
      }
    ],
    [firebase]
  )

  return (
    <Dropdown
      Icon={User}
      id='user-avatar'
      items={items}
      label='User Avatar'
      ToggleButton={IconButton}
    />
  )
}
