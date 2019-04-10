import React, { useCallback, useContext } from 'react'
import PropTypes from 'prop-types'

import { ExposedDropdown } from 'components/common'
import { OptionList, OptionButton, ToggleButton, TogglerLabel } from './styled'
import { URLParamsContext } from 'contexts/URLParams'
import SortOptions from 'constants/SortOptions'
import { logSortDifficulty } from 'utils/amplitudeUtils'

export default function SortByDifficulty ({ sort }) {
  const { onQueryClick } = useContext(URLParamsContext)

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

SortByDifficulty.propTypes = {
  sort: PropTypes.string.isRequired
}
