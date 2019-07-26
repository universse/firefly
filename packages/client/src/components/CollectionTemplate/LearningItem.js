import React, { memo, useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { Check, ExternalLink } from 'assets/icons'
import { OutboundLink } from 'components/common'
import { MediaContext } from 'contexts/Media'
import { UserDataDispatchContext } from 'contexts/UserDataDispatch'
// import LinkIcons from 'constants/LinkIcons'
import { screens } from 'constants/Styles'
import { UrlType } from 'constants/Types'
import fallback from 'assets/images/fallback.png'
import { logClickLearningResource } from 'utils/amplitude'
import { createActionLabel } from 'utils/ariaLabelUtils'

const youtubeUrls = ['youtube.com', 'youtu.be']

function getVideoSrc (url) {
  const videoId = url.includes('youtube.com')
    ? new URL(url).searchParams.get('v')
    : new URL(url).pathname.slice(1)

  return `https://www.youtube-nocookie.com/embed/${videoId}`
}

function LearningItem ({
  id,
  collectionId,
  description,
  image,
  isChecked,
  publisher,
  title,
  cutOff,
  type,
  url
}) {
  const { isDesktop, isMobile } = useContext(MediaContext)
  const onActionClick = useContext(UserDataDispatchContext)
  // const LinkIcon = LinkIcons[type.toUpperCase()]

  const isYoutubeVideo = youtubeUrls.reduce(
    (bool, curr) => url.includes(curr) || bool,
    false
  )

  return (
    <>
      {isYoutubeVideo ? (
        <>
          <div className='LearningVideo'>
            <iframe
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              src={getVideoSrc(url)}
              title={title}
            />
          </div>
          <div
            css={css`
              margin-top: 0.75rem;
              width: calc(100% - 24px);

              ${screens.nonMobile} {
                margin-top: 1rem;
              }
            `}
          >
            <h2>{title}</h2>
          </div>
        </>
      ) : (
        <OutboundLink
          aria-label={title}
          className='LearningItem'
          href={url}
          onClick={() =>
            collectionId && logClickLearningResource({ id, collectionId })
          }
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
          <div className='Meta'>
            <div>
              <div
                css={css`
                  ${screens.nonMobile} {
                    margin-bottom: 0.25rem;
                  }
                `}
              >
                <h2>
                  {title}
                  {isDesktop && (
                    <div aria-hidden className='Link'>
                      <ExternalLink />
                    </div>
                  )}
                </h2>
              </div>
              <div
                css={css`
                  ${screens.mobile} {
                    width: calc(100% - 20px);
                  }
                `}
              >
                <p>
                  {isMobile && cutOff
                    ? description.slice(0, cutOff) + '...'
                    : description}
                </p>
              </div>
            </div>
            <span>{new URL(url).hostname}</span>
          </div>
        </OutboundLink>
      )}
      {typeof isChecked === 'boolean' && (
        <div className='CheckWrapper'>
          <button
            aria-label={createActionLabel(
              isChecked ? 'check' : 'uncheck',
              title
            )}
            className='IconButton'
            onClick={onActionClick}
            type='button'
            value={id}
          >
            <Check filled={isChecked} medium={isMobile} />
          </button>
        </div>
      )}
    </>
  )
}

export default memo(LearningItem)

LearningItem.propTypes = {
  ...UrlType,
  collectionId: PropTypes.string,
  isChecked: PropTypes.bool
}
