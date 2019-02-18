import React from 'react'

export function DefaultItem ({ isActive, ...props }) {
  return <li {...props} />
}

export function DefaultResultBox (props) {
  return <div {...props} />
}

export function DefaultRoot ({ innerRef, ...props }) {
  return <div ref={innerRef} {...props} />
}
