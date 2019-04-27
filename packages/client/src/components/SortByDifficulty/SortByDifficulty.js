import React, { useCallback, useContext } from 'react'

import { ExposedDropdown } from 'components/common'
import { OptionButton, ToggleButton, TogglerLabel } from './styled'
import { URLParamsContext } from 'contexts/URLParams'
import SortOptions from 'constants/SortOptions'
import { logSortDifficulty } from 'utils/amplitudeUtils'

export default function SortByDifficulty () {
  const {
    query: { sort },
    queryDispatch
  } = useContext(URLParamsContext)

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
