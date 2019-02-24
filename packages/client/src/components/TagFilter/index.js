import React, { useContext } from 'react'
import { css } from '@emotion/core'

import Modal from 'components/Modal'
import { Title } from 'components/common'
import { Count, MobileTag, Tag } from './styled'
import { URLUtilsContext } from 'pages'
import useMedia from 'hooks/useMedia'
import ModalTypes from 'constants/ModalTypes'
import { media } from 'constants/Theme'

export default function TagFilter ({ aggregatedTags, tags }) {
  const { updateQuery, constructUrl, onTagResetClick } = useContext(
    URLUtilsContext
  )

  const isDesktop = useMedia(media.desktop)

  return isDesktop ? (
    <div
      css={theme => css`
        margin-bottom: 2rem;
      `}
    >
      <div
        css={css`
          align-items: center;
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        `}
      >
        <Title>TAGS</Title>
        <button
          aria-label='Reset Filters'
          css={theme => css`
            color: ${theme.colors.gray700};
            font-size: 0.875rem;
          `}
          onClick={onTagResetClick}
          type='button'
        >
          reset
        </button>
      </div>
      <ul>
        {aggregatedTags.map(([tag, count]) => (
          <li
            key={tag}
            css={css`
              align-items: center;
              display: flex;
              justify-content: space-between;
              margin: 0.375rem 0 0.375rem calc(1rem + 4px);
            `}
          >
            <Tag
              isActive={tags.includes(tag)}
              onClick={e => {
                e.preventDefault()
                updateQuery(tag)
              }}
              href={constructUrl(tag).href}
            >
              {tag}
            </Tag>
            <Count isActive={tags.includes(tag)}>{count}</Count>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <Modal
      className='TagFilterModal'
      contentLabel='Filter Collections by Tags'
      type={ModalTypes.MOBILE_TAG_FILTER}
    >
      <div
        css={css`
          margin-bottom: 1.25rem;
        `}
      >
        <h4
          css={theme => css`
            color: ${theme.colors.gray700};
            font-size: 1.125rem;
            font-weight: 700;
            line-height: 1.5rem;
          `}
        >
          Filter by Tags
        </h4>
      </div>
      <ul>
        {aggregatedTags.map(([tag, count]) => (
          <li
            key={tag}
            css={css`
              align-items: center;
              display: flex;
              margin-bottom: 0.75rem;
            `}
          >
            <MobileTag
              isActive={tags.includes(tag)}
              onClick={e => {
                e.preventDefault()
                updateQuery(tag)
              }}
              href={constructUrl(tag).href}
            >
              {tag}
              <Count isActive={tags.includes(tag)}>{count}</Count>
            </MobileTag>
          </li>
        ))}
      </ul>
    </Modal>
  )
}
