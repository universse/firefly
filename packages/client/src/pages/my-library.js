import React, { useContext } from 'react'
import { css } from '@emotion/core'

import { Collection } from 'components/Collections'
import { MobileHeader } from 'components/Header'
import SEO from 'components/SEO'
import { MediaContext } from 'contexts/Media'
import { NormalizedCollectionsContext } from 'contexts/NormalizedCollections'
import { SavedCollectionsContext } from 'contexts/SavedCollections'
import { headerHeightInRem, mobileBarsHeightInRem } from 'constants/Styles'

export default function MyLibraryPage (props) {
  const normalizedCollections = useContext(NormalizedCollectionsContext)
  const [savedCollections] = useContext(SavedCollectionsContext)
  const isDesktop = useContext(MediaContext)

  // TODO: pop up - sign up reminder
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
            min-height: calc(100vh - ${headerHeightInRem}rem);
            padding: 2rem 0;
          }
        `}
      >
        <div
          className='base'
          css={theme => css`
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
                  color: ${theme.colors.gray800};
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
            {normalizedCollections &&
              savedCollections &&
              Object.keys(savedCollections).map(id => (
                <li
                  key={id}
                  css={css`
                    position: relative;
                  `}
                >
                  <Collection
                    collection={normalizedCollections[id.toLowerCase()]}
                  />
                </li>
              ))}
          </ul>
        </div>
      </main>
    </>
  )
}
