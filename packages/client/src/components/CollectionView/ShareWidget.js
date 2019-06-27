import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { OutboundLink } from 'components/common'
import { UserDataDispatchContext } from 'contexts/UserDataDispatch'
import { Heart, Save } from 'assets/icons'
import useSiteTitle from 'hooks/useSiteTitle'
import { createActionLabel } from 'utils/ariaLabelUtils'
import { getCopyUrlProps, getShareProps, Platforms } from 'utils/sharing'

export default function ShareWidget ({ id, isLoved, isSaved, name }) {
  const onActionClick = useContext(UserDataDispatchContext)
  const siteTitle = useSiteTitle()

  const href = window.location.href

  return (
    <ul className='ShareWidget'>
      <li>
        <button
          aria-label={createActionLabel(isLoved ? 'unlove' : 'love', name)}
          className='Heart'
          onClick={onActionClick}
          type='button'
          value={id}
        >
          <Heart filled={isLoved} large />
        </button>
        <span
          css={css`
            color: var(--brand500);
            font-size: 0.875rem;
          `}
        >
          64
        </span>
      </li>
      <li>
        <button
          aria-label={createActionLabel(isSaved ? 'unsave' : 'save', name)}
          onClick={onActionClick}
          type='button'
          value={id}
        >
          <Save filled={isSaved} medium />
        </button>
      </li>
      {Platforms.map(platform => (
        <li key={platform}>
          <OutboundLink
            {...getShareProps({ href, platform, siteTitle, text: name })}
          />
        </li>
      ))}
      {/* <li>
        <button {...getCopyUrlProps({ href })} />>
      </li> */}
    </ul>
  )
}

ShareWidget.propTypes = {
  id: PropTypes.string.isRequired,
  isLoved: PropTypes.bool.isRequired,
  isSaved: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired
}
