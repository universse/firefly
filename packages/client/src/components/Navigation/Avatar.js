import React from 'react'
import { Link } from 'gatsby'

import { OutboundLink } from 'components/common'
import Icon from 'assets/icons'
import LocalStorage from 'constants/LocalStorage'
import useDropdownMenu from 'hooks/useDropdownMenu'
import firebaseWorker from 'utils/firebaseWorker'
import offlineStorageWorker from 'utils/offlineStorageWorker'

export default function Avatar () {
  const {
    detailsProps,
    summaryProps,
    menuProps,
    getItemProps,
    highlightedIndex
  } = useDropdownMenu({ menuItemCount: 2, left: true })

  return (
    <details className='DropdownMenu' {...detailsProps}>
      <summary
        aria-label='Open User Menu'
        className='IconButton'
        {...summaryProps}
      >
        <Icon icon='user' />
      </summary>
      <div className='Right' {...menuProps}>
        {/* <Link
          {...highlightedIndex === 0 && { className: 'highlighted' }}
          to='/profile'
          {...getItemProps(0)}
        >
          Profile
        </Link> */}
        <Link
          {...highlightedIndex === 0 && { className: 'highlighted' }}
          to='/curate'
          {...getItemProps(0)}
        >
          Curate
        </Link>
        <button
          aria-label='Sign Out'
          {...highlightedIndex === 1 && { className: 'highlighted' }}
          onClick={() => {
            firebaseWorker.signOut().then(() => {
              window.___log('sign out')
              offlineStorageWorker.clear()
              window.localStorage.removeItem(LocalStorage.HAS_SIGNED_IN)
              window.location.reload()
            })
          }}
          type='button'
          {...getItemProps(1)}
        >
          Sign Out
        </button>
        {/* <OutboundLink
          {...highlightedIndex === 3 && { className: 'highlighted' }}
          href='https://www.google.com'
          {...getItemProps(3)}
        >
          Sign Out
        </OutboundLink> */}
      </div>
    </details>
  )
}
