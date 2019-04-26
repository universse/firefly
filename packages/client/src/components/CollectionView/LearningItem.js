import React, { memo, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { IconButton } from 'components/common'
import { Check } from 'icons'
import { LinkTitle } from './styled'
import { UserDataDispatchContext } from 'contexts/UserDataDispatch'
import LinkIcons from 'constants/LinkIcons'
import { UrlType } from 'constants/Types'
import { logClickLearningResource } from 'utils/amplitudeUtils'
import { createActionLabel } from 'utils/ariaLabelUtils'

function LearningItem ({ id, url, title, type, collectionId, isChecked }) {
  const onActionClick = useContext(UserDataDispatchContext)
  const LinkIcon = LinkIcons[type.toUpperCase()]
  const onClick = useCallback(
    () => logClickLearningResource({ id, collectionId }),
    [collectionId, id]
  )

  return (
    <>
      <div
        css={theme => css`
          height: 100%;
          position: absolute;
          width: 100%;

          ${theme.screens.desktop} {
            padding: 0.25rem;
          }
        `}
      >
        <LinkTitle href={url} onClick={onClick} title={title} />
      </div>
      <div
        css={theme => css`
          border-bottom: 1px solid ${theme.colors.gray400};
          display: flex;
          flex-direction: column;
          height: 6rem;
          justify-content: space-between;
          margin: 0 1rem;
          padding: 0.75rem 0;

          ${theme.screens.tablet} {
            height: 7rem;
            padding: 0.5rem 0;
          }

          ${theme.screens.desktop} {
            height: 8rem;
            margin: 0 4rem;
            padding: 1rem 0;
          }
        `}
      >
        <div
          css={theme => css`
            align-items: center;
            display: flex;
            margin: -0.875rem 0 0 -0.5rem;

            ${theme.screens.tablet} {
              margin: -0.375rem 0 0 0.5rem;
            }

            ${theme.screens.desktop} {
              margin: -0.375rem 0 0 -0.375rem;
            }
          `}
        >
          <IconButton
            aria-label={createActionLabel(
              isChecked ? 'check' : 'uncheck',
              title
            )}
            onClick={onActionClick}
            value={id}
          >
            <Check filled={isChecked} />
          </IconButton>
        </div>
        {/* TODO: author */}
        <div
          css={theme => css`
            align-items: center;
            display: flex;
            margin-left: 2.25rem;

            ${theme.screens.tablet} {
              margin-left: 3.25rem;
            }

            ${theme.screens.desktop} {
              margin-left: 2.5rem;
            }
          `}
        >
          <div
            css={theme =>
              css`
                align-items: center;
                color: ${theme.colors.gray500};
                display: flex;
                height: 1.5rem;
                margin-right: 0.5rem;
              `
            }
          >
            <LinkIcon small />
          </div>
          <div>
            <span
              css={theme => css`
                color: ${theme.colors.gray500};
                display: block;
                font-size: 0.875rem;
                font-weight: 600;
                line-height: 1.5rem;
              `}
            >
              {new URL(url).hostname}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(LearningItem)

LearningItem.propTypes = {
  ...UrlType,
  collectionId: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired
}
