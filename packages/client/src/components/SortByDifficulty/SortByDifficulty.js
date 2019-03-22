import React, { useCallback, useContext } from 'react'

import { Dropdown } from 'components/common'
import { OptionList, OptionButton, ToggleButton, TogglerLabel } from './styled'
import { URLUtilsContext } from 'contexts/URLUtils'
import SortOptions from 'constants/SortOptions'

export default function SortByDifficulty ({ sort }) {
  const { onQueryClick } = useContext(URLUtilsContext)

  const handleChange = useCallback(
    ({ value }) => onQueryClick({ sort: value }),
    [onQueryClick]
  )

  return (
    <Dropdown
      handleChange={handleChange}
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
