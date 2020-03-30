import React from 'react'
import { useDrag } from 'react-dnd'
import { ITEM_TYPES } from './ItemTypes'

const style: React.CSSProperties = {
  position: 'absolute',
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  cursor: 'move',
}

interface BoxProps {
  id: string
  left: number
  top: number
}

export const Box: React.FC<BoxProps> = ({ id, left, top, children }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { id, left, top, type: ITEM_TYPES.BOX },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  if (isDragging) {
    return <div ref={drag} />
  }

  return (
    <div ref={drag} style={{ ...style, left, top }}>
      {children}
    </div>
  )
}
