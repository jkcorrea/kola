import { Flex, Heading, IconButton, List } from '@chakra-ui/core'
import { DatabaseListItem } from 'components/Sidebar/DatabaseListItem'
import { UiContainer } from 'containers/UiContainer'
import { Database } from 'models/Database'
import React from 'react'
import { useContainer } from 'unstated-next'

const defaultDbName = 'My Fancy Database'

// TODO there's a small CSS bug where when the db list overflows
// it scrolls, but the page overflows as well by the same height
// as the header. I know there's a simple fix but🤷🏻‍♂️...

export const Sidebar: React.FC = () => {
  const {
    ui: { databases },
    addDatabase,
  } = useContainer(UiContainer)

  const handleAddDatabase = () => {
    // TODO should use regex instead, as you can easily make this bug
    // out with a db name like 'My Database lmaooo'
    const count = databases.filter((d) => d.name.startsWith(defaultDbName))
      .length

    const name = `${defaultDbName} ${count > 0 ? count : ''}`.trim()
    addDatabase(new Database(name))
  }

  const listItems = databases.map((d, index) => (
    <DatabaseListItem key={d.name} database={d} index={index} />
  ))

  return (
    <Flex w="250px" flexDir="column" bg="gray.100">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        px="10px"
        py="12px"
        bg="gray.600"
        color="white"
      >
        <Heading verticalAlign="middle" display="inline" size="md">
          Databases
        </Heading>
        <IconButton
          size="sm"
          icon="add"
          aria-label="Create new database"
          onClick={handleAddDatabase}
        />
      </Flex>
      <List flex="1" spacing={3} overflowY="scroll">
        {listItems}
      </List>
    </Flex>
  )
}
