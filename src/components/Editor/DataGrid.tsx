import { Box } from '@chakra-ui/core'
import React from 'react'
import ReactDataGrid from 'react-data-grid'

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' },
  { key: 'count', name: 'Count' },
]

const rows = [
  { id: 0, title: 'row1', count: 20 },
  { id: 1, title: 'row1', count: 40 },
  { id: 2, title: 'row1', count: 60 },
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
