import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  useRef
} from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

import SignUpForm from './SignUpForm'

ReactModal.setAppElement('#___gatsby')

export const ModalContext = createContext()

export default function Modal ({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const inputEl = useRef(null)

  const modalHandlers = useMemo(() => {
    const handleWheel = e => e.preventDefault()

    return {
      handleModalClose: () => {
        window.removeEventListener('wheel', handleWheel)
        setIsOpen(false)
      },
      handleModalOpen: () => {
        window.addEventListener('wheel', handleWheel)
        setIsOpen(true)
      }
    }
  }, [])

  const afterModalOpen = useCallback(() => inputEl.current.focus(), [])

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

Modal.propTypes = {
  children: PropTypes.node.isRequired
}
