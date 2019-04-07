import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from '@emotion/core'
import { DifficultyLevels } from 'common'

export function Level ({ level }) {
  const {
    colors: { brand500, gray400 }
  } = useContext(ThemeContext)

  return (
    <svg
      aria-label='level'
      height='17'
      role='img'
      strokeLinejoin='round'
      strokeWidth='3'
      viewBox='0 0 21 17'
      width='21'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>{DifficultyLevels[level]}</title>
      <path d='M1.5 17V9' stroke={brand500} />
      <path d='M7.5 17V6' stroke={level > 0 ? brand500 : gray400} />
      <path d='M13.5 17V3' stroke={level > 1 ? brand500 : gray400} />
      <path d='M19.5 17V0' stroke={level > 2 ? brand500 : gray400} />
    </svg>
  )
}

Level.propTypes = {
  level: PropTypes.number.isRequired
}
