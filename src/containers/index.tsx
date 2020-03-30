import { Container } from 'unstated-next'
import React from 'react'
import { UiContainer } from './UiContainer'

const compose = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  containers: Array<Container<any, any>>,
  children: JSX.Element,
): JSX.Element =>
  containers.reduce((acc, C) => <C.Provider>{acc}</C.Provider>, children)

export const AppContainer = ({ children }): JSX.Element =>
  compose([UiContainer], children)
