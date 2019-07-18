import React, { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { MediaContext } from 'contexts/Media'
import { SetModalContext } from './SetModal'

export const ModalContext = createContext()

export default function Modal ({ children }) {
  const [activeModalType, setActiveModalType] = useState()

  const { isDesktop } = useContext(MediaContext)

  useEffect(() => {
    if (!isDesktop || !activeModalType) return

    const lockWheel = e => e.preventDefault()
    const lockButtonScroll = e => {
      !['INPUT', 'TEXTAREA'].includes(e.target.tagName) && e.preventDefault()
    }

    window.addEventListener('keydown', lockButtonScroll)
    window.addEventListener('wheel', lockWheel)

    return () => {
      window.removeEventListener('keydown', lockButtonScroll)
      window.removeEventListener('wheel', lockWheel)
    }
  }, [activeModalType, isDesktop])

  useEffect(() => {
    const closeModal = () => setActiveModalType(null)
    window.addEventListener('popstate', closeModal)

    return () => {
      window.removeEventListener('popstate', closeModal)
    }
  }, [])

  return (
    <ModalContext.Provider value={activeModalType}>
      <SetModalContext.Provider value={setActiveModalType}>
        {children}
      </SetModalContext.Provider>
    </ModalContext.Provider>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired
}
