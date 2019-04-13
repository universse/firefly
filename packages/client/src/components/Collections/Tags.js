import React, { useContext } from 'react'
import { css } from '@emotion/core'

import { Tag } from 'components/common'
import { URLParamsContext } from 'contexts/URLParams'
import { TagsType } from 'constants/Types'
import { logClickTag } from 'utils/amplitudeUtils'
import { getNormalizedPathname } from 'utils/pathnameUtils'
import { isIndexPage } from '../../../gatsby/utils'

export default function Tags ({ tags }) {
  const { constructUrl, queryDispatch } = useContext(URLParamsContext) || {}
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
            onClick={e => {
              if (isIndexPage(pathname)) {
                e.preventDefault()
                queryDispatch({ tags: [tag] })
              }
              logClickTag({ tag })
            }}
            small={!getNormalizedPathname(pathname).includes('/collections/')}
            to={
              isIndexPage(pathname)
                ? constructUrl(tag, false).href
                : `/?tags=${tag}`
            }
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
