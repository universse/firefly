import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import { css } from '@emotion/core'

import { MobileSortByDifficulty } from 'components/SortByDifficulty'
import TagFilter from 'components/TagFilter'
import { PrimaryButton } from 'components/common'
import { MediaContext } from 'contexts/Media'
import useModal from 'hooks/useModal'
import AriaLabels from 'constants/AriaLabels'
import ModalTypes from 'constants/ModalTypes'
import { screens } from 'constants/Styles'

export default function MobileFilters ({ aggregatedTags, collectionCount }) {
  const { modalProps, setActiveModalType } = useModal(ModalTypes.MOBILE_FILTER)

  const { isMobile } = useContext(MediaContext)

  return (
    <ReactModal
      className={isMobile ? 'BottomModal' : 'SideModal'}
      contentLabel={AriaLabels.SORT_AND_FILTER_COLLECTIONS}
      {...!isMobile && { style: { content: { maxWidth: '30rem' } } }}
      {...modalProps}
    >
      <div>
        <div
          css={css`
            bottom: 4rem;
            overflow: auto;
            padding: 1rem 1rem 0;
            position: absolute;
            top: 0;

            ${screens.nonMobile} {
              padding: 1.25rem 1rem 0;
            }
          `}
        >
          <MobileSortByDifficulty />
          <TagFilter aggregatedTags={aggregatedTags} />
        </div>
        <div
          css={css`
            bottom: 0;
            padding: 0 1rem;
            position: absolute;
            width: 100%;
          `}
        >
          <PrimaryButton
            aria-label={`View ${collectionCount} Collections`}
            onClick={() => setActiveModalType(null)}
            width='100%'
          >
            See {collectionCount} Collections
          </PrimaryButton>
        </div>
      </div>
    </ReactModal>
  )
}

MobileFilters.propTypes = {
  aggregatedTags: PropTypes.arrayOf(PropTypes.array).isRequired,
  collectionCount: PropTypes.number.isRequired
}
