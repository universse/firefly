import { useState, useEffect } from 'react'
import { navigate } from 'gatsby'

// import useDebouncedValue from 'hooks/useDebouncedValue'
import { logClickSearchResult, logInputSearch } from 'utils/analytics'
import searchWorker from 'utils/searchWorker'

export default function useSearch () {
  const [searchInput, setSearchInput] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  // const [debouncedSearchInput] = useDebouncedValue(searchInput, 100)

  const handleSelect = ({ meta, to }) => {
    logClickSearchResult({ input: searchInput, to })
    meta && setSearchInput(meta.name)
    navigate(to)
  }

  const handleSearchInput = e => {
    setIsTyping(true)
    setSearchInput(e.target.value)
    logInputSearch(e.target.value)
  }

  useEffect(() => {
    if (searchInput) {
      let isPending = true
      setIsTyping(false)
      setIsLoading(true)

      searchWorker
        .search(searchInput)
        .then(({ collectionIds }) => isPending && setResults(collectionIds))
        .finally(() => setIsLoading(false))

      return () => (isPending = false)
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
