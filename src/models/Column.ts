/* eslint-disable @typescript-eslint/no-explicit-any */

import { AbstractDataType } from './dialects/BaseDataTypes'

export interface ColumnOptions {
  default?: any
}

export class Column {
  name: string
  type: AbstractDataType

  default?: string

  constructor(name: string, type: AbstractDataType, options?: ColumnOptions) {
    this.name = name
    this.type = type

    if (options) {
      Object.entries(options).forEach(([k, v]) => {
        this[k] = v
      }, this)
    }
  }
}

/* eslint-enable @typescript-eslint/no-explicit-any */
