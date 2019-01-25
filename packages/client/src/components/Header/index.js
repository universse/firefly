import React, { useState, useLayoutEffect, useRef } from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'
import { Location } from '@reach/router'

import SearchBar from '../SearchBar'
import Navigation from '../Navigation'
import { Logo } from '../../icons'
import { HeaderTag, Wrapper } from './styled'

export default function Header ({ siteTitle }) {
  const [translateY, setTranslateY] = useState(0)
  const [boxShadow, setBoxShadow] = useState('none')

  const prevScrollPos = useRef()

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset
    currentScrollPos
      ? setBoxShadow('0 2px 4px rgba(0, 0, 0, 0.05)')
      : setBoxShadow('none')

    prevScrollPos.current > currentScrollPos
      ? setTranslateY(0)
      : setTranslateY('-100%')

    prevScrollPos.current = currentScrollPos
  }

  useLayoutEffect(() => {
    prevScrollPos.current = window.pageYOffset
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <HeaderTag boxShadow={boxShadow} translateY={translateY}>
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
            <Link
              css={css`
                display: block;
                height: 2.25rem;
              `}
              to='/'
            >
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
