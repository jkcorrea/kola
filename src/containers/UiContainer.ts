import { createContainer } from 'unstated-next'
import { useState } from 'react'

type UiState = {
  showSchema: boolean
}

const initialState: UiState = {
  showSchema: false,
}

const useUi = () => {
  const [ui, _setUi] = useState<UiState>(initialState)

  return {
    ui,
    setUi: (newState: Partial<UiState>) => {
      _setUi({ ...ui, ...newState })
    },
  }
}

export const UiContainer = createContainer(useUi)
