import { useState, useEffect } from 'react'
import { navigate } from 'gatsby'

// import useDebouncedValue from 'hooks/useDebouncedValue'
import { logClickSearchResult, logInputSearch } from 'utils/amplitude'
import searchWorker from 'utils/searchWorker'

export default function useSearch (
  initialSearchInput = '',
  initialIsLoading = false
) {
  const [searchInput, setSearchInput] = useState(initialSearchInput)
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(initialIsLoading)
  const [isTyping, setIsTyping] = useState(false)
  // const [debouncedSearchInput] = useDebouncedValue(searchInput, 100)

  const handleSelect = ({ meta: { name }, to }) => {
    logClickSearchResult({ input: searchInput, to })
    name && setSearchInput(name)
    navigate(to)
  }

  const handleSearchInput = e => {
    setIsTyping(true)
    setSearchInput(e.target.value)
    logInputSearch(e.target.value)
  }

  useEffect(() => {
    if (searchInput) {
      let isFresh = true
      setIsTyping(false)
      setIsLoading(true)

      searchWorker
        .search(searchInput)
        .then(({ collectionIds }) => isFresh && setResults(collectionIds))
        .finally(() => setIsLoading(false))

      return () => (isFresh = false)
    }
  }, [searchInput])

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
