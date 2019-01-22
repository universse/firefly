import React, { useContext } from 'react'

import { AuthenticationContext } from '../components/Authentication'
import Layout from '../layouts/Layout'
import Hero from '../components/Hero'
import Collections from '../components/Collections'

export default function IndexPage () {
  const user = useContext(AuthenticationContext)

  // TODO: loading screen
  return user === false ? (
    <div />
  ) : (
    <Layout>
      {!user && <Hero />}
      <Collections />
    </Layout>
  )
}
