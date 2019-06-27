import React from 'react'
import PropTypes from 'prop-types'

export function Facebook ({ medium = true }) {
  return (
    <svg
      aria-label='facebook'
      className={medium ? 'feather feather--medium' : 'feather'}
      role='img'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>facebook</title>
      <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
    </svg>
  )
}

Facebook.propTypes = {
  medium: PropTypes.bool
}

// #4267B2
// export function Facebook () {
//   return (
//     <svg
//       aria-label='facebook'
//       height='24'
//       role='img'
//       viewBox='0 0 24 24'
//       width='24'
//       xmlns='http://www.w3.org/2000/svg'
//     >
//       <title>facebook</title>
//       <path
//         d='M17.75 3.984l-2.312.001c-1.811 0-2.163.842-2.163 2.077v2.724h4.323l-.563 4.267h-3.76V24H8.769V13.053H5V8.786h3.769V5.64C8.769 1.988 11.05 0 14.383 0c1.596 0 2.967.116 3.367.168v3.816z'
//         fill='#fff'
//       />
//     </svg>
//   )
// }
