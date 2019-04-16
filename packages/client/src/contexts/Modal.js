import React, { createContext, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

import { SetModalContext } from './SetModal'

ReactModal.setAppElement('#___gatsby')

export const ModalContext = createContext()

export default function Modal ({ children }) {
  const [activeModalType, setActiveModalType] = useState()

  return (
    <ModalContext.Provider value={activeModalType}>
      <SetModalContext.Provider value={setActiveModalType}>
        {children}
      </SetModalContext.Provider>
    </ModalContext.Provider>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired
}
