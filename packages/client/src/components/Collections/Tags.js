import React, { useContext } from 'react'
import { navigate } from 'gatsby'
import { css } from '@emotion/core'
import { Location } from '@reach/router'

import { Tag } from 'components/common'
import { URLUtilsContext } from 'pages'

function Tags ({ location, tags }) {
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
              if (location.pathname.includes('/collection/')) {
                navigate(`/?tags=${tag}`)
              } else {
                urlUtils.updateQuery(tag)
              }
            }}
            href={
              location.pathname.includes('/collection/')
                ? `/?tags=${tag}`
                : urlUtils.constructUrl(tag).href
            }
          >
            {tag}
          </Tag>
        </li>
      ))}
    </ul>
  )
}

export default function TagsWithLocation (props) {
  return (
    <Location>
      {({ location }) => <Tags location={location} {...props} />}
    </Location>
  )
}
