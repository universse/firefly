import { useState, useEffect } from 'react'

export default function useMedia (query) {
  const [matches, setMatches] = useState()

  useEffect(() => {
    let mounted = true
    const mql = window.matchMedia(query)
    const onChange = () => {
      if (!mounted) return
      setMatches(!!mql.matches)
    }

    mql.addListener(onChange)
    setMatches(mql.matches)

    return () => {
      mounted = false
      mql.removeListener(onChange)
    }
  }, [query])

  return matches
}
