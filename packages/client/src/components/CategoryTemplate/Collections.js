import React, { useCallback, useRef } from 'react'
import { FixedSizeList as List } from 'react-window'
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller'

import Item from './Item'
import { baseFontSize, collectionHeightInRem } from 'constants/Styles'
import { CollectionIdsType } from 'constants/Types'

function itemKey (index, data) {
  return data[index].id
}

export default function Collections ({ collectionIds }) {
  const listRef = useRef()
  const handleScroll = useCallback(
    ({ scrollTop }) => listRef.current && listRef.current.scrollTo(scrollTop),
    []
  )

  return (
    <WindowScroller onScroll={handleScroll}>
      {({ height }) => (
        <List
          ref={listRef}
          className='Collections'
          height={height}
          innerElementType='ul'
          itemCount={collectionIds.length}
          itemData={collectionIds}
          itemKey={itemKey}
          itemSize={collectionHeightInRem * baseFontSize}
          overscanCount={3}
        >
          {Item}
        </List>
      )}
    </WindowScroller>
  )
}

Collections.propTypes = { collectionIds: CollectionIdsType.isRequired }
