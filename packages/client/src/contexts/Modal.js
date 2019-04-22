import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import { globalHistory } from '@reach/router/lib/history'

import { SetModalContext } from './SetModal'

ReactModal.setAppElement('#___gatsby')

export const ModalContext = createContext()

export default function Modal ({ children }) {
  const [activeModalType, setActiveModalType] = useState()

  useEffect(() => {
    const unlisten = globalHistory.listen(_ => setActiveModalType())

    return () => {
      unlisten()
    }
  }, [])

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
