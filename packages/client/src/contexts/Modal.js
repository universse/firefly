import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { SetModalContext } from './SetModal'
import { useMedia } from 'hooks/useGlobalStore'
import ModalTypes from 'constants/ModalTypes'

export const ModalContext = createContext()

export default function Modal ({ children, pathname }) {
  const [activeModalType, setActiveModalType] = useState()

  const { isDesktop } = useMedia()

  useEffect(() => {
    if (!isDesktop || !activeModalType) return

    const lockWheel = e => e.preventDefault()
    const lockButtonScroll = e => {
      if (e.keyCode > 31 && e.keyCode < 41) {
        !['INPUT', 'TEXTAREA'].includes(e.target.tagName) && e.preventDefault()
      }
    }

    window.addEventListener('keydown', lockButtonScroll)
    window.addEventListener('wheel', lockWheel, { passive: false })

    return () => {
      window.removeEventListener('keydown', lockButtonScroll)
      window.removeEventListener('wheel', lockWheel)
    }
  }, [activeModalType, isDesktop])

  useEffect(() => {
    const closeModal = () =>
      setActiveModalType(activeModalType =>
        activeModalType === ModalTypes.MOBILE_FILTER ? activeModalType : null
      )
    window.addEventListener('popstate', closeModal)

    return () => {
      window.removeEventListener('popstate', closeModal)
    }
  }, [])

  useEffect(() => {
    setActiveModalType(null)
  }, [pathname])

  return (
    <ModalContext.Provider value={activeModalType}>
      <SetModalContext.Provider value={setActiveModalType}>
        {children}
      </SetModalContext.Provider>
    </ModalContext.Provider>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  pathname: PropTypes.string.isRequired
}
