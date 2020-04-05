/* eslint-disable max-classes-per-file */

import { ValidationError } from 'lib/errors'
import Validator from 'validator'

const StringDataTypeDefaultOptions = {
  length: 255,
  binary: false,
}
type StringDataTypeOptionsType = Partial<typeof StringDataTypeDefaultOptions>

type NumberDataTypeOptionsType = {
  length?: number
  zerofill?: boolean
  decimals?: number
  precision?: number
  scale?: number
  unsigned?: boolean
}

type EnumDataTypeOptions = {
  values: string[]
}

// export type StringType = string | Buffer | number
// export type BooleanType = string | boolean | 0 | 1 | 'true' | 'false'
// export type NumberType = number
// export type DateType = Date
// export type BaseType = StringType | BooleanType | NumberType | DateType

/**
 * Base class from which DataType classes derive.
 * Heavy inspiration from [sequelize](https://github.com/sequelize/sequelize/).
 */
export abstract class AbstractDataType {
  protected _key = '__CHANGE_ME_PLZ__'

  /** Unique identifier for this type */
  get key() {
    return this._key
  }

  /** Returns a string representing this type */
  toString() {
    return this.toSql()
  }

  /** Takes a value of this type and returns a js string */
  stringify = (value: string) => `${value}`

  /** Returns valid (partial) SQL for this type */
  toSql() {
    return this.key
  }

  /** Validates a value conforms to this type */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract validate(value: any): boolean
}

/** Variable-length String type. Max (and default) length is 255. */
class StringDataType extends AbstractDataType {
  _key = 'STRING'

  readonly binary: boolean
  readonly length: number

  constructor(options?: StringDataTypeOptionsType) {
    super()

    const opts = { ...StringDataTypeDefaultOptions, options }
    Object.entries(opts).forEach(([k, v]) => {
      this[k] = v
    }, this)
  }

  toSql() {
    return `VARCHAR(${this.length}) ${this.binary ? 'BINARY' : ''}`.trim()
  }

  validate(value) {
    if (Object.prototype.toString.call(value) !== '[object String]') {
      // Might be binary or a number...
      if (
        (this.binary && Buffer.isBuffer(value)) ||
        typeof value === 'number'
      ) {
        return true
      }
      throw new ValidationError(`${value} is not a valid string`)
    }

    return true
  }
}

/** A fixed length string, space-padded string. Defaults to length of 255. */
class CharDataType extends StringDataType {
  _key = 'CHAR'

  toSql() {
    return `CHAR(${this.length}) ${this.binary ? 'BINARY' : ''}`.trim()
  }
}

/** Unlimited length string. */
class TextDataType extends StringDataType {
  toSql = () => 'TEXT'

  validate = (value: string) => {
    if (typeof value !== 'string') {
      throw new ValidationError(`${value} is not a valid string`)
    }
    return true
  }
}

class NumberDataType extends AbstractDataType {
  _key = 'NUMBER'

  readonly length: number
  readonly zerofill: boolean
  readonly decimals: number
  readonly precision: number
  readonly scale: number
  readonly unsigned: boolean

  constructor(options: NumberDataTypeOptionsType = {}) {
    super()

    Object.entries(options).forEach(([k, v]) => {
      this[k] = v
    }, this)
  }

  toSql() {
    let result = this.key

    if (this.length > 0) {
      const decimalOption =
        typeof this.decimals === 'number' ? `,${this.decimals}` : ''
      result += `(${this.length}${decimalOption})`
    }

    if (this.unsigned) {
      result += ' UNSIGNED'
    }
    if (this.zerofill) {
      result += ' ZEROFILL'
    }

    return result
  }

  validate = (value) => {
    if (typeof value !== 'number') {
      throw new ValidationError(`${value} is not a valid number`)
    }

    return true
  }
}

/** 32-bit integer */
class IntegerDataType extends NumberDataType {
  _key = 'INTEGER'

  validate = (value) => {
    if (!Number.isInteger(value)) {
      throw new ValidationError(`${value} is not a valid integer`)
    }
    return true
  }
}

/** 64-bit integer */
class BigIntDataType extends NumberDataType {
  _key = 'BIGINT'

  validate = (value) => {
    if (!Number.isInteger(value)) {
      throw new ValidationError(`${value} is not a valid integer`)
    }
    return true
  }
}

/** Floating point number (4-byte preceision) */
class FloatDataType extends NumberDataType {
  _key = 'FLOAT'
}

/** Floating point number (4-byte preceision) */
class RealDataType extends NumberDataType {
  _key = 'FLOAT'
}

/** Floating point number (4-byte preceision) */
class DoubleDataType extends NumberDataType {
  _key = 'FLOAT'
}

/** Decimal number */
class DecimalDataType extends NumberDataType {
  _key = 'DECIMAL'

  toSql() {
    if (this.precision || this.scale) {
      return `DECIMAL(${[this.precision, this.scale]
        .filter((_) => _)
        .join(',')})`
    }

    return 'DECIMAL'
  }

  validate = (value) => {
    if (!Validator.isDecimal(value)) {
      throw new ValidationError(`${value} is not a valid decimal`)
    }

    return true
  }
}

/** Datetime */
class DateDataType extends AbstractDataType {
  _key = 'DATE'

  toSql = () => 'DATETIME'

  validate = (_value: Date) => true
}

/** Boolean */
class BooleanDataType extends AbstractDataType {
  _key = 'BOOLEAN'

  toSql = () => 'TINYINT(1)'

  validate = (value) => {
    try {
      Boolean(value)
    } catch {
      throw new ValidationError(`${value} is not a valid boolean`)
    }
    return true
  }
}

class UUIDDataType extends AbstractDataType {
  _key = 'UUID'

  validate = (value: string) => {
    if (!Validator.isUUID(value)) {
      throw new ValidationError(`${value} is not a valid uuid`)
    }

    return true
  }
}

/** A JSON string. Only available in Postgres. */
class JsonDataType extends AbstractDataType {
  _key = 'JSON'

  validate = (_value) => true

  stringify = JSON.stringify
}

/** Enumeration type */
class EnumDataType extends AbstractDataType {
  _key = 'ENUM'

  readonly values: string[]

  constructor(options: EnumDataTypeOptions) {
    super()

    this.values = options.values
  }

  toString() {
    return this.values.toString()
  }

  toSql() {
    return `ENUM (${this.values.map((v) => `'${v}'`).join(', ')})`
  }

  validate(value: string) {
    if (!this.values.includes(value)) {
      throw new ValidationError(
        `${value} is not a valid choice in ${this.values}`,
      )
    }

    return true
  }
}

export const BaseDataTypes = {
  StringDataType,
  CharDataType,
  TextDataType,
  NumberDataType,
  IntegerDataType,
  BigIntDataType,
  FloatDataType,
  // TimeDataType,
  DateDataType,
  // DateOnlyDataType,
  BooleanDataType,
  // NowDataType,
  // BlobDataType,
  DecimalDataType,
  // NumericDataType: DecimalDataTye,
  UUIDDataType,
  // UUIDv1DataType,
  // UUIDv4DataType,
  // HstoreDataType,
  JsonDataType,
  // JsonbDataType,
  // VirtualDataType,
  // ArrayDataType,
  // NoneDataType: VirtualDataType,
  EnumDataType,
  // RangeDataType,
  RealDataType,
  DoubleDataType,
  // GeometryDataType,
  // GeographyDataType,
}

/* eslint-enable max-classes-per-file */
