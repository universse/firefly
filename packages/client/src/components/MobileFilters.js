import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import { css } from '@emotion/core'

import { Swippable } from 'components/common'
import { useMedia } from 'hooks/useGlobalStore'
import useModal from 'hooks/useModal'
import AriaLabels from 'constants/AriaLabels'
import ModalTypes from 'constants/ModalTypes'
import { screens } from 'constants/Styles'

export default function MobileFilters ({ children, collectionCount }) {
  const modalProps = useModal(
    ModalTypes.MOBILE_FILTER,
    AriaLabels.SORT_AND_FILTER_COLLECTIONS
  )

  const { isMobile } = useMedia()

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
          <button
            aria-label={`View ${collectionCount} Collections`}
            className='PrimaryButton'
            onClick={modalProps.onRequestClose}
            style={{ padding: 0, width: '100%' }}
            type='button'
          >
            See {collectionCount} Collections
          </button>
        </div>
      </Swippable>
    </ReactModal>
  )
}

MobileFilters.propTypes = {
  children: PropTypes.node.isRequired,
  collectionCount: PropTypes.number.isRequired
}
