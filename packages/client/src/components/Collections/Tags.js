import React, { useContext } from 'react'
import { navigate } from 'gatsby'
import { css } from '@emotion/core'
import { Location } from '@reach/router'

import { Tag } from 'components/common'
import { URLUtilsContext } from 'contexts/URLUtils'

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
              e.preventDefault()
              urlUtils ? urlUtils.onTagClick(tag) : navigate(`/?tags=${tag}`)
            }}
            href={
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

export default function WithLocation (props) {
  return (
    <Location>
      {({ location }) => <Tags location={location} {...props} />}
    </Location>
  )
}
