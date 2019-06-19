import React from 'react'
import PropTypes from 'prop-types'
import { DifficultyLevels } from 'common'

export function Level ({ level }) {
  return (
    <svg
      aria-label='level'
      height='17'
      role='img'
      strokeLinejoin='round'
      strokeWidth='2'
      viewBox='0 0 17 17'
      width='17'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>{DifficultyLevels[level]}</title>
      <path d='M1 17V9' stroke='var(--colors-brand500)' />
      <path
        d='M6 17V6'
        stroke={level > 0 ? 'var(--colors-brand500)' : 'var(--colors-gray400)'}
      />
      <path
        d='M11 17V3'
        stroke={level > 1 ? 'var(--colors-brand500)' : 'var(--colors-gray400)'}
      />
      <path
        d='M16 17V0'
        stroke={level > 2 ? 'var(--colors-brand500)' : 'var(--colors-gray400)'}
      />
    </svg>
  )
}

Level.propTypes = {
  level: PropTypes.number.isRequired
}
