import React, { useContext } from 'react'
import ReactModal from 'react-modal'

import { ModalContext } from 'contexts/Modal'

ReactModal.setAppElement('#___gatsby')

export default function Modal ({ children, className, contentLabel, type }) {
  const { activeModalType, closeModal } = useContext(ModalContext)

  const isOpen = activeModalType === type

  return (
    isOpen && (
      <ReactModal
        className={`Modal ${className}`}
        closeTimeoutMS={280}
        contentLabel={contentLabel}
        isOpen={isOpen}
        onRequestClose={closeModal}
        overlayClassName='Overlay'
        shouldCloseOnOverlayClick
      >
        {children}
      </ReactModal>
    )
  )
}
