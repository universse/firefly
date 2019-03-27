import React, { useRef, useMemo } from 'react'
import { css } from '@emotion/core'
import { FixedSizeList as List } from 'react-window'
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller'

// import { AuthenticationContext } from 'contexts/Authentication'
// import { ModalContext } from 'contexts/Modal'
import Item from './Item'
import useSavedCollections from 'hooks/useSavedCollections'
import { collectionHeightInRem } from './styled'
import { baseFontSize } from 'constants/Styles'

function itemKey (index, data) {
  return data.collections[index].node.id
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

// flag
export default function Collections ({ collections }) {
  // const user = useContext(AuthenticationContext)
  // const { handleModalOpen } = useContext(ModalContext)
  const [savedCollections, onSaveClick] = useSavedCollections()
  // const handleHeartClick = () => (user ? handleModalOpen() : handleModalOpen())

  const listRef = useRef()
  const handleScroll = ({ scrollTop }) =>
    listRef.current && listRef.current.scrollTo(scrollTop)

  const itemData = useMemo(
    () => ({
      collections,
      onSaveClick,
      savedCollections
    }),
    [collections, onSaveClick, savedCollections]
  )

  return savedCollections ? (
    <>
      <WindowScroller onScroll={handleScroll}>{() => <div />}</WindowScroller>
      <List
        ref={listRef}
        css={listStyle}
        height={window.innerHeight}
        innerElementType='ul'
        itemCount={collections.length}
        itemData={itemData}
        itemKey={itemKey}
        itemSize={collectionHeightInRem * baseFontSize}
      >
        {Item}
      </List>
    </>
  ) : null
}
