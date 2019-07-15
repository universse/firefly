import React from 'react'
import { Link } from 'gatsby'

import useSiteMetadata from 'hooks/useSiteMetadata'

export default function Footer () {
  const { title } = useSiteMetadata()

  return (
    <footer>
      <div className='base'>
        <div>
          <Link to='/terms'>Terms</Link>
        </div>
        <div>
          <Link to='/privacy'>Privacy</Link>
        </div>
        <p>
          Made with{' '}
          <span aria-label='Love' role='img'>
            ❤
          </span>
          . ©️ {new Date().getFullYear()} {title}.
        </p>
      </div>
    </footer>
  )
}
