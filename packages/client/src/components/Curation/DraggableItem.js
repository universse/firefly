import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDrag, useDrop } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import LearningItemInput from './LearningItemInput'
import { useDraftActions } from './useDraftStore'

export default function DraggableItem (props) {
  const { index, title } = props
  const { dropUrl } = useDraftActions()

  const [edge, setEdge] = useState(null)
  const [isEditing, setIsEditing] = useState(index === -1)

  const node = useRef()

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: 'default', index, title },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  const [{ isOver }, drop] = useDrop({
    accept: 'default',
    collect: monitor => ({
      isOver: monitor.isOver()
    }),
    drop (item) {
      const { index: dragIndex } = item

      let dropIndex = index

      if (dragIndex < index && edge === 'top') {
        dropIndex = index - 1
      } else if (dragIndex > index && edge === 'bottom') {
        dropIndex = index + 1
      }

      dropUrl({ dragIndex, dropIndex })
      setEdge(null)
    },
    hover (_, monitor) {
      const { bottom, top } = node.current.getBoundingClientRect()
      setEdge(
        monitor.getClientOffset().y - top < (bottom - top) / 2
          ? 'top'
          : 'bottom'
      )
    }
  })

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [preview])

  drag(drop(node))

  return (
    <li
      ref={node}
      className='inert'
      draggable={!isEditing}
      style={{ cursor: isEditing ? 'auto' : 'move' }}
    >
      <div style={{ opacity: isDragging ? 0.4 : 1 }}>
        <LearningItemInput
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          {...props}
        />
      </div>
      {isOver && (
        <div
          id='DropIndicator'
          style={{
            ...(edge && { [edge]: -3.5 })
          }}
        >
          <div
            style={{
              borderRadius: 3,
              height: 6,
              width: 6
            }}
          />
          <div
            style={{
              height: 2,
              flex: '1 0 auto'
            }}
          />
        </div>
      )}
    </li>
  )
}

DraggableItem.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
}
