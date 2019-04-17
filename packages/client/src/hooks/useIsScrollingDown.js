import { useRef, useEffect, useState } from 'react'

import { baseFontSize, mobileHeaderHeightInRem } from 'constants/Styles'

export default function useIsScrollingDown () {
  const [isScrollingDown, setIsScrollingDown] = useState(false)

  const prevScrollPos = useRef(0)

  useEffect(() => {
    const baseline =
      document.getElementById('hero').offsetHeight +
      baseFontSize * mobileHeaderHeightInRem

    prevScrollPos.current = window.scrollY

    const handleScroll = () => {
      setIsScrollingDown(
        window.scrollY > baseline && prevScrollPos.current < window.scrollY
      )
      prevScrollPos.current = window.scrollY
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return isScrollingDown
}
