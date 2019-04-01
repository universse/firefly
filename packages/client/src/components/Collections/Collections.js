import React, { useCallback, useRef, useContext } from 'react'
import { css } from '@emotion/core'
import { FixedSizeList as List } from 'react-window'
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller'

import Item from './Item'
import { SavedCollectionsContext } from 'contexts/SavedCollections'
import { collectionHeightInRem } from './styled'
import { baseFontSize } from 'constants/Styles'

function itemKey (index, data) {
  return data[index].node.id
}

const listStyle = theme => css`
  background-color: #fff;
  height: 100% !important;

  li:last-child div {
    border: none;
  }

  ${theme.screens.desktop} {
    border-radius: 8px;
    box-shadow: ${theme.shadows[0]};
    width: 100%;
  }
`

export default function Collections ({ collections }) {
  const listRef = useRef()
  const [savedCollections] = useContext(SavedCollectionsContext)
  const handleScroll = useCallback(
    ({ scrollTop }) => listRef.current && listRef.current.scrollTo(scrollTop),
    []
  )

  return (
    <>
      <WindowScroller onScroll={handleScroll}>{() => <div />}</WindowScroller>
      {savedCollections && (
        <List
          ref={listRef}
          css={listStyle}
          height={window.innerHeight}
          innerElementType='ul'
          itemCount={collections.length}
          itemData={collections}
          itemKey={itemKey}
          itemSize={collectionHeightInRem * baseFontSize}
        >
          {Item}
        </List>
      )}
    </>
  )
}
