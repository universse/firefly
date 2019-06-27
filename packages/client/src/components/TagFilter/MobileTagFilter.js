import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { URLParamsContext } from 'contexts/URLParams'
import { ClearFilterButton, Count, MobileTag } from './styled'
import { logClickTagFilter } from 'utils/amplitude'

export default function MobileTagFilter ({ aggregatedTags }) {
  const {
    query: { tags },
    queryDispatch
  } = useContext(URLParamsContext)

  return (
    <>
      <div
        css={css`
          align-items: center;
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        `}
      >
        <h4
          css={css`
            color: var(--black800);
            font-size: 0.875rem;
            font-weight: 600;
            line-height: 1.25rem;
            text-transform: uppercase;
          `}
        >
          Filter by Tags
        </h4>
        <ClearFilterButton
          aria-label='Reset Filters'
          onClick={() => queryDispatch({ tags: [] })}
        >
          CLEAR
        </ClearFilterButton>
      </div>
      <ul>
        {aggregatedTags.map(([tag, count]) => {
          const isActive = tags.includes(tag)

          return (
            <li
              key={tag}
              css={css`
                align-items: center;
                display: flex;
                margin-bottom: 0.75rem;
              `}
            >
              <MobileTag isActive={isActive}>
                {tag}
                <Count isActive={isActive}>{count}</Count>
              </MobileTag>
            </li>
          )
        })}
      </ul>
    </>
  )
}

MobileTagFilter.propTypes = {
  aggregatedTags: PropTypes.arrayOf(PropTypes.array).isRequired
}
