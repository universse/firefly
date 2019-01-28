import React from 'react'

export default function NewCollectionPage (props) {
  const pathname = props.location.pathname
  const collectionId = pathname.substring(pathname.lastIndexOf('/') + 1)

  return collectionId
}
