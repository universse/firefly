// sign up bottom pop up
// page
import React, { useState, useEffect } from 'react'

import Layout from 'layouts/Layout'
import { getSavedCollections } from 'services/localforage'

export default function MePage (props) {
  const [savedCollections, setSavedCollections] = useState()

  useEffect(() => {
    getSavedCollections().then(value => setSavedCollections(value))
  }, [])

  return (
    <Layout>
      <div>{JSON.stringify(savedCollections)}</div>
    </Layout>
  )
}
