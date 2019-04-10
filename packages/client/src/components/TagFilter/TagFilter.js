import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { URLParamsContext } from 'contexts/URLParams'
import { Title } from 'components/common'
import { ClearFilterButton, Count, Tag } from './styled'
import { logClickTagFilter } from 'utils/amplitudeUtils'

export default function TagFilter ({ aggregatedTags, tags }) {
  const { constructUrl, onQueryClick, updateQuery } = useContext(
    URLParamsContext
  )

  return (
    <div>
      <div
        css={css`
          align-items: center;
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        `}
      >
        <Title>TAGS</Title>
        <ClearFilterButton
          aria-label='Reset Filters'
          onClick={() => onQueryClick({ tag: '' })}
        >
          clear
        </ClearFilterButton>
      </div>
      <ul>
        {aggregatedTags.map(([tag, count]) => {
          const { href, updatedTags } = constructUrl(tag)
          const isActive = tags.includes(tag)

          return (
            <li
              key={tag}
              css={css`
                display: flex;
                justify-content: space-between;
                margin: 0.375rem 0 0.375rem calc(1rem + 4px);
              `}
            >
              <Tag
                href={href}
                isActive={isActive}
                onClick={e => {
                  e.preventDefault()
                  updateQuery(updatedTags)
                  window.history.pushState({}, '', href)
                  logClickTagFilter({ tag, updatedTags })
                }}
              >
                {tag}
              </Tag>
              <Count isActive={isActive}>{count}</Count>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

TagFilter.propTypes = {
  aggregatedTags: PropTypes.arrayOf(PropTypes.array).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired
}
