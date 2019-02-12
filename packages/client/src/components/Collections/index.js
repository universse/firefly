import React, { useRef } from 'react'
import { css } from '@emotion/core'
import { FixedSizeList as List } from 'react-window'
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller'

// import { AuthenticationContext } from '../Authentication'
// import { ModalContext } from '../Modal'
import Collection from './Collection'
import useSavedCollections from 'hooks/useSavedCollections'
import { collectionHeightInRem } from './styled'
import { baseFontSize } from 'utils/styles'

// function itemKey (index, data) {
//   return data[index].node.id
// }

// flag
export default function Collections ({ collections }) {
  // const user = useContext(AuthenticationContext)
  // const { handleModalOpen } = useContext(ModalContext)
  const [savedCollections, dispatch] = useSavedCollections()
  const listRef = useRef()

  const numOfCollections = collections.length
  const itemSize = collectionHeightInRem * baseFontSize
  // const handleHeartClick = () => (user ? handleModalOpen() : handleModalOpen())
  const handleScroll = ({ scrollTop }) => {
    if (listRef.current) {
      listRef.current.scrollTo(scrollTop)
    }
  }
  return savedCollections ? (
    <>
      <WindowScroller onScroll={handleScroll}>{() => <div />}</WindowScroller>
      <List
        css={theme => css`
          background-color: #fff;
          height: 100% !important;

          li:last-child div {
            border: none;
          }

          ${theme.screens.desktop} {
            border-radius: 8px;
            box-shadow: ${theme.shadows.subtle};
            width: 70%;
          }
        `}
        height={window.innerHeight}
        innerElementType='ul'
        itemCount={numOfCollections}
        itemData={collections}
        // itemKey={itemKey}
        itemSize={itemSize}
        ref={listRef}
      >
        {({ data, index, style }) => {
          const node = data[index].node

          return (
            <li style={style}>
              <Collection
                collection={node}
                // handleHeartClick={onHeartClick}
                handleSaveClick={() =>
                  dispatch({
                    type: 'saveClick',
                    payload: node
                  })
                }
                isSaved={!!savedCollections[node.id]}
              />
            </li>
          )
        }}
      </List>
    </>
  ) : null
}
