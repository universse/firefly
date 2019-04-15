import { useRef, useEffect, useState } from 'react'

import { baseFontSize, mobileHeaderHeightInRem } from 'constants/Styles'

export default function useIsScrollingDown () {
  const [isScrollingDown, setIsScrollingDown] = useState(false)

  const prevScrollPos = useRef(0)
  const baseline = useRef()

  useEffect(() => {
    if (isNaN(baseline.current)) {
      baseline.current =
        document.getElementById('hero').offsetHeight +
        baseFontSize * mobileHeaderHeightInRem
    }
    prevScrollPos.current = window.scrollY

    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      if (currentScrollPos < baseline.current) return

      prevScrollPos.current > currentScrollPos
        ? setIsScrollingDown(false)
        : setIsScrollingDown(true)

      prevScrollPos.current = currentScrollPos
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return isScrollingDown
}
