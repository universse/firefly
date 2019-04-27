import { useState, useEffect } from 'react'

export default function useMedia (query) {
  const [matches, setMatches] = useState()

  useEffect(() => {
    const mql = window.matchMedia(query)
    setMatches(mql.matches)

    const onChange = () => setMatches(mql.matches)
    mql.addListener(onChange)

    return () => {
      mql.removeListener(onChange)
    }
  }, [query])

  return matches
}
