import { ColumnExistsError } from 'lib/errors'
import { DialectType } from 'lib/types'
import { AbstractDataType } from 'models/dialects/BaseDataTypes'

import { Column } from './Column'
import { DataTypes } from './DataTypes'

interface TableOptions {
  dialect: DialectType
}

export class Table {
  dialect: DialectType
  name: string
  readonly primaryKey: Column
  readonly columns: Map<string, Column>

  constructor(name: string, options: TableOptions) {
    this.dialect = options.dialect
    this.name = name

    this.primaryKey = new Column(
      'id',
      new DataTypes[this.dialect].UUIDDataType(),
    )

    this.columns = new Map([['id', this.primaryKey]])
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
}
