import React from 'react'
import { css } from '@emotion/core'

import Landing from './Landing'
import LatestActivity from './LatestActivity'
import Onboard from './Onboard'
import { hasSignedIn, isNewUser } from 'utils/localStorageUtils'
import { baseWrapper } from 'utils/styles'

const renderHero = () => {
  if (!hasSignedIn()) {
    return <Landing />
  }
  if (isNewUser()) {
    return <Onboard />
  }
  return <LatestActivity />
}

export default function Hero () {
  return (
    <section>
      <div
        css={css`
          background-color: #fff;
          display: flex;
          flex-direction: column;
          height: 30rem;
          justify-content: center;
          ${baseWrapper}
        `}
      >
        {renderHero()}
      </div>
    </section>
  )
}
