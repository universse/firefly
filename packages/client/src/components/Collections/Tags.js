import React, { useContext } from 'react'
import { css } from '@emotion/core'

import { Tag } from 'components/common'
import { URLUtilsContext } from 'contexts/URLUtils'
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
            onClick={() => {
              urlUtils && urlUtils.onQueryClick({ tag })
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
