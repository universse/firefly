// sign up bottom pop up to sync across devices
// page
import React, { useContext, useMemo } from 'react'
import { css } from '@emotion/core'

import { AllCollectionsContext } from 'components/AllCollections'
import Collection from 'components/Collections/Collection'
import { MobileHeader } from 'components/Header'
import SEO from 'components/SEO'
import useSavedCollections from 'hooks/useSavedCollections'
import {
  baseWrapper,
  headerHeightInRem,
  mobileBarsHeightInRem
} from 'utils/styles'

export default function MePage (props) {
  const allCollections = useContext(AllCollectionsContext)
  const [savedCollections, onSaveClick] = useSavedCollections()
  const allCollectionsById = useMemo(
    () =>
      allCollections.reduce((all, { node }) => {
        all[node.id] = node
        return all
      }, {}),
    [allCollections]
  )

  return (
    <>
      <SEO title='My Library' />
      <MobileHeader title='My Saved Collections' />
      <main
        css={theme => css`
          background-color: ${theme.colors.gray100};
          padding: 2rem 0;
          min-height: calc(100vh - ${headerHeightInRem}rem);

          ${theme.screens.nonDesktop} {
            min-height: calc(100vh - ${mobileBarsHeightInRem}rem);
            padding: 1rem 0;
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
              margin: 0 0 1.5rem 2rem;

              ${theme.screens.nonDesktop} {
                display: none;
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
