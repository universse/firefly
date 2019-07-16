import { useContext } from 'react'

import { ModalContext } from 'contexts/Modal'
import { SetModalContext } from 'contexts/SetModal'

export default function useModal (type, label) {
  const activeModalType = useContext(ModalContext)
  const setActiveModalType = useContext(SetModalContext)

  const isOpen = activeModalType === type

  return {
    closeTimeoutMS: 280,
    contentLabel: label,
    isOpen,
    onRequestClose () {
      setActiveModalType(null)
    },
    overlayClassName: 'Overlay',
    shouldCloseOnOverlayClick: true
  }
}
