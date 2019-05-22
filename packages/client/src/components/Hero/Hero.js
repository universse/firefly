import React, { memo, useContext, useEffect } from 'react'
import { css } from '@emotion/core'

import Landing from './Landing'
import LatestActivity from './LatestActivity'
import Loading from './Loading'
import Onboard from './Onboard'
import { LatestActivityContext } from 'contexts/LatestActivity'
import useSiteTitle from 'hooks/useSiteTitle'
import LocalStorage from 'constants/LocalStorage'
import { hasSignedIn, isNewUser } from 'utils/localStorageUtils'

function Hero () {
  const title = useSiteTitle()

  const { isLoading, latestActivity } = useContext(LatestActivityContext)

  useEffect(() => {
    if (isNewUser()) {
      const removeIsNewUser = () =>
        window.localStorage.removeItem(LocalStorage.IS_NEW_USER)

      window.addEventListener('beforeunload', removeIsNewUser)

      return () => {
        window.removeEventListener('beforeunload', removeIsNewUser)
      }
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
      ) : latestActivity ? (
        <LatestActivity latestActivity={latestActivity} />
      ) : (
        <Onboard message='Welcome back!' />
      )}
    </div>
  )
}

export default memo(Hero)
