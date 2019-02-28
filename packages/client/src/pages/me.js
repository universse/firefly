// sign up bottom pop up to sync across devices
// page
import React, { useContext, useMemo } from 'react'
import { css } from '@emotion/core'

import { AllCollectionsContext } from 'components/AllCollections'
import Collection from 'components/Collections/Collection'
import { MediaContext } from 'components/Media'
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
  const allCollectionsById = useMemo(() => {
    const normalizedCollections = {}
    allCollections.forEach(({ node }) => {
      normalizedCollections[node.id] = node
    })
    return normalizedCollections
  }, [allCollections])
  const isDesktop = useContext(MediaContext)

  return (
    <>
      <SEO title='My Library' />
      <MobileHeader shadow title='My Saved Collections' />
      <main
        css={theme => css`
          background-color: ${theme.colors.gray100};
          min-height: calc(100vh - ${mobileBarsHeightInRem}rem);
          padding: 0 0 1rem;

          ${theme.screens.tablet} {
            padding: 1rem 0;
          }

          ${theme.screens.desktop} {
            padding: 2rem 0;
            min-height: calc(100vh - ${headerHeightInRem}rem);
          }
        `}
      >
        <div
          css={theme => css`
            ${baseWrapper};
            max-width: 48rem;

            ${theme.screens.mobile} {
              padding: 0;
            }
          `}
        >
          {isDesktop && (
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
          )}
          <ul
            css={theme => css`
              background-color: #fff;

              li:last-child div {
                border: none;
              }

              ${theme.screens.nonMobile} {
                border-radius: 8px;
                box-shadow: ${theme.shadows[0]};
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
