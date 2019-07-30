import React from 'react'
import ReactModal from 'react-modal'

import Details from './Details'
import { Swippable } from 'components/common'
import useModal from 'hooks/useModal'
import ModalTypes from 'constants/ModalTypes'

export default function DetailsModal (props) {
  const modalProps = useModal(ModalTypes.DETAILS, 'Collection Details')

  return (
    <ReactModal className='SideModal' {...modalProps}>
      <Swippable cb={modalProps.onRequestClose} direction='right'>
        <Details {...props} />
      </Swippable>
    </ReactModal>
  )
}
