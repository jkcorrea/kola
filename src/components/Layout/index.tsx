import { Box } from '@chakra-ui/core'
import React from 'react'
import { Topbar } from 'components/Layout/Topbar'

export type LayoutProps = {
  children: React.ReactNode
  footer?: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children, footer }) => {
  // direction="column"
  // alignItems="center"
  // justifyContent="flex-start"
  return (
    <Box w="100%" h="100%">
      <Topbar />
      {children}
      {footer}
    </Box>
  )
}
