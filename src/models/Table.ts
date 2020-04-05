import { ColumnExistsError } from 'lib/errors'
import { DialectType } from 'lib/types'

import { Column } from './Column'
// TODO not sure how to make this generic but keep types propogating
// just use postgres directly for now...
// import { DataTypes } from './DataTypes'
import { PostgresDataTypes as DataTypes } from './dialects/postgres/DataTypes'

interface TableOptions {
  dialect: DialectType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default?: any
}

export class Table {
  dialect: DialectType
  name: string
  primaryKey: Column

  private columns: Map<string, Column>

  constructor(name: string, options: TableOptions) {
    this.dialect = options.dialect
    this.name = name

    this.primaryKey = new Column('id', new DataTypes.UUIDDataType())

    this.columns = new Map([['id', this.primaryKey]])
  }

  addColumn(column: Column) {
    if (this.columns.has(column.name)) {
      throw new ColumnExistsError(
        `'${column.name}' already exists on table '${this.name}'`,
      )
    }

    this.columns.set(column.name, column)
  }
}
