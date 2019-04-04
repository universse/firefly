import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import CollectionView from 'components/CollectionView'
import { MobileHeader } from 'components/Header'
import SEO from 'components/SEO'
import { FABDesktop, IconButton } from 'components/common'
import { Back, Heart, Save, Share, Suggest } from 'icons'
import { UserDataContext } from 'contexts/UserData'
import { UserDataDispatchContext } from 'contexts/UserDataDispatch'
import AriaLabels from 'constants/AriaLabels'
import { headerHeightInRem, mobileHeaderHeightInRem } from 'constants/Styles'
import { createActionLabel } from 'utils/ariaLabelUtils'
import copyToClipboard from 'utils/copyToClipboard'

export default function CollectionTemplate ({
  data: { collections },
  location: { href }
}) {
  const userData = useContext(UserDataContext)
  const { check, love, save } = userData || {}
  const onClick = useContext(UserDataDispatchContext)

  const { id, name } = collections

  const isSaved = save && !!save[id]
  const isLoved = love && !!love[id]

  return (
    <>
      <SEO title={name} />
      {userData && (
        <>
          <MobileHeader
            actions={
              <>
                {/* <IconButton
                  aria-label={createActionLabel(
                    isSaved ? 'unsave' : 'save',
                    name
                  )}
                  onClick={onClick}
                  value={id}
                >
                  <Save filled={isSaved} />
                </IconButton>
                <IconButton
                  aria-label={createActionLabel(
                    isLoved ? 'unlove' : 'love',
                    name
                  )}
                  onClick={onClick}
                  value={id}
                >
                  <Heart filled={isLoved} />
                </IconButton>
                <IconButton
                  aria-label='Share'
                  onClick={() => copyToClipboard(href)}
                >
                  <Share />
                </IconButton> */}
              </>
            }
            navIcon={
              <IconButton
                aria-label={AriaLabels.GO_BACK}
                onClick={() => window.history.back()}
              >
                <Back />
              </IconButton>
            }
            shadow
            title='Collection'
          />
          <main
            css={theme => css`
              background-color: ${theme.colors.gray100};
              min-height: calc(100vh - ${mobileHeaderHeightInRem + 2.25}rem);

              ${theme.screens.nonMobile} {
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
                max-width: 50rem;

                ${theme.screens.mobile} {
                  padding: 0 0 1rem;
                }
              `}
            >
              <CollectionView
                check={check}
                collection={collections}
                isLoved={isLoved}
                isSaved={isSaved}
                onClick={onClick}
              />
            </div>
            <FABDesktop href='https://docs.google.com/forms/'>
              <Suggest />
            </FABDesktop>
          </main>
        </>
      )}
    </>
  )
}

export const query = graphql`
  query($id: String!) {
    collections(id: { eq: $id }) {
      id
      name
      category
      level
      urls {
        id
        title
        type
        url
      }
      tags
      suggestions
    }
  }
`
