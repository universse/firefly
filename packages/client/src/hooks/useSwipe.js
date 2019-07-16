import { useRef } from 'react'

function getPosition (e) {
  if ('touches' in e) {
    const { pageX, pageY } = e.touches[0]
    return { x: pageX, y: pageY }
  }
}

const HORIZONTAL_THRESHOLD = 30
const VERTICAL_THRESHOLD = 150

export const Directions = {
  LEFT: 'left',
  RIGHT: 'right',
  UP: 'up',
  DOWN: 'down'
}

export default function useSwipe (direction, cb) {
  const initialXY = useRef()
  const deltaXY = useRef()

  return {
    onTouchEnd () {
      switch (direction) {
        case Directions.LEFT:
          if (deltaXY.current.x < HORIZONTAL_THRESHOLD) cb()
          break
        case Directions.RIGHT:
          console.log(deltaXY.current.x)
          if (deltaXY.current.x > HORIZONTAL_THRESHOLD) cb()
          break
        case Directions.UP:
          if (deltaXY.current.y < VERTICAL_THRESHOLD) cb()
          break
        case Directions.DOWN:
          if (deltaXY.current.y > VERTICAL_THRESHOLD) cb()
          break
        default:
          break
      }
    },
    onTouchMove (e) {
      const { x, y } = getPosition(e)
      deltaXY.current = {
        x: x - initialXY.current.x,
        y: y - initialXY.current.y
      }
    },
    onTouchStart (e) {
      deltaXY.current = { x: 0, y: 0 }
      initialXY.current = getPosition(e)
    }
  }
}
