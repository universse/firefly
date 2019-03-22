import React, { memo } from 'react'
import { areEqual } from 'react-window'

import Collection from './Collection'

function Item ({ data, index, style }) {
  const { collections, onSaveClick, savedCollections } = data
  const collection = collections[index].node

  return (
    <li style={style}>
      <Collection
        collection={collection}
        // handleHeartClick={onHeartClick}
        handleSaveClick={onSaveClick}
        isSaved={!!savedCollections[collection.id]}
      />
    </li>
  )
}

export default memo(Item, areEqual)
