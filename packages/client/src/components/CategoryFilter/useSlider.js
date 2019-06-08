import { useState, useRef } from 'react'

const scrollByX = 200

export default function useSlider () {
  const [isMaxScroll, setIsMaxScroll] = useState(false)
  const [isMinScroll, setIsMinScroll] = useState(true)

  const slider = useRef()

  const onScroll = () => {
    setIsMaxScroll(
      slider.current.scrollLeft >=
        slider.current.scrollWidth - slider.current.clientWidth
    )
    setIsMinScroll(slider.current.scrollLeft === 0)
  }

  const onScrollLeftClick = () =>
    slider.current.scrollBy({ left: -scrollByX, behavior: 'smooth' })

  const onScrollRightClick = () =>
    slider.current.scrollBy({ left: scrollByX, behavior: 'smooth' })

  return {
    isMaxScroll,
    isMinScroll,
    onScroll,
    onScrollLeftClick,
    onScrollRightClick,
    slider
  }
}
