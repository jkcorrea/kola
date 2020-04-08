import { Box, Heading } from '@chakra-ui/core'
import { EmptyRows } from 'components/Editor/EmptyRows'
import { UiContainer } from 'containers/UiContainer'
import React from 'react'
import ReactDataGrid from 'react-data-grid'
import { useContainer } from 'unstated-next'

const DataGrid = () => {
  const {
    ui: { databases, currentDatabase, currentTable },
  } = useContainer(UiContainer)

  const db = databases[currentDatabase]
  const table = db.tables.get(currentTable)

  if (!table) {
    return (
      <Box pt="10px">
        <Heading size="lg">Select a table</Heading>
      </Box>
    )
  }

  // Collect the columns
  const columns = []
  table.columns.forEach((_, key) => {
    columns.push({ key, name: key })
  })

  const rows = []

  return (
    <Box className="DataGrid">
      <ReactDataGrid columns={columns} rows={rows} emptyRowsView={EmptyRows} />
    </Box>
  )
}

// eslint-disable-next-line import/no-default-export
export default DataGrid
