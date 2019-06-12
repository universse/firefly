import React from 'react'
import localforage from 'localforage'
import { Link } from 'gatsby'

import { OutboundLink } from 'components/common'
import { User } from 'icons'
import LocalStorage from 'constants/LocalStorage'
import useDropdownMenu from 'hooks/useDropdownMenu'
import firebaseWorker from 'utils/firebaseWorker'

export default function Avatar () {
  const {
    detailsProps,
    summaryProps,
    menuProps,
    getMenuItemProps,
    highlightedIndex
  } = useDropdownMenu({ menuItemCount: 3 })

  return (
    <details className='DropdownMenu' {...detailsProps}>
      <summary
        aria-label='Open User Menu'
        className='IconButton'
        {...summaryProps}
      >
        <User />
      </summary>
      <div className='Menu' {...menuProps}>
        <button
          aria-label='Sign out'
          className={`${highlightedIndex === 0 ? 'highlighted' : ''}`}
          onClick={() => {
            firebaseWorker.signOut().then(() => {
              if (window.amplitude) {
                window.amplitude.getInstance().setUserId(-1)
                window.amplitude.getInstance().regenerateDeviceId()
              }
              localforage.clear()
              window.localStorage.removeItem(LocalStorage.HAS_SIGNED_IN)
              window.location.reload()
            })
          }}
          type='button'
          {...getMenuItemProps(0)}
        >
          Sign Out
        </button>
        <OutboundLink
          className={`${highlightedIndex === 1 ? 'highlighted' : ''}`}
          href='https://www.google.com'
          {...getMenuItemProps(1)}
        >
          Sign Out
        </OutboundLink>
        <Link
          className={`${highlightedIndex === 2 ? 'highlighted' : ''}`}
          to='/my-library'
          {...getMenuItemProps(2)}
        >
          Library
        </Link>
      </div>
    </details>
  )
}
