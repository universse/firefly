import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { Tag } from 'components/common'
import { URLParamsContext } from 'contexts/URLParams'
import { TagsType } from 'constants/Types'
import { logClickTag } from 'utils/amplitudeUtils'
import withLocation from 'utils/withLocation'
import { getNormalizedPathname } from 'utils/pathnameUtils'
import { isIndexPage } from '../../../gatsby/utils'

function Tags ({ location: { pathname }, tags }) {
  const { constructUrl, onQueryClick } = useContext(URLParamsContext)

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
                onQueryClick({ tag })
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

export default withLocation(Tags)

Tags.propTypes = {
  location: PropTypes.object.isRequired,
  tags: TagsType
}
