import React, { memo } from 'react'
import { areEqual } from 'react-window'

import Collection from './Collection'

function Item ({ data, index, style }) {
  const collection = data[index].node

  return (
    <li style={style}>
      <Collection collection={collection} />
    </li>
  )
}

export default memo(Item, areEqual)
