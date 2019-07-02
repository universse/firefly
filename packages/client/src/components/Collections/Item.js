import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import Collection from './Collection'
import { UserDataContext } from 'contexts/UserData'
import { CollectionIdsType } from 'constants/Types'

export default function Item ({ data, index, style }) {
  const id = data[index].id
  const userData = useContext(UserDataContext)

  return (
    userData && (
      <li style={style}>
        <Collection
          id={id}
          // isLoved={!!userData.love[id]}
          isSaved={!!userData.save[id]}
        />
      </li>
    )
  )
}

Item.propTypes = {
  data: CollectionIdsType.isRequired,
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired
}
