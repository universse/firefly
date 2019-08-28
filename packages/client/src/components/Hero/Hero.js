import React, { useEffect } from 'react'
import { css } from '@emotion/core'

import Landing from './Landing'
import LatestActivity from './LatestActivity'
import Loading from './Loading'
import Onboard from './Onboard'
import { useLatestActivity } from 'hooks/useGlobalStore'
import useSiteMetadata from 'hooks/useSiteMetadata'
import LocalStorage from 'constants/LocalStorage'
import { hasSignedIn, isNewUser } from 'utils/localStorageUtils'

// TODO Suspense
export default function Hero () {
  const { title } = useSiteMetadata()

  const { isLoading, data } = useLatestActivity()

  useEffect(() => {
    if (isNewUser()) {
      window.addEventListener(
        'beforeunload',
        () => window.localStorage.removeItem(LocalStorage.IS_NEW_USER),
        { once: true }
      )
    }
  }, [])

  if (!hasSignedIn()) {
    return <Landing />
  }

  return <Landing />

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
        <Onboard message={`Welcome to $${title}!`} />
      ) : isLoading ? (
        <Loading />
      ) : data ? (
        <LatestActivity latestActivity={data} />
      ) : (
        <Onboard message='Welcome back!' />
      )}
    </div>
  )
}
