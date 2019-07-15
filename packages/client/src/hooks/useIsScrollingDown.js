import { useRef, useEffect, useState } from 'react'

export default function useIsScrollingDown ({ id, property }) {
  const [scrollState, setIsScrollingDown] = useState({
    isPastBaseline: false,
    isScrollingDown: false
  })

  const prevScrollPos = useRef(0)

  useEffect(() => {
    prevScrollPos.current = window.scrollY

    const handleScroll = () => {
      const isPastBaseline =
        window.scrollY > document.getElementById(id)[property]

      setIsScrollingDown({
        isPastBaseline,
        isScrollingDown:
          isPastBaseline && prevScrollPos.current < window.scrollY
      })

      prevScrollPos.current = window.scrollY
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [id, property])

  return scrollState
}
