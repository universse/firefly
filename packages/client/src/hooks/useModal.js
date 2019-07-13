import { useContext } from 'react'

import { ModalContext } from 'contexts/Modal'
import { SetModalContext } from 'contexts/SetModal'

export default function useModal (type) {
  const activeModalType = useContext(ModalContext)
  const setActiveModalType = useContext(SetModalContext)

  const isOpen = activeModalType === type

  return {
    modalProps: {
      closeTimeoutMS: 280,
      isOpen,
      onRequestClose () {
        setActiveModalType(null)
      },
      overlayClassName: 'Overlay',
      shouldCloseOnOverlayClick: true
    },
    setActiveModalType
  }
}
