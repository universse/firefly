import { useRef, useEffect, useState } from 'react'

export default function useIsScrollingDown () {
  const [isScrollingDown, setIsScrollingDown] = useState()

  const prevScrollPos = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY

      prevScrollPos.current > currentScrollPos
        ? setIsScrollingDown(false)
        : setIsScrollingDown(true)

      prevScrollPos.current = currentScrollPos
    }

    prevScrollPos.current = window.scrollY

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return isScrollingDown
}
