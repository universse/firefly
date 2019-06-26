import React, { memo, useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { Check, ExternalLink } from 'assets/icons'
import { OutboundLink } from 'components/common'
import { UserDataDispatchContext } from 'contexts/UserDataDispatch'
import LinkIcons from 'constants/LinkIcons'
import { UrlType } from 'constants/Types'
import fallback from 'assets/images/fallback.png'
import { logClickLearningResource } from 'utils/amplitudeUtils'
import { createActionLabel } from 'utils/ariaLabelUtils'

function truncate (str, length = 120) {
  if (str.length <= length) return str
  let final
  if (str.slice(0, length).endsWith(' ')) final = str.slice(0, length - 1)
  if (str.slice(0, length + 1).endsWith(' ')) final = str.slice(0, length)
  else {
    const trimmed = str.slice(0, length)
    final = trimmed.slice(0, trimmed.lastIndexOf(' '))
  }
  return `${final}...`
}

function LearningItem ({
  id,
  collectionId,
  description,
  image,
  isChecked,
  publisher,
  title,
  type,
  url
}) {
  const onActionClick = useContext(UserDataDispatchContext)
  const LinkIcon = LinkIcons[type.toUpperCase()]

  return (
    <>
      <OutboundLink
        aria-label={title}
        className='LearningItem'
        href={url}
        onClick={() => logClickLearningResource({ id, collectionId })}
        rel='noopener noreferrer'
        target='_blank'
      >
        <img
          alt=''
          onError={e => {
            e.target.onerror = null
            e.target.src = `${fallback}`
          }}
          src='https://res.cloudinary.com/aplu/image/upload/c_scale,q_40,w_500/v1557091665/Curated/uxvrlogo.jpg'
        />
        <div
          css={css`
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: space-between;
            padding: 0.25rem 0 0.25rem 1rem;
            position: relative;
          `}
        >
          <div>
            <div
              css={css`
                align-items: flex-end;
                display: flex;
                margin-bottom: 0.25rem;
              `}
            >
              <h2>{title}</h2>
              <div className='Link'>
                <ExternalLink />
              </div>
            </div>
            <p>{truncate(description)}</p>
          </div>
          <span>{new URL(url).hostname}</span>
        </div>
      </OutboundLink>
      <div
        css={css`
          bottom: 0.5rem;
          position: absolute;
          right: -0.5rem;
        `}
      >
        <button
          aria-label={createActionLabel(isChecked ? 'check' : 'uncheck', title)}
          className='IconButton'
          onClick={onActionClick}
          type='button'
          value={id}
        >
          <Check filled={isChecked} />
        </button>
      </div>
    </>
  )
}

export default memo(LearningItem)

LearningItem.propTypes = {
  ...UrlType,
  collectionId: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired
}
