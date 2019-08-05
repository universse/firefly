import React, { Children, Fragment, useRef } from 'react'
import PropTypes from 'prop-types'
import { Link, navigate } from 'gatsby'
import { css } from '@emotion/core'

import OutboundLink from './OutboundLink'
import Icon from 'assets/icons'
import AriaLabels from 'constants/AriaLabels'
import { screens } from 'constants/Styles'

export function ActionBar ({ children }) {
  const childrenCount =
    children.type === Fragment
      ? Children.count(children.props.children)
      : Children.count(children)

  return (
    <div
      css={css`
        display: flex;
        flex: 0 0 auto;
        justify-content: space-between;
        margin-right: -0.5rem;
        width: ${2.5 * childrenCount + 0.5 * (childrenCount - 1)}rem;

        ${screens.desktop} {
          width: ${2.5 * childrenCount}rem;
        }
      `}
    >
      {children}
    </div>
  )
}

ActionBar.propTypes = {
  children: PropTypes.node.isRequired
}

function goBack () {
  window.___hasVisited ? window.history.back() : navigate('/')
}

export function BackButton () {
  return (
    <button
      aria-label={AriaLabels.GO_BACK}
      className='IconButton'
      onClick={goBack}
      type='button'
    >
      <Icon icon='back' />
    </button>
  )
}

export function Category (props) {
  return (
    <Link
      css={css`
        color: var(--brand500);
        font-size: 0.875rem;
        font-weight: 500;
        text-transform: capitalize;
        z-index: 1;

        &:hover {
          text-decoration: underline;
        }
      `}
      {...props}
    />
  )
}

export function Difficulty (props) {
  return (
    <span
      css={css`
        color: var(--black800);
        font-size: 0.875rem;
        font-weight: 500;
        text-transform: capitalize;
      `}
      {...props}
    />
  )
}

// export function FAB (props) {
//   return (
//     <button
//       css={css`
//         background-color: var(--brand500);
//         border-radius: 1.5rem;
//         bottom: ${bottomBarHeightInRem + 1}rem;
//         color: var(--white900);
//         height: 3rem;
//         position: fixed;
//         right: 1rem;
//         width: 3rem;

//         &:hover {
//           background-color: var(--brand900);
//         }

//         ${screens.desktop} {
//           display: none;
//         }
//       `}
//       type='button'
//       {...props}
//     />
//   )
// }

// FAB.propTypes = {
//   'aria-label': PropTypes.string.isRequired,
//   onClick: PropTypes.func.isRequired
// }

// export function FABDesktop (props) {
//   return (
//     <OutboundLink
//       css={css`
//         align-items: center;
//         background-color: var(--brand500);
//         border-radius: 1.75rem;
//         bottom: 2.5rem;
//         color: var(--white900);
//         display: flex;
//         height: 3.5rem;
//         justify-content: center;
//         position: fixed;
//         right: 2.5rem;
//         width: 3.5rem;

//         &:hover {
//           background-color: var(--brand900);
//         }

//         ${screens.nonDesktop} {
//           display: none;
//         }
//       `}
//       rel='noopener noreferrer'
//       target='_blank'
//       {...props}
//     />
//   )
// }

export { OutboundLink }

export function ProgressBar ({ percentage }) {
  return (
    <div className='ProgressBar'>
      <div style={{ width: `${percentage}%` }} />
    </div>
  )
}

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired
}

function getPosition (e) {
  if ('touches' in e) {
    const { pageX, pageY } = e.touches[0]
    return { x: pageX, y: pageY }
  }
}

const HORIZONTAL_THRESHOLD = 30
const VERTICAL_THRESHOLD = 300

export function Swippable ({ cb, direction, ...props }) {
  const initialXY = useRef()
  const deltaXY = useRef()

  return (
    <div
      {...props}
      onTouchMove={e => {
        const { x: initialX, y: initialY } = initialXY.current
        const { x: currentX, y: currentY } = getPosition(e)
        const deltaX = currentX - initialX
        const deltaY = currentY - initialY

        switch (direction) {
          case 'left':
            if (deltaX < HORIZONTAL_THRESHOLD) cb()
            break
          case 'right':
            if (deltaX > HORIZONTAL_THRESHOLD) cb()
            break
          case 'up':
            if (deltaY < VERTICAL_THRESHOLD) cb()
            break
          case 'down':
            if (deltaY > VERTICAL_THRESHOLD) cb()
            break
          default:
            throw new Error('Unknown direction.')
        }
      }}
      onTouchStart={e => {
        deltaXY.current = { x: 0, y: 0 }
        initialXY.current = getPosition(e)
      }}
    />
  )
}

Swippable.propTypes = {
  cb: PropTypes.func.isRequired,
  direction: PropTypes.oneOf(['left', 'right', 'up', 'down']).isRequired
}
