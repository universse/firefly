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

export default function ModalProvider ({ children }) {
  const [activeModalType, setActiveModalType] = useState()
  const focusable = useRef()

  const handleWheel = useCallback(e => e.preventDefault(), [])

  const afterModalOpen = useCallback(
    () => focusable.current && focusable.current.focus(),
    []
  )

  const handleModalClose = useCallback(() => {
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
      handleModalClose,
      openModal
    }),
    [activeModalType, afterModalOpen, handleModalClose, openModal]
  )

  return <ModalContext.Provider value={modal}>{children}</ModalContext.Provider>
}

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired
}
