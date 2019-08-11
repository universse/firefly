import React, { memo, useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
// import { ItemTypes } from 'common'

import Icon from 'assets/icons'
import { OutboundLink } from 'components/common'
import { MediaContext } from 'contexts/Media'
import { screens } from 'constants/Styles'
import { UrlType } from 'constants/Types'
import fallback from 'assets/images/fallback.png'
import { logClickLearningResource } from 'utils/analytics'

const videoHosts = ['vimeo.com', 'youtube.com', 'youtu.be']

function getVideoProps (url) {
  const videoId = url.includes('youtube.com')
    ? new URL(url).searchParams.get('v')
    : new URL(url).pathname.slice(1)

  const isVimeo = url.includes('vimeo.com')

  const baseUrl = isVimeo
    ? 'https://player.vimeo.com/video/'
    : 'https://www.youtube-nocookie.com/embed/'

  const allow = isVimeo
    ? 'autoplay; fullscreen'
    : 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'

  return {
    allow,
    src: `${baseUrl}${videoId}`
  }
}

function LearningItem ({
  id,
  collectionId,
  description,
  image,
  publisher,
  title,
  cutOff,
  type,
  url
}) {
  const { isDesktop, isMobile } = useContext(MediaContext)
  // const icon = <Icon icon={ItemTypes[type]} size='small' />

  const isVideo = videoHosts.reduce(
    (bool, host) => url.includes(host) || bool,
    false
  )

  return isVideo ? (
    <>
      <div className='LearningVideo'>
        <iframe allowFullScreen title={title} {...getVideoProps(url)} />
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
        <h2 className='Title'>{title}</h2>
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
        src={
          image ||
          'https://res.cloudinary.com/aplu/image/upload/c_scale,q_40,w_500/v1557091665/Curated/uxvrlogo.jpg'
        }
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
            <h2 className='Title'>
              {title}
              {isDesktop && (
                <div aria-hidden className='Link'>
                  <Icon icon='external-link' size='small' />
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
  )
}

export default memo(LearningItem)

LearningItem.propTypes = {
  ...UrlType,
  collectionId: PropTypes.string
}
