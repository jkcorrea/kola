import { ListIcon, ListItem, Text } from '@chakra-ui/core'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { ListItemContainer } from 'components/Sidebar/ListItemContainer'
import { UiContainer } from 'containers/UiContainer'
import { Table } from 'models/Table'
import React from 'react'
import { FaTable } from 'react-icons/fa'
import { useContainer } from 'unstated-next'

type Props = {
  table: Table
  isActive: boolean
}

export const TableListItem: React.FC<Props> = ({ table }) => {
  const {
    ui: { currentTable },
    setCurrentTable,
  } = useContainer(UiContainer)

  const isActive = table.name === currentTable

  const handleSelect = (e: React.SyntheticEvent) => {
    // Stop propogating, otherwise handleSelect overrides this change
    e.stopPropagation()
    setCurrentTable(table.name)
  }

  const bg = isActive ? 'gray.300' : 'transparent'
  const hoverBg = isActive ? bg : 'gray.200'

  return (
    <ListItem>
      <ListItemContainer
        pl="40px"
        onClick={handleSelect}
        bg={bg}
        _hover={{ backgroundColor: hoverBg, cursor: 'pointer' }}
      >
        <ListIcon size="12px" icon={FaTable} color="gray.900" />

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
          {table.name}
        </Text>
      </ListItemContainer>
    </ListItem>
  )
}
