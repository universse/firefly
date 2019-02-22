import { useState, useContext, useMemo, useCallback } from 'react'
import { navigate } from 'gatsby'
import matchSorter from 'match-sorter'

import { AllCollectionsContext } from 'components/AllCollections'
import { createCollectionPath } from '../../gatsby/utils'

export default function useSearch (initialSearchInput) {
  const allCollections = useContext(AllCollectionsContext)
  const [searchInput, setSearchInput] = useState(initialSearchInput)

  const results = useMemo(
    () =>
      searchInput
        ? matchSorter(allCollections, searchInput, {
            keys: ['node.name']
          })
        : [],
    [allCollections, searchInput]
  )

  const handleChange = ({ node: { id, name } }) => {
    if (name) {
      navigate(createCollectionPath({ id, name }))
      setSearchInput(name)
    } else {
      navigate('/search', {
        state: { searchInput }
      })
    }
  }

  const handleSearchInput = useCallback(e => setSearchInput(e.target.value), [])

  return { searchInput, handleChange, handleSearchInput, results }
}
