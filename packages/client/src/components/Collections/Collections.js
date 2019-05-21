import React, { useCallback, useRef } from 'react'
import { css } from '@emotion/core'
import { FixedSizeList as List } from 'react-window'
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller'

import Item from './Item'
import { collectionHeightInRem } from './styled'
import { baseFontSize, screens } from 'constants/Styles'
import { CollectionsType } from 'constants/Types'

function itemKey (index, data) {
  return data[index].node.id
}

const listStyle = css`
  height: 100% !important;
  width: 100%;

  ${screens.desktop} {
    border-radius: 8px;
    box-shadow: var(--shadows-01);
  }

  & > ul:not(:empty) {
    background-color: #fff;

    & > li:last-child div {
      border: none;
    }
  }
`

export default function Collections ({ collections }) {
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
          itemCount={collections.length}
          itemData={collections}
          itemKey={itemKey}
          itemSize={collectionHeightInRem * baseFontSize}
        >
          {Item}
        </List>
      )}
    </WindowScroller>
  )
}

Collections.propTypes = { collections: CollectionsType.isRequired }
