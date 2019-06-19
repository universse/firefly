import React, { useCallback, useRef } from 'react'
import { css } from '@emotion/core'
import { FixedSizeList as List } from 'react-window'
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller'

import Item from './Item'
import { collectionHeightInRem } from './styled'
import { baseFontSize, screens } from 'constants/Styles'
import { CollectionIdsType } from 'constants/Types'

function itemKey (index, data) {
  return data[index].id
}

const listStyle = css`
  box-shadow: var(--shadows-03);
  height: 100% !important;
  width: 100%;

  ${screens.desktop} {
    border-radius: 8px;
  }

  ul li:last-child > div {
    border: 1px solid transparent;
  }
`

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
          css={listStyle}
          height={height}
          innerElementType='ul'
          itemCount={collectionIds.length}
          itemData={collectionIds}
          itemKey={itemKey}
          itemSize={collectionHeightInRem * baseFontSize}
          overscanCount={5}
        >
          {Item}
        </List>
      )}
    </WindowScroller>
  )
}

Collections.propTypes = { collectionIds: CollectionIdsType.isRequired }
