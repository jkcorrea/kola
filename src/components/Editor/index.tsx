import { Box, Flex, Heading } from '@chakra-ui/core'
import { UiContainer } from 'containers/UiContainer'
import dynamic from 'next/dynamic'
import React from 'react'
import { useContainer } from 'unstated-next'

import { Sidebar } from '../Sidebar'
import { Title } from './Title'

const DynamicDataGridWithoutSSR = dynamic(() => import('./DataGrid'), {
  ssr: false,
})

export const Editor = () => {
  const {
    ui: { databases, currentDatabase, currentTable },
  } = useContainer(UiContainer)

  const db = databases[currentDatabase]
  const dataGrid = db.tables.has(currentTable) ? (
    <DynamicDataGridWithoutSSR table={db.tables.get(currentTable)} />
  ) : (
    <Box pt="10px">
      <Heading size="lg">Select a table</Heading>
    </Box>
  )

  const content = db ? (
    <Flex px="30px" py="20px" flex="1" flexDir="column">
      <Title />
      {dataGrid}
    </Flex>
  ) : (
    <Box>
      <Heading>Please select a database</Heading>
    </Box>
  )

  return (
    <Flex h="100%">
      <Sidebar />
      {content}
    </Flex>
  )
}
