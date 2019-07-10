import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

import { MobileSortByDifficulty } from 'components/SortByDifficulty'
import TagFilter from 'components/TagFilter'
import { MediaContext } from 'contexts/Media'
import useModal from 'hooks/useModal'
import ModalTypes from 'constants/ModalTypes'

export default function MobileFilters ({ aggregatedTags }) {
  const { modalProps } = useModal(ModalTypes.MOBILE_FILTER)

  const { isMobile } = useContext(MediaContext)

  return (
    <ReactModal
      className={isMobile ? 'BottomModal' : 'SideModal'}
      contentLabel='Sort and Filter Collections'
      overlayClassName='Overlay'
      {...modalProps}
    >
      <MobileSortByDifficulty />
      <TagFilter aggregatedTags={aggregatedTags} />
    </ReactModal>
  )
}

MobileFilters.propTypes = {
  aggregatedTags: PropTypes.arrayOf(PropTypes.array).isRequired
}
