import React, { useContext } from 'react'
import { css } from '@emotion/core'

import { AuthenticationContext } from '../components/Authentication'
import Layout from '../layouts/Layout'
import Hero from '../components/Hero'
import Collections from '../components/Collections'
import CategoryFilter from '../components/CategoryFilter'
import { baseWrapper } from '../styles'

export default function IndexPage () {
  const user = useContext(AuthenticationContext)

  // TODO: loading screen
  return user === false ? (
    <div />
  ) : (
    <Layout>
      {!user && <Hero />}
      <main
        css={theme => css`
          background-color: ${theme.colors.gray100};
          padding: 3rem 0;
        `}
        id='main'
      >
        <div
          css={css`
            ${baseWrapper};
            display: flex;
          `}
        >
          <CategoryFilter />
          <Collections />
        </div>
      </main>
    </Layout>
  )
}
