import React from 'react'
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
      css={theme => css`
        background-color: #fff;

        li:last-child div {
          border: none;
        }

        ${theme.screens.desktop} {
          border-radius: 8px;
          box-shadow: ${theme.shadows.subtle};
          display: inline-block;
          width: 70%;
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
              handleSaveClick={() =>
                dispatch({
                  type: 'saveClick',
                  payload: node
                })
              }
              isSaved={!!savedCollections[node.id]}
            />
          </li>
        ))}
    </ul>
  )
}
