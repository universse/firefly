import React, { useContext } from 'react'
import ReactModal from 'react-modal'

import { ModalContext } from 'contexts/Modal'
import { SetModalContext } from 'contexts/SetModal'

ReactModal.setAppElement('#___gatsby')

export default function Modal ({ children, className, contentLabel, type }) {
  const activeModalType = useContext(ModalContext)
  const setActiveModalType = useContext(SetModalContext)

  const isOpen = activeModalType === type

  return (
    isOpen && (
      <ReactModal
        className={`Modal ${className}`}
        closeTimeoutMS={280}
        contentLabel={contentLabel}
        isOpen={isOpen}
        onRequestClose={setActiveModalType}
        overlayClassName='Overlay'
        shouldCloseOnOverlayClick
      >
        {children}
      </ReactModal>
    )
  )
}
