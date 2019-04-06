import React, { createContext, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

import { SetModalContext } from './SetModal'

ReactModal.setAppElement('#___gatsby')

export const ModalContext = createContext()

const handleWheel = e => e.preventDefault()

export default function Modal ({ children }) {
  const [activeModalType, setActiveModalType] = useState()

  const value = useMemo(
    () => ({
      closeModal () {
        window.removeEventListener('wheel', handleWheel)
        setActiveModalType(null)
      },
      openModal (type) {
        window.addEventListener('wheel', handleWheel)
        setActiveModalType(type)
      }
    }),
    []
  )

  return (
    <ModalContext.Provider value={activeModalType}>
      <SetModalContext.Provider value={value}>
        {children}
      </SetModalContext.Provider>
    </ModalContext.Provider>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired
}
