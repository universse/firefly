import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { SetModalContext } from './SetModal'

export const ModalContext = createContext()

export default function Modal ({ children }) {
  const [activeModalType, setActiveModalType] = useState()

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
