import { Box } from '@chakra-ui/core'
import { Table, dataTypeHelpers } from 'models'
import React from 'react'
import ReactDataGrid from 'react-data-grid'

const myTable = new Table('people', { dialect: 'postgres' })
myTable.addColumn('first_name', dataTypeHelpers.text)
myTable.addColumn('last_name', dataTypeHelpers.text)
myTable.addColumn('age', dataTypeHelpers.integer)

const columns = []
myTable.columns.forEach((_, key) => {
  columns.push({ key, name: key })
})

const rows = [
  // { id: 0, title: 'row1', count: 20 },
  // { id: 1, title: 'row1', count: 40 },
  // { id: 2, title: 'row1', count: 60 },
]

const DataGrid = () => {
  return (
    <Box className="DataGrid">
      <ReactDataGrid columns={columns} rows={rows} />
    </Box>
  )
}

// eslint-disable-next-line import/no-default-export
export default DataGrid
