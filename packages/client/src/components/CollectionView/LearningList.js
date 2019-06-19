import React from 'react'
import PropTypes from 'prop-types'

import LearningItem from './LearningItem'
import { UrlsType } from 'constants/Types'

export default function LearningList ({ check, collectionId, urls }) {
  return (
    <ul>
      {urls.map(url => (
        <li key={url.id}>
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

LearningList.propTypes = {
  check: PropTypes.objectOf(PropTypes.bool).isRequired,
  collectionId: PropTypes.string.isRequired,
  urls: UrlsType
}
