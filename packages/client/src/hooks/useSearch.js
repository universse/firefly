import { useState, useContext, useCallback, useEffect } from 'react'
import { navigate } from 'gatsby'
import matchSorter from 'match-sorter'

import { AllCollectionsContext } from 'contexts/AllCollections'
import useDebouncedValue from 'hooks/useDebouncedValue'
import { logInputSearch } from 'utils/amplitudeUtils'
import { createCollectionPath } from '../../gatsby/utils'

export default function useSearch (initialSearchInput, initialIsLoading) {
  const allCollections = useContext(AllCollectionsContext)
  const [searchInput, setSearchInput] = useState(initialSearchInput)
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(initialIsLoading)
  const [isTyping, setIsTyping] = useState(false)
  const debouncedSearchInput = useDebouncedValue(searchInput, 300)

  const handleChange = useCallback(({ node: { id, name } }) => {
    if (name) {
      navigate(createCollectionPath({ id, name }))
      setSearchInput(name)
    } else {
      navigate('/search', {
        state: { searchInput, initialIsLoading: true }
      })
    }
  }, [searchInput])

  const handleSearchInput = useCallback(e => {
    setIsTyping(true)
    setSearchInput(e.target.value)
  }, [])

  useEffect(() => {
    if (debouncedSearchInput) {
      setIsTyping(false)
      // setIsLoading(true)
      setResults(
        matchSorter(allCollections, debouncedSearchInput, {
          keys: ['node.name']
        })
      )
      // setIsLoading(false)
      logInputSearch(debouncedSearchInput)
    } else {
      setResults([])
    }
  }, [allCollections, debouncedSearchInput])

  return {
    handleChange,
    handleSearchInput,
    isLoading,
    isTyping,
    results,
    searchInput
  }
}
