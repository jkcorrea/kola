/* eslint-disable max-classes-per-file */

import { BaseDataTypes } from '../BaseDataTypes'

class DecimalDataType extends BaseDataTypes.DecimalDataType {
  parse = parseFloat
}

class StringDataType extends BaseDataTypes.StringDataType {
  toSql() {
    if (this.binary) {
      return 'BYTEA'
    }
    return super.toSql()
  }
}

class CharDataType extends BaseDataTypes.CharDataType {
  toSql() {
    if (this.binary) {
      return 'BYTEA'
    }
    return super.toSql()
  }
}

class BooleanDataType extends BaseDataTypes.BooleanDataType {
  toSql = () => 'BOOLEAN'
}

class DateDataType extends BaseDataTypes.DateDataType {
  toSql = () => 'TIMESTAMP WITH TIME ZONE'
}

class IntegerDataType extends BaseDataTypes.IntegerDataType {
  parse = (value) => parseInt(value, 10)
}

export const PostgresDataTypes = {
  ...BaseDataTypes,
  DecimalDataType,
  StringDataType,
  CharDataType,
  BooleanDataType,
  DateDataType,
  IntegerDataType,
}

/* eslint-enable max-classes-per-file */
