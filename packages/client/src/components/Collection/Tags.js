import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { Link } from 'gatsby'

import { TagsType } from 'constants/Types'
import URLParamKeys from 'constants/URLParamKeys'
import { logClickTag } from 'utils/analytics'

export default function Tags ({ tagClassName, tags }) {
  return (
    <ul
      css={css`
        z-index: 1;

        li {
          display: contents;
        }
      `}
    >
      {tags.map(tag => (
        <li key={tag}>
          <Link
            className={tagClassName}
            onClick={() => {
              logClickTag({ tag })
            }}
            to={`/?${URLParamKeys.TAGS}=${tag.toLowerCase()}`}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  )
}

Tags.propTypes = {
  tagClassName: PropTypes.string.isRequired,
  tags: TagsType
}
