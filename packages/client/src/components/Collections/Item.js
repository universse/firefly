import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import Collection from './Collection'
import { UserDataContext } from 'contexts/UserData'
import { CollectionsType } from 'constants/Types'

export default function Item ({ data, index, style }) {
  const collection = data[index].node
  const userData = useContext(UserDataContext)

  return (
    userData && (
      <li style={style}>
        <Collection
          collection={collection}
          isLoved={!!userData.love[collection.id]}
          isSaved={!!userData.save[collection.id]}
        />
      </li>
    )
  )
}

Item.propTypes = {
  data: CollectionsType.isRequired,
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired
}
