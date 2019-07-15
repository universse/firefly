import { useRef, useEffect, useState } from 'react'

export default function useIsScrollingDown () {
  const [isScrollingDown, setIsScrollingDown] = useState(false)

  const prevScrollPos = useRef(0)

  useEffect(() => {
    prevScrollPos.current = window.scrollY

    const handleScroll = () => {
      setIsScrollingDown(
        window.scrollY > document.getElementById('main').offsetTop &&
          prevScrollPos.current < window.scrollY
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
