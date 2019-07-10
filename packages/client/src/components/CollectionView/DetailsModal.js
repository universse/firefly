import React, { useContext } from 'react'
import ReactModal from 'react-modal'

import Details from './Details'
import { ModalContext } from 'contexts/Modal'
import { SetModalContext } from 'contexts/SetModal'
import ModalTypes from 'constants/ModalTypes'

export default function DetailsModal (props) {
  const activeModalType = useContext(ModalContext)
  const setActiveModalType = useContext(SetModalContext)

  const isOpen = activeModalType === ModalTypes.DETAILS

  return (
    <ReactModal
      className='Modal SideModal'
      closeTimeoutMS={280}
      contentLabel='Collection Details'
      isOpen={isOpen}
      onRequestClose={() => {
        setActiveModalType(null)
      }}
      overlayClassName='Overlay'
      shouldCloseOnOverlayClick
    >
      <Details {...props} />
    </ReactModal>
  )
}
