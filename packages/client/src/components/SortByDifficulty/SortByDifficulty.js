import React, { useCallback, useContext } from 'react'
import PropTypes from 'prop-types'

import { ExposedDropdown } from 'components/common'
import { OptionButton, ToggleButton, TogglerLabel } from './styled'
import { URLParamsContext } from 'contexts/URLParams'
import SortOptions from 'constants/SortOptions'
import { logSortDifficulty } from 'utils/amplitudeUtils'

export default function SortByDifficulty ({ sort }) {
  const { queryDispatch } = useContext(URLParamsContext)

  const handleChange = useCallback(({ value }) => {
    queryDispatch({ sort: value })
    logSortDifficulty({ sort: value })
  }, [queryDispatch])

  return (
    <ExposedDropdown
      handleChange={handleChange}
      id='sort-menu'
      items={SortOptions}
      label='Sort By:'
      OptionButton={OptionButton}
      selectedItem={sort}
      ToggleButton={ToggleButton}
      TogglerLabel={TogglerLabel}
    />
  )
}

SortByDifficulty.propTypes = {
  sort: PropTypes.string.isRequired
}
