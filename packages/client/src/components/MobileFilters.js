import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

import { MobileSortByDifficulty } from 'components/SortByDifficulty'
import { MobileTagFilter } from 'components/TagFilter'
import { ModalContext } from 'contexts/Modal'
import { SetModalContext } from 'contexts/SetModal'
import ModalTypes from 'constants/ModalTypes'

export default function MobileFilters ({ aggregatedTags }) {
  const activeModalType = useContext(ModalContext)
  const setActiveModalType = useContext(SetModalContext)

  const isOpen = activeModalType === ModalTypes.MOBILE_FILTER

  return (
    <ReactModal
      className='Modal FilterModal'
      closeTimeoutMS={280}
      contentLabel='Filter Collections by Tags'
      isOpen={isOpen}
      onRequestClose={() => {
        setActiveModalType(null)
      }}
      overlayClassName='Overlay'
      shouldCloseOnOverlayClick
    >
      <MobileSortByDifficulty />
      <MobileTagFilter aggregatedTags={aggregatedTags} />
    </ReactModal>
  )
}

MobileFilters.propTypes = {
  aggregatedTags: PropTypes.arrayOf(PropTypes.array).isRequired
}
