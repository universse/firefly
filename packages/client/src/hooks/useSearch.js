import { useState, useEffect } from 'react'
import { navigate } from 'gatsby'

// import useDebouncedValue from 'hooks/useDebouncedValue'
import { logClickSearchResult, logInputSearch } from 'utils/amplitudeUtils'
import getSearchWorker from 'utils/getSearchWorker'
import { createCollectionPath } from '../../gatsby/utils'

export default function useSearch (
  initialSearchInput = '',
  initialIsLoading = false
) {
  const [searchInput, setSearchInput] = useState(initialSearchInput)
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(initialIsLoading)
  const [isTyping, setIsTyping] = useState(false)
  // const debouncedSearchInput = useDebouncedValue(searchInput, 100)

  const handleSelect = ({ id, name }) => {
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

      getSearchWorker()
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
