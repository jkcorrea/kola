import { Box } from '@chakra-ui/core'
import { HotColumn, HotTable } from '@handsontable/react'
import Handsontable from 'handsontable'
import { Table } from 'models/Table'
import React, { useMemo, useState } from 'react'

type Props = {
  table: Table
}

const DEFAULT_NUM_ROWS = 10

const padTableWithColumns = (
  realColumns: React.ReactNode[],
  { minWidth = 10, numExtraColumns = 3 } = {},
) => {
  if (numExtraColumns < 0 || minWidth < realColumns.length) {
    throw new Error('number of actual columns exceeds constraints')
  }

  const widthWithExtra = realColumns.length + numExtraColumns
  const width = widthWithExtra < minWidth ? minWidth : widthWithExtra

  const columns = []
  for (let i = 0; i < width; i += 1) {
    columns.push(
      i < realColumns.length ? (
        realColumns[i]
      ) : (
        <HotColumn key={`dummy-col${i}`} title=" " />
      ),
    )
  }

  return columns
}

const DataGrid: React.FC<Props> = ({ table }) => {
  const realColumns = useMemo<React.ReactNode[]>(() => {
    // Collect the columns
    const cols = []
    table.columns.forEach((c) => {
      cols.push(<HotColumn readOnly key={c.name} title={c.name} />)
    })
    return cols
  }, [table])

  // Tack on 3 blank (virtual) columns for playing around with
  const columns = padTableWithColumns(realColumns)

  const [data] = useState(
    Handsontable.helper.createEmptySpreadsheetData(
      DEFAULT_NUM_ROWS,
      columns.length,
    ),
  )

  return (
    <Box w="100%">
      <HotTable data={data} licenseKey="non-commercial-and-evaluation">
        {columns}
      </HotTable>
    </Box>
  )
}

// eslint-disable-next-line import/no-default-export
export default DataGrid
