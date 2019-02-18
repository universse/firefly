// sign up bottom pop up to sync across devices
// page
import React, { useContext, useMemo } from 'react'
import { css } from '@emotion/core'

import { AllCollectionsContext } from 'components/AllCollections'
import Collection from 'components/Collections/Collection'
import SEO from 'components/SEO'
import useSavedCollections from 'hooks/useSavedCollections'
import { baseWrapper, headerHeightInRem } from 'utils/styles'

export default function MePage (props) {
  const allCollections = useContext(AllCollectionsContext)
  const [savedCollections, dispatch] = useSavedCollections()
  const allCollectionsById = useMemo(
    () =>
      allCollections.reduce((all, { node }) => {
        all[node.id] = node
        return all
      }, {}),
    [allCollections]
  )

  const onSaveClick = e =>
    dispatch({
      type: 'saveClick',
      payload: { id: e.currentTarget.value }
    })

  return (
    <>
      <SEO title='My Library' />
      <main
        css={theme => css`
          background-color: ${theme.colors.gray100};
          min-height: calc(100vh - ${headerHeightInRem}rem);
          padding: 2rem 0;
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
              margin: 0 0 1.5rem 2rem;
            `}
          >
            <h1
              css={theme => css`
                color: ${theme.colors.gray700};
                font-size: 1.25rem;
                line-height: 2rem;
              `}
            >
              My Saved Collections
            </h1>
          </div>
          <ul
            css={theme => css`
              background-color: #fff;
              border-radius: 8px;
              box-shadow: ${theme.shadows.subtle};

              li:last-child div {
                border: none;
              }
            `}
          >
            {savedCollections &&
              Object.keys(savedCollections).map(id => (
                <li
                  css={css`
                    position: relative;
                  `}
                  key={id}
                >
                  <Collection
                    collection={allCollectionsById[id]}
                    // handleHeartClick={onHeartClick}
                    handleSaveClick={onSaveClick}
                    isSaved
                  />
                </li>
              ))}
          </ul>
        </div>
      </main>
    </>
  )
}
