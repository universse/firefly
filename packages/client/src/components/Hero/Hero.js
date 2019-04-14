import React, { memo, useContext } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { css } from '@emotion/core'

import Landing from './Landing'
import LatestActivity from './LatestActivity'
import Loading from './Loading'
import Onboard from './Onboard'
import { LatestActivityContext } from 'contexts/LatestActivity'
import { hasSignedIn, isNewUser } from 'utils/localStorageUtils'

function Hero () {
  return <Landing />
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const { isLoading, latestActivity } = useContext(LatestActivityContext)

  if (!hasSignedIn()) {
    return <Landing />
  }

  return (
    <div
      className='base'
      css={css`
        background-color: #fff;
        display: flex;
        flex-direction: column;
        height: 18rem;
        justify-content: center;
      `}
    >
      {isNewUser() ? (
        <Onboard message={`Welcome to $${data.site.siteMetadata.title}!`} />
      ) : isLoading ? (
        <Loading />
      ) : latestActivity ? (
        <LatestActivity latestActivity={latestActivity} />
      ) : (
        <Onboard message='Welcome back!' />
      )}
    </div>
  )
}

export default memo(Hero)
