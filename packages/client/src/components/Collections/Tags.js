import React from 'react'
import { css } from '@emotion/core'

import { Tag } from 'components/common'
import { TagsType } from 'constants/Types'
import { logClickTag } from 'utils/amplitudeUtils'
import { getNormalizedPathname } from 'utils/pathnameUtils'

export default function Tags ({ tags }) {
  const pathname = window.location.pathname

  return (
    <ul
      css={css`
        display: flex;
      `}
    >
      {tags.map(tag => (
        <li
          key={tag}
          css={css`
            margin-right: 0.25rem;
            z-index: 1;
          `}
        >
          <Tag
            onClick={() => {
              logClickTag({ tag })
            }}
            small={!getNormalizedPathname(pathname).includes('/collections/')}
            to={`/?tags=${tag}`}
          >
            {tag}
          </Tag>
        </li>
      ))}
    </ul>
  )
}

Tags.propTypes = {
  tags: TagsType
}
