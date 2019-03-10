import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  useRef
} from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#___gatsby')

export const ModalContext = createContext()

export default function Modal ({ children }) {
  const [activeModalType, setActiveModalType] = useState()
  const focusable = useRef()

  const handleWheel = useCallback(e => e.preventDefault(), [])

  const afterModalOpen = useCallback(
    () => focusable.current && focusable.current.focus(),
    []
  )

  const closeModal = useCallback(() => {
    window.removeEventListener('wheel', handleWheel)
    setActiveModalType(null)
  }, [handleWheel])

  const openModal = useCallback(type => {
    window.addEventListener('wheel', handleWheel)
    setActiveModalType(type)
  }, [handleWheel])

  const modal = useMemo(
    () => ({
      activeModalType,
      afterModalOpen,
      focusable,
      closeModal,
      openModal
    }),
    [activeModalType, afterModalOpen, closeModal, openModal]
  )

  return <ModalContext.Provider value={modal}>{children}</ModalContext.Provider>
}

Modal.propTypes = {
  children: PropTypes.node.isRequired
}
