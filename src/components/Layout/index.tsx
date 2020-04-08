import { Flex } from '@chakra-ui/core'
import { Topbar } from 'components/Layout/Topbar'
import React from 'react'

export type LayoutProps = {
  children: React.ReactNode
  footer?: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children, footer }) => {
  // direction="column"
  // alignItems="center"
  // justifyContent="flex-start"
  return (
    <Flex flexDir="column" w="100%" h="100%">
      <Topbar />
      {children}
      {footer}
    </Flex>
  )
}
