import React from 'react'

import Collection from './Collection'

export default function Item ({ data, index, style }) {
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
