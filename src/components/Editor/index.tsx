import { Box, Heading } from '@chakra-ui/core'

import React from 'react'
import dynamic from 'next/dynamic'

const DynamicDataGridWithoutSSR = dynamic(() => import('./DataGrid'), {
  ssr: false,
})

export const Editor = () => {
  return (
    <Box>
      <Heading as="h1" size="xl">
        Test
      </Heading>
      <DynamicDataGridWithoutSSR />
    </Box>
  )
}
