import React, { useContext } from 'react'
import { UserDataContext } from 'contexts/UserData'

import Collection from './Collection'

export default function Item ({ data, index, style }) {
  const collection = data[index].node
  const userData = useContext(UserDataContext)

  return userData ? (
    <li style={style}>
      <Collection
        collection={collection}
        isLoved={!!userData.love[collection.id]}
        isSaved={!!userData.save[collection.id]}
      />
    </li>
  ) : null
}
