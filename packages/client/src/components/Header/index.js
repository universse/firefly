import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'
import { Location } from '@reach/router'

import SearchBar from '../SearchBar'
import Navigation from '../Navigation'
import { Logo } from '../../icons'
import { HeaderTag, Wrapper } from './styled'

export default function Header ({ siteTitle }) {
  const [translateY, setTranslateY] = useState(0)

  const prevScrollPos = useRef()

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset

    prevScrollPos.current > currentScrollPos
      ? setTranslateY(0)
      : setTranslateY('-100%')

    prevScrollPos.current = currentScrollPos
  }

  useEffect(() => {
    prevScrollPos.current = window.pageYOffset
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <HeaderTag translateY={translateY}>
      <Wrapper>
        <div
          css={css`
            align-items: center;
            display: flex;
          `}
        >
          <div
            css={css`
              margin-right: 1.5rem;
            `}
          >
            <Link to='/'>
              <Logo />
            </Link>
          </div>
          <Location>
            {({ location }) => location.pathname !== '/search' && <SearchBar />}
          </Location>
        </div>
        <Navigation />
      </Wrapper>
    </HeaderTag>
  )
}
