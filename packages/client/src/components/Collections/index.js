import React, { useRef } from 'react'
import { css } from '@emotion/core'
import { FixedSizeList as List } from 'react-window'
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller'

// import { AuthenticationContext } from '../Authentication'
// import { ModalContext } from 'components/ModalProvider'
import Collection from './Collection'
import useSavedCollections from 'hooks/useSavedCollections'
import { collectionHeightInRem } from './styled'
import { baseFontSize } from 'utils/styles'

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

// flag
export default function Collections ({ collections }) {
  // const user = useContext(AuthenticationContext)
  // const { handleModalOpen } = useContext(ModalContext)
  const [savedCollections, onSaveClick] = useSavedCollections()
  // const handleHeartClick = () => (user ? handleModalOpen() : handleModalOpen())

  const listRef = useRef()
  const handleScroll = ({ scrollTop }) =>
    listRef.current && listRef.current.scrollTo(scrollTop)

  return savedCollections ? (
    <>
      <WindowScroller onScroll={handleScroll}>{() => <div />}</WindowScroller>
      <List
        css={listStyle}
        height={window.innerHeight}
        innerElementType='ul'
        itemCount={collections.length}
        itemData={collections}
        itemKey={itemKey}
        itemSize={collectionHeightInRem * baseFontSize}
        ref={listRef}
      >
        {({ data, index, style }) => {
          const collection = data[index].node

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
        }}
      </List>
    </>
  ) : null
}
