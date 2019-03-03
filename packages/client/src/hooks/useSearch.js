import { useState, useContext, useMemo, useCallback } from 'react'
import { navigate } from 'gatsby'
import matchSorter from 'match-sorter'

import { AllCollectionsContext } from 'components/AllCollections'
import useDebounce from 'hooks/useDebounce'
import { createCollectionPath } from '../../gatsby/utils'

export default function useSearch (initialSearchInput, initialIsLoading) {
  const allCollections = useContext(AllCollectionsContext)
  const [searchInput, setSearchInput] = useState(initialSearchInput)
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(initialIsLoading)
  const [isTyping, setIsTyping] = useState(false)

  const deps = useMemo(() => [allCollections, searchInput], [
    allCollections,
    searchInput
  ])

  const searchCollections = useCallback(() => {
    if (!searchInput) {
      setResults([])
    } else {
      setIsTyping(false)
      setIsLoading(true)
      setResults(
        matchSorter(allCollections, searchInput, {
          keys: ['node.name']
        })
      )
      setIsLoading(false)
    }
  }, [allCollections, searchInput])

  useDebounce(searchCollections, 300, deps)

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
    setIsLoading(false)
    setIsTyping(true)
    setSearchInput(e.target.value)
  }, [])

  return {
    handleChange,
    handleSearchInput,
    isLoading,
    isTyping,
    results,
    searchInput
  }
}
