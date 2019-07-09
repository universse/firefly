import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { OutboundLink } from 'components/common'
import { UserDataDispatchContext } from 'contexts/UserDataDispatch'
import { Heart, Save } from 'assets/icons'
import useSiteMetadata from 'hooks/useSiteMetadata'
import { createActionLabel } from 'utils/ariaLabelUtils'
import firebaseWorker from 'utils/firebaseWorker'
import { getCopyUrlProps, getShareProps, Platforms } from 'utils/sharing'

// TODO suspense

export default function ShareWidget ({ id, isLoved, isSaved, name }) {
  const onActionClick = useContext(UserDataDispatchContext)
  const { title } = useSiteMetadata()

  const [loveCount, setLoveCount] = useState()

  useEffect(() => {
    firebaseWorker
      .fetchLoveCount(id)
      .then(setLoveCount)
      .catch(() => setLoveCount(0))
  }, [id])

  return (
    <ul className='ShareWidget'>
      <li>
        <button
          aria-label={createActionLabel(isLoved ? 'unlove' : 'love', name)}
          className='Heart'
          onClick={e => {
            if (isNaN(loveCount)) return
            onActionClick(e, () => {
              setLoveCount(loveCount => (isLoved ? --loveCount : ++loveCount))
            })
          }}
          type='button'
          value={id}
        >
          {!isNaN(loveCount) && <Heart filled={isLoved} large />}
        </button>
        <span
          css={css`
            color: var(--brand500);
            display: block;
            font-size: 0.875rem;
            font-variant-numeric: tabular-nums;
            height: 1rem;
          `}
        >
          {!isNaN(loveCount) && loveCount}
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
          <OutboundLink {...getShareProps({ platform, title, text: name })} />
        </li>
      ))}
      {/* <li>
        <button {...getCopyUrlProps()} />
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
