import { Box, Heading, Icon, Input } from '@chakra-ui/core'
import { UiContainer } from 'containers/UiContainer'
import React from 'react'
import { useContainer } from 'unstated-next'

export const Title = () => {
  const {
    ui: { databases, currentDatabase, currentTable },
    updateDatabase,
  } = useContainer(UiContainer)

  const db = databases[currentDatabase]
  const table = db.tables.get(currentTable)

  const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    db.name = e.target.value
    updateDatabase(currentDatabase, db)
  }

  const tableTitle = table && (
    <>
      <Icon
        mx="10px"
        size="30px"
        color="gray.200"
        display="inline"
        name="chevron-right"
      />
      <Heading size="md" display="inline">
        {table.name}
      </Heading>
    </>
  )

  return (
    <Box pb="20px">
      <Input
        display="inline"
        size="md"
        fontSize="1.25rem"
        fontWeight="bold"
        variant="flushed"
        value={db.name}
        onChange={updateName}
        isFullWidth={false}
      />
      {tableTitle}
    </Box>
  )
}
