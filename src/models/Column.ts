/* eslint-disable @typescript-eslint/no-explicit-any */

import { ValidDataType, dataTypeHelpers } from 'models/DataTypes'

import { AbstractDataType } from './dialects/BaseDataTypes'

export interface ColumnOptions {
  default?: any
}

export interface ColumnSerialized {
  name: string
  type: ValidDataType
  default?: string
}

export class Column {
  name: string
  type: AbstractDataType

  default?: string

  constructor(name: string, type: ValidDataType, options?: ColumnOptions) {
    this.name = name
    this.type = dataTypeHelpers[type]

    if (options) {
      Object.entries(options).forEach(([k, v]) => {
        this[k] = v
      }, this)
    }
  }

  static fromJSON(data: ColumnSerialized): Column {
    return new Column(data.name, data.type, { default: data.default })
  }
}

/* eslint-enable @typescript-eslint/no-explicit-any */
