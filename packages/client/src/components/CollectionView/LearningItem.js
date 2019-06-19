import React, { memo, useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { Check } from 'icons'
import { LinkTitle } from './styled'
import { UserDataDispatchContext } from 'contexts/UserDataDispatch'
import LinkIcons from 'constants/LinkIcons'
import { screens } from 'constants/Styles'
import { UrlType } from 'constants/Types'
import { logClickLearningResource } from 'utils/amplitudeUtils'
import { createActionLabel } from 'utils/ariaLabelUtils'

function LearningItem ({
  id,
  collectionId,
  image,
  isChecked,
  publisher,
  title,
  type,
  url
}) {
  const onActionClick = useContext(UserDataDispatchContext)
  const LinkIcon = LinkIcons[type.toUpperCase()]

  return (
    <div
      css={css`
        border-radius: 8px;
        position: relative;
        transition: box-shadow 0.2s;

        ${screens.desktop} {
          margin: 0 2rem 2rem;
        }
      `}
    >
      <div
        css={css`
          height: 100%;
          position: absolute;
          width: 100%;

          ${screens.desktop} {
            padding: 0.25rem;
          }
        `}
      >
        <LinkTitle
          href={url}
          onClick={() => logClickLearningResource({ id, collectionId })}
          title={title}
        />
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          height: 6rem;
          justify-content: space-between;
          margin: 0 1rem;
          padding: 0.75rem 0;

          ${screens.tablet} {
            height: 7rem;
            padding: 0.5rem 0;
          }

          ${screens.desktop} {
            height: 8rem;
            margin: 0 2rem;
            padding: 1rem 0;
          }
        `}
      >
        <div
          css={css`
            align-items: center;
            display: flex;
            margin: -0.875rem 0 0 -0.5rem;

            ${screens.tablet} {
              margin: -0.375rem 0 0 0.5rem;
            }

            ${screens.desktop} {
              margin: -0.375rem 0 0 -0.5rem;
            }
          `}
        >
          <button
            aria-label={createActionLabel(
              isChecked ? 'check' : 'uncheck',
              title
            )}
            className='IconButton'
            onClick={onActionClick}
            type='button'
            value={id}
          >
            <Check filled={isChecked} />
          </button>
        </div>
        {/* TODO: author */}
        <div
          css={css`
            align-items: center;
            display: flex;
            margin-left: 2.25rem;

            ${screens.tablet} {
              margin-left: 3.25rem;
            }

            ${screens.desktop} {
              margin-left: 2.5rem;
            }
          `}
        >
          <div
            css={css`
              align-items: center;
              color: var(--colors-gray600);
              display: flex;
              height: 1.5rem;
              margin-right: 0.5rem;
            `}
          >
            <LinkIcon small />
          </div>
          <div>
            <span
              css={css`
                color: var(--colors-gray600);
                display: block;
                font-size: 0.875rem;
                font-weight: 500;
                line-height: 1.5rem;
              `}
            >
              {new URL(url).hostname}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(LearningItem)

LearningItem.propTypes = {
  ...UrlType,
  collectionId: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired
}
