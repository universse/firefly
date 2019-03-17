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

const handleWheel = e => e.preventDefault()

export default function Modal ({ children }) {
  const [activeModalType, setActiveModalType] = useState()
  const focusable = useRef()

  const afterModalOpen = useCallback(
    () => focusable.current && focusable.current.focus(),
    []
  )

  const closeModal = useCallback(() => {
    window.removeEventListener('wheel', handleWheel)
    setActiveModalType(null)
  }, [])

  const openModal = useCallback(type => {
    window.addEventListener('wheel', handleWheel)
    setActiveModalType(type)
  }, [])

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

  return (
    <ModalContext.Provider value={modal}>{children}</ModalContext.Provider>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired
}
