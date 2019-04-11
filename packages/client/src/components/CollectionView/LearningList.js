import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import LearningItem from './LearningItem'
import { UrlsType } from 'constants/Types'

function LearningList ({ check, collectionId, urls }) {
  return (
    <ul
      css={css`
        li:last-child div {
          border: none;
        }
      `}
    >
      {urls.map(url => (
        <li
          key={url.id}
          css={css`
            position: relative;
          `}
        >
          <LearningItem
            collectionId={collectionId}
            isChecked={!!check[url.id]}
            {...url}
          />
        </li>
      ))}
    </ul>
  )
}

export default memo(LearningList)

LearningList.propTypes = {
  check: PropTypes.objectOf(PropTypes.bool).isRequired,
  collectionId: PropTypes.string.isRequired,
  urls: UrlsType
}
