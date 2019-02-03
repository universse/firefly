import React, { useCallback } from 'react'
import { css } from '@emotion/core'

// import { AuthenticationContext } from '../Authentication'
// import { ModalContext } from '../Modal'
import Collection from './Collection'
import useSavedCollections from 'hooks/useSavedCollections'

// flag
export default function Collections ({ collections }) {
  // const user = useContext(AuthenticationContext)
  // const { handleModalOpen } = useContext(ModalContext)
  const [savedCollections, dispatch] = useSavedCollections()
  // const handleHeartClick = () => (user ? handleModalOpen() : handleModalOpen())

  return (
    <ul
      css={css`
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        display: inline-block;
        width: 70%;

        li:last-child div {
          border: none;
        }
      `}
    >
      {savedCollections &&
        collections.map(({ node }) => (
          <li
            key={node.id}
            css={css`
              position: relative;
            `}
          >
            <Collection
              collection={node}
              // handleHeartClick={onHeartClick}
              handleSaveClick={useCallback(
                () =>
                  dispatch({
                    type: 'saveClick',
                    payload: node
                  }),
                []
              )}
              isSaved={!!savedCollections[node.id]}
            />
          </li>
        ))}
    </ul>
  )
}
