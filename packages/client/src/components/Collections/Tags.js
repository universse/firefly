import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { Tag } from 'components/common'
import { URLUtilsContext } from 'contexts/URLUtils'
import { TagsType } from 'constants/Types'
import { logClickTag } from 'utils/amplitudeUtils'
import withLocation from 'utils/withLocation'

function Tags ({ location: { pathname }, tags }) {
  const urlUtils = useContext(URLUtilsContext)

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
            onClick={e => {
              if (urlUtils) {
                e.preventDefault()
                urlUtils.onQueryClick({ tag })
              }
              logClickTag({ tag })
            }}
            small={!!urlUtils}
            to={
              urlUtils ? urlUtils.constructUrl(tag, true).href : `/?tags=${tag}`
            }
          >
            {tag}
          </Tag>
        </li>
      ))}
    </ul>
  )
}

export default withLocation(Tags)

Tags.propTypes = {
  location: PropTypes.object.isRequired,
  tags: TagsType
}
