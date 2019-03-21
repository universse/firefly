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
      closeModal,
      openModal
    }),
    [activeModalType, closeModal, openModal]
  )

  return <ModalContext.Provider value={modal}>{children}</ModalContext.Provider>
}

Modal.propTypes = {
  children: PropTypes.node.isRequired
}
