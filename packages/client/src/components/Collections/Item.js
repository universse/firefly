import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { UserDataContext } from 'contexts/UserData'

import Collection from './Collection'
import { URLParamsContext } from 'contexts/URLParams'
import { CollectionsType } from 'constants/Types'

export default function Item ({ data, index, style }) {
  const collection = data[index].node
  const userData = useContext(UserDataContext)
  const { onCategoryFilterClick } = useContext(URLParamsContext) || {}

  return userData ? (
    <li style={style}>
      <Collection
        collection={collection}
        isLoved={!!userData.love[collection.id]}
        isSaved={!!userData.save[collection.id]}
        onCategoryFilterClick={onCategoryFilterClick}
      />
    </li>
  ) : null
}

Item.propTypes = {
  data: CollectionsType.isRequired,
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired
}
