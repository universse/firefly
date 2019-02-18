// sign up bottom pop up to sync across devices
// page
import React, { useContext, useMemo } from 'react'
import { css } from '@emotion/core'

import { AllCollectionsContext } from 'components/AllCollections'
import Collection from 'components/Collections/Collection'
import SEO from 'components/SEO'
import useSavedCollections from 'hooks/useSavedCollections'
import {
  baseWrapper,
  headerHeightInRem,
  mobileHeaderHeightInRem,
  mobileNavigationHeightInRem
} from 'utils/styles'

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

  console.log(mobileHeaderHeightInRem)

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
          padding: 2rem 0;
          min-height: calc(100vh - ${headerHeightInRem}rem);

          ${theme.screens.nonDesktop} {
            min-height: calc(100vh - ${mobileNavigationHeightInRem}rem);
            padding: 1rem 0;
            position: relative;
            top: -${mobileHeaderHeightInRem}rem;
          }
        `}
      >
        <div
          css={css`
            ${baseWrapper};
            max-width: 48rem;
            padding: 0;
          `}
        >
          <div
            css={theme => css`
              margin: 0 0 1rem 1rem;

              ${theme.screens.nonMobile} {
                margin: 0 0 1.5rem 2rem;
              }
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

              li:last-child div {
                border: none;
              }

              ${theme.screens.desktop} {
                border-radius: 8px;
                box-shadow: ${theme.shadows.subtle};
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
