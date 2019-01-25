import React, { createContext, useState, useMemo, useRef } from 'react'
import ReactModal from 'react-modal'

import SignUpForm from './SignUpForm'

ReactModal.setAppElement('#___gatsby')

export const ModalContext = createContext()

export default function Modal ({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const inputEl = useRef(null)

  const handleWheel = e => e.preventDefault()
  const modalHandlers = useMemo(
    () => ({
      handleModalClose: () => {
        window.removeEventListener('wheel', handleWheel)
        setIsOpen(false)
      },
      handleModalOpen: () => {
        window.addEventListener('wheel', handleWheel)
        setIsOpen(true)
      }
    }),
    []
  )

  const afterModalOpen = () => inputEl.current.focus()

  return (
    <ModalContext.Provider value={modalHandlers}>
      {children}
      <ReactModal
        className='Modal'
        closeTimeoutMS={280}
        contentLabel='Sign Up'
        isOpen={isOpen}
        onAfterOpen={afterModalOpen}
        onRequestClose={modalHandlers.handleModalClose}
        overlayClassName='Overlay'
        shouldCloseOnOverlayClick
      >
        <SignUpForm inputRef={inputEl} />
      </ReactModal>
    </ModalContext.Provider>
  )
}
