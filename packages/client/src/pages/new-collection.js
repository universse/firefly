import React from 'react'

import Layout from 'layouts/Layout'

export default function NewCollectionPage (props) {
  const pathname = props.location.pathname
  const collectionId = pathname.substring(pathname.lastIndexOf('/') + 1)

  return <Layout>{collectionId}</Layout>
}
