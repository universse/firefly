import React from 'react'
import { css } from '@emotion/core'

import Icon from 'assets/icons'

export function copyToClipboard (str, curr) {
  const el = document.createElement('textarea')

  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)

  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false

  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)

  if (selected) {
    document.getSelection().removeAllRanges()
    document.getSelection().addRange(selected)
  }
}

export function getCopyUrlProps ({ mobile = false }) {
  return {
    'aria-label': 'Get Shareable Link',
    children: (
      <>
        <Icon icon='copy' size='medium' />
        {mobile && (
          <div
            css={css`
              margin-left: 1rem;
            `}
          >
            <span>Shareable Link</span>
          </div>
        )}
      </>
    ),
    onClick: e => {
      copyToClipboard(window.location.href)
      e.currentTarget.focus()
    },
    type: 'button'
  }
}

const facebookAppId = '604132180019762'

export const Platforms = ['Facebook', 'Twitter', 'Mail']

export function getShareProps ({ mobile = false, platform, title, text }) {
  const href = window.location.href

  const mobileLabel = mobile && (
    <div
      css={css`
        margin-left: 1rem;
      `}
    >
      <span>{platform}</span>
    </div>
  )

  const props = {
    'aria-label': `Share via ${platform}`,
    children: (
      <>
        <Icon icon={platform.toLowerCase()} size='medium' />
        {mobileLabel}
      </>
    ),
    rel: 'noopener noreferrer',
    target: '_blank'
  }

  switch (platform) {
    case 'Facebook':
      props.href = `https://www.facebook.com/dialog/share?app_id=${facebookAppId}&redirect_uri=${href}&href=${href}&quote=${text} - ${title}`
      break

    case 'Mail':
      props.href = `mailto:?to= &subject=${text} - ${title}&body=Check out this learning collection at ${href}`
      break

    case 'Twitter':
      props.href = `https://twitter.com/intent/tweet?text=${text} - ${title}&url=${href}`
      break

    default:
      throw new Error('Unknown platform.')
  }

  return props
}
