import { useState, useCallback, useEffect, useRef } from 'react'
import { navigate } from 'gatsby'

import useDebouncedValue from 'hooks/useDebouncedValue'
import { logClickSearchResult, logInputSearch } from 'utils/amplitudeUtils'
import { createCollectionPath } from '../../../gatsby/utils'
import SearchWorker from './search.worker'

export default function useSearch (initialSearchInput, initialIsLoading) {
  const [searchInput, setSearchInput] = useState(initialSearchInput)
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(initialIsLoading)
  const [isTyping, setIsTyping] = useState(false)
  const debouncedSearchInput = useDebouncedValue(searchInput, 350)

  const handleSelect = useCallback(({ id, name }) => {
    if (name) {
      const to = createCollectionPath({ id, name })
      logClickSearchResult({ input: searchInput, to })
      navigate(to)
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
    logInputSearch(e.target.value)
  }, [])

  const searchWorker = useRef()

  const getSearchWorker = useCallback(() => {
    !searchWorker.current && (searchWorker.current = new SearchWorker())
    return searchWorker.current
  }, [])

  useEffect(() => {
    if (debouncedSearchInput) {
      setIsTyping(false)
      setIsLoading(true)

      getSearchWorker()
        .search(debouncedSearchInput)
        .then(setResults)
        .finally(() => setIsLoading(false))
    } else {
      setResults([])
    }
  }, [debouncedSearchInput, getSearchWorker])

  return {
    handleSelect,
    handleSearchInput,
    isLoading,
    isTyping,
    results,
    searchInput,
    setSearchInput
  }
}
