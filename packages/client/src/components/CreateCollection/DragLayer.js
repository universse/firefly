import React, { useEffect, useRef } from 'react'
import { useDragLayer } from 'react-dnd'

function getStyles (initialClientOffset, offsetDifference) {
  if (!initialClientOffset || !offsetDifference) {
    return {}
  }

  const x = initialClientOffset.x + offsetDifference.x - 16
  const y = initialClientOffset.y + offsetDifference.y - 16
  const transform = `translate(${x}px, ${y}px)`

  return {
    boxShadow: 'var(--shadow-04)',
    opacity: 1,
    transform,
    WebkitTransform: transform
  }
}

function DragLayer (props) {
  const { item, initialClientOffset, offsetDifference } = useDragLayer(
    monitor => ({
      item: monitor.getItem(),
      initialClientOffset: monitor.getInitialClientOffset(),
      offsetDifference: monitor.getDifferenceFromInitialOffset()
    })
  )

  const titleRef = useRef()

  useEffect(() => {
    item && (titleRef.current = item.title)
  }, [item])

  return (
    <div id='DragLayer'>
      <div
        id='DragPreview'
        style={getStyles(initialClientOffset, offsetDifference)}
      >
        {titleRef.current && <span>{titleRef.current}</span>}
      </div>
    </div>
  )
}
export default DragLayer
