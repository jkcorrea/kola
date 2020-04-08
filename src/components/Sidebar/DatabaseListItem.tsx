import { IconButton, List, ListIcon, ListItem, Text } from '@chakra-ui/core'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { ListItemContainer } from 'components/Sidebar/ListItemContainer'
import { UiContainer } from 'containers/UiContainer'
import { Database } from 'models/Database'
import React from 'react'
import { FaDatabase } from 'react-icons/fa'
import { useContainer } from 'unstated-next'

import { TableListItem } from './TableListItem'

type Props = {
  index: number
  database: Database
}

export const DatabaseListItem: React.FC<Props> = ({ database, index }) => {
  const {
    ui: { currentDatabase, currentTable },
    setCurrentDatabase,
    removeDatabase,
  } = useContainer(UiContainer)

  const isActive = index === currentDatabase
  const bg = isActive ? 'gray.300' : 'transparent'
  const hoverBg = isActive ? bg : 'gray.200'
  // const icon = isActive ? 'chevron-down' : 'chevron-right'

  const handleSelect = () => setCurrentDatabase(index)
  const handleDelete = (e: React.SyntheticEvent) => {
    // Stop propogating, otherwise handleSelect overrides this change
    e.stopPropagation()
    removeDatabase(index)
  }

  const tableItems = []
  database.tables.forEach((t) =>
    tableItems.push(
      <TableListItem
        key={t.name}
        table={t}
        isActive={currentTable === t.name}
      />,
    ),
  )
  const sublist = <List>{tableItems}</List>

  return (
    <ListItem>
      <ListItemContainer
        pl="15px"
        bg={bg}
        onClick={handleSelect}
        _hover={{ backgroundColor: hoverBg, cursor: 'default' }}
        css={css`
          &:hover .delete {
            opacity: 1;
          }
        `}
      >
        <ListIcon size="12px" icon={FaDatabase} color="black" />

        <Text
          d="inline"
          verticalAlign="middle"
          whiteSpace="nowrap"
          overflowX="scroll"
          css={css`
            ::-webkit-scrollbar {
              display: none;
            }
            scrollbar-width: none;
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
          `}
        >
          {database.name}
        </Text>

        <IconButton
          className="delete"
          ml="auto"
          mr="8px"
          icon="delete"
          variant="ghost"
          color="red.600"
          size="xs"
          aria-label="Delete database"
          opacity={0.15}
          onClick={handleDelete}
        />
      </ListItemContainer>
      {isActive && sublist}
    </ListItem>
  )
}
