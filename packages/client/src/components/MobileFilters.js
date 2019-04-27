import React from 'react'
import PropTypes from 'prop-types'

import Modal from 'components/Modal'
import { MobileSortByDifficulty } from 'components/SortByDifficulty'
import { MobileTagFilter } from 'components/TagFilter'
import ModalTypes from 'constants/ModalTypes'

export default function MobileFilters ({ aggregatedTags }) {
  return (
    <Modal
      className='FilterModal'
      contentLabel='Filter Collections by Tags'
      type={ModalTypes.MOBILE_FILTER}
    >
      <MobileSortByDifficulty />
      <MobileTagFilter aggregatedTags={aggregatedTags} />
    </Modal>
  )
}

MobileFilters.propTypes = {
  aggregatedTags: PropTypes.arrayOf(PropTypes.array).isRequired
}
