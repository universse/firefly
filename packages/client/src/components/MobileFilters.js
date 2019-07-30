import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import { css } from '@emotion/core'

import { PrimaryButton, Swippable } from 'components/common'
import { MediaContext } from 'contexts/Media'
import useModal from 'hooks/useModal'
import AriaLabels from 'constants/AriaLabels'
import ModalTypes from 'constants/ModalTypes'
import { screens } from 'constants/Styles'

export default function MobileFilters ({ children, collectionCount }) {
  const modalProps = useModal(
    ModalTypes.MOBILE_FILTER,
    AriaLabels.SORT_AND_FILTER_COLLECTIONS
  )

  const { isMobile } = useContext(MediaContext)

  return (
    <ReactModal
      className={isMobile ? 'BottomModal' : 'SideModal'}
      {...!isMobile && { style: { content: { maxWidth: '30rem' } } }}
      {...modalProps}
    >
      <Swippable
        cb={modalProps.onRequestClose}
        direction={isMobile ? 'down' : 'right'}
      >
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
          {children}
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
            onClick={modalProps.onRequestClose}
            width='100%'
          >
            See {collectionCount} Collections
          </PrimaryButton>
        </div>
      </Swippable>
    </ReactModal>
  )
}

MobileFilters.propTypes = {
  children: PropTypes.node.isRequired,
  collectionCount: PropTypes.number.isRequired
}
