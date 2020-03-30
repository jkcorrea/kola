import Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import React from 'react'
import { DndContainer } from './DndContainer'

export interface DragAroundNaiveState {
  hideSourceOnDrag: boolean
}

export const Editor: React.FC = () => (
  <DndProvider backend={Backend}>
    <DndContainer />
  </DndProvider>
)
