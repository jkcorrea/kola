import { ColumnExistsError } from 'lib/errors'

import { Column, ColumnSerialized } from './Column'
import { DialectType } from './DataTypes'
import { AbstractDataType } from './dialects/BaseDataTypes'

interface TableOptions {
  dialect: DialectType
}

export interface TableSerialized {
  dialect: DialectType
  name: string
  columns: ColumnSerialized[]
}

export class Table {
  readonly primaryKey = 'id'

  dialect: DialectType
  name: string
  columns: Map<string, Column>

  constructor(name: string, options: TableOptions) {
    this.dialect = options.dialect
    this.name = name

    const pkColumn = new Column(this.primaryKey, 'uuid')

    this.columns = new Map([[this.primaryKey, pkColumn]])
  }

  addColumn(
    name: string,
    dataType: AbstractDataType | ((dialect: string) => AbstractDataType),
  ) {
    if (this.columns.has(name)) {
      throw new ColumnExistsError(
        `'${name}' already exists on table '${this.name}'`,
      )
    }

    const DataType =
      typeof dataType === 'function'
        ? (dataType as Function)(this.dialect)
        : dataType

    this.columns.set(name, new Column(name, DataType))
  }

  static fromJSON(data: TableSerialized): Table {
    const table = new Table(data.name, { dialect: data.dialect })
    data.columns.forEach((c) => {
      if (c.name === table.primaryKey) return
      const column = Column.fromJSON(c)
      table.columns.set(column.name, column)
    })

    return table
  }
}
