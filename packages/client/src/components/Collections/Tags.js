import React from 'react'
import { css } from '@emotion/core'

import { Tag } from 'components/common'
import { TagsType } from 'constants/Types'
import URLParamKeys from 'constants/URLParamKeys'
import { logClickTag } from 'utils/amplitudeUtils'

export default function Tags ({ tags }) {
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
            margin-right: 0.75rem;
            z-index: 1;
          `}
        >
          <Tag
            onClick={() => {
              logClickTag({ tag })
            }}
            to={`/?${URLParamKeys.TAGS}=${tag.toLowerCase()}`}
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
