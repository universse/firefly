import React, { memo } from 'react'
import { css } from '@emotion/core'

import { Check } from '../../icons'
import LinkIcons from 'constants/LinkIcons'
import { LinkTitle } from './styled'
import { IconButton } from 'components/common'
import { getHostname } from './utils'

function LearningItem ({ id, url, title, type, checked, handleCheckClick }) {
  const LinkIcon = LinkIcons[type.toUpperCase()]

  return (
    <>
      <div
        css={css`
          height: 100%;
          position: absolute;
          width: 100%;
        `}
      >
        <LinkTitle href={url} title={title} />
      </div>
      <div
        css={theme => css`
          border-bottom: 1px solid ${theme.colors.gray400};
          display: flex;
          flex-direction: column;
          height: 9rem;
          justify-content: space-between;
          margin: 0 4rem;
          padding: 1.5rem 0;
        `}
      >
        <div
          css={theme => css`
            align-items: center;
            display: flex;
            margin: -0.375rem 0 0 -0.375rem;
          `}
        >
          <IconButton onClick={handleCheckClick} value={id}>
            <Check checked={checked} />
          </IconButton>
        </div>
        {/* TODO: author */}
        <div
          css={css`
            display: flex;
            align-items: center;
            margin-left: 2.5rem;
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
              {getHostname(url)}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(LearningItem)
