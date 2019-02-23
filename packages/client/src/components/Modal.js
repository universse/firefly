import React, { useContext } from 'react'
import ReactModal from 'react-modal'

import { ModalContext } from 'components/ModalProvider'

ReactModal.setAppElement('#___gatsby')

export default function Modal ({ children, className, contentLabel, type }) {
  const { activeModalType, afterModalOpen, handleModalClose } = useContext(
    ModalContext
  )

  const isOpen = activeModalType === type

  return (
    isOpen && (
      <ReactModal
        className={`Modal ${className}`}
        closeTimeoutMS={280}
        contentLabel={contentLabel}
        isOpen={isOpen}
        onAfterOpen={afterModalOpen}
        onRequestClose={handleModalClose}
        overlayClassName='Overlay'
        shouldCloseOnOverlayClick
      >
        {children}
      </ReactModal>
    )
  )
}
