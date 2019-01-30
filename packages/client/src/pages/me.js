// sign up bottom pop up to sync across devices
// page
import React from 'react'
import { css } from '@emotion/core'

import Collection from 'components/Collections/Collection'
import useSavedCollections from 'hooks/useSavedCollections'
import { baseWrapper } from '../styles'

export default function MePage (props) {
  const [savedCollections, dispatch] = useSavedCollections()

  const onSaveClick = e =>
    dispatch({
      type: 'saveClick',
      payload: { id: e.currentTarget.value }
    })

  return (
    <main
      css={theme => css`
        background-color: ${theme.colors.gray100};
        min-height: 100vh;
        padding: 3rem 0;
      `}
    >
      <div
        css={css`
          ${baseWrapper};
          max-width: 48rem;
        `}
      >
        <div
          css={css`
            margin: 0 0 2rem 2rem;
          `}
        >
          <h1
            css={theme => css`
              color: ${theme.colors.gray700};
              font-size: 1.125rem;
              line-height: 2rem;
            `}
          >
            My Saved Collections
          </h1>
        </div>
        <ul
          css={css`
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          `}
        >
          {savedCollections &&
            Object.values(savedCollections).map(collection => (
              <li
                css={css`
                  position: relative;
                `}
                key={collection.id}
              >
                <Collection
                  collection={collection}
                  // handleHeartClick={onHeartClick}
                  handleSaveClick={onSaveClick}
                  isSaved
                />
              </li>
            ))}
        </ul>
      </div>
    </main>
  )
}
