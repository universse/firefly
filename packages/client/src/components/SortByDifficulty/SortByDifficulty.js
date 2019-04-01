import React, { useCallback, useContext } from 'react'

import { ExposedDropdown } from 'components/common'
import { OptionList, OptionButton, ToggleButton, TogglerLabel } from './styled'
import { URLUtilsContext } from 'contexts/URLUtils'
import SortOptions from 'constants/SortOptions'
import { logSortDifficulty } from 'utils/amplitudeUtils'

export default function SortByDifficulty ({ sort }) {
  const { onQueryClick } = useContext(URLUtilsContext)

  const handleChange = useCallback(({ value }) => {
    onQueryClick({ sort: value })
    logSortDifficulty({ sort: value })
  }, [onQueryClick])

  return (
    <ExposedDropdown
      handleChange={handleChange}
      id='sort-menu'
      initialValue={sort}
      items={SortOptions}
      label='Sort By:'
      OptionButton={OptionButton}
      OptionList={OptionList}
      ToggleButton={ToggleButton}
      TogglerLabel={TogglerLabel}
    />
  )
}
