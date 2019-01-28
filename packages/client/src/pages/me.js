// sign up bottom pop up to sync across devices
// page
import React, { useState, useEffect } from 'react'

import { getSavedCollections } from 'services/localforage'

export default function MePage (props) {
  const [savedCollections, setSavedCollections] = useState()

  useEffect(() => {
    getSavedCollections().then(value => setSavedCollections(value))
  }, [])

  return <span>{JSON.stringify(savedCollections)}</span>
}
