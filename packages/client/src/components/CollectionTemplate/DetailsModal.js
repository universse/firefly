import React from 'react'
import ReactModal from 'react-modal'

import Details from './Details'
import useModal from 'hooks/useModal'
import useSwipe, { Directions } from 'hooks/useSwipe'
import ModalTypes from 'constants/ModalTypes'

export default function DetailsModal (props) {
  const modalProps = useModal(ModalTypes.DETAILS, 'Collection Details')

  const swipeHandlers = useSwipe(Directions.RIGHT, modalProps.onRequestClose)

  return (
    <ReactModal className='SideModal' {...modalProps}>
      <div {...swipeHandlers}>
        <Details {...props} />
      </div>
    </ReactModal>
  )
}
