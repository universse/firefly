import { useState, useEffect, useRef } from 'react'

export default function useIsScrollingDown () {
  const [scrollState, setIsScrollingDown] = useState({
    isPastBaseline: false,
    isScrollingDown: false
  })

  const prevScrollPos = useRef(0)
  const ref = useRef()

  useEffect(() => {
    prevScrollPos.current = window.scrollY

    const { offsetTop, offsetHeight } = ref.current

    const handleScroll = e => {
      const currentScrollY = window.scrollY

      setIsScrollingDown({
        isPastBaseline: currentScrollY > offsetTop,
        isScrollingDown:
          currentScrollY > offsetTop + offsetHeight &&
          currentScrollY > prevScrollPos.current
      })

      prevScrollPos.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return { ...scrollState, ref }
}
