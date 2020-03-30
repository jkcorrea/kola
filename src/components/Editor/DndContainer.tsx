import React, { useState } from 'react'
import { XYCoord, useDrop } from 'react-dnd'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import { Box } from './Box'
import { ITEM_TYPES } from './ItemTypes'

type BoxType = {
  top: number
  left: number
  title: string
}

type DragItem = BoxType & {
  type: string
  id: string
}

type BoxesState = {
  [key: string]: BoxType
}

export const DndContainer: React.FC = () => {
  const [boxes, setBoxes] = useState<BoxesState>({
    a: { top: 20, left: 80, title: 'Drag me around' },
    b: { top: 180, left: 20, title: 'Drag me too' },
  })

  const moveBox = (id: string, left: number, top: number) => {
    setBoxes({
      ...boxes,
      [id]: {
        ...boxes[id],
        left,
        top,
      },
    })
  }

  const [, drop] = useDrop({
    accept: ITEM_TYPES.BOX,
    drop: (item: DragItem, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset() as XYCoord
      const left = Math.round(item.left + delta.x)
      const top = Math.round(item.top + delta.y)

      moveBox(item.id, left, top)
    },
  })

  return (
    <div
      ref={drop}
      css={css`
        height: 100%;
        width: 100%;
      `}
    >
      {Object.keys(boxes).map((key) => {
        const { left, top, title } = boxes[key]
        return (
          <Box key={key} id={key} left={left} top={top}>
            {title}
          </Box>
        )
      })}
    </div>
  )
}
