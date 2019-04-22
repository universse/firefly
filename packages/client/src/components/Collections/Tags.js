import React from 'react'
import { css } from '@emotion/core'

import { Tag } from 'components/common'
import { TagsType } from 'constants/Types'
import { logClickTag } from 'utils/amplitudeUtils'

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
            small={!pathname.startsWith('/collection')}
            to={`/?tags=${tag.toLowerCase()}`}
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
